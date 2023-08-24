import React from "react";
import loading from "./Eclipse-1s-200px (1).gif";

const Spinner = () => {
  const spinnerStyle = {
    fontSize: "2px",
    width: "10px",
    height: "10px", // Corrected property name
  };
  return (
    <div className="text-center" style={spinnerStyle}>
      <img src={loading} alt="loading"></img>
    </div>
  );
};
export default Spinner;
