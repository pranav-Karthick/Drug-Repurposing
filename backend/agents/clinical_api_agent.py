import httpx
import asyncio
from database.crud import save_clinical_trials
import random

import httpx
import asyncio
from database.crud import save_clinical_trials

# OpenTargets Genetics/Platform GraphQL API
OT_URL = "https://api.platform.opentargets.org/api/v4/graphql"

async def fetch_clinical_trials(molecule: str):
    # GraphQL Query to find Drug ID first
    search_query = """
    query SearchQuery($queryString: String!) {
      search(queryString: $queryString, entityNames: ["drug"]) {
        hits {
          id
          name
        }
      }
    }
    """
    
    # GraphQL Query to fetch Indications (proxy for trials)
    trials_query = """
    query DrugTrials($chemblId: String!) {
      drug(chemblId: $chemblId) {
        name
        indications {
          rows {
            disease {
              name
            }
            maxPhaseForIndication
          }
          count
        }
      }
    }
    """

    trials = []
    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            # 1. Search for Drug ID
            resp = await client.post(OT_URL, json={"query": search_query, "variables": {"queryString": molecule}})
            search_data = resp.json()
            hits = search_data.get("data", {}).get("search", {}).get("hits", [])
            
            if not hits:
                print(f"WARNING: OpenTargets found no drug ID for {molecule}")
                return []

            chembl_id = hits[0]["id"]
            drug_name = hits[0]["name"]
            
            # 2. Fetch Clinical Indications
            resp_trials = await client.post(OT_URL, json={"query": trials_query, "variables": {"chemblId": chembl_id}})
            drug_data = resp_trials.json().get("data", {}).get("drug", {})
            
            if drug_data:
                indications = drug_data.get("indications", {}).get("rows", [])
                # Limit to top 15 results for relevance
                for ind in indications[:15]:
                    disease = ind['disease']['name']
                    phase_num = ind['maxPhaseForIndication']
                    
                    # Map to internal schema
                    trials.append({
                        "molecule": molecule,
                        "title": f"Clinical Study for {disease} ({drug_name})",
                        "phase": f"Phase {phase_num}",
                        "status": "Active (Inferred)",
                        "sponsor": "See OpenTargets",
                        "condition": disease
                    })
            else:
                print(f"WARNING: OpenTargets found no data for {chembl_id}")

    except Exception as e:
        print(f"ERROR OpenTargets API error: {e}")
        return []

    # Save only if data exists
    if trials:
        try:
            await save_clinical_trials(trials)
            # Fix for FastAPI serialization: convert _id to string
            for t in trials:
                if "_id" in t:
                    t["_id"] = str(t["_id"])
        except Exception as e:
             # Look for db issues but proceed
             print(f"DB Save Error: {e}")

    return trials
