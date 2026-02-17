import uvicorn
import os
import sys
import traceback

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

if __name__ == "__main__":
    try:
        uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=False)
    except Exception:
        with open("startup_error.log", "w") as f:
            f.write(traceback.format_exc())
