import logging
import traceback

from fastapi import HTTPException
from starlette.middleware.cors import CORSMiddleware

origins = [
    "http://localhost:3000",
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


