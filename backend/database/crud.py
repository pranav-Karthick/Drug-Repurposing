from database.mongo import mongo_manager
import datetime

async def save_molecule(doc: dict):
    if mongo_manager.db is None:
        return None
    doc["created_at"] = datetime.datetime.utcnow()
    result = await mongo_manager.db.molecules.insert_one(doc)
    return str(result.inserted_id)

async def get_molecule_by_name(name: str):
    if mongo_manager.db is None:
        return None
    return await mongo_manager.db.molecules.find_one({"name": {"$regex": f"^{name}$", "$options": "i"}})

async def save_clinical_trials(trials: list):
    if mongo_manager.db is not None and trials:
        await mongo_manager.db.clinical_trials.insert_many(trials)

async def get_trials_for_molecule(molecule: str):
    if mongo_manager.db is None:
        return []
    cursor = mongo_manager.db.clinical_trials.find({"molecule": molecule})
    return await cursor.to_list(100)
