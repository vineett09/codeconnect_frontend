import React, { useState } from "react";
import Layout from "./Layout";
import "../styles/Contact.css";
import Spinner from "../components/Spinner"; // Import Spinner component

function Contact() {
  const [loading, setLoading] = useState(false);

  const handleEmailClick = () => {
    setLoading(true);
    window.location.href = "mailto:support@codeconnect.com";
    setTimeout(() => {
      setLoading(false); // Stops loading after redirection
    }, 3000); // Adjust the timeout duration as needed
  };

  return (
    <Layout>
      <div className="page-content">
        <h1>Contact Us</h1>
        <p>
          We’d love to hear from you! Whether you have a question, feedback, or
          need support, feel free to get in touch with us.
        </p>
        <div className="contact-details">
          <p>
            <strong>Email:</strong> codeconnect@gmail.com
          </p>
        </div>
        <button className="email-button" onClick={handleEmailClick}>
          Send us an Email
        </button>
        {loading && <Spinner loading={loading} />}{" "}
      </div>
    </Layout>
  );
}

export default Contact;
