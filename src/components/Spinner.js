// src/components/Spinner.js
import React from "react";
import { ColorRing } from "react-loader-spinner";
import "../styles/Spinner.css";
const Spinner = ({ loading }) => {
  return (
    <div className="spinner-container">
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        loading={loading}
        size={50}
      />{" "}
    </div>
  );
};

export default Spinner;
