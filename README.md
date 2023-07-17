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
  <img src="https://img.shields.io/badge/PYCHARM-gray?style=for-the-badge&logo=pycharm" alt="PYCHARM" />
  <img src="https://img.shields.io/badge/WEBSTORM-gray?style=for-the-badge&logo=webstorm" alt="WEBSTORM" />
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

<h2 style="margin: 0; padding: 0;">🎓 Credits</h2>
<div style="display: flex; align-items: center; flex-direction: row-reverse;">
  <p>
    CodeInspector was created by me (Archontis E. Kostis), as part of my bachelor thesis, with the support and guidance of Mr. <a href="https://users.uom.gr/~achat/">Alexander Hatzigeorgiou</a>, 
    Dean of the <a href="https://www.uom.gr/dai">Department of Applied Informatics</a> at University of Macedonia. 
    The project was inspired by a shared passion for improving software quality through data-driven and mining software repositories analysis. 
    The development of this tool would not have been possible without the open-source contributions of the FastAPI, Python, React and PyDriller communities. 
    We are grateful for their efforts in making high-quality software accessible to everyone.
  </p>
  <img src="https://www.uom.gr/site/images/logos/UOMLOGOGR-thumb.jpg" alt="University of Macedonia Logo" height="100" style="margin-left: 20px; align: center;">
</div>

