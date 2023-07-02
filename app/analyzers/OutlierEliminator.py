from app.models.Analysis import Analysis


# This class is responsible for eliminating outliers from the analysis.
# Inliers are files that have a CC or Churn that is higher than the average CC or Churn of the project.
# We will eliminate the outliers so that they do not skew the results of the analysis.
class OutlierEliminator:
    def __init__(self, analysis: Analysis):
        self.analysis = analysis
        self.project = analysis.project

    def eliminate_outliers_based_on_cc_and_churn(self):
        # To eliminate outliers based on CC and Churn, we will first calculate the average CC and Churn of all files in the project.
        # Then we will add all files that have a CC or Churn higher than 3 times the average CC or Churn to a list.

        files = self.project.files
        avg_cc = self.analysis.avg_cc
        avg_churn = self.analysis.avg_churn

        no_outliers = []
        for file in files:
            if file.get_metric('CC') > avg_cc and file.get_metric('Churn') > avg_churn:
                no_outliers.append(file)

        return no_outliers
