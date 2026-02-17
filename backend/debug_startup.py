import asyncio
import sys
import os
import traceback

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

async def test_startup():
    print("Importing main...")
    try:
        from main import startup
        print("Running startup()...")
        await startup()
        print("Startup success!")
    except Exception:
        print("Caught exception:")
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(test_startup())
