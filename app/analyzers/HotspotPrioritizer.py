from app.analyzers.OutlierEliminator import OutlierEliminator
from app.models.PriorityType import PriorityType


class HotspotPriorityCalculator:
    def __init__(self, analysis):
        self.files = []
        self.analysis = analysis
        self.outlier_eliminator = OutlierEliminator(analysis)
        self.CC_THRESHOLD = 0

    def calculate_hotspot_priority(self):
        repo_files = self.analysis.project.files

        for file in self.analysis.project.files:
            cc = file.get_metric('CC')
            churn = file.get_metric('CHURN')

            priority = self.calculate_priority(cc, churn)

            file.set_priority(priority)

    def calculate_priority(self, cc, churn):
        # We nedd to find the max CC and CHURN values
        max_cc = self.analysis.max_complexity_file.get_metric('CC')
        max_churn = self.analysis.max_churn_file.get_metric('CHURN')

        # We need to find the middle point between the cc and the middle point between the churn
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
            return PriorityType.NOT_SET


    def normalize_value(self, value, min_value, max_value):
        return (value - min_value) / (max_value - min_value)