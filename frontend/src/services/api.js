const PROXY_URL = "http://127.0.0.1:8000/api";

export async function fetchTrials(molecule) {
    // Now triggering full research instead of just trials
    // Using POST to match main.py signature or GET if converted.
    // main.py has @app.post("/api/run-research") necessitating FormData
    // But wait, the user's snippet in prompt STEP 4 used @app.get("/api/run-research/{molecule}")
    // MY implementation in main.py step 5 used @app.post("/api/run-research") to support file upload.
    // To keep Home.jsx simple (just molecule name), I will use FormData.

    const formData = new FormData();
    formData.append("moleculeName", molecule);
    // therapyArea is optional in my code implementation, but let's add default if needed or just leave empty
    formData.append("therapyArea", "General");

    const response = await fetch(`${PROXY_URL}/run-research`, {
        method: "POST",
        body: formData
    });

    if (!response.ok) {
        throw new Error("Failed to fetch research data");
    }

    return response.json();
}

export async function downloadReport(molecule) {
    window.open(`${PROXY_URL}/download-report/${molecule}`, '_blank');
}
