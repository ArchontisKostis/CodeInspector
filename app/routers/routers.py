from fastapi import APIRouter, Request, HTTPException
from pydriller import Repository
from app.analyzers.ProjectAnalyzer import ProjectAnalyzer
from app.models.Project import Project
from app.utils import is_github_url

router = APIRouter()
filetypes = ['.java']


@router.get("/analysis")
async def perform_analysis(repo_url: str, from_date: str = None, to_date: str = None):
    try:

        if repo_url is None:
            raise HTTPException(status_code=400, detail="Repo URL is required")

        if not is_github_url(repo_url):
            raise HTTPException(status_code=400, detail="Repo URL is invalid")

        repo = Repository(repo_url)
        print("Created repo")

        project_to_analyze = Project(repo)
        print("Created project")

        project_analyzer = ProjectAnalyzer(project_to_analyze, repo_url)
        print("Created analyzer")

        project_analyzer.initiate_analysis()
        print("Initiated analysis")

        project_analyzer.find_project_modified_files()
        print("Found modified files")

        # project_analyzer.calculate_churn()
        # print("Calculated churn")
        #
        # project_analyzer.prioritize_hotspots()
        # print("Prioritized hotspots")

        results = project_analyzer.get_analysis()
        print("Got analysis")

        return {"results": results.to_dict(), "repo_url": repo_url}
    except Exception as e:
        print(e.__class__.__name__)
        raise HTTPException(status_code=400, detail=str(e))