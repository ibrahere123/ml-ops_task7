import React, { useState } from "react";
import "./App.css";
import WeatherForm from "./components/weatherform";
import PredictionResult from "./components/predictionresult";

function App() {
  const [prediction, setPrediction] = useState(null);

  const handlePredict = (predictedTemperature) => {
    setPrediction(predictedTemperature);
  };

  return (
    <div className="app">
      <h1>Weather Prediction</h1>
      <WeatherForm onPredict={handlePredict} />
      <PredictionResult prediction={prediction} />
    </div>
  );
}

export default App;
