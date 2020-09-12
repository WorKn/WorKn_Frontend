import React from "react";
import { propTypes } from "react-bootstrap/esm/Image";
import "./Tag-Style.css";

const Tag = (props) => {
  return (
    <div className="tag">
      <span className={props.theme}>{props.text}</span>
    </div>
  );
};

export default Tag;
