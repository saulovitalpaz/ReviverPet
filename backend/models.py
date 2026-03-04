from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text, JSON, Boolean
from sqlalchemy.orm import relationship
from .database import Base
import datetime

class Patient(Base):
    __tablename__ = "patients"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    species = Column(String)
    breed = Column(String)
    birth_date = Column(String) # Storing as String for simplicity (DD/MM/YYYY)
    sex = Column(String)
    weight = Column(Float)
    tutor_name = Column(String)
    phone = Column(String)
    allergies = Column(Text)
    conditions = Column(Text)
    vaccines = Column(Text)
    photo_path = Column(String) # Path to saved image
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    # Relationships
    consultations = relationship("Consultation", back_populates="patient", cascade="all, delete-orphan")
    fisiatria_sessions = relationship("FisiatriaSession", back_populates="patient", cascade="all, delete-orphan")
    treatments = relationship("Treatment", back_populates="patient", cascade="all, delete-orphan")
    documents = relationship("Document", back_populates="patient", cascade="all, delete-orphan")

class Consultation(Base):
    __tablename__ = "consultations"

    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("patients.id"))
    date = Column(String) # DD/MM/YYYY
    complaint = Column(Text)
    exam = Column(Text)
    diagnosis = Column(Text)
    conduct = Column(Text)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    patient = relationship("Patient", back_populates="consultations")

class FisiatriaSession(Base):
    __tablename__ = "fisiatria_sessions"

    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("patients.id"))
    date = Column(String) # DD/MM/YYYY
    pain_level = Column(Integer) # 0-5
    gait_analysis = Column(JSON) # e.g. {"claudicacao1": true, "arrasta": false}
    goniometry_data = Column(JSON) # Full object with all joints flex/ext
    notes = Column(Text)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    patient = relationship("Patient", back_populates="fisiatria_sessions")

class Treatment(Base):
    __tablename__ = "treatments"

    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("patients.id"))
    medication = Column(String)
    dosage = Column(String)
    frequency = Column(String)
    duration = Column(String)
    observations = Column(Text)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    patient = relationship("Patient", back_populates="treatments")

class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("patients.id"))
    name = Column(String)
    file_type = Column(String) # e.g. "application/pdf"
    file_path = Column(String) # Absolute or relative path to the saved file
    uploaded_at = Column(DateTime, default=datetime.datetime.utcnow)

    patient = relationship("Patient", back_populates="documents")
