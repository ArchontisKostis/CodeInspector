from pydriller import Commit

from app.models.project_file.ProjectFile import RepoFile


class CommitProcessor:
    def __init__(self, project):
        self.project = project

    def process_commit(self, commit: Commit):
        if self.project.project_name is None:
            self.project.project_name = commit.project_name

        for modified_file in commit.modified_files:
            file_to_add = RepoFile(modified_file.filename)

            if modified_file.language_supported:
                file_to_add.set_metric('CC', modified_file.complexity)
                file_to_add.set_metric('NLOC', modified_file.nloc)
                file_to_add.language_supported = True

                self.project.add_file(file_to_add)
