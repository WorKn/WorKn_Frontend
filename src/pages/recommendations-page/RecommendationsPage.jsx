import React, { useEffect, useMemo, useState } from "react";
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
import RecommendationBlock from "../../components/recommendation-components/RecommendationBlock";

const RecommendationsPage = () => {
  const [userRecommendations, setUserRecommendations] = useState();

  const [offerRecommendations, setOfferRecommendations] = useState();
  const { state } = useStateMachine(updateAction);

  let history = useHistory();

  useEffect(() => {
    if (state.userInformation.userType === "offerer") {
      getUserRecommendation().then((res) => {
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

  const oRecommendations = useMemo(
    () =>
      offerRecommendations &&
      offerRecommendations.map((rec) => {
        return (
          <React.Fragment key={rec._id}>
            <RecommendationCard
              offerInfo={rec}
              key={rec._id}
            ></RecommendationCard>
          </React.Fragment>
        );
      }),
    [offerRecommendations]
  );

  const uRecommendations = useMemo(
    () =>
      userRecommendations &&
      userRecommendations.map((rec) => (
        <RecommendationBlock key={rec._id} rec={rec} />
      )),
    [userRecommendations]
  );

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
