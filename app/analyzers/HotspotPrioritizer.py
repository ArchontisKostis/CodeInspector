from app.exceptions import NoCommitsException


class HotspotPrioritizer:
    def __init__(self, files):
        self.files_list = files
        self.max_metrics = {'CC': -1, 'CHURN': -1}

    def find_max_metric(self, metric: str):
        try:
            max_metric = self.files_list[0].get_metric(metric)
            for file in self.files_list:
                curr_metric = file.get_metric(metric)
                if curr_metric > max_metric:
                    max_metric = curr_metric

            key = str.upper(metric)
            self.max_metrics.update({key: max_metric})
        except IndexError:
            raise NoCommitsException

    def find_hotspot_priority(self, file_cc, file_churn):
        max_churn = self.max_metrics.get('CHURN')
        max_complexity = self.max_metrics.get('CC')
        threshold_churn = max_churn / 2
        threshold_cc = max_complexity / 2

        if file_cc <= threshold_cc:
            if file_churn <= threshold_churn:
                return 'LOW'
            if file_churn >= threshold_churn:
                return 'NORMAL'
        if file_cc >= threshold_cc:
            if file_churn <= threshold_churn:
                return 'MEDIUM'
            if file_churn >= threshold_churn:
                return 'HIGH'
        else:
            return 'NOT SET'

    def prioritize_hotspots(self):
        self.find_max_metric('CC')
        self.find_max_metric('CHURN')
        for file in self.files_list:
            file_cc = file.get_metric('CC')
            file_churn = file.get_metric('CHURN')
            priority = self.find_hotspot_priority(file_cc, file_churn)
            file.set_priority(priority)
