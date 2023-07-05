from fastapi import APIRouter

from app import logger
from app.routers import validate_repo_url, start_timer, end_timer, \
    handle_exception_on_endpoint
from app.services.AnalysisService import AnalysisService

router = APIRouter()
filetypes = ['.java']

analysis_service = AnalysisService()

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
