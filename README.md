🚀 AI-Driven Molecule Analysis & Drug Intelligence Platform

An Agentic AI-powered full-stack web application that analyzes drug molecules by aggregating real-time clinical trials, scientific literature, and web intelligence to generate innovation-focused insights and downloadable research reports.

📌 Project Overview

Pharmaceutical research and drug repurposing require extensive manual analysis of clinical trials, patents, and scientific publications.

This platform automates that process using:

Multi-agent AI architecture

Real-time biomedical data sources

Interactive dashboard

AI chatbot with multilingual & voice support

Automated PDF report generation

🧠 Key Features
🔬 Molecule Research Dashboard

Enter molecule name

Fetch real-time clinical trials

Retrieve scientific literature insights

Web intelligence summaries

Patent & market mock analysis

Download consolidated research report (PDF)

🤖 Agentic AI Chatbot

ChatGPT-like interface

Fetches real-time molecule insights

Multilingual support

Voice input support

Stores chat history in MongoDB

Document upload for research

📊 Report Generation

Generates structured PDF report

Includes clinical trials + research insights

Downloadable from dashboard

🏗 Architecture
Frontend

React.js

Tailwind CSS

Vite

Modular dashboard UI

Backend

FastAPI (Python)

Multi-Agent Architecture

Groq LLM API

MongoDB (chat + research storage)

AI Agents
Agent	Type
Clinical Trials Agent	Real-time
Literature Agent	Real-time
Web Intelligence Agent	Real-time
Patent Agent	Mock
Internal Agent	PDF Upload
Master Agent	Orchestrator
🛠 Tech Stack

Python (FastAPI), React.js, LangGraph-style Multi-Agent Architecture, Groq LLM API, MongoDB, REST APIs (ClinicalTrials.gov, PubMed), Tailwind CSS, AWS-ready Deployment.

📂 Project Structure
DrugRepurposing/
│
├── backend/
│   ├── agents/
│   ├── api/
│   ├── database/
│   ├── services/
│   ├── utils/
│   └── main.py
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── services/
│
└── README.md

⚙️ Installation & Setup
1️⃣ Clone Repository
git clone https://github.com/your-username/DrugRepurposing.git
cd DrugRepurposing

2️⃣ Backend Setup

Create virtual environment:

python -m venv .venv
.venv\Scripts\activate


Install dependencies:

pip install -r backend/requirements.txt


Create .env file inside backend/:

GROQ_API_KEY=your_groq_api_key
MONGO_URI=your_mongodb_connection_string


Run backend:

python -m uvicorn main:app --reload


Backend runs at:

http://127.0.0.1:8000

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev


Frontend runs at:

http://localhost:5173

🔐 Environment Variables

Never commit .env file.

Use .env.example:

GROQ_API_KEY=your_api_key_here
MONGO_URI=your_mongo_uri_here

🌍 Data Sources

ClinicalTrials.gov API

PubMed API

Web Intelligence (Live Search)

Mock Patent API

MongoDB Database

🧪 Example Usage

Enter molecule name (e.g., "Metformin")

Click "Run Research"

View:

Active clinical trials

Research publications

Innovation summary

Download full PDF report

Use chatbot for deeper insights

🚀 Deployment

This project is cloud-ready and can be deployed using:

AWS EC2

AWS Elastic Beanstalk

Docker (optional)

MongoDB Atlas

📈 Future Improvements

Advanced patent scraping

Role-based authentication

LLM fine-tuning for pharma domain

CI/CD pipeline

Scalable microservices architecture

👨‍💻 Author

Pranav Karthick
GitHub: https://github.com/pranav-Karthick/Drug-Repurposing
⭐ License

This project is built for educational and research demonstration purposes.