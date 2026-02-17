import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import certifi

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
MONGO_DB = os.getenv("MONGO_DB")

class MongoManager:
    client = None
    db = None

    async def connect(self):
        print("Connecting to MongoDB...")
        try:
            self.client = AsyncIOMotorClient(MONGO_URI, serverSelectionTimeoutMS=5000, tlsCAFile=certifi.where())
            self.db = self.client[MONGO_DB]
            await self.client.admin.command('ping')
            print("Connected to MongoDB Atlas (Secure)")
        except Exception as e:
            print(f"Secure connection failed: {e}")
            try:
                print("Retrying with tlsAllowInvalidCertificates=True...")
                self.client = AsyncIOMotorClient(MONGO_URI, serverSelectionTimeoutMS=5000, tlsAllowInvalidCertificates=True)
                self.db = self.client[MONGO_DB]
                await self.client.admin.command('ping')
                print("Connected to MongoDB Atlas (Insecure Fallback)")
            except Exception as e2:
                print(f"MongoDB Atlas connection failed: {e2}")
                self.client = None
                self.db = None

    async def close(self):
        if self.client:
            self.client.close()
            print("MongoDB connection closed")

mongo_manager = MongoManager()
