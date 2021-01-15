import React, { useState } from "react";

import "./StarRating-Style.css";

const StarRating = ({ ratingNumber, starValue, setStarValue, ref }) => {
  const [hover, setHover] = useState(null);

  return (
    <React.Fragment>
      {ratingNumber ? (
        <div>
          {[...Array(5)].map((star, i) =>
            i < ratingNumber ? (
              <i
                className="fa fa-star yellow-star yellow-star--disabled"
                key={i}
              ></i>
            ) : (
              <i className="fa fa-star yellow-star--disabled" key={i}></i>
            )
          )}
        </div>
      ) : (
        <div className="starrating__stars-container">
          {[...Array(5)].map((star, i) => {
            const ratingValue = i + 1;

            return (
              <label key={i}>
                <input
                  type="radio"
                  name="rating"
                  value={ratingValue}
                  onClick={() => setStarValue(ratingValue)}
                  required
                />

                <i
                  className={
                    ratingValue <= (hover || starValue)
                      ? `fa fa-star yellow-star`
                      : `fa fa-star`
                  }
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(null)}
                ></i>
              </label>
            );
          })}
          {/* <p>{`The current rating is: ${rating}`}</p> */}
        </div>
      )}
    </React.Fragment>
  );
};

export default StarRating;
