from app.models.Project import Project


class Analysis:
    def __init__(self, project: Project):
        self.project_name = 'Undefined Project Name'
        self.project = project

    def set_project_name(self, name):
        self.project_name = name

    def to_dict(self):
        return {
            'project_name': self.project_name,
            'project': self.project.to_dict()
        }