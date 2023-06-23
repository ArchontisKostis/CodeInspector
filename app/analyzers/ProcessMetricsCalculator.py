from pydriller.metrics.process.code_churn import CodeChurn


class ProcessMetricsCalculator:
    @staticmethod
    def calculate_churn(path_to_repo, from_hash, to_hash, type) -> dict:
        churn = CodeChurn(path_to_repo=path_to_repo, from_commit=from_hash, to_commit=to_hash)

        if str.lower(type) == 'avg':
            return churn.avg()
        if str.lower(type) == 'max':
            return churn.max()
        if str.lower(type) == 'count':
            return churn.count()
