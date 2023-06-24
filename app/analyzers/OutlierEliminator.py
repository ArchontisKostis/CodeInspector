from app.models.Analysis import Analysis
from app.models.Project import Project

# This class is responsible for eliminating outliers from the analysis.
# Outliers are files that have a CC or Churn that is much higher than the average CC or Churn of the project.
# These files are outliers because they are not representative of the project as a whole.
# We will eliminate these outliers so that they do not skew the results of the analysis.
# The files that are not in the outliers will be prioritized as files in need of refactoring.
class OutlierEliminator:
    def __init__(self, analysis: Analysis):
        self.analysis = analysis
        self.project = analysis.project


    def eliminate_outliers_based_on_cc(self):
        # To eliminate outliers based on CC, we will first calculate the average CC of all files in the project.
        # Then, we will remove all files that have a smaller cc than the average CC.
        # This will leave us with only the files that have a higher CC than the average CC.

        files = self.project.files
        avg_cc = self.analysis.avg_cc

        no_outliers = []
        for file in files:
            if file.get_metric('CC') > avg_cc:
                no_outliers.append(file)

        return no_outliers

    def eliminate_outliers_based_on_cc_and_churn(self):
        # To eliminate outliers based on CC and Churn, we will first calculate the average CC and Churn of all files in the project.
        # Then, we will remove all files that have a smaller cc than the average CC and a smaller churn than the average Churn.
        # This will leave us with only the files that have a higher CC than the average CC and a higher Churn than the average Churn.

        files = self.project.files
        avg_cc = self.analysis.avg_cc
        avg_churn = self.analysis.avg_churn

        no_outliers = []
        for file in files:
            if file.get_metric('CC') < avg_cc * 3 and file.get_metric('Churn') < avg_churn * 3:
                no_outliers.append(file)

        return no_outliers
