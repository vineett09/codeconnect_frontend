import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { loginSuccess } from "../redux/features/authSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast"; // To maintain consistency in toast notifications
import Spinner from "../components/Spinner"; // Import the Spinner component
import "../styles/Register.css"; // Import the CSS file for styling
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkUsernameAvailability = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/auth/check-username`,
        {
          username,
        }
      );
      return response.data.available; // Assuming your backend returns an object with 'available' key
    } catch (error) {
      console.error("Error checking username availability", error);
      return false; // Default to unavailable on error
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match!");
    }

    setLoading(true); // Set loading to true when starting registration

    const isUsernameAvailable = await checkUsernameAvailability();
    if (!isUsernameAvailable) {
      setLoading(false); // Hide loading
      return toast.error("Username already taken. Try with a different one.");
    }

    try {
      const { data } = await axios.post(`${BACKEND_URL}/api/auth/register`, {
        username,
        email,
        password,
      });
      dispatch(loginSuccess(data));
      navigate("/login");
      toast.success("Registration successful! Please log in.");
    } catch (error) {
      toast.error("Registration failed");
      console.error("Registration failed", error);
    } finally {
      setLoading(false); // Set loading to false after registration attempt
    }
  };

  return (
    <div className="register-container">
      {loading && <Spinner loading={loading} />} {/* Show spinner if loading */}
      <div className="register-card">
        <img src="/images/logo-3.png" alt="Logo" className="register-logo" />
        <h4 className="register-title">Create an Account</h4>
        <form onSubmit={handleSubmit}>
          <div className="register-form-group">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="register-input"
              placeholder="Username"
              required
            />
          </div>
          <div className="register-form-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="register-input"
              placeholder="Email"
              required
            />
          </div>
          <div className="register-form-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="register-input"
              placeholder="Password"
              required
            />
          </div>
          <div className="register-form-group">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="register-input"
              placeholder="Confirm Password"
              required
            />
          </div>
          <button type="submit" className="register-button" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="register-text">
          Already have an account?{" "}
          <span className="register-link" onClick={() => navigate("/login")}>
            Log In
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
