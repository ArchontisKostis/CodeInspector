import logging
import traceback

from fastapi import HTTPException
from starlette.middleware.cors import CORSMiddleware

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:5500",
]

logger = logging.getLogger(__name__)


def configure_cors(app):
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

def handle_exception_on_endpoint(exception):
    # if we have an HTTPException, we want to return the status code and the detail
    if isinstance(exception, HTTPException):
        raise HTTPException(status_code=exception.status_code, detail=exception.detail)

    traceback.print_exc()

    msg = traceback.format_exc() or "An error occurred while processing the request"
    raise HTTPException(status_code=400, detail=msg)
