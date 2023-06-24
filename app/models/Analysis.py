from app.models import RepoFile
from app.models.Project import Project


class Analysis:
    def __init__(self, project: Project):
        self.project_name = 'Undefined Project Name'
        self.project = project
        self.max_complexity_file = None
        self.avg_nloc = -1
        self.avg_cc = -1
        self.avg_churn = -1

    def set_project_name(self, name):
        self.project_name = name

    def set_max_complexity_file(self, file: RepoFile):
        self.max_complexity_file = file

    def set_avg_nloc(self, avg_nloc):
        self.avg_nloc = avg_nloc

    def set_avg_cc(self, avg_cc):
        self.avg_cc = avg_cc

    def set_avg_churn(self, avg_churn):
        self.avg_churn = avg_churn

    def set_prioritized_files(self, prioritized_files):
        self.prioritized_files = prioritized_files

    def to_dict(self):
        return {
            'project_name': self.project_name,
            'project': self.project.to_dict(),
            'max_complexity_file': self.max_complexity_file.to_dict(),
            'avg_nloc': self.avg_nloc,
            'avg_cc': self.avg_cc,
            'avg_churn': self.avg_churn
        }