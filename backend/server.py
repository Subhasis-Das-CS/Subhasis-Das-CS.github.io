from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import asyncio
import logging
import re
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, field_validator
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import resend


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Resend
resend.api_key = os.environ.get('RESEND_API_KEY')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
ADMIN_EMAIL = os.environ.get('ADMIN_EMAIL')

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
        # allow digits, +, spaces, hyphens, parentheses
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
    email_status: str = "pending"


class AdmissionResponse(BaseModel):
    success: bool
    message: str
    id: Optional[str] = None


# ---------- Email helpers ----------
def build_admission_email_html(a: Admission) -> str:
    submitted = a.submitted_at.strftime('%b %d, %Y at %H:%M UTC')
    return f"""
    <!doctype html>
    <html>
      <body style="margin:0;padding:0;background:#0b0b1a;font-family:Arial,Helvetica,sans-serif;color:#0f172a;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0b0b1a;padding:32px 0;">
          <tr>
            <td align="center">
              <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,0.25);">
                <tr>
                  <td style="background:linear-gradient(135deg,#1e3a8a 0%,#7c3aed 100%);padding:28px 32px;color:#ffffff;">
                    <div style="font-size:13px;letter-spacing:0.2em;text-transform:uppercase;opacity:0.85;">Pi and Pixels</div>
                    <div style="font-size:22px;font-weight:700;margin-top:4px;">New Admission Inquiry</div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:28px 32px;">
                    <p style="margin:0 0 16px 0;color:#334155;font-size:14px;line-height:1.6;">
                      A new student has submitted the admission inquiry form on the Pi and Pixels landing page.
                    </p>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-top:8px;">
                      <tr>
                        <td style="padding:12px 14px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px 8px 0 0;font-size:12px;color:#64748b;text-transform:uppercase;letter-spacing:0.08em;">Full Name</td>
                      </tr>
                      <tr>
                        <td style="padding:12px 14px;border-left:1px solid #e2e8f0;border-right:1px solid #e2e8f0;font-size:16px;color:#0f172a;font-weight:600;">{a.full_name}</td>
                      </tr>
                      <tr>
                        <td style="padding:12px 14px;background:#f8fafc;border:1px solid #e2e8f0;border-top:none;font-size:12px;color:#64748b;text-transform:uppercase;letter-spacing:0.08em;">Phone</td>
                      </tr>
                      <tr>
                        <td style="padding:12px 14px;border-left:1px solid #e2e8f0;border-right:1px solid #e2e8f0;font-size:16px;color:#0f172a;font-weight:600;">{a.phone}</td>
                      </tr>
                      <tr>
                        <td style="padding:12px 14px;background:#f8fafc;border:1px solid #e2e8f0;border-top:none;font-size:12px;color:#64748b;text-transform:uppercase;letter-spacing:0.08em;">School</td>
                      </tr>
                      <tr>
                        <td style="padding:12px 14px;border-left:1px solid #e2e8f0;border-right:1px solid #e2e8f0;font-size:16px;color:#0f172a;font-weight:600;">{a.school_name}</td>
                      </tr>
                      <tr>
                        <td style="padding:12px 14px;background:#f8fafc;border:1px solid #e2e8f0;border-top:none;font-size:12px;color:#64748b;text-transform:uppercase;letter-spacing:0.08em;">Class</td>
                      </tr>
                      <tr>
                        <td style="padding:12px 14px;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 8px 8px;font-size:16px;color:#0f172a;font-weight:600;">Class {a.student_class}</td>
                      </tr>
                    </table>
                    <p style="margin:24px 0 0 0;color:#64748b;font-size:12px;">Submitted: {submitted}<br/>Inquiry ID: {a.id}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:18px 32px;background:#f8fafc;color:#94a3b8;font-size:12px;text-align:center;">
                    Pi and Pixels &middot; Where Logic Meets Creativity
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
    """


async def send_admission_email(a: Admission) -> str:
    """Returns 'sent', 'skipped' or 'failed:<reason>'"""
    if not resend.api_key or not ADMIN_EMAIL:
        logger.warning("Resend API key or admin email not configured - skipping email")
        return "skipped"
    params = {
        "from": SENDER_EMAIL,
        "to": [ADMIN_EMAIL],
        "subject": f"New Admission Inquiry — {a.full_name} (Class {a.student_class})",
        "html": build_admission_email_html(a),
    }
    try:
        result = await asyncio.to_thread(resend.Emails.send, params)
        logger.info(f"Resend email sent: {result.get('id') if isinstance(result, dict) else result}")
        return "sent"
    except Exception as e:  # noqa: BLE001
        logger.error(f"Failed to send admission email: {e}")
        return f"failed:{str(e)[:140]}"


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "Pi and Pixels API is running"}


@api_router.get("/health")
async def health():
    return {"status": "ok", "service": "pi-and-pixels"}


@api_router.post("/admissions", response_model=AdmissionResponse)
async def create_admission(payload: AdmissionCreate):
    # Honeypot anti-spam: if filled, silently accept but skip everything
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

    # Persist to MongoDB
    doc = admission.model_dump()
    doc['submitted_at'] = doc['submitted_at'].isoformat()
    try:
        await db.admissions.insert_one(doc)
    except Exception as e:  # noqa: BLE001
        logger.error(f"Failed to insert admission: {e}")
        raise HTTPException(status_code=500, detail="Could not save your inquiry. Please try again.")

    # Send notification email (don't fail the request if email fails)
    email_status = await send_admission_email(admission)
    try:
        await db.admissions.update_one(
            {"id": admission.id}, {"$set": {"email_status": email_status}}
        )
    except Exception as e:  # noqa: BLE001
        logger.error(f"Failed to update admission email_status: {e}")

    return AdmissionResponse(
        success=True,
        message="Your response has been recorded. We will contact you soon.",
        id=admission.id,
    )


@api_router.get("/admissions", response_model=List[Admission])
async def list_admissions():
    """Lightweight admin listing (most recent first). _id excluded."""
    items = await db.admissions.find({}, {"_id": 0}).sort("submitted_at", -1).to_list(500)
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
