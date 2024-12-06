import React, { useState } from "react";

const WeatherForm = () => {
  const [formData, setFormData] = useState({
    humidity: "",
    windSpeed: "",
    precipitation: "",
  });
  const [predictedTemperature, setPredictedTemperature] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const token = localStorage.getItem("token"); // Get the JWT from localStorage

    if (!token) {
      setError("You must be logged in to make predictions.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the JWT in the request header
        },
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
      setPredictedTemperature(data.predicted_temperature);
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      width: '100%',
      maxWidth: '400px',
      margin: '0 auto',
      padding: '2rem',
      backgroundColor: '#f4f4f9',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
    },
    heading: {
      fontSize: '2rem',
      color: '#333',
      marginBottom: '1.5rem',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    input: {
      width: '100%',
      padding: '10px',
      margin: '10px 0',
      border: '1px solid #ccc',
      borderRadius: '5px',
      fontSize: '1rem',
      backgroundColor: '#fff',
    },
    inputFocus: {
      borderColor: '#4CAF50',
      outline: 'none',
    },
    button: {
      width: '100%',
      padding: '10px',
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      fontSize: '1.1rem',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    buttonHover: {
      backgroundColor: '#45a049',
    },
    buttonDisabled: {
      backgroundColor: '#ddd',
      cursor: 'not-allowed',
    },
    predictionResult: {
      marginTop: '1.5rem',
      fontSize: '1.2rem',
      fontWeight: 'bold',
      color: '#333',
    },
    errorMessage: {
      marginTop: '1rem',
      color: 'red',
      fontSize: '1rem',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Weather Prediction</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="number"
          name="humidity"
          placeholder="Humidity (%)"
          value={formData.humidity}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="number"
          name="windSpeed"
          placeholder="Wind Speed (km/h)"
          value={formData.windSpeed}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="number"
          name="precipitation"
          placeholder="Precipitation (mm)"
          value={formData.precipitation}
          onChange={handleChange}
          style={styles.input}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            ...styles.button,
            ...(loading ? styles.buttonDisabled : {}),
            ...(loading ? {} : styles.buttonHover),
          }}
        >
          {loading ? "Loading..." : "Get Prediction"}
        </button>
      </form>
      {predictedTemperature && (
        <p style={styles.predictionResult}>Predicted Temperature: {predictedTemperature}°C</p>
      )}
      {error && <p style={styles.errorMessage}>{error}</p>}
    </div>
  );
};

export default WeatherForm;
