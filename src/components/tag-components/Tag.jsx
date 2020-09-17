import React from "react";
import "./Tag-Style.css";

const Tag = (props) => {
  return (
    <div className="tag">
      <span className={props.theme}>{props.text}</span>
    </div>
  );
};

export default Tag;
