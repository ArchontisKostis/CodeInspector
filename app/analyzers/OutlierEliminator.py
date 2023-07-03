from app.models.Analysis import Analysis


# This class is responsible for eliminating outliers from the analysis.
# Inliers are files that have a CC or Churn that is higher than the average CC or Churn of the project.
# We will eliminate the outliers so that they do not skew the results of the analysis.
class OutlierEliminator:
    def __init__(self, items_list: list, avg_cc: float, avg_churn: float):
        self.items_list = items_list
        self.avg_cc = avg_cc
        self.avg_churn = avg_churn

    def eliminate_outliers(self):
        # To eliminate outliers based on CC and Churn, we will first calculate the average CC and Churn of all files in the project.
        # Then we will add all files that have a CC or Churn higher than 3 times the average CC or Churn to a list.

        no_outliers = []
        for file in self.items_list:
            if file.get_metric('CC') > self.avg_cc or file.get_metric('Churn') > self.avg_churn:
                no_outliers.append(file)

        return no_outliers
