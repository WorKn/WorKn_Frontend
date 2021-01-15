import React, { useCallback, useMemo, useState } from "react";

import "./RecommendationBlock-Style.css";
import RecommendationCard from "./RecommendationCard";

const RecommendationBlock = ({ rec }) => {
  const [itemsToShow, setItemsToShow] = useState(4);

  const showMoreRecommendations = useCallback(() => {
    setItemsToShow(itemsToShow + 4);
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
        <span>{rec.title}</span>
      </span>
      <div className="recommendationspage__personlist">
        {RecommendationCards}
      </div>
      {itemsToShow < rec.recommended.length && (
        <div className="manageoffers__activecontainer">
          <div
            className="addoffer__newbutton"
            onClick={showMoreRecommendations}
          >
            <i className="fa fas fa-plus manageoffers__icon"></i>
            <span className="manageoffers__title--dark">Cargar más</span>
          </div>
        </div>
      )}
    </div>
  ) : null;
};

export default RecommendationBlock;
