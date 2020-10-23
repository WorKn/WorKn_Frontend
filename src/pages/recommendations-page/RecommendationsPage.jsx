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
import { useHistory } from "react-router-dom";
import "./RecommendationsPage-Style.css";

const RecommendationsPage = () => {
  const [userRecommendations, setUserRecommendations] = useState([]);
  const [offerRecommendations, setOfferRecommendations] = useState([]);
  const { state } = useStateMachine(updateAction);

  let history = useHistory();

  useEffect(() => {
    if (state.userInformation.userType === "offerer") {
      getUserRecommendation().then((res) => {
        console.log(res);
        if (res?.data?.data?.offers) {
          setUserRecommendations(res?.data?.data?.offers);
        }
      });
    } else if (state.userInformation.userType === "applicant") {
      getOfferRecommendation().then((res) => {
        setOfferRecommendations(res?.data?.data?.offers);
      });
    } else {
      history.push("/login");
    }
  }, []);

  const uRecommendations = userRecommendations.map((rec) => {
    if (rec.recommended.length > 0) {
      return (
        <React.Fragment key={rec._id}>
          <span className="recommendationspage__rectitle">
            Personas recomendadas para la oferta: <span>{rec.title}</span>
          </span>
          <div className="recommendationspage__personlist">
            {rec.recommended.map((person) => (
              <RecommendationCard
                personInfo={person}
                key={person._id}
              ></RecommendationCard>
            ))}
          </div>
        </React.Fragment>
      );
    } else {
    }
  });

  const oRecommendations = offerRecommendations.map((rec) => {
    return (
      <React.Fragment key={rec._id}>
        <RecommendationCard offerInfo={rec} key={rec._id}></RecommendationCard>
      </React.Fragment>
    );
  });

  console.log("your recommendations are:");
  console.log(offerRecommendations);
  // const [parameter, setParameter] = useState("");
  return (
    <div className="recommendationspage">
      <Header />
      <Banner image={"ooyAGWN.png"} />
      <div className="recommendationspage__container">
        {userRecommendations && (
          <div className="recommendationspage__body">{uRecommendations}</div>
        )}
        {offerRecommendations && (
          <div className="recommendationspage__body">
            <span className="recommendationspage__rectitle">
              Ofertas de trabajo <span>recomendadas para ti</span>
            </span>
            <div className="recommendationspage__offerlist">
              {oRecommendations}
            </div>
          </div>
        )}
      </div>
      <Footer></Footer>
    </div>
  );
};

export default RecommendationsPage;
