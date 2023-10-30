from datetime import datetime

from pydriller import Repository
from sqlalchemy.orm import Session

from app.analyzers.Analyzer import Analyser
from app.analyzers.CommitProcessor import CommitProcessor
from app.analyzers.DmmAnalyzer import DmmAnalyzer
from app.db.entities.CommitAnalysisTable import CommitAnalysisTable
from app.db.entities.ProjectCommitTable import ProjectCommitTable
from app.db.entities.ProjectTable import ProjectTable
from app.models.Project import Project
from app.models.analysis.CommitAnalysis import CommitAnalysis
from app.models.project_commit.ProjectCommitBuilder import ProjectCommitBuilder
from app.services import calculate_past_year_date_range, try_to_parse_date, validate_date

from app.exceptions.NoCommitsException import NoCommitsException


class AnalysisService:
    def __init__(self, session):
        self.filetypes = ['.java']
        self.session = session

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

        return analyzer.project_analysis

    def analyze_commits(self, repo_url: str, from_date: str, to_date: str):
        from_date, to_date = validate_date(from_date, to_date)

        reps = Repository(repo_url, since=from_date, to=to_date)

        commit_analysis = CommitAnalysis(repo_url, from_date, to_date)

        for commit in reps.traverse_commits():
            if commit_analysis.project_name == "Undefined Project Name":
                commit_analysis.project_name = commit.project_name

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
                .set_dmm_unit_interfacing(commit.dmm_unit_interfacing) \
                .set_dmm_unit_complexity(commit.dmm_unit_complexity) \
                .set_dmm_unit_size(commit.dmm_unit_size) \
                .build()

            dmm_analyzer = DmmAnalyzer()
            project_commit.dmm_score = dmm_analyzer.calculate_dmm_score(project_commit)
            project_commit.change_category = dmm_analyzer.find_commit_rating(project_commit)

            commit_analysis.add_commit(project_commit)

        # Now save everything to the database
        db_project = ProjectTable()
        db_project.project_name = commit_analysis.project_name
        db_project.repository_url = repo_url

        self.session.add(db_project)
        self.session.commit()
        self.session.refresh(db_project)

        db_analysis = CommitAnalysisTable()
        db_analysis.project_id = db_project.id
        db_analysis.from_date = from_date
        db_analysis.to_date = to_date
        db_analysis.total_commits = len(commit_analysis.commits)

        self.session.add(db_analysis)
        self.session.commit()
        self.session.refresh(db_analysis)

        for commit in commit_analysis.commits:
            db_commit = ProjectCommitTable()
            db_commit.analysis_id = db_analysis.id
            db_commit.hash = commit.hash
            db_commit.committer = commit.committer
            db_commit.author = commit.author
            db_commit.committer_date = commit.committer_date
            db_commit.author_date = commit.author_date
            db_commit.number_of_added_lines = commit.number_of_added_lines
            db_commit.number_of_deleted_lines = commit.number_of_deleted_lines
            db_commit.number_of_files_changed = commit.number_of_files_changed
            db_commit.author_email = commit.author_email
            db_commit.committer_email = commit.committer_email
            db_commit.dmm_unit_interfacing = commit.dmm_unit_interfacing
            db_commit.dmm_unit_complexity = commit.dmm_unit_complexity
            db_commit.dmm_unit_size = commit.dmm_unit_size
            db_commit.dmm_score = commit.dmm_score
            db_commit.change_category = str(commit.change_category)

            self.session.add(db_commit)
            self.session.commit()
            self.session.refresh(db_commit)


        return commit_analysis
