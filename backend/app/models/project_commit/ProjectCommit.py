from app.models.project_commit import MIN_THRESHOLD_EXCELLENT, MIN_THRESHOLD_GOOD, MIN_THRESHOLD_FAIR, \
    MIN_THRESHOLD_POOR, MAX_THRESHOLD_GOOD, MAX_THRESHOLD_POOR, MAX_THRESHOLD_FAIR, MAX_THRESHOLD_EXCELLENT
from app.models.project_commit.CommitRating import CommitRating


class ProjectCommit:
    def __init__(self):
        self.hash = None
        self.author = None
        self.committer = None
        self.author_date = None
        self.author_email = None
        self.committer_email = None
        self.committer_date = None
        self.number_of_deleted_lines = None
        self.number_of_added_lines = None
        self.number_of_files_changed = None
        self.dmm_unit_size = None
        self.dmm_unit_complexity = None
        self.dmm_unit_interfacing = None
        self.dmm_score = None
        self.change_category = CommitRating.UNKNOWN


    def dmm_metrics_exist(self):
        return (self.dmm_unit_size is not None and
                self.dmm_unit_complexity is not None and
                self.dmm_unit_interfacing is not None)

    def to_dict(self):
        return {
            "hash": self.hash,
            "author": self.author,
            "author_email": self.author_email,
            "committer": self.committer,
            "committer_email": self.committer_email,
            "author_date": self.author_date,
            "committer_date": self.committer_date,
            "number_of_deleted_lines": self.number_of_deleted_lines,
            "number_of_added_lines": self.number_of_added_lines,
            "number_of_files_changed": self.number_of_files_changed,
            "dmm_unit_size": self.dmm_unit_size,
            "dmm_unit_complexity": self.dmm_unit_complexity,
            "dmm_unit_interfacing": self.dmm_unit_interfacing,
            "change_category": self.change_category
        }
