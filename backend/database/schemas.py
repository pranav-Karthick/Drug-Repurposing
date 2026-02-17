from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class ClinicalTrialBase(BaseModel):
    trial_id: Optional[str] = None
    title: str
    phase: Optional[str] = None
    status: Optional[str] = None
    sponsor: Optional[str] = None

class ClinicalTrialCreate(ClinicalTrialBase):
    pass

class ClinicalTrial(ClinicalTrialBase):
    id: int
    molecule_id: int
    
    class Config:
        from_attributes = True

class PublicationBase(BaseModel):
    title: str
    journal: Optional[str] = None
    year: Optional[str] = None
    url: Optional[str] = None

class PublicationCreate(PublicationBase):
    pass

class Publication(PublicationBase):
    id: int
    molecule_id: int
    
    class Config:
        from_attributes = True

class MoleculeBase(BaseModel):
    name: str
    therapy_area: str
    description: Optional[str] = None

class MoleculeCreate(MoleculeBase):
    pass

class Molecule(MoleculeBase):
    id: int
    created_at: datetime
    clinical_trials: List[ClinicalTrial] = []
    publications: List[Publication] = []
    
    class Config:
        from_attributes = True
