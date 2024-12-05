# Dockerfile for Flask (Python)
FROM python:3.9

# Set the working directory
WORKDIR /app

# Install dependencies
COPY Fullstack/Backend/Flask/requirements.txt ./
RUN pip install -r requirements.txt

# Copy the rest of the app
COPY Fullstack/Backend/Flask/ ./

# Expose the port Flask is running on
EXPOSE 5000

# Command to run the Flask app
CMD ["flask", "run", "--host=0.0.0.0"]
