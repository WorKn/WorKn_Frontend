import React from "react";
// import { Link } from "react-router-dom";

const Icon = ({ path, media }) => {
  const URL = `https://imgur.com/${media}`;
  return (
    <div className="icon-footer">
      <a href={path} target="_blank" rel="noopener noreferrer">
        <img src={URL} alt="app" />
      </a>
      {/* (<Link to="/"> <img src={URL} alt="workn-logo" /> </Link>) */}
    </div>
  );
};

export default Icon;
