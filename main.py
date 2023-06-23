import logging

from fastapi import FastAPI
from app.routers import routers

app = FastAPI()

# Include routers
app.include_router(routers.router)

logging.basicConfig(level=logging.DEBUG)


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="127.0.0.1", port=8000)
