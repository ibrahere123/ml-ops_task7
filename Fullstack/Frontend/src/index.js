import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Signup from "./Signup"; // Import Signup component
import Login from "./Login"; // Import Login component
import WeatherForm from "./components/weatherform"; // Import WeatherForm
import './index.css';


ReactDOM.render(
  <Router>
    <Routes>
    
      <Route path="*" element={<App />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/weatherform" element={<WeatherForm />} /> {/* Add the weather form route */}
    </Routes>
  </Router>,
  document.getElementById("root")
);
