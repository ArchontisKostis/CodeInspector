# This class is responsible for finding hotspot files in the codebase.
# We consider as Hotspots the files that have a CC or Churn that is higher than the average CC or Churn of the project.
# This class is used by the HotspotPriorityCalculator class to calculate the priority only for the hotspot files.
class HotspotFinder:
    def __init__(self, files: list, avg_cc: float, avg_churn: float):
        self.project_files = files
        self.avg_cc = avg_cc
        self.avg_churn = avg_churn

    def eliminate_outliers(self):
        hotspot_files = []
        not_hotspot_files = []

        for file in self.project_files:
            if file.get_metric('CC') is not None and file.get_metric('CHURN') is not None:
                if file.get_metric('CC') > self.avg_cc or file.get_metric('CHURN') > self.avg_churn:
                    hotspot_files.append(file)
                else:
                    not_hotspot_files.append(file)

        return hotspot_files, not_hotspot_files
