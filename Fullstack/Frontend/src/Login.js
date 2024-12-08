import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { motion } from "framer-motion"; // Import framer-motion

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form submission

    if (!username || !password) {
      setError("Both username and password are required.");
      return;
    }

    try {
      // Make the API request to the backend login route
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store the token in localStorage if login is successful
        localStorage.setItem("token", data.token);

        // Redirect the user to the weather form page
        navigate("/weatherform");
      } else {
        // If login fails, show the error message
        setError(data.error || "Invalid username or password.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 to-blue-500">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="relative z-10 max-w-md mx-auto p-6 bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl"
      >
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Login</h2>

        <div className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full pl-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 transition-all duration-300"
            />
          </div>

          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full pl-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 transition-all duration-300"
            />
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-red-500 text-center"
            >
              {error}
            </motion.p>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogin}
            className="w-full py-3 rounded-lg text-white font-semibold bg-blue-500 hover:bg-blue-600 transition-all duration-300"
          >
            Login
          </motion.button>
        </div>

        <div className="mt-4 text-center">
          <span>Don't have an account? </span>
          <a href="/signup" className="text-blue-500">Sign up</a>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
