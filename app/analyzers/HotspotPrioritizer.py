from app.analyzers.OutlierEliminator import OutlierEliminator
from app.models.PriorityType import PriorityType


class HotspotPriorityCalculator:
    def __init__(self, analysis):
        self.files = []
        self.analysis = analysis
        self.outlier_eliminator = OutlierEliminator(analysis)
        self.CC_THRESHOLD = 10
        self.CHURN_THRESHOLD = 100
        self.CC_PRIORITY_THRESHOLD = self.CC_THRESHOLD / 2
        self.CHURN_PRIORITY_THRESHOLD = self.CHURN_THRESHOLD / 2

    def calculate_hotspot_priority(self):
        repo_files = self.analysis.project.files
        
        for file in self.analysis.project.files:
            cc = self.normalize_value(file.get_metric('CC'), 0, self.CC_THRESHOLD)
            churn = self.normalize_value(file.get_metric('CHURN'), 0, self.CHURN_THRESHOLD)
            priority = self.calculate_priority(cc, churn)
            file.set_priority(priority)
            file.set_metric('CC', cc)
            file.set_metric('CHURN', churn)

    def calculate_priority(self, cc, churn):
        if (cc >= self.CC_PRIORITY_THRESHOLD):
            if (churn >= self.CHURN_PRIORITY_THRESHOLD):
                return PriorityType.HIGH
            else:
                return PriorityType.MEDIUM

        else:
            if (churn >= self.CHURN_PRIORITY_THRESHOLD):
                return PriorityType.NORMAL
            else:
                return PriorityType.LOW

    def normalize_value(self, value, min_value, max_value):
        return (value - min_value) / (max_value - min_value)