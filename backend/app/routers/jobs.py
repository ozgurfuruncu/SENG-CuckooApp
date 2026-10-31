from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from ..db import get_db
from ..enums import Category, JobStatus, Role
from ..models import Job, User
from ..schemas import JobCreate, JobOut
from ..security import get_current_user

router = APIRouter(prefix="/jobs", tags=["jobs"])


@router.post("", response_model=JobOut, status_code=status.HTTP_201_CREATED)
def create_job(
    body: JobCreate,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    if user.role != Role.EMPLOYER:
        raise HTTPException(status.HTTP_403_FORBIDDEN, "Sadece işverenler ilan açabilir")
    job = Job(**body.model_dump(), employer_id=user.id, status=JobStatus.OPEN)
    db.add(job)
    db.commit()
    return job


@router.get("", response_model=list[JobOut])
def list_jobs(
    city: str | None = None,
    category: Category | None = None,
    status_: JobStatus | None = Query(default=None, alias="status"),
    limit: int = Query(default=20, ge=1, le=100),
    offset: int = Query(default=0, ge=0),
    db: Session = Depends(get_db),
):
    query = select(Job).order_by(Job.created_at.desc()).limit(limit).offset(offset)
    if city:
        query = query.where(Job.city.ilike(city))
    if category:
        query = query.where(Job.category == category)
    query = query.where(Job.status == (status_ or JobStatus.OPEN))
    return db.scalars(query).all()


@router.get("/{job_id}", response_model=JobOut)
def get_job(job_id: int, db: Session = Depends(get_db)):
    job = db.get(Job, job_id)
    if job is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "İlan bulunamadı")
    return job
