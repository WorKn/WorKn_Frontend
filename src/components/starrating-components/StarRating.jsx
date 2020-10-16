import React, { useState } from "react";

import "./StarRating-Style.css";

const StarRating = () => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  return (
    <div className="starrating__stars-container">
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;

        return (
          <label>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
            />

            <i
              className={
                ratingValue <= (hover || rating)
                  ? `fa fa-star yellow-star`
                  : `fa fa-star`
              }
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            ></i>
          </label>
        );
      })}
      <p>{`The current rating is: ${rating}`}</p>
    </div>
  );
};

export default StarRating;
