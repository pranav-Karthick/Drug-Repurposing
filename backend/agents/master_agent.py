from agents.clinical_api_agent import fetch_clinical_trials
from agents.web_agent import fetch_web_intel
from agents.literature_api_agent import fetch_literature
from agents.patent_agent import fetch_patent_info
from agents.internal_agent import summarize_internal_docs
from agents.iqvia_agent import fetch_iqvia_data
from agents.exim_agent import fetch_exim_data

async def run_research(payload: dict):
    molecule = payload.get("moleculeName")
    pdf_path = payload.get("pdf_path")
    internal_text = ""
    
    if pdf_path:
        # Mock pdf extraction trigger
        internal_text = "PDF Content Present" 

    # 1. Fetch Real-Time Data (Async)
    clinical_data = await fetch_clinical_trials(molecule)
    literature_data = await fetch_literature(molecule)

    # 2. Fetch Mock/Sync Data
    web_data = fetch_web_intel(molecule)
    patent_data = fetch_patent_info(molecule)
    iqvia_data = fetch_iqvia_data(molecule)
    exim_data = fetch_exim_data(molecule)
    internal_data = summarize_internal_docs(internal_text) if internal_text else None

    # 3. Aggregate Results
    # We map keys to match what Frontend "Attractive Dashboard" components expect
    results = {
        "molecule": molecule,
        "clinical_trials": {"trials": clinical_data},
        "marketInsights": iqvia_data,   # Mapped for MarketSection
        "eximData": exim_data,          # Mapped for EximSection
        "patents": patent_data,
        "web_intelligence": web_data,
        "literature": literature_data,
        "internal_insights": internal_data,
        # Legacy/Extra keys if needed for compatibility
        "iqvia": iqvia_data,
        "exim": exim_data
    }
    
    return results
