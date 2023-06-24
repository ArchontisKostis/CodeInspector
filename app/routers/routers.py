from fastapi import APIRouter, HTTPException
from pydriller import Repository

from app import logger
from app.analyzers.Analyzer import Analyser
from app.analyzers.HotspotPrioritizer import HotspotPriorityCalculator
from app.analyzers.OutlierEliminator import OutlierEliminator
from app.models.Project import Project
from app.models.RepoFile import RepoFile
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

        logger.info(f"Performing analysis on {repo_url}")

        reps = Repository(repo_url, only_modifications_with_file_types=filetypes)
        project = Project(repo_url)

        project_name = "Undefined Project Name"

        # We traverse all commits in the repository and for each commit we traverse all modified files.
        # We add only files with the specified filetypes to the project.
        # For each file we add the complexity and nloc metrics.
        # Finally, we create an Analysis object and return it as a JSON.
        for commit in reps.traverse_commits():
            for modified_file in commit.modified_files:
                # Add only files with the specified filetypes

                if project_name == "Undefined Project Name":
                    project_name = commit.project_name

                if modified_file.filename[-5:] in filetypes:
                    file_to_add = RepoFile(modified_file.filename)
                    file_to_add.set_metric('CC', modified_file.complexity)
                    file_to_add.set_metric('NLOC', modified_file.nloc)
                    file_to_add.set_code(modified_file.source_code)

                    project.add_file(file_to_add)

        analyzer = Analyser(project)
        analyzer.find_max_complexity_file()
        analyzer.calculate_average_metrics()

        analysis = analyzer.get_analysis()

        hotspot_calculator = HotspotPriorityCalculator(analysis)
        hotspot_calculator.calculate_hotspot_priority()


        return {"analysis": analysis.to_dict()}
    except Exception as e:
        print(e.__class__.__name__)
        raise HTTPException(status_code=400, detail=str(e))
