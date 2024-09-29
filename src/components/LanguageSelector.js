import React from "react";
import "../styles/LanguageSelector.css"; // Import the CSS file

const LanguageSelector = ({ selectedLanguage, onLanguageChange }) => {
  return (
    <div className="language-selector-container">
      <label className="language-selector-label" htmlFor="language-select">
        Language:
      </label>
      <select
        id="language-select"
        value={selectedLanguage}
        onChange={onLanguageChange}
        className="language-selector-dropdown"
      >
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="java">Java</option>
        <option value="csharp">C#</option>
        <option value="cpp">C++</option>
        <option value="html">HTML</option>
        <option value="css">CSS</option>
        <option value="typescript">TypeScript</option>
        <option value="ruby">Ruby</option>
        {/* Add more languages as needed */}
      </select>
    </div>
  );
};

export default LanguageSelector;
