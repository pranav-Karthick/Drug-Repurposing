import requests
import json
import os

URL = "http://127.0.0.1:8000/api/chat"
PAYLOAD = {
    "molecule": "Aspirin",
    "question": "What is the mechanism of action?",
    "language": "en"
}

try:
    print(f"Testing Backend API at {URL}...")
    response = requests.post(URL, json=PAYLOAD)
    
    print(f"Status Code: {response.status_code}")
    if response.status_code == 200:
        data = response.json()
        print("\n✅ Success!")
        print(f"Response Preview: {data.get('answer', '')[:100]}...")
    else:
        print("\n❌ Failed!")
        print(f"Error Detail: {response.text}")

except Exception as e:
    print(f"\n❌ Connection Error: {e}")
