import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/features/authSlice";
import "../styles/Layout.css";
import logo from "../images/logo-3.png";

function Layout({ children }) {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
  };

  return (
    <div className="layout-container">
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
              <span>Welcome, {user?.username}</span>
              <div className="dropdown">
                <button className="dropbtn">▼</button>
                <div className="dropdown-content">
                  <Link to="/snippets">My Snippets</Link>
                  <Link to="/snippets/create">Create Snippet</Link>

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
      <div className="content">{children}</div>
      <footer className="footer">
        <p>
          © 2024 CodeConnect. All rights reserved. |{" "}
          <Link to="/privacy-policy">Privacy Policy</Link>
        </p>
      </footer>
    </div>
  );
}

export default Layout;
