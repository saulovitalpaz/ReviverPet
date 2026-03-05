from fastapi import FastAPI, Depends, HTTPException, UploadFile, File
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from . import models, database, schemas
from .database import engine, get_db
import os
import shutil

# Create tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="ReviverPet API", description="Sistema de Prontuário Veterinário")

# Enable CORS (useful if frontend ever detaches from backend serving)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Setup directories (Dynamic paths for portability)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOCUMENTS_BASE = os.path.join(BASE_DIR, "exames")
frontend_dir = os.path.join(BASE_DIR, "frontend")

os.makedirs(DOCUMENTS_BASE, exist_ok=True)

# Mount static files
app.mount("/static", StaticFiles(directory=frontend_dir), name="static")

@app.get("/")
def read_root():
    return FileResponse(os.path.join(frontend_dir, "index.html"))

# ... PATIENTS, CONSULTATIONS, FISIATRIA, TREATMENTS (omitted for brevity) ...


# --- PATIENTS ENDPOINTS ---

@app.get("/api/patients/", response_model=list[schemas.Patient])
def read_patients(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    patients = db.query(models.Patient).offset(skip).limit(limit).all()
    return patients

@app.get("/api/patients/{patient_id}", response_model=schemas.PatientWithDetails)
def read_patient(patient_id: int, db: Session = Depends(get_db)):
    patient = db.query(models.Patient).filter(models.Patient.id == patient_id).first()
    if patient is None:
        raise HTTPException(status_code=404, detail="Patient not found")
    return patient

@app.post("/api/patients/", response_model=schemas.Patient)
def create_patient(patient: schemas.PatientCreate, db: Session = Depends(get_db)):
    db_patient = models.Patient(**patient.dict())
    db.add(db_patient)
    db.commit()
    db.refresh(db_patient)
    return db_patient

@app.put("/api/patients/{patient_id}", response_model=schemas.Patient)
def update_patient(patient_id: int, patient_update: schemas.PatientCreate, db: Session = Depends(get_db)):
    db_patient = db.query(models.Patient).filter(models.Patient.id == patient_id).first()
    if not db_patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    
    update_data = patient_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_patient, key, value)
        
    db.commit()
    db.refresh(db_patient)
    return db_patient

@app.delete("/api/patients/{patient_id}")
def delete_patient(patient_id: int, db: Session = Depends(get_db)):
    db_patient = db.query(models.Patient).filter(models.Patient.id == patient_id).first()
    if not db_patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    db.delete(db_patient)
    db.commit()
    return {"ok": True}

# --- CONSULTATIONS ENDPOINTS ---

@app.post("/api/patients/{patient_id}/consultations/", response_model=schemas.Consultation)
def create_consultation(patient_id: int, consultation: schemas.ConsultationCreate, db: Session = Depends(get_db)):
    db_consultation = models.Consultation(**consultation.dict(), patient_id=patient_id)
    db.add(db_consultation)
    db.commit()
    db.refresh(db_consultation)
    return db_consultation

@app.delete("/api/consultations/{consultation_id}")
def delete_consultation(consultation_id: int, db: Session = Depends(get_db)):
    db_consultation = db.query(models.Consultation).filter(models.Consultation.id == consultation_id).first()
    if not db_consultation:
        raise HTTPException(status_code=404, detail="Consultation not found")
    db.delete(db_consultation)
    db.commit()
    return {"ok": True}

# --- FISIATRIA ENDPOINTS ---

@app.post("/api/patients/{patient_id}/fisiatria/", response_model=schemas.FisiatriaSession)
def create_fisiatria_session(patient_id: int, session: schemas.FisiatriaSessionCreate, db: Session = Depends(get_db)):
    db_session = models.FisiatriaSession(**session.dict(), patient_id=patient_id)
    db.add(db_session)
    db.commit()
    db.refresh(db_session)
    return db_session

@app.get("/api/patients/{patient_id}/fisiatria/", response_model=list[schemas.FisiatriaSession])
def read_fisiatria_sessions(patient_id: int, db: Session = Depends(get_db)):
    sessions = db.query(models.FisiatriaSession).filter(models.FisiatriaSession.patient_id == patient_id).all()
    return sessions

# --- TREATMENTS ENDPOINTS ---

@app.post("/api/patients/{patient_id}/treatments/", response_model=schemas.Treatment)
def create_treatment(patient_id: int, treatment: schemas.TreatmentCreate, db: Session = Depends(get_db)):
    db_treatment = models.Treatment(**treatment.dict(), patient_id=patient_id)
    db.add(db_treatment)
    db.commit()
    db.refresh(db_treatment)
    return db_treatment

@app.delete("/api/treatments/{treatment_id}")
def delete_treatment(treatment_id: int, db: Session = Depends(get_db)):
    db_treatment = db.query(models.Treatment).filter(models.Treatment.id == treatment_id).first()
    if not db_treatment:
        raise HTTPException(status_code=404, detail="Treatment not found")
    db.delete(db_treatment)
    db.commit()
    return {"ok": True}


# --- DOCUMENTS ENDPOINTS ---

@app.post("/api/patients/{patient_id}/documents/", response_model=schemas.Document)
async def upload_document(patient_id: int, file: UploadFile = File(...), db: Session = Depends(get_db)):
    # Create patient-specific folder in Windows Documents
    patient_dir = os.path.join(DOCUMENTS_BASE, str(patient_id))
    os.makedirs(patient_dir, exist_ok=True)
    
    # Save file to disk
    file_location = os.path.join(patient_dir, file.filename)
    with open(file_location, "wb+") as file_object:
        shutil.copyfileobj(file.file, file_object)
        
    # Save record in DB
    doc_data = schemas.DocumentCreate(
        name=file.filename,
        file_type=file.content_type,
        file_path=file_location # Saving absolute path to Documentos/exames/ID/file
    )
    db_doc = models.Document(**doc_data.dict(), patient_id=patient_id)
    db.add(db_doc)
    db.commit()
    db.refresh(db_doc)
    
    return db_doc

@app.get("/api/documents/{document_id}/view")
def view_document(document_id: int, db: Session = Depends(get_db)):
    db_doc = db.query(models.Document).filter(models.Document.id == document_id).first()
    if not db_doc:
        raise HTTPException(status_code=404, detail="Document not found in database")
    
    if not os.path.exists(db_doc.file_path):
        raise HTTPException(status_code=404, detail="Document file not found on disk")
        
    return FileResponse(db_doc.file_path, media_type=db_doc.file_type)

@app.delete("/api/documents/{document_id}")
def delete_document(document_id: int, db: Session = Depends(get_db)):
    db_doc = db.query(models.Document).filter(models.Document.id == document_id).first()
    if not db_doc:
        raise HTTPException(status_code=404, detail="Document not found")
    
    # Delete file from disk
    if os.path.exists(db_doc.file_path):
        os.remove(db_doc.file_path)
        
    db.delete(db_doc)
    db.commit()
    return {"ok": True}

