import requests

try:
    print("Ping google.com...")
    r = requests.get("https://google.com", timeout=5)
    print(f"✅ Internet Status: {r.status_code}")
except Exception as e:
    print(f"❌ Internet Check Failed: {e}")
