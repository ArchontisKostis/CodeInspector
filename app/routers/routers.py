import traceback

from fastapi import APIRouter, HTTPException
from pydriller import Repository

from app import logger
from app.analyzers.Analyzer import Analyser
from app.analyzers.CommitProcessor import CommitProcessor
from app.analyzers.HotspotPrioritizer import HotspotPriorityCalculator
from app.models.Project import Project
from app.routers import validate_repo_url

router = APIRouter()

@router.get("/analysis")
async def perform_analysis(repo_url: str, from_date: str = None, to_date: str = None):
    try:

        validate_repo_url(repo_url)

        logger.info(f"Performing analysis on {repo_url}")

        reps = Repository(repo_url, since=from_date, to=to_date)
        project = Project(repo_url)

        commit_processor = CommitProcessor(project)
        project_name = "Undefined Project Name"

        for commit in reps.traverse_commits():
            project_name = commit.project_name

            commit_processor.process_commit(commit)

        analyzer = Analyser(project)
        analyzer.find_max_complexity_file()
        analyzer.find_max_churn_file()
        analyzer.calculate_total_lines_of_code()

        analyzer.calculate_average_metrics()

        analysis = analyzer.get_analysis()
        analysis.project.project_name = project_name

        hotspot_calculator = HotspotPriorityCalculator(analysis)
        hotspot_calculator.calculate_hotspot_priority()

        return {"analysis": analysis.to_dict()}
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=400, detail=str(e))
