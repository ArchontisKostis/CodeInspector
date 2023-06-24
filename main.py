import logging

from fastapi import FastAPI
import uvicorn
from app import configure_cors
from app.routers import routers

app = FastAPI()

# Include routers
app.include_router(routers.router)

logging.basicConfig(level=logging.DEBUG)
configure_cors(app)

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)

