from app.models.project_commit.CommitRating import CommitRating
from app.models.project_commit.ProjectCommit import ProjectCommit


class DmmAnalyzer:
    def __init__(self):
        # These are the thresholds for the project commit rating categories.
        # DMM Score is the sum of the 3 DMM metrics and has a value between 0.0 and 3.0.
        # In order to categorize the project commit rating based on the dmm score, we break the range into 4 categories.
        self.MIN_THRESHOLD_EXCELLENT = 0.0
        self.MAX_THRESHOLD_EXCELLENT = 0.75

        self.MIN_THRESHOLD_GOOD = 0.76
        self.MAX_THRESHOLD_GOOD = 1.50

        self.MIN_THRESHOLD_FAIR = 1.51
        self.MAX_THRESHOLD_FAIR = 2.25

        self.MIN_THRESHOLD_POOR = 2.26
        self.MAX_THRESHOLD_POOR = 3.0

    # We use the 3 DMM metrics to calculate the DMM score, which is then used to categorize the project commit.
    # The metrics are: dmm_unit_size, dmm_unit_complexity, dmm_unit_interfacing
    # Each metric has a value between 0.0 and 1.0.
    # The DMM score is the sum of the 3 metrics. Resulting in a value between 0.0 and 3.0.
    def calculate_dmm_score(self, project_commit: ProjectCommit):
        if not project_commit.dmm_metrics_exist():
            return None

        calculated_dmm_score = project_commit.dmm_unit_size + project_commit.dmm_unit_complexity + project_commit.dmm_unit_interfacing
        return calculated_dmm_score

    def find_commit_rating(self, project_commit: ProjectCommit):
        if project_commit.dmm_score is not None:
            if self.MIN_THRESHOLD_EXCELLENT <= project_commit.dmm_score <= self.MAX_THRESHOLD_EXCELLENT:
                return CommitRating.EXCELLENT

            elif self.MIN_THRESHOLD_GOOD <= project_commit.dmm_score <= self.MAX_THRESHOLD_GOOD:
                return CommitRating.GOOD

            elif self.MIN_THRESHOLD_FAIR <= project_commit.dmm_score <= self.MAX_THRESHOLD_FAIR:
                return CommitRating.FAIR

            elif self.MIN_THRESHOLD_POOR <= project_commit.dmm_score <= self.MAX_THRESHOLD_POOR:
                return CommitRating.POOR

        else:
            return CommitRating.UNKNOWN

