import asyncio
import httpx
import json

URL = "https://clinicaltrials.gov/api/v2/studies?query.term=Montelukast&pageSize=5&format=json"

async def test():
    print(f"Fetching {URL}")
    async with httpx.AsyncClient(timeout=30) as client:
        try:
            headers = {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                "Accept": "application/json",
            }
            response = await client.get(URL, headers=headers)
            print(f"Status: {response.status_code}")
            if response.status_code == 200:
                data = response.json()
                print(f"Keys: {data.keys()}")
                if "studies" in data:
                    print(f"Studies found: {len(data['studies'])}")
                else:
                    print("No 'studies' key found.")
            else:
                print(f"Error content: {response.text}")
        except Exception as e:
            print(f"EXCEPTION: {e}")

if __name__ == "__main__":
    asyncio.run(test())
