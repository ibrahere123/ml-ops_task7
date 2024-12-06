import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CloudSun, Droplet, Wind, Thermometer } from "lucide-react";

const RainDrops = () => {
  return (
    <div className="rain-container fixed inset-0 pointer-events-none z-0">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="rain-drop absolute bg-blue-300/50 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            width: `${Math.random() * 2}px`,
            height: `${Math.random() * 20 + 10}px`,
          }}
        />
      ))}
    </div>
  );
};

const WeatherForm = () => {
  const [formData, setFormData] = useState({
    humidity: "",
    windSpeed: "",
    precipitation: "",
  });
  const [predictedTemperature, setPredictedTemperature] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = {
    humidity: useRef(null),
    windSpeed: useRef(null),
    precipitation: useRef(null)
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const token = localStorage.getItem("token");
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
          Authorization: `Bearer ${token}`,
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

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center bg-gradient-to-br from-blue-200 to-blue-500">
      <RainDrops />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="relative z-10 max-w-md mx-auto p-6 bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl"
      >
        <div className="flex items-center justify-center mb-6">
          <CloudSun size={48} className="text-blue-500 mr-4" />
          <h1 className="text-3xl font-bold text-gray-800">Weather Predictor</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { 
              name: "humidity", 
              placeholder: "Humidity (%)", 
              icon: <Droplet className="text-blue-400 absolute left-3 top-1/2 -translate-y-1/2" />,
              min: 0,
              max: 100
            },
            { 
              name: "windSpeed", 
              placeholder: "Wind Speed (km/h)", 
              icon: <Wind className="text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />,
              min: 0,
              max: 200
            },
            { 
              name: "precipitation", 
              placeholder: "Precipitation (mm)", 
              icon: <Thermometer className="text-green-400 absolute left-3 top-1/2 -translate-y-1/2" />,
              min: 0,
              max: 500
            }
          ].map(({ name, placeholder, icon, min, max }) => (
            <div key={name} className="relative">
              {icon}
              <input
                ref={inputRefs[name]}
                type="number"
                name={name}
                placeholder={placeholder}
                value={formData[name]}
                onChange={handleChange}
                min={min}
                max={max}
                step="0.1"
                required
                className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 transition-all duration-300"
              />
            </div>
          ))}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            type="submit"
            className={`w-full py-3 rounded-lg text-white font-semibold transition-all duration-300 
              ${loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-500 hover:bg-blue-600'}`}
          >
            {loading ? "Predicting..." : "Get Weather Prediction"}
          </motion.button>
        </form>

        <AnimatePresence>
          {predictedTemperature && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-6 text-center"
            >
              <p className="text-2xl font-bold text-blue-600">
                Predicted Temperature: {predictedTemperature}°C
              </p>
            </motion.div>
          )}
          
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-4 text-red-500 text-center"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default WeatherForm;