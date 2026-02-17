from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from .db import Base

class Molecule(Base):
    __tablename__ = "molecules"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    therapy_area = Column(String)
    description = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

    clinical_trials = relationship("ClinicalTrial", back_populates="molecule")
    publications = relationship("Publication", back_populates="molecule")

class ClinicalTrial(Base):
    __tablename__ = "clinical_trials"

    id = Column(Integer, primary_key=True, index=True)
    molecule_id = Column(Integer, ForeignKey("molecules.id"))
    trial_id = Column(String) # NCT ID
    title = Column(String)
    phase = Column(String)
    status = Column(String)
    sponsor = Column(String)
    
    molecule = relationship("Molecule", back_populates="clinical_trials")

class Publication(Base):
    __tablename__ = "publications"

    id = Column(Integer, primary_key=True, index=True)
    molecule_id = Column(Integer, ForeignKey("molecules.id"))
    title = Column(String)
    journal = Column(String)
    year = Column(String)
    url = Column(String)
    
    molecule = relationship("Molecule", back_populates="publications")

class Report(Base):
    __tablename__ = "reports"
    
    id = Column(Integer, primary_key=True, index=True)
    molecule_id = Column(Integer, ForeignKey("molecules.id"))
    file_path = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
