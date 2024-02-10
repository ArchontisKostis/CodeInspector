from pydriller import Repository

from pydriller import Repository

from app.analyzers.Analyzer import Analyser
from app.analyzers.CommitAnalyzer import CommitAnalyzer
from app.analyzers.CommitProcessor import CommitProcessor
from app.db.entities.ProjectTable import ProjectTable
from app.exceptions.NoCommitsException import NoCommitsException
from app.models.Project import Project
from app.services import validate_date
from app.services.DatabaseService import DatabaseService


class AnalysisService:
    def __init__(self, session):
        self.filetypes = ['.java']
        self.session = session

        self.db_service = DatabaseService(session)

    def analyze_hotspots(self, repo_url: str, from_date: str, to_date: str):
        from_date, to_date = validate_date(from_date, to_date)

        reps = Repository(repo_url, since=from_date, to=to_date)
        project = Project(repo_url)

        commit_processor = CommitProcessor(project)
        project_has_commits = False

        for commit in reps.traverse_commits():
            project_has_commits = True
            commit_processor.process_commit(commit)

        if not project_has_commits:
            raise NoCommitsException("No commits found in the specified date range. Try using a different date range.")

        analyzer = Analyser(project, repo_url, from_date, to_date)

        analyzer.calculate_total_lines_of_code()
        analyzer.find_max_churn_file()
        analyzer.find_max_complexity_file()
        analyzer.calculate_average_metrics()
        analyzer.prioritize_hotspots()

        # Now save everything to the database
        # Check if the project already exists (by checking the repository url)
        db_project = self.session.query(ProjectTable).filter(
            ProjectTable.repository_url == repo_url
        ).first()

        if db_project is None:
            self.db_service.save_project(project)

        self.db_service.save_hotspot_analysis(analyzer, db_project, from_date, to_date, project.files)

        return analyzer.project_analysis

    def analyze_commits(self, repo_url: str, from_date: str, to_date: str):
        from_date, to_date = validate_date(from_date, to_date)

        # Analyze the commits
        commit_analyzer = CommitAnalyzer(repo_url, from_date, to_date)
        commit_analysis = commit_analyzer.analyze_commits()

        # Now save everything to the database
        project = Project(repo_url)
        project.project_name = commit_analysis.project_name;

        db_project = self.db_service.save_project(project)

        self.db_service.save_commit_analysis(db_project, from_date, to_date, commit_analysis)

        return commit_analysis

    def get_commit_analysis_by_project_url(self, project_url: str):
        return self.db_service.get_commit_analysis_by_project_url(project_url)

    def get_hotspot_analysis_by_project_url(self, project_url: str):
        return self.db_service.get_hotspot_analysis_by_project_url(project_url)
