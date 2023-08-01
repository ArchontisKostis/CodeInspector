from app.analyzers.AverageMetricFinder import AverageMetricFinder
from app.analyzers.HotspotPrioritizer import HotspotPriorityCalculator
from app.models.Project import Project
from app.models.analysis.PriorityAnalysis import PriorityAnalysis


class Analyser:
    project: Project

    project_analysis: PriorityAnalysis
    average_metric_finder: AverageMetricFinder
    hotspot_priority_calculator: HotspotPriorityCalculator

    def __init__(self, project: Project, repo_url: str, from_date: str, to_date: str):
        self.project = project
        self.project_analysis = PriorityAnalysis(repo_url, from_date, to_date)
        self.project_analysis.project_name = project.project_name

        self.project_analysis.total_files = len(self.project.files)

    def find_max_metric_file(self, metric_key: str):
        max_metric_file = None

        for file in self.project.files:
            if max_metric_file is None:
                max_metric_file = file

            print(max_metric_file.to_dict())

            if file.get_metric(metric_key) is not None and max_metric_file.get_metric(metric_key) is not None:
                if file.get_metric(metric_key) > max_metric_file.get_metric(metric_key):
                    max_metric_file = file

        return max_metric_file

    def find_max_complexity_file(self):
        self.project_analysis.max_complexity_file = self.find_max_metric_file('cc')

    def find_max_churn_file(self):
        self.project_analysis.max_churn_file = self.find_max_metric_file('churn')

    def calculate_average_metrics(self):
        self.average_metric_finder = AverageMetricFinder(self.project)

        self.project_analysis.avg_complexity = self.average_metric_finder.calculate_avg_cc()
        self.project_analysis.avg_nloc = self.average_metric_finder.calculate_avg_nloc()
        self.project_analysis.avg_churn = self.average_metric_finder.calculate_avg_churn()

    def calculate_total_lines_of_code(self):
        total_loc = 0

        for file in self.project.files:
            if file.get_metric('NLOC') is not None:
                total_loc += file.get_metric('NLOC')

        self.project_analysis.total_nloc = total_loc

    def prioritize_hotspots(self):
        self.hotspot_priority_calculator = HotspotPriorityCalculator(self.project, self.project_analysis)
        self.hotspot_priority_calculator.calculate_hotspot_priority()
