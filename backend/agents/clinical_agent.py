import json

def run_clinical_analysis(molecule_name: str, therapy_area: str):
    try:
        with open("mock_data/trials.json", "r") as f:
            data = json.load(f)
        return data
    except Exception as e:
        print(f"Error in Clinical agent: {e}")
        return {}
