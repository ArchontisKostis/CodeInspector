from app.models import RepoFile


class Project:
    def __init__(self, repository_url: str):
        self.project_name = 'Undefined Project Name'
        self.repository_url = repository_url
        self.files = []

    def add_file(self, file: RepoFile):
        if self.file_is_not_already_added(file):
            print("Adding file: " + file.name)
            file.set_metric('CHURN', 0)
            self.files.append(file)
        else:
            already_added_file = self.get_file(file.name)
            already_added_file.set_metric('CHURN', already_added_file.get_metric('CHURN') + 1)

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
            'project_name': self.project_name,
            'repository_url': self.repository_url,
            'files': [file.to_dict() for file in self.files]
        }