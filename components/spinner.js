import React from "react";

const Spinner = ({ width = "20px", height = "20px" }) => {
  return (
    <div
      className="spinner"
      style={{
        width,
        height,
        borderWidth: `${parseInt(width, 10) / 10}px`, // Dynamic border thickness
      }}
    />
  );
};

export default Spinner;
