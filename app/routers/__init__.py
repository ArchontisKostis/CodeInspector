import re
import time
from datetime import datetime, timedelta

from fastapi import HTTPException


def is_github_url(url):
    github_url_pattern = r"^https://github\.com/.*$"
    return re.match(github_url_pattern, url) is not None


def validate_repo_url(repo_url):
    if repo_url is None:
        raise HTTPException(status_code=400, detail="Repo URL is required")

    if not is_github_url(repo_url):
        raise HTTPException(status_code=400, detail="Repo URL is invalid. Url Must be a GitHub URL.")


def start_timer():
    return time.time()


def end_timer(start_time):
    time_passed = (time.time() - start_time) / 60
    print(f"Time passed: {time_passed} minutes")
    return time_passed


def calculate_past_year_date_range(from_date, to_date):
    today = datetime.today()
    one_year_ago = today - timedelta(days=365)

    from_date = one_year_ago
    to_date = today


    return from_date, to_date
