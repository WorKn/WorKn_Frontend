import React from "react";

const Icon = ({ media }) => {
  const URL = `https://imgur.com/${media}`;
  return (
    <div className="icon">
      <img src={URL} alt="app" />
    </div>
  );
};

export default Icon;
