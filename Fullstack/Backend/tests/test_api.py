# tests/test_api.py
import sys
import os

import pytest
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from Flask.app import app
@pytest.fixture
def client():
    with app.test_client() as client:
        yield client

def test_predict_valid_data(client):
    # Providing all required fields
    response = client.post('/predict', json={
        "humidity": 50,
        "wind_speed": 5.5,
        "precipitation": 0.3
    })
    assert response.status_code == 200
    assert "predicted_temperature" in response.json

def test_predict_edge_case(client):
    # Edge case: minimal valid input
    response = client.post('/predict', json={
        "humidity": 0,
        "wind_speed": 0,
        "precipitation": 0
    })
    assert response.status_code == 200
    assert "predicted_temperature" in response.json

def test_predict_missing_data(client):
    # Missing required fields
    response = client.post('/predict', json={})
    assert response.status_code == 400
    assert response.json == {"error": "All fields (humidity, wind_speed, precipitation) are required"}

def test_predict_invalid_type(client):
    # Invalid data type for a field
    response = client.post('/predict', json={
        "humidity": "fifty",
        "wind_speed": 5.5,
        "precipitation": 0.3
    })
    assert response.status_code == 400
    assert response.json == {"error": "All fields must be numeric"}