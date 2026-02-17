from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors

def generate_pdf_report(file_path, content, data=None):
    c = canvas.Canvas(file_path, pagesize=letter)
    width, height = letter
    
    # Title
    c.setFont("Helvetica-Bold", 18)
    c.drawString(72, height - 72, "Drug Repurposing Analysis Report")
    
    y_position = height - 120
    c.setFont("Helvetica", 12)

    # General Content (Summary)
    for line in content.split('\n'):
        if y_position < 72:
            c.showPage()
            y_position = height - 72
        c.drawString(72, y_position, line.strip())
        y_position -= 14
        
    y_position -= 20

    if data:
        # Real-time Trials Listing
        real_trials = data.get("real_trials", [])
        if real_trials:
            if y_position < 150:
                c.showPage()
                y_position = height - 72
            
            c.setFont("Helvetica-Bold", 14)
            c.drawString(72, y_position, "Clinical Trials (Live Data)")
            y_position -= 20
            c.setFont("Helvetica", 10)
            
            for trial in real_trials[:10]: # Limit to 10
                text = f"- [{trial.get('phase', 'N/A')}] {trial.get('title', 'No Title')[:60]}... ({trial.get('status', 'Unknown')})"
                c.drawString(72, y_position, text)
                y_position -= 14
                if y_position < 72:
                    c.showPage()
                    y_position = height - 72
        
        y_position -= 20
        
        # Real-time Pubs Listing
        real_pubs = data.get("real_publications", [])
        if real_pubs:
            if y_position < 150:
                c.showPage()
                y_position = height - 72
            
            c.setFont("Helvetica-Bold", 14)
            c.drawString(72, y_position, "Recent Publications (Live Data)")
            y_position -= 20
            c.setFont("Helvetica", 10)
            
            for pub in real_pubs[:10]:
                text = f"- {pub.get('title', 'No Title')[:70]}... ({pub.get('year', 'N/A')})"
                c.drawString(72, y_position, text)
                y_position -= 14
                if y_position < 72:
                    c.showPage()
                    y_position = height - 72

    c.save()
