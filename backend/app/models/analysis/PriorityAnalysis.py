from app.models.project_file.ProjectFile import RepoFile
from app.models.analysis.Analysis import Analysis


class PriorityAnalysis(Analysis):
    prioritized_files = [RepoFile]
    outliers = [RepoFile]
    max_complexity_file: RepoFile = None
    max_churn_file: RepoFile = None
    avg_complexity: float = -1
    avg_churn: float = -1
    avg_nloc: float = -1
    total_nloc: int = 0
    total_files: int = 0
    total_prioritized_files: int = 0
    total_outliers: int = 0

    def __init__(self, repo_url: str, from_date: str, to_date: str):
        super().__init__(repo_url, from_date, to_date)

    def to_dict(self):
        return {
            'project_name': self.project_name,
            'repo_url': self.repo_url,
            'from_date': self.from_date,
            'to_date': self.to_date,
            'max_complexity_file': self.max_complexity_file,
            'max_churn_file': self.max_churn_file,
            'avg_complexity': self.avg_complexity,
            'avg_churn': self.avg_churn,
            'avg_nloc': self.avg_nloc,
            'total_nloc': self.total_nloc,
            'total_files': self.total_files,
            'total_outliers': self.total_outliers,
            'total_prioritized_files': self.total_prioritized_files,
            'prioritized_files': [file.to_dict() for file in self.prioritized_files],
            'outliers': [file.to_dict() for file in self.outliers]
        }
