<h1 align="center">
  <img src="https://github.com/ArchontisKostis/CodeInspectorFlask/blob/master/static/assets/svg/logo_1.svg" width="48" height="48" />
  CodeInspectorREST
</h1>

<p align="center">
  <em>🔍 A REST API for generating software quality analysis based on hotspot prioritization and commits 🛠️</em> 
</p>

<p align="center">
  <em><b>Made with:</b></em> <br>
  <img src="https://img.shields.io/badge/FastAPI-blue" alt="Made with FastAPI" />
  <img src="https://img.shields.io/badge/PyDriller-green" alt="Made with PyDriller" />
</p>

## 🚀 Overview
CodeInspectorREST is an api that provides software quality analysis based on hotspot prioritization and commits.
It takes a repository URL and generates insights on modified files, file churn, complexity, and priority for quality improvement as well as insights on the commits.
It provides endpoints to prioritize hotspots and analyze commits within a specified date range.

## 🛠️ Installation
In order to run the CodeInspectorREST, you need to have Python installed on your machine. 
You can download and install the latest version of Python from the official Python website [here](https://www.python.org/downloads/).

### 🐙 Clone the Repository
To clone this repository, follow the steps below:
1. Open your terminal and navigate to the directory where you want to clone the repository.
2. Run the following command:
```bash
git clone https://github.com/ArchontisKostis/CodeInspectorREST.git
```

### ⚙️ Install Dependencies
The project requires certain dependencies to be installed. The list of dependencies, along with their versions, are listed in the `requirements.txt` file. Follow the steps below to install the dependencies:

1. Navigate to the cloned repository's directory in your terminal.
2. Create a virtual environment (optional but recommended) using the following command:
```
python -m venv venv
```

3. Activate the virtual environment (if created) using the appropriate command for your operating system:
For Windows:
```
venv\Scripts\activate
```

For Unix/Linux
```
source venv/bin/activate
```

4. Install the dependencies using pip with the following command:
```
pip install -r requirements.txt
```

This will install all the required dependencies listed in the requirements.txt file into your virtual environment.

## 🐳 Using Docker

CodeInspectorREST includes a Dockerfile, which allows you to easily deploy the application using Docker. Follow the steps below to use Docker for deployment:

1. Make sure Docker is installed on your system. You can download and install Docker from the official Docker website: https://www.docker.com

2. Open a terminal and navigate to the project directory containing the Dockerfile.

3. Build a Docker image using the following command:
```
docker build -t codeinspector-rest-api .
```
This command will build a Docker image named codeinspector-web-app based on the instructions in the Dockerfile.

4. Once the image is built, you can run a Docker container with the following command:
```
docker run -d -p 8000:8000 codeinspector-rest-api
```
This command will start a container based on the Docker image we built earlier and map port 8000 of the container to port 8000 of your local machine.

5. The CodeInspectorREST Swagger Docs should now be accessible by visiting `http://localhost:8000/docs` in your web browser.

<h2 style="margin: 0; padding: 0;">🎓 Credits</h2>
<div style="display: flex; align-items: center; flex-direction: row-reverse;">
  <p>
    CodeInspectorREST was created by Archontis E. Kostis with the support and guidance of Mr. <a href="https://users.uom.gr/~achat/">Alexander Hatzigeorgiou</a>, 
    Dean of the <a href="https://www.uom.gr/dai">Department of Applied Informatics</a> at University of Macedonia. 
    The project was inspired by a shared passion for improving software quality through data-driven and mining software repositories analysis. 
    The development of this tool would not have been possible without the open-source contributions of the FastAPI, Python and PyDriller communities. 
    We are grateful for their efforts in making high-quality software accessible to everyone.
  </p>
  <img src="https://www.uom.gr/site/images/logos/UOMLOGOGR-thumb.jpg" alt="University of Macedonia Logo" height="100" style="margin-left: 20px; align: center;">
</div>
