import React from "react";
import CountUp from "react-countup";

const Counter = ({ limit }) => {
  return (
    <CountUp start={0} end={limit} delay={1.9}>
      {({ countUpRef }) => (
        <div className="counter-container">
          <span ref={countUpRef} />
        </div>
      )}
    </CountUp>
  );
};

export default Counter;
