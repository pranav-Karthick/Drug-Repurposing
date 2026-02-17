import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def generate_llm_response(context: str, question: str) -> str:
    """
    Uses Groq LLaMA-3 70B model to generate innovation summaries
    """

    prompt = f"""
You are an expert pharmaceutical R&D strategist.

Context:
{context}

User Question:
{question}

Instructions:
- Generate innovation-focused insights
- Highlight repurposing opportunities
- Mention risks and strategic gaps
- Respond clearly in paragraphs or bullet points
"""
    try:
        response = client.chat.completions.create(
            model="llama3-70b-8192",
            messages=[
                {"role": "system", "content": "You are an expert drug discovery AI."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.3,
            max_tokens=900
        )
        return response.choices[0].message.content
    except Exception as e:
        print(f"Error generating LLM response: {e}")
        return "I apologize, but I am unable to generate a response at this time due to a service connection issue."
