import logging

from fastapi import FastAPI
import uvicorn
from sqlalchemy import create_engine

from app import configure_cors
from app.config.dbConfig import DATABASE_URL
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

    db_engine = create_engine(DATABASE_URL)
    db_connection = db_engine.connect()

    uvicorn.run(app, host=HOST_IP, port=PORT)

