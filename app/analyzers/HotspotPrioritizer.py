from app.analyzers.OutlierEliminator import OutlierEliminator
from app.models.project_file.PriorityType import PriorityType
from app.models.Project import Project
from app.models.analysis.PriorityAnalysis import PriorityAnalysis


class HotspotPriorityCalculator:
    def __init__(self, project: Project, analysis: PriorityAnalysis):
        self.all_files = project.files
        self.analysis = analysis
        self.files_to_prioritize = []

    def calculate_hotspot_priority(self):
        self.eliminate_outliers()

        for file in self.files_to_prioritize:
            cc = file.get_metric('CC')
            churn = file.get_metric('CHURN')

            priority = self.calculate_priority(cc, churn)

            file.set_priority(priority)

        self.analysis.prioritized_files = self.files_to_prioritize
        self.analysis.total_prioritized_files = len(self.files_to_prioritize)

    def calculate_priority(self, cc, churn):
        max_cc = self.analysis.max_complexity_file.get_metric('CC')
        max_churn = self.analysis.max_churn_file.get_metric('CHURN')

        # We find the middle point between the cc and the middle point between the churn
        cc_middle_point = max_cc / 2
        churn_middle_point = max_churn / 2

        # if the cc is higher that the middle point and the churn is higher than the middle point
        # the priority is high
        if cc > cc_middle_point and churn > churn_middle_point:
            return PriorityType.HIGH

        # if the cc is higher that the middle point and the churn is lower than the middle point
        # the priority is normal
        elif cc > cc_middle_point and churn < churn_middle_point:
            return PriorityType.NORMAL

        # if the cc is lower that the middle point and the churn is higher than the middle point
        # the priority is medium
        elif cc < cc_middle_point and churn > churn_middle_point:
            return PriorityType.MEDIUM

        # if the cc is lower that the middle point and the churn is lower than the middle point
        # the priority is low
        elif cc < cc_middle_point and churn < churn_middle_point:
            return PriorityType.LOW

        # Else return not set
        else:
            return PriorityType.UNKNOWN

    def eliminate_outliers(self):
        outlier_eliminator = OutlierEliminator(
            self.all_files,
            self.analysis.avg_complexity,
            self.analysis.avg_churn
        )

        self.files_to_prioritize, self.analysis.outliers = outlier_eliminator.eliminate_outliers()
        self.analysis.total_outliers = len(self.all_files) - len(self.files_to_prioritize)

        outliers_list = []
        for file in self.all_files:
            if file not in self.files_to_prioritize:
                outliers_list.append(file)

        self.analysis.outliers = outliers_list
