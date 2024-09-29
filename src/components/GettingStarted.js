import React from "react";
import Layout from "./Layout";
import "../styles/GettingStarted.css";

function GettingStarted() {
  return (
    <Layout>
      <div className="getting-started-container">
        <h1>Welcome to Code Connect!</h1>
        <p>
          Unlock your coding potential by collaborating with your team in
          real-time. Here’s how to get started:
        </p>

        <div className="steps-container">
          <div className="step-card">
            <h2>1. Sign Up / Log In</h2>
            <p>
              Create an account or log in to access our collaborative features.
            </p>
          </div>
          <div className="step-card">
            <h2>2. Create or Join a Room</h2>
            <p>Start a new room or enter an existing one with the room ID.</p>
          </div>
          <div className="step-card">
            <h2>3. Invite Team Members</h2>
            <p>
              Send invitations to your teammates to join the coding session.
            </p>
          </div>
          <div className="step-card">
            <h2>4. Start Coding Together</h2>
            <p>Collaborate in real-time and see changes instantly.</p>
          </div>
          <div className="step-card">
            <h2>5. Utilize Built-In Tools</h2>
            <p>
              Enhance your experience with our chat, file sharing, and version
              control tools.
            </p>
          </div>
        </div>

        <h2>Need Assistance?</h2>
        <p>
          If you have any questions, feel free to reach out to us on the{" "}
          <strong>Contact</strong> page.
        </p>
      </div>
    </Layout>
  );
}

export default GettingStarted;
