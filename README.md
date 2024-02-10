<h1 align="center">
  <img src="https://github.com/ArchontisKostis/CodeInspectorFlask/blob/master/static/assets/svg/logo_1.svg" width="48" height="48" />
  CodeInspector
</h1>

<p align="center">
  <em>🔍 A software quality analysis tool based on hotspot prioritization and commits 🛠️</em> 
</p>

<p align="center">
  <em><b>Made with:</b></em> <br>
  <img src="https://img.shields.io/badge/REACT-gray?style=for-the-badge&logo=react" alt="REACT" />
  <img src="https://img.shields.io/badge/FASTAPI-gray?style=for-the-badge&logo=fastapi&logoColor=02bfae" alt="FASTAPI" />
  <img src="https://img.shields.io/badge/DOCKER-gray?style=for-the-badge&logo=docker&logoColor=02bfae" alt="DOCKER" />
</p>

## 🚀 Overview
CodeInspector is a full-stack application that provides software quality analysis based on hotspot prioritization and commits. It takes a repository URL and generates insights on modified files, file churn, complexity, and priority for quality improvement, as well as insights on the commits. It provides endpoints to prioritize hotspots and analyze commits within a specified date range.

The application consists of two main components:
- The backend: A FastAPI-based REST API that handles the analysis and provides the necessary endpoints.
- The frontend: A React-based user interface that allows users to interact with the analysis results.

## 🐳 Using Docker
CodeInspector provides a Docker configuration for easy deployment. Make sure you have Docker installed on your system before proceeding.

1. Clone the repository:
   ```
   git clone https://github.com/ArchontisKostis/CodeInspector.git
   ```
2. Navigate to the project directory:
   ```
   cd CodeInspector
   ```
3. Build the Docker containers:
   ```
   docker-compose up -d --build
   ```
4. The backend and frontend containers will be built and started. You can access the web-app by visiting `http://localhost:3000` in your web browser.

## 🐳 Docker Compose Services Overview

### 📊 database Service

The `database` service in this Docker Compose configuration utilizes the MySQL image. It represents the MySQL database server for the Code Inspector application.

- **Image:** `mysql:latest`
- **Environment Variables:**
  - `MYSQL_DATABASE`: `code_inspector_db`
  - `MYSQL_ROOT_PASSWORD`: `root`
- **Ports:** Exposes port `3306` for MySQL connections.
- **Health Check:** Verifies MySQL server health using `mysqladmin ping`.

### 🚀 backend Service

The `backend` service is responsible for running the Code Inspector backend application.

- **Image:** `archontisk/codeinspector`
- **Environment Variables:**
  - `DB_URL`: MySQL database connection URL (`mysql+pymysql://root:root@database:3306/code_inspector_db`).
- **Ports:** Exposes port `8000` for the backend application.
- **Dependencies:** Depends on the `database` service and starts conditionally after the database service is healthy.

### 🌐 frontend Service

The `frontend` service builds and runs the Code Inspector frontend application.

- **Build Context:** `./frontend/app`
- **Dockerfile:** Specifies `Dockerfile` for building the frontend image.
- **Ports:** Exposes port `3000` for the frontend application.
- **Dependencies:** Depends on the `backend` service.

### 📈 adminer Service

The `adminer` service includes Adminer, a lightweight database management tool, to facilitate web-based management of the MySQL database.

- **Image:** `adminer`
- **Ports:** Exposes port `8080` for Adminer's web interface.
- **Dependencies:** Depends on the `database` service.

---

**Note:** Ensure that you have the necessary configuration details (e.g., database credentials) before accessing and interacting with the services. Adjustments may be required based on your specific setup and requirements.


<h2 style="margin: 0; padding: 0;">🎓 Credits</h2>
<div style="display: flex; align-items: center; flex-direction: row-reverse;">
  <p>
    CodeInspector was created by me (Archontis E. Kostis), as part of my bachelor thesis, with the support and guidance of Mr. <a href="https://users.uom.gr/~achat/">Alexander Hatzigeorgiou</a>, 
    Vice Rector of Extroversion and International Relations of <a href="https://www.uom.gr">University of Macedonia</a> and professor at the Department of Applied Informatics. 
    The project was inspired by a shared passion for improving software quality through data-driven and mining software repositories analysis. 
    The development of this tool would not have been possible without the open-source contributions of the FastAPI, Python, React and PyDriller communities. 
    We are grateful for their efforts in making high-quality software accessible to everyone.
  </p>
  <img src="https://www.uom.gr/site/images/logos/UOMLOGOGR-thumb.jpg" alt="University of Macedonia Logo" height="100" style="margin-left: 20px; align: center;">
</div>

