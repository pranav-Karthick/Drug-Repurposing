def fetch_iqvia_data(molecule: str):
    # Mock data structured for frontend MarketSection component
    return {
        "marketSize": "$3.2B",
        "cagr": "6.5%",
        "competitors": [
            { "name": "Pfizer", "share": 35 },
            { "name": "Novartis", "share": 25 },
            { "name": "Generic", "share": 40 }
        ],
        "trends": [
            { "year": "2020", "value": 2100 },
            { "year": "2021", "value": 2400 },
            { "year": "2022", "value": 2800 },
            { "year": "2023", "value": 3000 },
            { "year": "2024", "value": 3200 }
        ],
        "competition_level": "Moderate",
        "key_players": ["Pfizer", "Novartis"]
    }
