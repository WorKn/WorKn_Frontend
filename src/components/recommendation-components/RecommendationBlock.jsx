import React, { useCallback, useMemo, useState } from "react";

import "./RecommendationBlock-Style.css";
import RecommendationCard from "./RecommendationCard";

const RecommendationBlock = ({ rec }) => {
  const [itemsToShow, setItemsToShow] = useState(3);

  const showThreeMoreRecommendations = useCallback(() => {
    setItemsToShow(itemsToShow + 3);
  }, [itemsToShow]);

  const RecommendationCards = useMemo(
    () =>
      rec?.recommended
        .slice(0, itemsToShow)
        .map((person) => (
          <RecommendationCard
            personInfo={person}
            key={person._id}
          ></RecommendationCard>
        )),
    [rec, itemsToShow]
  );

  return rec?.recommended.length ? (
    <div className="recommendationspage__recommendationblock">
      <span className="recommendationspage__rectitle">
        Personas recomendadas para la oferta: <span>{rec.title}</span>
      </span>
      <div className="recommendationspage__personlist">
        {RecommendationCards}
      </div>
      {itemsToShow < rec.recommended.length && (
        <button
          className="recommendationspage__show-more"
          onClick={showThreeMoreRecommendations}
        >
          Show More
        </button>
      )}
    </div>
  ) : null;
};

export default RecommendationBlock;
