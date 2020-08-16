import React from "react";
import { useCountUp } from "react-countup";

const Counter = () => {
  const { countUp } = useCountUp({
    start: 0,
    end: 18340,
    delay: 0,
    duration: 1.8,
    separator: ",",
  });
  return (
    <div className="counter-container">
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
