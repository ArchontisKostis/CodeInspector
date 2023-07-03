from app.models import RepoFile
from app.models.Project import Project


class Analysis:
    def __init__(self, project: Project):
        self.project = project
        self.max_complexity_file = None
        self.max_churn_file = None
        self.avg_nloc = -1
        self.avg_cc = -1
        self.avg_churn = -1
        self.total_nloc = 0

    def set_max_complexity_file(self, file: RepoFile):
        self.max_complexity_file = file

    def set_avg_nloc(self, avg_nloc):
        self.avg_nloc = avg_nloc

    def set_avg_cc(self, avg_cc):
        self.avg_cc = avg_cc

    def set_avg_churn(self, avg_churn):
        self.avg_churn = avg_churn

    def set_max_churn_file(self, file: RepoFile):
        self.max_churn_file = file

    def to_dict(self):
        return {
            'project': self.project.to_dict(),
            'max_complexity_file': self.max_complexity_file.to_dict(),
            'max_churn_file': self.max_churn_file.to_dict(),
            'avg_nloc': self.avg_nloc,
            'avg_cc': self.avg_cc,
            'avg_churn': self.avg_churn,
            'total_nloc': self.total_nloc,
        }