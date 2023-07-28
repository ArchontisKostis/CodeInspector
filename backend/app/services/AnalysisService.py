from datetime import datetime

from pydriller import Repository

from app.analyzers.Analyzer import Analyser
from app.analyzers.CommitProcessor import CommitProcessor
from app.models.Project import Project
from app.models.analysis.CommitAnalysis import CommitAnalysis
from app.models.project_commit.ProjectCommitBuilder import ProjectCommitBuilder
from app.services import calculate_past_year_date_range, try_to_parse_date

from app.exceptions.NoCommitsException import NoCommitsException


class AnalysisService:
    def __init__(self):
        self.filetypes = ['.java']


    def analyze_hotspots(self, repo_url: str, from_date: str, to_date: str):
        from_date, to_date = self.validate_date(from_date, to_date)

        reps = Repository(repo_url, since=from_date, to=to_date, only_modifications_with_file_types=self.filetypes)
        project = Project(repo_url)

        commit_processor = CommitProcessor(project)
        project_name = "Undefined Project Name"
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
        from_date, to_date = self.validate_date(from_date, to_date)

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

            project_commit.categorize()

            commit_analysis.add_commit(project_commit)

        return commit_analysis

    def validate_date(self, from_date: str, to_date: str):
        # If from_date or to_date is None, calculate past year date range
        if from_date is None or to_date is None:
            from_date, to_date = calculate_past_year_date_range(from_date, to_date)
        else:
            from_date = try_to_parse_date(from_date)
            to_date = try_to_parse_date(to_date)

        return from_date, to_date


