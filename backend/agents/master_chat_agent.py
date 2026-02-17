from services.llm_service import generate_llm_response
from agents.clinical_api_agent import fetch_clinical_trials
from agents.literature_api_agent import fetch_literature
from agents.web_agent import fetch_web_intel
from agents.patent_agent import fetch_patent_info

async def run_chat(molecule: str, user_query: str, documents: str = ""):
    # Fetch real-time data from agents
    # clinical and literature are async, so we await them
    clinical = await fetch_clinical_trials(molecule)
    literature = await fetch_literature(molecule)
    
    # web and patent are sync
    web = fetch_web_intel(molecule)
    patent = fetch_patent_info(molecule)

    context = f"""
Molecule: {molecule}

Clinical Trials (Real-time):
{clinical}

Scientific Literature (Real-time):
{literature}

Web Intelligence (Real-time):
{web}

Patent Landscape (Mock):
{patent}

Uploaded Documents:
{documents}
"""

    # Generate response using LLM
    # This is a sync call (groq client is sync by default unless AsyncGroq is used, but implementation used sync Groq)
    return generate_llm_response(context, user_query)
