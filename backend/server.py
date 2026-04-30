from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import re
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, field_validator
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="Pi and Pixels API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# ---------- Models ----------
class AdmissionCreate(BaseModel):
    full_name: str = Field(..., min_length=2, max_length=100)
    phone: str = Field(..., min_length=7, max_length=20)
    school_name: str = Field(..., min_length=2, max_length=150)
    student_class: str = Field(..., min_length=1, max_length=20)
    honeypot: Optional[str] = Field(default="", max_length=200)

    @field_validator('full_name', 'school_name')
    @classmethod
    def strip_text(cls, v: str) -> str:
        return v.strip()

    @field_validator('phone')
    @classmethod
    def validate_phone(cls, v: str) -> str:
        v = v.strip()
        if not re.match(r'^[\d\s+\-()]{7,20}$', v):
            raise ValueError("Invalid phone number")
        digits = re.sub(r'\D', '', v)
        if len(digits) < 7 or len(digits) > 15:
            raise ValueError("Phone number must contain 7-15 digits")
        return v

    @field_validator('student_class')
    @classmethod
    def validate_class(cls, v: str) -> str:
        allowed = {"5", "6", "7", "8", "9", "10", "11", "12", "College/Above"}
        if v not in allowed:
            raise ValueError("Invalid class")
        return v


class Admission(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    full_name: str
    phone: str
    school_name: str
    student_class: str
    submitted_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class AdmissionResponse(BaseModel):
    success: bool
    message: str
    id: Optional[str] = None


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "Pi and Pixels API is running"}


@api_router.get("/health")
async def health():
    return {"status": "ok", "service": "pi-and-pixels"}


@api_router.post("/admissions", response_model=AdmissionResponse)
async def create_admission(payload: AdmissionCreate):
    # Honeypot anti-spam: if filled, silently accept but skip persistence.
    if payload.honeypot and payload.honeypot.strip():
        logger.info("Honeypot triggered - silently dropping submission")
        return AdmissionResponse(
            success=True,
            message="Your response has been recorded. We will contact you soon.",
        )

    admission = Admission(
        full_name=payload.full_name,
        phone=payload.phone,
        school_name=payload.school_name,
        student_class=payload.student_class,
    )

    doc = admission.model_dump()
    doc['submitted_at'] = doc['submitted_at'].isoformat()
    try:
        await db.admissions.insert_one(doc)
    except Exception as e:  # noqa: BLE001
        logger.error(f"Failed to insert admission: {e}")
        raise HTTPException(
            status_code=500,
            detail="Could not save your inquiry. Please try again.",
        )

    return AdmissionResponse(
        success=True,
        message="Your response has been recorded. We will contact you soon.",
        id=admission.id,
    )


@api_router.get("/admissions", response_model=List[Admission])
async def list_admissions():
    """Lightweight admin listing (most recent first). _id excluded."""
    items = (
        await db.admissions.find({}, {"_id": 0})
        .sort("submitted_at", -1)
        .to_list(500)
    )
    for it in items:
        if isinstance(it.get('submitted_at'), str):
            try:
                it['submitted_at'] = datetime.fromisoformat(it['submitted_at'])
            except Exception:  # noqa: BLE001
                pass
    return items


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
