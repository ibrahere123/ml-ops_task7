from flask import Flask, request, jsonify
import joblib

app = Flask(__name__)

# Load the model
model_path = r'Models/model.pkl'
model = joblib.load(model_path)

@app.route('/predict', methods=['POST'])
def predict():
    # Get data from the POST request
    data = request.get_json()

    humidity = data.get('humidity')
    wind_speed = data.get('wind_speed')
    precipitation = data.get('precipitation')

    if humidity is None or wind_speed is None or precipitation is None:
        return jsonify({"error": "All fields (humidity, wind_speed, precipitation) are required"}), 400

    # Assuming the model expects a list of features (humidity, wind_speed, precipitation)
    features = [[humidity, wind_speed, precipitation]]

    # Get prediction from the model
    prediction = model.predict(features)

    # Return the prediction in JSON format
    return jsonify({'predicted_temperature': prediction[0]})

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)
