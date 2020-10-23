import React, { useEffect, useState } from "react";
import Banner from "../../components/banner-components/Banner";
import Header from "../../components/navbar-components/Navbar";
import Footer from "../../components/footer-components/Footer";
import RecommendationCard from "../../components/recommendation-components/RecommendationCard";
import updateAction from "../../updateAction";
import { useStateMachine } from "little-state-machine";
import {
  getOfferRecommendation,
  getUserRecommendation,
} from "../../utils/apiRequests";
import "./RecommendationsPage-Style.css";

const RecommendationsPage = () => {
  const [recommendations, setRecommendations] = useState([]);

  const myRecommendations = recommendations.map((rec) => {
    if (rec.recommended.length > 0) {
      return (
        <React.Fragment key={rec._id}>
          <div className="recommendationspage__body">
            <h2 className="recommendationspage__rectitle">
              Personas recomendadas para la oferta: {rec.title}
            </h2>
            {rec.recommended.map((person) => (
              <div className="recommendationspage__personlist" key={person._id}>
                <RecommendationCard personInfo={person}></RecommendationCard>
              </div>
            ))}
          </div>
        </React.Fragment>
      );
    } else {
    }
  });

  useEffect(() => {
    getUserRecommendation().then((res) => {
      console.log(res);
      if (res?.data?.data?.offers) {
        setRecommendations(res?.data?.data?.offers);
      }
    });
  }, []);

  console.log(recommendations);
  // const [parameter, setParameter] = useState("");
  return (
    <div className="recommendationspage">
      <Header />
      <Banner image={"ooyAGWN.png"} />
      <div className="recommendationspage__container">
        {recommendations ? (
          myRecommendations
        ) : (
          <h2>No recommendations found... Yet!</h2>
        )}
      </div>
      <Footer></Footer>
    </div>
  );
};

export default RecommendationsPage;
