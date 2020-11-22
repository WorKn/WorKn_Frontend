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
import ProfileNotCompleted from "../../components/profilenotcompleted-components/ProfileNotCompleted";

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
        console.log(res);
        setOfferRecommendations(res?.data?.data?.offers);
      });
    } else {
      history.push("/login");
    }
    // eslint-disable-next-line
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

      {state.userInformation.isSignupCompleted ? (
        <div className="recommendationspage__container">
          {userRecommendations && (
            <div className="recommendationspage__body">
              {uRecommendations}
              {typeof userRecommendations &&
              (userRecommendations?.length < 1 ||
                userRecommendations === undefined) ? (
                <div className="summary__announcement">
                  <div className="summarypage__imgbg">
                    <img
                      src="https://i.imgur.com/VhPGUOU.png"
                      alt="applied"
                      className="summarypage_appliedimg"
                    ></img>
                  </div>
                  <div className="summary__announcementinner">
                    <span className="summarypagea__title--dark">
                      No hemos podido recomendar ningún usuario basado en sus
                      ofertas.
                    </span>
                    <span>
                      Asegurate de crear un perfil llamativo que atrape a los
                      usuarios que se encuentren contigo en la plataforma.
                      También puedes utilizar la página de Exploración para
                      encontrar usuarios de manera manual.
                    </span>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          )}
          {offerRecommendations && (
            <div className="recommendationspage__body">
              <span className="recommendationspage__rectitle">
                Ofertas de trabajo <span>recomendadas para ti</span>
              </span>
              {typeof offerRecommendations &&
              (offerRecommendations?.length < 1 ||
                offerRecommendations === undefined) ? (
                <div className="summary__announcement">
                  <div className="summarypage__imgbg">
                    <img
                      src="https://i.imgur.com/ESdjiH3.png"
                      alt="applied"
                      className="summarypage_appliedimg"
                    ></img>
                  </div>
                  <div className="summary__announcementinner">
                    <span className="summarypagea__title--dark">
                      No hemos podido generar ninguna recomendación.
                    </span>
                    <span>
                      Asegurate de crear un perfil llamativo que atrape a los
                      usuarios que se encuentren contigo en la plataforma.
                      También puedes utilizar la página de Exploración para
                      aplicar manualmente a ofertas de trabajo.
                    </span>
                  </div>
                </div>
              ) : (
                ""
              )}
              <div className="recommendationspage__offerlist">
                {oRecommendations}
              </div>
            </div>
          )}
        </div>
      ) : (
        <ProfileNotCompleted></ProfileNotCompleted>
      )}

      <Footer></Footer>
    </div>
  );
};

export default RecommendationsPage;
