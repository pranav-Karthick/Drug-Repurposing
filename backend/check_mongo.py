import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
import certifi

load_dotenv()
MONGO_URI = os.getenv("MONGO_URI")

async def check():
    print(f"Checking connection to: {MONGO_URI.split('@')[-1]}")
    try:
        # Try secure first
        client = AsyncIOMotorClient(MONGO_URI, serverSelectionTimeoutMS=5000, tlsCAFile=certifi.where())
        await client.admin.command('ping')
        print("✅ Secure Connection Successful!")
        return
    except Exception as e:
        print(f"⚠️ Secure failed: {e}")
    
    try:
        # Try insecure
        client = AsyncIOMotorClient(MONGO_URI, serverSelectionTimeoutMS=5000, tlsAllowInvalidCertificates=True)
        await client.admin.command('ping')
        print("✅ Insecure Connection Successful!")
    except Exception as e:
        print(f"❌ All attempts failed. Last error: {e}")

if __name__ == "__main__":
    asyncio.run(check())
