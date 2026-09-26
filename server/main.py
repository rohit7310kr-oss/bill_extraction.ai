from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os

from gemini_service import extract_bill_with_gemini


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "Chat2Bill backend is running"}


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/extract-bill")
async def extract_bill(file: UploadFile = File(...)):

    os.makedirs("uploads", exist_ok=True)

    file_path = f"uploads/{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    gemini_result = extract_bill_with_gemini(
        file_path,
        []
    )

    return gemini_result
