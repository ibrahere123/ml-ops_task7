# Use an official Python runtime as a parent image
FROM python:3.9

# Set the working directory in the container
WORKDIR /app

# Copy the requirements.txt file into the container at /app
COPY requirements.txt ./ 

# Install any needed packages specified in requirements.txt
RUN pip install -r requirements.txt

# Copy the rest of your application files (including app.py and other source files) into the container at /app
COPY . /app

# Copy the model file into the container (make sure this file exists in the Models folder)
COPY ./Models/model.pkl /app/Models/model.pkl

# Expose the port the app will run on
EXPOSE 5000

# Set the environment variable to indicate it's running in production
ENV FLASK_ENV=production

# Command to run the Flask app
CMD ["flask", "run", "--host=0.0.0.0"]
