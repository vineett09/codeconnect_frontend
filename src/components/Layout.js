import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/features/authSlice";
import { ChevronDown, Code } from "lucide-react";
import "../styles/Layout.css";

function Layout({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="layout-container">
      <nav className="navbar">
        <div className="navbar-content">
          <div className="brand">
            <Code className="brand-icon" size={24} />
            <span className="brand-text">CodeConnect</span>
          </div>

          <div className="nav-links">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/getting-started" className="nav-link">
              Getting Started
            </Link>
            <Link to="/contact" className="nav-link">
              Contact
            </Link>
          </div>

          <div className="auth-section">
            {isAuthenticated ? (
              <div className="user-menu">
                <span className="welcome-text">Welcome, {user.username}</span>
                <div className="menu-dropdown">
                  <button className="menu-trigger">
                    <ChevronDown size={20} />
                  </button>
                  <div className="menu-items">
                    <Link to="/snippets/create">Create Snippet</Link>
                    <Link to="/snippets">My Snippets</Link>
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                </div>
              </div>
            ) : (
              <Link to="/login" className="auth-button">
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>

      <div className="content">{children}</div>

      <footer className="footer">
        <div className="footer-content">
          <p>© 2024 CodeConnect. All rights reserved.</p>
          <Link to="/privacy-policy">Privacy Policy</Link>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
