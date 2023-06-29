import re

from fastapi import HTTPException


def is_github_url(url):
    github_url_pattern = r"^https://github\.com/.*$"
    return re.match(github_url_pattern, url) is not None


def validate_repo_url(repo_url):
    if repo_url is None:
        raise HTTPException(status_code=400, detail="Repo URL is required")

    if not is_github_url(repo_url):
        raise HTTPException(status_code=400, detail="Repo URL is invalid")
