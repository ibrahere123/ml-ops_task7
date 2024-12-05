import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Replace useHistory with useNavigate
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
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
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2>Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <div style={styles.inputGroup}>
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          {error && <p style={styles.error}>{error}</p>}
          <button type="submit" style={styles.button}>Sign Up</button>
        </form>
        <p style={styles.loginLink}>
          Already have an account? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f4f4f4",
  },
  formContainer: {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "300px",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginTop: "5px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    fontSize: "12px",
  },
  loginLink: {
    textAlign: "center",
    marginTop: "10px",
  },
};

export default Signup;
