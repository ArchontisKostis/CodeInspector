from pydriller import Repository


class Project:
    def __init__(self, pydriller_repo: Repository):
        self.repository = pydriller_repo
        self.commits = []
        self.modified_files = []
        self.first_commit = None
        self.last_commit = None

    def get_commits(self):
        return self.commits

    def set_commits(self, commit_list: list):
        self.commits = commit_list

    def get_number_of_commits(self):
        return len(self.commits)

    def has_commits(self):
        number_of_commits = len(self.commits)
        return number_of_commits > 0

    def set_modified_files(self, modified_files_list: list):
        self.modified_files = modified_files_list

    def get_modified_files(self) -> list:
        return self.modified_files

    def add_modified_file(self, file):
        self.modified_files.append(file)

    def get_file(self, name):
        for file in self.modified_files:
            if file.filename == name:
                return file
        return None

    def set_first_commit(self, commit):
        self.first_commit = commit

    def set_last_commit(self, commit):
        self.last_commit = commit

    def get_first_commit(self):
        return self.first_commit

    def get_last_commit(self):
        return self.last_commit

    def to_dict(self):
        return {
            'commits': [commit.hash for commit in self.commits],
            'modified_files': [file.to_dict() for file in self.modified_files],
            'first_commit': self.first_commit.hash if self.first_commit else None,
            'last_commit': self.last_commit.hash if self.last_commit else None
        }