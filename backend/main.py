import logging

from fastapi import FastAPI
import uvicorn

from app import configure_cors
from app.routers import analysis_router as routers

app = FastAPI()

# Include routers
app.include_router(routers.router)

logging.basicConfig(level=logging.INFO)
configure_cors(app)

# Server constants
HOST_IP = '127.0.0.1'
PORT = 8000

if __name__ == "__main__":
    uvicorn.run(app, host=HOST_IP, port=PORT)

