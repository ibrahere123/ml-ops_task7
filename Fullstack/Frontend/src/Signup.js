import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import { motion } from "framer-motion"; // Import framer-motion

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/signup", {
        username,
        password,
      });
      alert("Registration successful, you can now login.");
      navigate("/login"); // Redirect to login page after successful sign-up
    } catch (err) {
      setError("Error occurred during registration.");
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
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Sign Up</h2>

        <form onSubmit={handleSignUp} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full pl-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 transition-all duration-300"
              required
            />
          </div>
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full pl-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 transition-all duration-300"
              required
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
            type="submit"
            className="w-full py-3 rounded-lg text-white font-semibold bg-blue-500 hover:bg-blue-600 transition-all duration-300"
          >
            Sign Up
          </motion.button>
        </form>

        <div className="mt-4 text-center">
          <span>Already have an account? </span>
          <a href="/login" className="text-blue-500">Login here</a>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
