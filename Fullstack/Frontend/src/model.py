import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error
import mlflow
import mlflow.sklearn
from mlflow.tracking import MlflowClient
import os

# Define the MLFlow tracking directory
artifact_store_path = os.path.join(os.getcwd(), "mlflow_logs")  # This is for storing artifacts
backend_store_uri = f"sqlite:///{os.path.join(os.getcwd(), 'mlflow.db')}"  # This is for model registry

# Set the backend store URI and artifact store URI
mlflow.set_tracking_uri(f"file:///{artifact_store_path}")  # Set artifact store directory
mlflow.set_registry_uri(backend_store_uri)  # Set tracking URI for local runs
mlflow.set_experiment("Weather Forecast Experiment")  # Experiment name

# Load the preprocessed data
data = pd.read_csv("D:\OneDrive\Desktop\ml-ops_task7\processed_data.csv")

# Select features and target
X = data[["humidity_2m", "wind_speed_10m", "precipitation"]]  # Features
y = data["temperature_2m"]  # Target (temperature)

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Initialize the MLFlow client to interact with the Model Registry
client = MlflowClient()

# Train the linear regression model with MLflow tracking
with mlflow.start_run():  # Start an MLflow run
    # Log parameters
    mlflow.log_param("test_size", 0.2)
    mlflow.log_param("random_state", 42)
    mlflow.log_param("model_type", "LinearRegression")
    mlflow.log_param("features", list(X.columns))
    mlflow.log_param("target", "temperature_2m")

    # Train the model
    model = LinearRegression()
    model.fit(X_train, y_train)

    # Evaluate the model
    y_pred = model.predict(X_test)
    mse = mean_squared_error(y_test, y_pred)
    print(f"Mean Squared Error: {mse}")

    # Log metrics
    mlflow.log_metric("mean_squared_error", mse)

    # Log the model as an artifact
    mlflow.sklearn.log_model(model, artifact_path="models")

    # Register the model in the Model Registry
    model_uri = f"runs:/{mlflow.active_run().info.run_id}/models"
    model_name = "LinearRegressionModel"

    # Create the registered model (if it doesn't exist)
    try:
        client.create_registered_model(model_name)
    except mlflow.exceptions.MlflowException:
        pass  # If the model already exists, do nothing

    # Register a new version of the model
    model_version = client.create_model_version(model_name, model_uri, "1.0")

    # Transition the model to the 'staging' stage (you can change this to 'production' or 'archived')
    client.transition_model_version_stage(
        name=model_name,
        version=model_version.version,
        stage="staging"
    )

    print("Model training, logging, registration, and stage transition complete!")
