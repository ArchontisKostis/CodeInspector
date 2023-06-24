from app.models import RepoFile


class Project:
    def __init__(self, repository_url: str):
        self.repository_url = repository_url
        self.files = []

    def add_file(self, file: RepoFile):
        if self.file_is_not_already_added(file):
            self.files.append(file)
            file.file_changed()
        else:
            repo_file = self.get_file(file.name)
            repo_file.file_changed()

    def file_is_not_already_added(self, file):
        for curr_file in self.files:
            if file.name == curr_file.name:
                return False
        return True

    def get_file(self, file_name: str) -> RepoFile:
        for file in self.files:
            if file.name == file_name:
                return file
        return None

    def get_files(self):
        return self.files

    # To dict method to return a dictionary representation of the project for the response
    def to_dict(self):
        return {
            'repository_url': self.repository_url,
            'files': [file.to_dict() for file in self.files]
        }