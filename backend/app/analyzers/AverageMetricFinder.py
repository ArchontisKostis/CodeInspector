from app.models.Project import Project


class AverageMetricFinder:
    def __init__(self, project: Project):
        self.project_files = project.files

    def calculate_average_metric(self, metric_name):
        total_metric = 0
        count = 0
        for file in self.project_files:
            metric_value = file.get_metric(metric_name)
            if metric_value is not None:
                total_metric += metric_value
                count += 1

        if count > 0:
            return total_metric / count
        else:
            return 0.0

    def calculate_avg_cc(self):
        return self.calculate_average_metric('CC')

    def calculate_avg_nloc(self):
        return self.calculate_average_metric('NLOC')

    def calculate_avg_churn(self):
        return self.calculate_average_metric('CHURN')
