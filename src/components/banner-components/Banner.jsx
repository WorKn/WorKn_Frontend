import React from "react";
import "./Banner-Style.css";

const Banner = ({ image }) => {
  const URL = `https://imgur.com/${image}`;
  return (
    <div className="Banner-image-container">
      <img src={URL} alt="Banner-media" />
    </div>
  );
};

export default Banner;
