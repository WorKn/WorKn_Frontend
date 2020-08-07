import React from "react";
import "./Counter-Style.css";
import { useCountUp } from "react-countup";

const Counter = () => {
  const { countUp } = useCountUp({
    start: 0,
    end: 12345,
    delay: 0,
    duration: 1.8,
    separator: ",",
  });
  return (
    <div>
      {({ countUpRef }) => (
        <div>
          <span ref={countUpRef} />
        </div>
      )}
      <div>{countUp}</div>
    </div>
  );
};

export default Counter;
