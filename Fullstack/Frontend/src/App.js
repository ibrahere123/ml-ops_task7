// import React, { useState, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import WeatherForm from "./components/weatherform";
// import PredictionResult from "./components/predictionresult";
// import Login from "./Login"; // Login component for redirection
// import Signup from "./Signup"; // Signup component for route

// const checkLoggedIn = () => {
//   return localStorage.getItem("user") !== null; // Replace with actual check
// };

// function App() {
//   const [prediction, setPrediction] = useState(null);
//   const [isLoggedIn, setIsLoggedIn] = useState(checkLoggedIn());
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!isLoggedIn) {
//       navigate("/login"); // Redirect to login if not logged in
//     }
//   }, [isLoggedIn, navigate]);

//   const handlePredict = (predictedTemperature) => {
//     setPrediction(predictedTemperature);
//   };

//   return (
//     <div className="app">
//       <h1>Weather Prediction</h1>
//       {isLoggedIn ? (
//         <div>
//           <WeatherForm onPredict={handlePredict} />
//           <PredictionResult prediction={prediction} />
//         </div>
//       ) : (
//         <p>You need to log in to use this feature.</p>
//       )}
//       {/* Link to the signup page */}
//       <Link to="/signup">Sign up</Link>
//     </div>
//   );
// }

// export default App;
// import React, { useState, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import WeatherForm from "./components/weatherform";
// import PredictionResult from "./components/predictionresult";
// import Login from "./Login"; // Login component for redirection
// import Signup from "./Signup"; // Signup component for route
// import axios from "axios";

// const checkLoggedIn = () => {
//   return localStorage.getItem("token") !== null; // Check if the token exists
// };

// function App() {
//   const [prediction, setPrediction] = useState(null);
//   const [isLoggedIn, setIsLoggedIn] = useState(checkLoggedIn());
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!isLoggedIn) {
//       navigate("/login"); // Redirect to login if not logged in
//     }
//   }, [isLoggedIn, navigate]);

//   const handlePredict = async (humidity, wind_speed, precipitation) => {
//     try {
//       // Send prediction request to backend
//       const response = await axios.post("http://localhost:5000/predict", {
//         humidity,
//         wind_speed,
//         precipitation,
//       });
//       const predictedTemperature = response.data.predicted_temperature;
//       setPrediction(predictedTemperature);
//     } catch (error) {
//       console.error("Error fetching prediction:", error);
//     }
//   };

//   const handleLogout = () => {
//     // Clear the token from localStorage and update the state
//     localStorage.removeItem("token");
//     setIsLoggedIn(false);
//   };

//   return (
//     <div className="app">
//       <h1>Weather Prediction</h1>
//       {isLoggedIn ? (
//         <div>
//           <WeatherForm onPredict={handlePredict} />
//           <PredictionResult prediction={prediction} />
//           <button onClick={handleLogout}>Logout</button>
//         </div>
//       ) : (
//         <p>You need to log in to use this feature.</p>
//       )}
//       <Link to="/signup">Sign up</Link>
//     </div>
//   );
// }

// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import WeatherForm from "./components/weatherform"; // Import WeatherForm
// import Login from "./Login"; // Your login component

// const App = () => {
//   const isAuthenticated = localStorage.getItem("token"); // Check if token exists

//   return (
//     <Router>
//       <Routes>
//         {/* Login route */}
//         <Route path="/login" element={<Login />} />

//         {/* Weather Prediction route, only accessible if authenticated */}
//         <Route path="/weatherform" element={<WeatherForm />} />

//         {/* Default route - can be to login or another page */}
//         <Route path="/" element={<Navigate to="/login" />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import WeatherForm from "./components/weatherform"; // Import WeatherForm
import Login from "./Login"; // Your login component

const App = () => {
  const isAuthenticated = localStorage.getItem("token"); // Check if token exists

  return (
    <Routes>
      {/* Login route */}
      <Route path="/login" element={<Login />} />

      {/* Weather Prediction route, only accessible if authenticated */}
      <Route path="/weatherform" element={<WeatherForm />} />

      {/* Default route - redirect to login */}
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;
