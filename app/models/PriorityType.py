from enum import Enum


# This enum is currently not used in the application because I could not make it work with the front-end.
# I think that it will be better if I find a way to make it work though
class PriorityType(Enum):
    HIGH = 4
    MEDIUM = 3
    NORMAL = 2
    LOW = 1
    NOT_SET = 0
