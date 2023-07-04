# Use the official Python base image with Python 3.8 for production
FROM python:3.8 as production

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file to the container
COPY requirements.txt .

# Install the Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code to the container
COPY . .

# Expose the port that your FastAPI application listens on
EXPOSE 8000

# Start the FastAPI application for production
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
