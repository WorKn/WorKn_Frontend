import React from "react";
import { useStateMachine } from "little-state-machine";
import updateAction from "../../updateAction";
import Banner from "../../components/banner-components/Banner";
import Header from "../../components/navbar-components/Navbar";
import "./SummaryPage-Style.css";
import OfferStrip from "../../components/offer-components/OfferStrip";

const SummaryPage = () => {
  const { state } = useStateMachine(updateAction);

  return (
    <div className="summarypage">
      <Header />
      <Banner image={"kiwVnMm.png"} />
      {typeof state.userInformation.userType !== "undefined" &&
      state.userInformation.userType === "applicant" ? (
        <div className="summarypage__inner">
          <span className="summarypage__title">
            Estas empresas están interesadas en tí
          </span>
          <OfferStrip></OfferStrip>
          <OfferStrip></OfferStrip>

          <span className="summarypage__title">
            Demostraste interés por estas empresas
          </span>
          <OfferStrip></OfferStrip>
          <span className="summarypage__title">Matches</span>
          <OfferStrip></OfferStrip>
        </div>
      ) : (
        <div className="summarypage__inner">
          <div className="summarypage__inner">
            <span className="summarypage__title">
              Estas personas están interesadas en tu oferta "Nombre Oferta #1"
            </span>
            <OfferStrip></OfferStrip>
            <OfferStrip></OfferStrip>
            <span className="summarypage__title">
              Estas personas están interesadas en tu oferta "Nombre Oferta #2"
            </span>
            <OfferStrip></OfferStrip>
            <OfferStrip></OfferStrip>
            <span className="summarypage__title">
              Demostraste interés por estas personas
            </span>
            <OfferStrip></OfferStrip>
            <span className="summarypage__title">Matches</span>
            <OfferStrip></OfferStrip>
          </div>{" "}
        </div>
      )}
    </div>
  );
};

export default SummaryPage;
