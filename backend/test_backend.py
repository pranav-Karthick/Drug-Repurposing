import requests
import time

def test_endpoints():
    base_url = "http://127.0.0.1:8000"
    
    print(f"Checking health at {base_url}/api/health...")
    try:
        r = requests.get(f"{base_url}/api/health")
        print(f"Health Status: {r.status_code}")
        print(f"Health Response: {r.json()}")
    except Exception as e:
        print(f"Health Check Failed: {e}")
        return

    molecule = "Metformin"
    print(f"\nTesting research for {molecule} at {base_url}/api/run-research/{molecule}...")
    try:
        r = requests.get(f"{base_url}/api/run-research/{molecule}")
        print(f"Research Status: {r.status_code}")
        if r.status_code != 200:
            print(f"Research Error: {r.text}")
        else:
            data = r.json()
            print("Research Data Keys:", data.keys())
            
            # Check for report generation
            print(f"\nTesting report download for {molecule}...")
            r_rep = requests.get(f"{base_url}/api/download-report/{molecule}")
            print(f"Report Status: {r_rep.status_code}")
            if r_rep.status_code == 200:
                print("Report generated successfully.")
            else:
                print(f"Report Generation Error: {r_rep.text}")

    except Exception as e:
        print(f"Research Request Failed: {e}")

if __name__ == "__main__":
    test_endpoints()
