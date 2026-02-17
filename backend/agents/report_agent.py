from utils.pdf_generator import generate_pdf_report # Assuming this utility exists, or we use simpler logic
import os
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas

def generate_report(data):
    os.makedirs("reports", exist_ok=True)
    pdf_path = f"reports/Drug_Repurposing_Report_{data['molecule']}.pdf"
    
    c = canvas.Canvas(pdf_path, pagesize=letter)
    width, height = letter
    y = height - 50
    
    c.setFont("Helvetica-Bold", 16)
    c.drawString(50, y, f"Drug Repurposing Report: {data['molecule']}")
    y -= 40
    
    c.setFont("Helvetica", 12)
    
    # Clinical Trials
    c.drawString(50, y, f"Clinical Trials: {len(data['clinical_trials']['trials'])} found")
    y -= 20
    
    # Web Intel
    c.drawString(50, y, "Web Intelligence:")
    y -= 15
    if data['web_intelligence']:
        guidelines = data['web_intelligence'].get('guidelines', '')
        c.drawString(70, y, f"- Guidelines: {guidelines}")
        y -= 15
        for news in data['web_intelligence'].get('news', []):
            c.drawString(70, y, f"- News: {news}")
            y -= 15
    
    y -= 20
    # Literature
    c.drawString(50, y, "Literature:")
    y -= 15
    if data['literature']:
        for pub in data['literature'].get('publications', [])[:5]: # Limit to 5
            c.drawString(70, y, f"- {pub[:80]}...") # Truncate
            y -= 15

    y -= 20
    # Market Insights (IQVIA)
    c.drawString(50, y, "Market Insights (IQVIA):")
    y -= 15
    if data.get('marketInsights'):
        mi = data['marketInsights']
        c.drawString(70, y, f"Market Size: {mi.get('marketSize')} | CAGR: {mi.get('cagr')}")
        y -= 15
        c.drawString(70, y, f"Competition: {mi.get('competition_level')}")
        y -= 15

    y -= 20
    # EXIM Trends
    c.drawString(50, y, "EXIM Trends:")
    y -= 15
    if data.get('eximData'):
        ex = data['eximData']
        # Print summary metrics
        summary_txt = " | ".join([f"{s['metric']}: {s['value']}" for s in ex.get('summary', [])[:2]])
        c.drawString(70, y, summary_txt)
        y -= 15

    y -= 20
    # Patents
    c.drawString(50, y, "Patent Overview:")
    y -= 15
    if data['patents']:
        c.drawString(70, y, f"Expiry: {data['patents'].get('primary_patent_expiry')}")
        y -= 15
        c.drawString(70, y, f"Remarks: {data['patents'].get('remarks')}")
        y -= 15

    y -= 20
    # Internal
    if data.get('internal_insights'):
        c.drawString(50, y, "Internal Insights:")
        y -= 15
        c.drawString(70, y, f"{data['internal_insights'].get('summary')}")
    
    c.save()
    return pdf_path
