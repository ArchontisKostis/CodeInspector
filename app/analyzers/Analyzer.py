from app.analyzers.AverageMetricFinder import AverageMetricFinder
from app.models.Analysis import Analysis
from app.models.Project import Project


class Analyser:
    def __init__(self, project: Project):
        self.project = project
        self.analysis = Analysis(self.project)
        self.average_metric_finder = None

    def find_max_complexity_file(self):
        max_complexity = 0
        max_complexity_file = None
        for file in self.project.files:
            if file.get_metric('CC') > max_complexity:
                max_complexity = file.get_metric('CC')
                max_complexity_file = file

        self.analysis.set_max_complexity_file(max_complexity_file)

    def calculate_average_metrics(self):
        self.average_metric_finder = AverageMetricFinder(self.project)

        avg_cc = self.average_metric_finder.calculate_avg_cc()
        avg_nloc = self.average_metric_finder.calculate_avg_nloc()
        avg_churn = self.average_metric_finder.calculate_avg_churn()

        self.analysis.set_avg_cc(avg_cc)
        self.analysis.set_avg_nloc(avg_nloc)
        self.analysis.set_avg_churn(avg_churn)


    def get_analysis(self):
        return self.analysis
