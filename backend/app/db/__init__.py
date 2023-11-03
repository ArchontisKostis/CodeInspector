# DATABASE CONFIGURATION
import os

# This is the database configuration for the development environment
# Create a database named "code_inspector_db" in your local machine
# and change the values below to match your local database configuration
# Then use the DB_URL_DEV
DB_HOST_DEV = "localhost"
DB_USER_DEV = "root"
DB_PASS_DEV = "root"
DB_PORT_DEV = "3306"
DB_NAME_DEV = "code_inspector_db"
DB_URL_DEV = f"mysql+pymysql://{DB_USER_DEV}:{DB_PASS_DEV}@{DB_HOST_DEV}:{DB_PORT_DEV}/{DB_NAME_DEV}"

# This is the actual DB_URL that will be used by the application
DB_URL = os.getenv("DB_URL") or DB_URL_DEV
