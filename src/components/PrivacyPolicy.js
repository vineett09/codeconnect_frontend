// src/pages/PrivacyPolicy.js
import React from "react";
import Layout from "./Layout";
import "../styles/PrivacyPolicy.css"; // Import the CSS file

function PrivacyPolicy() {
  return (
    <Layout>
      <div className="privacy-policy-container">
        <h1>Privacy Policy</h1>
        <p>Privacy Policy Effective Date: September 24, 2024</p>
        <h2>1. Introduction</h2>
        <p>
          CodeConnect is committed to protecting your privacy. This Privacy
          Policy outlines how we collect, use, disclose, and safeguard your
          personal information when you access or use our services.
        </p>
        <h2>2. Information We Collect</h2>
        <p>We may collect the following types of personal information:</p>
        <ul>
          <li>
            <strong>Account Information:</strong> When you create an account, we
            may collect your name, email address, username, and password.
          </li>
          <li>
            <strong>Usage Data:</strong> We may collect information about how
            you use our services, such as your IP address, browser type, device
            information, and the pages you visit.
          </li>
          <li>
            <strong>Code Snippets:</strong> If you choose to save or share code
            snippets, we may collect and store that information.
          </li>
        </ul>
        <h2>3. How We Use Your Information</h2>
        <p>We may use your personal information for the following purposes:</p>
        <ul>
          <li>
            To provide and improve our services: We use your information to
            operate our platform, personalize your experience, and provide
            customer support.
          </li>
          <li>
            To communicate with you: We may use your contact information to send
            you important updates, notifications, and marketing communications.
          </li>
          <li>
            To protect our platform: We may use your information to prevent
            fraud, abuse, and other security threats.
          </li>
          <li>
            To comply with legal requirements: We may use your information to
            comply with applicable laws and regulations.
          </li>
        </ul>
        <h2>4. Sharing Your Information</h2>
        <p>We may share your personal information with:</p>
        <ul>
          <li>
            <strong>Third-party service providers:</strong> We may share your
            information with third-party service providers who help us operate
            our services, such as hosting providers, payment processors, and
            customer support providers.
          </li>
          <li>
            <strong>Other users:</strong> If you choose to share code snippets
            or chat messages with other users, we may share that information
            with them.
          </li>
          <li>
            <strong>Law enforcement or regulatory authorities:</strong> We may
            share your information with law enforcement or regulatory
            authorities if required by law or to protect our platform.
          </li>
        </ul>
        <h2>5. Cookies and Tracking Technologies</h2>
        <p>
          We may use cookies and other tracking technologies to collect
          information about your use of our services. You can manage your cookie
          preferences through your browser settings.
        </p>
        <h2>6. Your Rights</h2>
        <p>
          You may have certain rights regarding your personal information, such
          as the right to access, correct, delete, or restrict the processing of
          your information. To exercise these rights, please contact us using
          the information provided below.
        </p>
        <h2>7. Security</h2>
        <p>
          We implement reasonable security measures to protect your personal
          information from unauthorized access, disclosure, alteration, or
          destruction. However, no method of transmission over the internet or
          electronic storage is completely secure.
        </p>
        <h2>8. Changes to This Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify
          you of any material changes by posting a notice on our website or by
          contacting you directly.
        </p>
        <h2>9. Contact Us</h2>
        <p>
          If you have any questions or concerns about this Privacy Policy or our
          practices, please contact us at: Email: codeconnect@gmail.com
        </p>
        <p>
          By using our services, you consent to the collection, use, disclosure,
          and safeguarding of your personal information as described in this
          Privacy Policy.
        </p>
      </div>
    </Layout>
  );
}

export default PrivacyPolicy;
