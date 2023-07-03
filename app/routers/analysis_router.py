import traceback

from fastapi import APIRouter, HTTPException
from pydriller import Repository

from app import logger
from app.analyzers.Analyzer import Analyser
from app.analyzers.CommitProcessor import CommitProcessor
from app import handle_exception_on_endpoint
from app.models.Project import Project
from app.models.project_commit.ProjectCommitBuilder import ProjectCommitBuilder
from app.routers import validate_repo_url, start_timer, end_timer

router = APIRouter()
filetypes = ['.java']


@router.get("/api/analysis/prioritize_hotspots")
async def perform_analysis(repo_url: str, from_date: str = None, to_date: str = None):
    start_time = start_timer()

    try:
        validate_repo_url(repo_url)

        logger.info(f"Performing analysis on {repo_url}")

        reps = Repository(repo_url, since=from_date, to=to_date)
        project = Project(repo_url)

        commit_processor = CommitProcessor(project)
        project_name = "Undefined Project Name"

        for commit in reps.traverse_commits():
            if project_name == "Undefined Project Name":
                project_name = commit.project_name

            commit_processor.process_commit(commit)

        analyzer = Analyser(project)

        analyzer.calculate_total_lines_of_code()
        analyzer.find_max_churn_file()
        analyzer.find_max_complexity_file()
        analyzer.calculate_average_metrics()
        analyzer.prioritize_hotspots()

        analysis = analyzer.get_analysis()

        analysis.project.project_name = project_name

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

        reps = Repository(repo_url, since=from_date, to=to_date)

        project_commits = []
        project_name = "Undefined Project Name"

        for commit in reps.traverse_commits():
            project_commit_builder = ProjectCommitBuilder()

            project_commit = project_commit_builder \
                .set_hash(commit.hash) \
                .set_committer(commit.committer.name) \
                .set_author(commit.author.name) \
                .set_committer_date(commit.committer_date) \
                .set_author_date(commit.author_date) \
                .set_number_of_added_lines(commit.insertions) \
                .set_number_of_deleted_lines(commit.deletions) \
                .set_number_of_files_changed(commit.files) \
                .set_author_email(commit.author.email) \
                .set_committer_email(commit.committer.email) \
                .build()

            project_commit.dmm_unit_complexity = commit.dmm_unit_complexity
            project_commit.dmm_unit_interfacing = commit.dmm_unit_interfacing
            project_commit.dmm_unit_size = commit.dmm_unit_size

            project_commit.categorize()

            project_commits.append(project_commit)

        end_timer(start_time)

        return {
            "project_name": project_name,
            "repo_url": repo_url,
            "project_commits": [project_commit.to_dict() for project_commit in project_commits],
            "total_commits": len(project_commits),
        }
    except Exception as e:
        end_timer(start_time)
        handle_exception_on_endpoint(e)
