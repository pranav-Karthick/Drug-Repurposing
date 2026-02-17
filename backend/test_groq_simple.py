import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("GROQ_API_KEY")
print(f"API Key Loaded: {bool(api_key)}")

try:
    client = Groq(api_key=api_key)
    print("Client initialized.")
    
    # Try the requested model
    model = "llama-3.1-8b-instant" 
    print(f"Testing model: {model}...")
    
    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": "Explain drug repurposing in one sentence.",
            }
        ],
        model=model,
    )
    print("\n✅ Success!")
    print(chat_completion.choices[0].message.content)

except Exception as e:
    print(f"\n❌ Error: {e}")
