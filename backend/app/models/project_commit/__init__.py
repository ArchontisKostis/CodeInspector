# These are the thresholds for the project commit rating categories.
# We use the 3 DMM metrics to calculate the DMM score, which is then used to categorize the project commit.
# The metrics are: dmm_unit_size, dmm_unit_complexity, dmm_unit_interfacing

# Each metric has a value between 0.0 and 1.0.
# The DMM score is the sum of the 3 metrics. Resulting in a value between 0.0 and 3.0.
# In order to categorize the project commit rating based on the dmm score, we break the range into 4 categories.

# The thresholds are as follows:
MIN_THRESHOLD_EXCELLENT = 0.0
MAX_THRESHOLD_EXCELLENT = 0.75

MIN_THRESHOLD_GOOD = 0.76
MAX_THRESHOLD_GOOD = 1.50

MIN_THRESHOLD_FAIR = 1.51
MAX_THRESHOLD_FAIR = 2.25

MIN_THRESHOLD_POOR = 2.26
MAX_THRESHOLD_POOR = 3.0
