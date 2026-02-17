import urllib.request
import json
import asyncio

URL = "https://clinicaltrials.gov/api/v2/studies?query.term=Montelukast&pageSize=5&format=json"

def test():
    req = urllib.request.Request(
        URL, 
        data=None, 
        headers={
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Accept': 'application/json'
        }
    )
    try:
        with urllib.request.urlopen(req) as f:
            resp = f.read().decode('utf-8')
            print("Status: 200")
            print(f"Data length: {len(resp)}")
            data = json.loads(resp)
            if "studies" in data:
                print(f"Studies: {len(data['studies'])}")
                print(data['studies'][0].get('protocolSection', {}).get('identificationModule', {}).get('briefTitle'))
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test()
