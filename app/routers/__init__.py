import re
import time
import traceback
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

def handle_exception_on_endpoint(exception):
    # if we have an HTTPException, we want to return the status code and the detail
    if isinstance(exception, HTTPException):
        raise HTTPException(status_code=exception.status_code, detail=exception.detail)

    traceback.print_exc()

    msg = traceback.format_exc() or "An error occurred while processing the request"
    raise HTTPException(status_code=400, detail=msg)
