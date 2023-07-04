# This class is responsible for eliminating outliers from the analysis.
# Outliers are files that have a CC or Churn that is lower than the average CC or Churn of the project.
# This class is used by the HotspotPriorityCalculator class.
class OutlierEliminator:
    def __init__(self, items_list: list, avg_cc: float, avg_churn: float):
        self.items_list = items_list
        self.avg_cc = avg_cc
        self.avg_churn = avg_churn

    def eliminate_outliers(self):
        no_outliers = []
        for file in self.items_list:
            if file.get_metric('CC') is not None and file.get_metric('Churn') is not None:
                if file.get_metric('CC') > self.avg_cc or file.get_metric('Churn') > self.avg_churn:
                    no_outliers.append(file)

        return no_outliers
