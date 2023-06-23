from pydriller import Repository

from app.models import is_not_already_added
from app.analyzers.ProcessMetricsCalculator import ProcessMetricsCalculator

class RepoDriller:
    def __init__(self, repo: Repository):
        self.repo = repo
        self.commit_list = []

    def find_commits(self):
        for commit in self.repo.traverse_commits():
            self.commit_list.append(commit)
        return self.commit_list

    def find_project_name(self):
        commits = self.find_commits()

        repo_name = commits[0].project_name
        return repo_name

    def find_modified_files_for_commit(self, commit, modified_files_list):
        for file in commit.modified_files:
            print(file)
            #print(file.filename)
            #if is_not_already_added(file, modified_files_list) and '.java' in file.filename:
            # print("Adding file: " + file.filename)
            modified_files_list.append(file)
            print("Modified files list: " + str(modified_files_list))

        return modified_files_list

    def find_first_and_last_commits(self, commit_list):
        if (len(commit_list) > 0):
            first_commit = commit_list[0]
            last_commit = commit_list[-1]

            return {'first': first_commit, 'last': last_commit}
        else:
            raise RuntimeError

    def find_modified_files(self):
        modified_files = []
        for commit in self.repo.traverse_commits():     # self.get_commits() seems like this gives us a git error
            self.find_modified_files_for_commit(commit, modified_files)
        return modified_files

    def find_files_churn_avg(self, path_to_repo, from_commit, to_commit) -> dict:
        churn = ProcessMetricsCalculator.calculate_churn(
            path_to_repo,
            from_commit,
            to_commit,
            'avg'
        )
        return churn

    def get_commits(self):
        if len(self.commit_list) > 0:
            return self.commit_list
        return self.find_commits()