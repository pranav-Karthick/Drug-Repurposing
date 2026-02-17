from fastapi import FastAPI, UploadFile, File, Form
from fastapi.responses import FileResponse, JSONResponse
from dotenv import load_dotenv
load_dotenv()
from fastapi.middleware.cors import CORSMiddleware
from agents.master_agent import run_research
from agents.report_agent import generate_report
import shutil
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from api.chat import router as chat_router
app.include_router(chat_router, prefix="/api")

@app.on_event("startup")
async def startup():
    # Mongo connection not strictly required for this simplified flow 
    # but kept if legacy code needs it.
    pass

@app.get("/api/health")
async def health():
    return {"status": "ok"}

# NEW: Run Research Endpoint
# Can be GET for simple molecule or POST for file upload usage
@app.post("/api/run-research")
async def run_full_research(
    moleculeName: str = Form(...),
    file: UploadFile = File(None)
):
    pdf_path = None
    if file:
        os.makedirs("uploads", exist_ok=True)
        pdf_path = f"uploads/{file.filename}"
        with open(pdf_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
    payload = {"moleculeName": moleculeName, "pdf_path": pdf_path}
    return await run_research(payload)

@app.get("/api/run-research/{molecule}")
async def run_full_research_get(molecule: str):
    payload = {"moleculeName": molecule, "pdf_path": None}
    return await run_research(payload)

# NEW: Download Report Endpoint
@app.get("/api/download-report/{molecule}")
async def download_report_endpoint(molecule: str):
    # Re-run research or fetch cached (here re-running for simplicity as requested)
    # Ideally we'd pass the JSON data from frontend, but standard pattern is re-fetch or ID lookup.
    # User asked: "@app.get('/api/download-report/{molecule}') ... data = run_research(molecule)"
    
    payload = {"moleculeName": molecule, "pdf_path": None}
    data = await run_research(payload) # awaiting because run_research is async now
    
    pdf_path = generate_report(data)
    return FileResponse(pdf_path, filename="Drug_Repurposing_Report.pdf")

@app.post("/api/chat")
async def chat_api(payload: dict):
    from agents.master_chat_agent import run_chat
    answer = await run_chat(
        molecule=payload.get("molecule", "Unknown"),
        user_query=payload.get("question", ""),
        documents=payload.get("documents", "")
    )
    return {"answer": answer}

# Legacy/Testing endpoints support if needed
@app.get("/api/trials/{molecule}")
async def get_trials_direct(molecule: str):
    from agents.clinical_api_agent import fetch_clinical_trials
    trials = await fetch_clinical_trials(molecule)
    return {"molecule": molecule, "trials": trials}
