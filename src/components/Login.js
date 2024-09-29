import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { loginSuccess } from "../redux/features/authSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Spinner from "../components/Spinner"; // Import the Spinner component
import "../styles/Login.css";
import { signInWithGoogle } from "../config/firebaseConfig"; // Import the Google Sign-In function
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show spinner

    try {
      const response = await axios.post(`${BACKEND_URL}/api/auth/login`, {
        email,
        password,
      });

      if (response.data.success) {
        const { token, user } = response.data;
        localStorage.setItem("token", token);
        dispatch(loginSuccess(user));
        navigate("/");
        toast.success("Login successful!");
      } else {
        toast.error(response.data.message || "Login failed!");
      }
    } catch (error) {
      toast.error("Error in login attempt");
      console.error("Error in handleSubmit:", error);
    } finally {
      setLoading(false); // Hide spinner
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true); // Show spinner
    try {
      const result = await signInWithGoogle();
      const user = result.user;
      // Send user info to your backend server
      const response = await axios.post(
        `${BACKEND_URL}/api/auth/google-login`,
        {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        }
      );

      if (response.data.success) {
        const { token, user } = response.data;
        localStorage.setItem("token", token);
        dispatch(loginSuccess(user));
        navigate("/");
        toast.success("Google Sign-In successful!");
      } else {
        toast.error(response.data.message || "Google Sign-In failed!");
      }
    } catch (error) {
      toast.error("Error during Google Sign-In");
      console.error("Error in handleGoogleSignIn:", error);
    } finally {
      setLoading(false); // Hide spinner
    }
  };

  const navigateToRegister = () => {
    navigate("/register"); // Navigate to the register page
  };

  return (
    <div className="login-container">
      {loading ? (
        <Spinner loading={loading} /> // Show spinner if loading
      ) : (
        <div className="login-card">
          <img src="/images/logo-3.png" alt="Logo" className="login-logo" />
          <h4 className="login-title">Login to Your Account</h4>
          <form onSubmit={handleSubmit}>
            <div className="login-form-group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="login-input"
                placeholder="Email"
                required
              />
            </div>
            <div className="login-form-group">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input"
                placeholder="Password"
                required
              />
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
          <div className="or-text">or</div> {/* Added "or" text */}
          <button onClick={handleGoogleSignIn} className="google-signin-button">
            Sign in with Google
          </button>
          <p className="login-text">
            Don't have an account?{" "}
            <span className="login-link" onClick={navigateToRegister}>
              Sign Up
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default Login;
