from enum import Enum


class PriorityType(Enum):
    HIGH = "HIGH"
    MEDIUM = "MEDIUM"
    NORMAL = "NORMAL"
    LOW = "LOW"

    # This is the default value for the priority. Typically, this means that the file is an outlier
    NOT_SET = "NOT_SET"

    # This is the value we will use when we don't know the priority of the file
    # and does not match any of the cases in HotspotPriorityCalculator.py
    UNKNOWN = "UNKNOWN"
