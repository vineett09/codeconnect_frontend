// src/components/Spinner.js
import React from "react";
import { PropagateLoader } from "react-spinners";
import "../styles/Spinner.css";
const Spinner = ({ loading }) => {
  return (
    <div className="spinner-container">
      <PropagateLoader color="#3498db" loading={loading} size={50} />
    </div>
  );
};

export default Spinner;
