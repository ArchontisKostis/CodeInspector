from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base

# Database configuration
DB_USER = "root"
DB_PASS = ""
DB_HOST = "localhost"
DB_PORT = "3306"
DB_NAME_TEST = "code-inspector-test-db"

DATABASE_URL = f"mysql+pymysql://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME_TEST}"

# Base class for all entities
Base = declarative_base()
