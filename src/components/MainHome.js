import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/features/authSlice";
import "../styles/MainHome.css";
import logo from "../images/logo-3.png";

function MainHome() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="main-home-container">
      <nav className="navbar">
        <img src={logo} alt="CodeConnect Logo" className="logo" />
        <ul className="nav-menu">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/getting-started">Getting Started</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
        <div className="auth-button">
          {isAuthenticated ? (
            <div className="user-info">
              <span>Welcome, {user.username}</span>
              <div className="dropdown">
                <button className="dropbtn">▼</button>
                <div className="dropdown-content">
                  <Link to="/snippets/create">Create Snippet</Link>
                  <Link to="/snippets">My Snippets</Link>
                  <button onClick={handleLogout} className="dropdown-item">
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link to="/login">
              <button className="cta-button-up">Login</button>
            </Link>
          )}
        </div>
      </nav>

      <div className="hero-section">
        <h1 className="hero-title">Welcome to Code Connect</h1>
        <p className="hero-subtitle">
          Experience real-time collaborative coding.
        </p>
        <Link to="/home">
          <button className="cta-button">Create Room Now</button>
        </Link>
        <span className="free-text">It's free to join!</span>
      </div>

      <section className="overview-section">
        <h2>What is Code Connect?</h2>
        <p>
          Code Connect is a powerful collaborative coding platform tailored for
          developers, educators, and teams alike. Whether you're conducting
          coding interviews, collaborating on projects, or brainstorming ideas,
          our platform enables seamless real-time coding experiences.
        </p>
      </section>

      <section className="features-section">
        <div className="features-container">
          <div className="feature-card">
            <h3>Real-Time Collaboration</h3>
            <p>
              Work alongside your team in real-time. Share your code and solve
              problems together.
            </p>
          </div>
          <div className="feature-card">
            <h3>Intuitive Interface</h3>
            <p>
              Our user-friendly platform makes coding a breeze. Start your
              coding journey effortlessly.
            </p>
          </div>
          <div className="feature-card">
            <h3>Strict Mode</h3>
            <p>
              Enhance the integrity of coding interviews with our specialized
              strict mode features.
            </p>
          </div>
          <div className="feature-card">
            <h3>Code Snippets</h3>
            <p>
              Save and manage your favorite code snippets for easy access and
              sharing.
            </p>
          </div>
          <div className="feature-card">
            <h3>Integrated Chat</h3>
            <p>
              Stay connected with your team using our built-in chat feature for
              seamless communication.
            </p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Get Started?</h2>
        <p> start collaborating today!</p>
        <Link to="/home">
          <button className="cta-button">Join Now</button>
        </Link>
      </section>

      <footer className="footer">
        <p>
          © 2024 CodeConnect. All rights reserved. |{" "}
          <Link to="/privacy-policy">Privacy Policy</Link>
        </p>
      </footer>
    </div>
  );
}

export default MainHome;
