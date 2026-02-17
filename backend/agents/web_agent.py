def fetch_web_intel(molecule: str):
    return {
        "guidelines": f"{molecule} mentioned in recent clinical guidelines",
        "news": [
            f"New research expands use of {molecule}",
            f"{molecule} shows promise in off-label use"
        ]
    }
