from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from datetime import datetime

# --- Patients ---
class PatientBase(BaseModel):
    name: str
    species: Optional[str] = None
    breed: Optional[str] = None
    birth_date: Optional[str] = None
    sex: Optional[str] = None
    weight: Optional[float] = None
    tutor_name: Optional[str] = None
    phone: Optional[str] = None
    allergies: Optional[str] = None
    conditions: Optional[str] = None
    vaccines: Optional[str] = None
    photo_path: Optional[str] = None

class PatientCreate(PatientBase):
    pass

class Patient(PatientBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True

# --- Consultations ---
class ConsultationBase(BaseModel):
    date: str
    complaint: Optional[str] = None
    exam: Optional[str] = None
    diagnosis: Optional[str] = None
    conduct: Optional[str] = None

class ConsultationCreate(ConsultationBase):
    pass

class Consultation(ConsultationBase):
    id: int
    patient_id: int
    created_at: datetime

    class Config:
        orm_mode = True

# --- Fisiatria Sessions ---
class FisiatriaSessionBase(BaseModel):
    date: str
    pain_level: Optional[int] = None
    gait_analysis: Optional[Dict[str, Any]] = None
    goniometry_data: Optional[Dict[str, Any]] = None
    notes: Optional[str] = None

class FisiatriaSessionCreate(FisiatriaSessionBase):
    pass

class FisiatriaSession(FisiatriaSessionBase):
    id: int
    patient_id: int
    created_at: datetime

    class Config:
        orm_mode = True

# --- Treatments ---
class TreatmentBase(BaseModel):
    medication: str
    dosage: Optional[str] = None
    frequency: Optional[str] = None
    duration: Optional[str] = None
    observations: Optional[str] = None

class TreatmentCreate(TreatmentBase):
    pass

class Treatment(TreatmentBase):
    id: int
    patient_id: int
    created_at: datetime

    class Config:
        orm_mode = True

# --- Documents ---
class DocumentBase(BaseModel):
    name: str
    file_type: str
    file_path: str

class DocumentCreate(DocumentBase):
    pass

class Document(DocumentBase):
    id: int
    patient_id: int
    uploaded_at: datetime

    class Config:
        orm_mode = True

# --- Aggregated Patient Model ---
class PatientWithDetails(Patient):
    consultations: List[Consultation] = []
    fisiatria_sessions: List[FisiatriaSession] = []
    treatments: List[Treatment] = []
    documents: List[Document] = []
