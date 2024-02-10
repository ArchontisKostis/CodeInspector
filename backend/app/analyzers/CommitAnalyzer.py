from pydriller import Repository

from app.analyzers.DmmAnalyzer import DmmAnalyzer
from app.models.analysis.CommitAnalysis import CommitAnalysis
from app.models.project_commit.ProjectCommitBuilder import ProjectCommitBuilder


class CommitAnalyzer:
    def __init__(self, repo_url: str, from_date: str = None, to_date: str = None):
        self.repo_url = repo_url
        self.from_date = from_date
        self.to_date = to_date

    def analyze_commits(self):
        reps = Repository(self.repo_url, since=self.from_date, to=self.to_date)

        commit_analysis = CommitAnalysis(self.repo_url, self.from_date, self.to_date)

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

        return commit_analysis
