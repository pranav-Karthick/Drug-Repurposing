from fastapi import APIRouter, UploadFile, File, HTTPException
from pydantic import BaseModel
from groq import Groq
import os
import pypdf
import io
from agents.clinical_api_agent import fetch_clinical_trials
from agents.literature_api_agent import fetch_literature
from agents.web_agent import fetch_web_intel
from agents.patent_agent import fetch_patent_info

router = APIRouter()

# Initialize Groq client safely
try:
    client = Groq(api_key=os.getenv("GROQ_API_KEY"))
except Exception as e:
    print(f"Groq Client Init Error: {e}")
    client = None

class ChatRequest(BaseModel):
    molecule: str
    question: str
    language: str = "en"
    file_context: str = ""

@router.post("/chat")
async def chat_agent(req: ChatRequest):
    try:
        import traceback
        if not client:
            raise HTTPException(status_code=500, detail="LLM Service Unavailable (Missing API Key)")

        # Fetch Real-time Agentic Data (Safe Mode)
        clinical_data = "Clinical data unavailable."
        literature_data = "Literature data unavailable."
        web_data = "Web data unavailable."
        patent_data = "Patent data unavailable."

        try:
            clinical_data = await fetch_clinical_trials(req.molecule)
        except Exception:
            print(f"Agent Error (Clinical): {traceback.format_exc()}")
            
        try:
            literature_data = await fetch_literature(req.molecule)
        except Exception:
            print(f"Agent Error (Literature): {traceback.format_exc()}")
            
        try:
            web_data = fetch_web_intel(req.molecule)
        except Exception:
             print(f"Agent Error (Web): {traceback.format_exc()}")

        try:
            patent_data = fetch_patent_info(req.molecule)
        except Exception:
            print(f"Agent Error (Patent): {traceback.format_exc()}")
        
        # Construct Comprehensive Prompt
        prompt = f"""
You are an advanced AI drug repurposing research assistant.

Context:
Molecule: {req.molecule}

REAL-TIME AGENT DATA:
1. Clinical Trials:
{clinical_data}

2. Scientific Literature:
{literature_data}

3. Web Intelligence:
{web_data}

4. Patent Landscape:
{patent_data}

5. User Uploaded Document Context:
{req.file_context}

User Question: {req.question}

INSTRUCTIONS:
- Analyze the real-time data provided above.
- Identify innovation opportunities, repurposing potential, and strategic gaps.
- If the language requested is not English, translate your entire response fluently.
- Respond in {req.language} language.
- Format with clear headings and bullet points.
"""

        completion = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {"role": "system", "content": "You are an expert pharmaceutical R&D strategist."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.3,
            max_tokens=1500
        )

        return {
            "answer": completion.choices[0].message.content
        }
    except Exception as e:
        print(f"CRITICAL CHAT ERROR: {traceback.format_exc()}")
        # Returning a 500 will help frontend know it failed, but for better UX we might return a friendly error in JSON
        # However, user requested clear diagnosis, so let's log it heavily.
        raise HTTPException(status_code=500, detail=f"Research agent processing failed: {str(e)}")

@router.post("/chat/upload")
async def upload_file(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        pdf_file = io.BytesIO(contents)
        reader = pypdf.PdfReader(pdf_file)
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
        
        # Limit text length to avoid token limits (simulated chunking)
        return {"extracted_text": text[:5000] + "..." if len(text) > 5000 else text}
    except Exception as e:
        print(f"File Upload Error: {e}")
        raise HTTPException(status_code=500, detail="Failed to parse PDF file.")
