def fetch_exim_data(molecule: str):
    # Mock data structured for frontend EximSection component
    return {
        "imports": [
            { "year": "2020", "volume": 450 },
            { "year": "2021", "volume": 480 },
            { "year": "2022", "volume": 520 },
            { "year": "2023", "volume": 600 },
            { "year": "2024", "volume": 650 }
        ],
        "exports": [
            { "year": "2020", "volume": 200 },
            { "year": "2021", "volume": 220 },
            { "year": "2022", "volume": 180 },
            { "year": "2023", "volume": 250 },
            { "year": "2024", "volume": 300 }
        ],
        "summary": [
            { "metric": "Top Exporter", "value": "India" },
            { "metric": "Top Importer", "value": "USA" },
            { "metric": "API Dependency", "value": "High" },
            { "metric": "Trade Balance", "value": "-350 MT" }
        ]
    }
