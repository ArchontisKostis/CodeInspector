from app.analyzers.AverageMetricFinder import AverageMetricFinder
from app.analyzers.HotspotPrioritizer import HotspotPriorityCalculator
from app.models.Analysis import Analysis
from app.models.Project import Project


class Analyser:
    def __init__(self, project: Project):
        self.project = project
        self.analysis = Analysis(self.project)
        self.average_metric_finder = None
        self.hotspot_prioritizer = None


    def find_max_metric_file(self, metric_key: str):
        max_metric_file = None

        for file in self.project.files:
            if max_metric_file is None:
                max_metric_file = file
            elif file.get_metric(metric_key) > max_metric_file.get_metric(metric_key):
                max_metric_file = file

        return max_metric_file

    def find_max_complexity_file(self):
        max_complexity_file = self.find_max_metric_file('cc')

        self.analysis.set_max_complexity_file(max_complexity_file)

    def find_max_churn_file(self):
        max_churn_file = self.find_max_metric_file('churn')

        self.analysis.set_max_churn_file(max_churn_file)

    def calculate_average_metrics(self):
        self.average_metric_finder = AverageMetricFinder(self.project)

        avg_cc = self.average_metric_finder.calculate_avg_cc()
        avg_nloc = self.average_metric_finder.calculate_avg_nloc()
        avg_churn = self.average_metric_finder.calculate_avg_churn()

        self.analysis.set_avg_cc(avg_cc)
        self.analysis.set_avg_nloc(avg_nloc)
        self.analysis.set_avg_churn(avg_churn)

    def calculate_total_lines_of_code(self):
        total_loc = 0

        for file in self.project.files:
            total_loc += file.get_metric('NLOC')

        self.analysis.total_nloc = total_loc

    def prioritize_hotspots(self):
        self.hotspot_prioritizer = HotspotPriorityCalculator(self.analysis)
        self.hotspot_prioritizer.calculate_hotspot_priority()


    def get_analysis(self):
        return self.analysis
