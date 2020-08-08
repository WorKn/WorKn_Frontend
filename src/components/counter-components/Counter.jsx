import React from "react";
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
      <div className="counter">{countUp}</div>
    </div>
  );
};

export default Counter;
