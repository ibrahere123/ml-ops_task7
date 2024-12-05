import React, { useState } from "react";

const WeatherForm = ({ onPredict }) => {
  const [formData, setFormData] = useState({
    humidity: "",
    windSpeed: "",
    precipitation: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          humidity: parseFloat(formData.humidity),
          wind_speed: parseFloat(formData.windSpeed),
          precipitation: parseFloat(formData.precipitation),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch prediction");
      }

      const data = await response.json();
      onPredict(data.predicted_temperature); // Pass prediction to the parent
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="weather-form">
      <div className="form-group">
        <label htmlFor="humidity">Humidity (%):</label>
        <input
          type="number"
          id="humidity"
          name="humidity"
          value={formData.humidity}
          onChange={handleChange}
          required
          step="0.01"
        />
      </div>
      <div className="form-group">
        <label htmlFor="windSpeed">Wind Speed (m/s):</label>
        <input
          type="number"
          id="windSpeed"
          name="windSpeed"
          value={formData.windSpeed}
          onChange={handleChange}
          required
          step="0.01"
        />
      </div>
      <div className="form-group">
        <label htmlFor="precipitation">Precipitation (mm):</label>
        <input
          type="number"
          id="precipitation"
          name="precipitation"
          value={formData.precipitation}
          onChange={handleChange}
          required
          step="0.01"
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? "Predicting..." : "Get Prediction"}
      </button>

      {error && <p className="error-message">Error: {error}</p>}
    </form>
  );
};

export default WeatherForm;
