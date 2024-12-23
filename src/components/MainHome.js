import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/features/authSlice";
import {
  ChevronDown,
  Code,
  Users,
  Lock,
  FileCode,
  MessageSquare,
} from "lucide-react";
import "../styles/MainHome.css";
function MainHome() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const handleScroll = () => {
      const elements = document.querySelectorAll(".animate-on-scroll");
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const isInView = rect.top <= window.innerHeight * 0.8;
        if (isInView) {
          el.classList.add("visible");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="main-home-container">
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

      <section className={`hero ${isVisible ? "visible" : ""}`}>
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="gradient-text">Code Together,</span>
            <span className="gradient-text">Create Together</span>
          </h1>
          <p className="hero-subtitle">
            Experience seamless real-time collaborative coding
          </p>
          <div className="hero-actions">
            <Link to="/home" className="primary-button">
              Create Room Now
              <span className="button-shadow"></span>
            </Link>
          </div>
        </div>
        <div className="hero-background">
          <div className="gradient-sphere"></div>
          <div className="code-pattern"></div>
        </div>
      </section>

      <section className="overview animate-on-scroll">
        <div className="overview-content">
          <h2>What is Code Connect?</h2>
          <p>
            Code Connect is a powerful collaborative coding platform tailored
            for developers, educators, and teams alike. Whether you're
            conducting coding interviews, collaborating on projects, or
            brainstorming ideas, our platform enables seamless real-time coding
            experiences.
          </p>
        </div>
      </section>

      <section className="features">
        <div className="features-grid">
          {[
            {
              icon: <Users size={24} />,
              title: "Real-Time Collaboration",
              description:
                "Work alongside your team in real-time. Share your code and solve problems together.",
            },
            {
              icon: <Code size={24} />,
              title: "Intuitive Interface",
              description:
                "Our user-friendly platform makes coding a breeze. Start your coding journey effortlessly.",
            },
            {
              icon: <Lock size={24} />,
              title: "Strict Mode",
              description:
                "Enhance the integrity of coding interviews with our specialized strict mode features.",
            },
            {
              icon: <FileCode size={24} />,
              title: "Code Snippets",
              description:
                "Save and manage your favorite code snippets for easy access and sharing.",
            },
            {
              icon: <MessageSquare size={24} />,
              title: "Integrated Chat",
              description:
                "Stay connected with your team using our built-in chat feature for seamless communication.",
            },
          ].map((feature, index) => (
            <div key={index} className="feature-card animate-on-scroll">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cta animate-on-scroll">
        <div className="cta-content">
          <h2>Ready to Get Started?</h2>
          <p>Join thousands of developers already using Code Connect</p>
          <Link to="/home" className="cta-button">
            Join Now
            <span className="button-shadow"></span>
          </Link>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <p>© 2024 CodeConnect. All rights reserved.</p>
          <Link to="/privacy-policy">Privacy Policy</Link>
        </div>
      </footer>
    </div>
  );
}

export default MainHome;
