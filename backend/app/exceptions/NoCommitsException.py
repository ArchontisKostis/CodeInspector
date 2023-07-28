# This is a custom exception that is raised when the repository has no commits.

class NoCommitsException(Exception):
    def __init__(self, message):
        super().__init__(message)