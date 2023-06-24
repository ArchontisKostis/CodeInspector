from app.models.PriorityType import PriorityType


class RepoFile:
    def __init__(self, name: str):
        self.name = name
        self.metrics = {'CC': -1, 'NLOC': -1, 'CHURN': 0}
        self.priority = PriorityType.NOT_SET
        self.code = ''

    def set_metric(self, metric_key: str, metric_value: int):
        key = str.upper(metric_key)
        self.metrics[key] = metric_value

    def get_name(self):
        return self.name

    def get_metric(self, metric_key: str) -> int:
        key = str.upper(metric_key)
        return self.metrics[key]

    def get_all_metrics(self) -> dict:
        return self.metrics

    def set_priority(self, type):
        self.priority = type

    def get_priority(self) -> PriorityType:
        return self.priority

    def file_changed(self):
        self.set_metric('CHURN', self.get_metric('CHURN') + 1)

    def set_code(self, code: str):
        self.code = code

    def to_dict(self):
        return {
            'name': self.name,
            'metrics': self.metrics,
            'priority': self.priority.name,
            'code': self.code
        }