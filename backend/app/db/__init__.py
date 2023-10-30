# DATABASE CONFIGURATION
DB_HOST = "localhost"
DB_USER = "root"
DB_PASS = "root"
DB_PORT = "3306"
DB_NAME = "code_inspector_db"

DB_URL = f"mysql+pymysql://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
