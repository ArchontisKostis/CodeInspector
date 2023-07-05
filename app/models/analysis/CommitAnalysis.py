from app.models.analysis.Analysis import Analysis
from app.models.project_commit.ProjectCommit import ProjectCommit


class CommitAnalysis(Analysis):
    def __init__(self, repo_url, from_date, to_date):
        super().__init__(repo_url, from_date, to_date)
        self.commits = []
        self.total_commits = 0

    def add_commit(self, commit: ProjectCommit):
        self.commits.append(commit)
        self.total_commits = len(self.commits)

    def to_dict(self):
        return {
            'project_name': self.project_name,
            'repo_url': self.repo_url,
            'from_date': self.from_date,
            'to_date': self.to_date,
            'commits': [commit.to_dict() for commit in self.commits],
            'total_commits': self.total_commits
        }