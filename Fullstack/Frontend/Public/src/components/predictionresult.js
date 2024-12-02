import React from "react";

const PredictionResult = ({ prediction }) => {
  return (
    <div className="prediction-result">
      {prediction !== null ? (
        <>
          <h2>Predicted Temperature:</h2>
          <p>{prediction.toFixed(2)} °C</p>
        </>
      ) : (
        <p>No prediction yet. Please fill out the form.</p>
      )}
    </div>
  );
};

export default PredictionResult;
