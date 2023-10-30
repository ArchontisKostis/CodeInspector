from fastapi import APIRouter
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app import logger
from app.db import DB_URL
from app.db.entities import Base, CommitAnalysisTable, ProjectTable, ProjectCommitTable, ProjectFileTable, FileMetricsTable
from app.routers import validate_repo_url, start_timer, end_timer, \
    handle_exception_on_endpoint
from app.services.AnalysisService import AnalysisService

router = APIRouter()

db_engine = create_engine(DB_URL, echo=True)
Session = sessionmaker(bind=db_engine)
db_connection = db_engine.connect()
session = Session()

Base.metadata.create_all(db_engine)

analysis_service = AnalysisService(session)

@router.get("/api/analysis/prioritize_hotspots")
async def prioritize_hotspots(repo_url: str, from_date: str = None, to_date: str = None):
    start_time = start_timer()

    try:
        validate_repo_url(repo_url)
        logger.info(f"Performing analysis on {repo_url}")

        analysis = analysis_service.analyze_hotspots(repo_url, from_date, to_date)

        end_timer(start_time)

        return {"analysis": analysis.to_dict()}
    except Exception as e:
        end_timer(start_time)
        handle_exception_on_endpoint(e)


@router.get("/api/analysis/commits")
def analyze_commits(repo_url: str, from_date: str = None, to_date: str = None):
    start_time = start_timer()

    try:
        validate_repo_url(repo_url)

        logger.info(f"Performing analysis on {repo_url}")
        commit_analysis = analysis_service.analyze_commits(repo_url, from_date, to_date)

        end_timer(start_time)

        return {
            "commit_analysis": commit_analysis.to_dict()
        }
    except Exception as e:
        end_timer(start_time)
        handle_exception_on_endpoint(e)


# Get commit analysis by project id
@router.get("/api/analysis/commits/{project_id}")
def get_commit_analysis_by_project_id(project_id: int):
    start_time = start_timer()

    try:
        logger.info(f"Getting commit analysis for project id {project_id}")
        commit_analysis = analysis_service.get_commit_analysis_by_project_id(project_id)

        end_timer(start_time)

        return {
            "commit_analysis": commit_analysis.to_dict()
        }
    except Exception as e:
        end_timer(start_time)
        handle_exception_on_endpoint(e)

# Get hotspots analysis by project id
@router.get("/api/analysis/prioritize_hotspots/{project_id}")
def get_hotspots_analysis_by_project_id(project_id: int):
    start_time = start_timer()

    try:
        logger.info(f"Getting hotspots analysis for project id {project_id}")
        hotspots_analysis = analysis_service.get_hotspot_analysis_by_project_id(project_id)

        end_timer(start_time)

        return {
            "hotspots_analysis": hotspots_analysis.to_dict()
        }
    except Exception as e:
        end_timer(start_time)
        handle_exception_on_endpoint(e)