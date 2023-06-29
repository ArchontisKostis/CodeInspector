from app.models.project_commit.ProjectCommit import ProjectCommit


class ProjectCommitBuilder:
    def __init__(self):
        self.commit = ProjectCommit()

    def set_hash(self, hash):
        self.commit.hash = hash
        return self

    def set_author(self, author):
        self.commit.author = author
        return self

    def set_committer(self, committer):
        self.commit.committer = committer
        return self

    def set_author_date(self, author_date):
        self.commit.author_date = author_date
        return self

    def set_committer_date(self, committer_date):
        self.commit.committer_date = committer_date
        return self

    def set_number_of_deleted_lines(self, number_of_deleted_lines):
        self.commit.number_of_deleted_lines = number_of_deleted_lines
        return self

    def set_number_of_added_lines(self, number_of_added_lines):
        self.commit.number_of_added_lines = number_of_added_lines
        return self

    def set_number_of_files_changed(self, number_of_files_changed):
        self.commit.number_of_files_changed = number_of_files_changed
        return self

    def set_dmm_unit_size(self, dmm_unit_size):
        self.commit.dmm_unit_size = dmm_unit_size
        return self

    def set_dmm_unit_complexity(self, dmm_unit_complexity):
        self.commit.dmm_unit_complexity = dmm_unit_complexity
        return self

    def set_dmm_unit_interfacing(self, dmm_unit_interfacing):
        self.commit.dmm_unit_interfacing = dmm_unit_interfacing
        return self

    def set_author_email(self, author_email):
        self.commit.author_email = author_email
        return self

    def set_committer_email(self, committer_email):
        self.commit.committer_email = committer_email
        return self

    def build(self):
        return self.commit
