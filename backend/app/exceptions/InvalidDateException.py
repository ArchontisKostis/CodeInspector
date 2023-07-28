# Custom exception for invalid date

class InvalidDateException(Exception):
    def __init__(self, message):
        super().__init__(message)