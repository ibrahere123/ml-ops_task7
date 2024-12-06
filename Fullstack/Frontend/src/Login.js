import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory

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
  signupLink: {
    textAlign: "center",
    marginTop: "10px",
  },
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for managing error messages
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Both username and password are required.");
      return;
    }

    try {
      // Send credentials to the backend /login route
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      // Check if the login was successful and if the token is returned
      if (data.token) {
        localStorage.setItem("token", data.token); // Store the token in localStorage
        navigate("/weatherform"); // Navigate to the WeatherForm page
      } else {
        setError(data.error || "Invalid username or password"); // Show error message from backend
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("An error occurred while logging in. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2>Login</h2>

        <div style={styles.inputGroup}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            style={styles.input}
          />
        </div>

        {error && <div style={styles.error}>{error}</div>} {/* Error message */}

        <div>
          <button onClick={handleLogin} style={styles.button}>
            Login
          </button>
        </div>

        <div style={styles.signupLink}>
          <span>Don't have an account? </span>
          <a href="/signup">Sign up</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
