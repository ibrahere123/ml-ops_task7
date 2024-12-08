const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const axios = require("axios"); // Add this line to import axios
require("dotenv").config({ path: "../../../.env" });

const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000", // Replace with your React app's URL
  credentials: true, // Allow credentials if needed
}));

// MongoDB Connection
const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
  console.error("MONGO_URI is not defined in .env");
  process.exit(1); // Exit the process if MONGO_URI is not provided
}

mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Check for JWT_SECRET in .env
if (!process.env.JWT_SECRET) {
  console.error("JWT_SECRET is not defined in .env");
  process.exit(1); // Exit if JWT_SECRET is missing
}

// Define User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

// Signup Route
app.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error in /signup:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Login Route with JWT
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({
      message: "Login successful",
      token, // Send the token back to the frontend
    });
  } catch (error) {
    console.error("Error in /login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Middleware to Authenticate JWT
const authenticateJWT = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Get the token from the Authorization header
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Forbidden" });
    }
    req.user = user;
    next();
  });
};

// Prediction Route
//app.post("/predict", authenticateJWT, async (req, res) => {
app.post("/predict", async (req, res) => {
  
  const { humidity, wind_speed, precipitation } = req.body;

  if (typeof humidity !== 'number' || typeof wind_speed !== 'number' || typeof precipitation !== 'number') {
    return res.status(400).json({ error: "All fields must be numbers" });
  }

  try {
    // Assuming you want to call an external prediction API
    const response = await axios.post("http://localhost:5000/predict", {
      humidity,
      wind_speed,
      precipitation,
    });

    const { predicted_temperature } = response.data;
    res.status(200).json({ predicted_temperature });
  } catch (error) {
    console.error("Error in /predict:", error.response || error.message || error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
