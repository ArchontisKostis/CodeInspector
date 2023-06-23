class NoCommitsError(Exception):
    def __init__(self, message="No commits in the repository"):
        self.message = message
        super().__init__(self.message)
