"""Pi and Pixels — minimal backend.

The admission form submits directly via EmailJS from the browser, so
this service only exposes a health endpoint to keep the platform
supervisor happy. No Python email logic, no database writes.
"""
from fastapi import FastAPI, APIRouter
from starlette.middleware.cors import CORSMiddleware
import os
import logging

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
)
logger = logging.getLogger(__name__)

app = FastAPI(title="Pi and Pixels API")
api_router = APIRouter(prefix="/api")


@api_router.get("/")
async def root():
    return {"message": "Pi and Pixels API is running"}


@api_router.get("/health")
async def health():
    return {"status": "ok", "service": "pi-and-pixels"}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)
