class Analysis:
    project_name = "Undefined Project Name"

    def __init__(self, repo_url, from_date, to_date):
        self.repo_url = repo_url
        self.from_date = from_date
        self.to_date = to_date

    def to_dict(self):
        return {
            'project_name': self.project_name,
            'repository_url': self.repo_url,
            'from_date': self.from_date,
            'to_date': self.to_date
        }
