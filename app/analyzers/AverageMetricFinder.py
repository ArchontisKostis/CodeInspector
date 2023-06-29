from app.models.Project import Project


class AverageMetricFinder:
    def __init__(self, project: Project):
        self.project_files = project.get_files()

    def calculate_avg_cc(self):
        total_cc = 0
        for file in self.project_files:
            total_cc = total_cc + file.get_metric('CC')
        return total_cc / len(self.project_files)

    def calculate_avg_nloc(self):
        total_nloc = 0
        for file in self.project_files:
            total_nloc = total_nloc + file.get_metric('NLOC')
        return total_nloc / len(self.project_files)

    def calculate_avg_churn(self):
        total_churn = 0
        for file in self.project_files:
            total_churn = total_churn + file.get_metric('CHURN')
        return total_churn / len(self.project_files)
