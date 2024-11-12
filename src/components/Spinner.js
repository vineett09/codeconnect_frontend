import React from "react";
import "../styles/Spinner.css"; // Ensure this CSS file is included

const Spinner = ({ loading }) => {
  return (
    <div className={`spinner-container ${loading ? "loading" : ""}`}>
      <div className="loader"></div>
    </div>
  );
};

export default Spinner;
