import React, { useEffect, useState } from "react";
import { useStateMachine } from "little-state-machine";
import updateAction from "../../updateAction";
import Banner from "../../components/banner-components/Banner";
import Header from "../../components/navbar-components/Navbar";
import "./SummaryPage-Style.css";
import OfferStrip from "../../components/offer-components/OfferStrip";
import { getMyInteractions, getMyOffers } from "../../utils/apiRequests";
import { useForm } from "react-hook-form";

const SummaryPage = () => {
  const [offers, setOffers] = useState();
  const [applied, setApplied] = useState();
  const [interested, setInterested] = useState();
  const [match, setMatches] = useState();
  const { state } = useStateMachine(updateAction);
  const { register, handleSubmit } = useForm({});

  useEffect(() => {
    getMyOffers().then((res) => {
      if (res !== undefined) {
        console.log(res);
        setOffers(res);
      }
    });
  }, []);

  useEffect(() => {
    if (
      state.userInformation.userType !== "undefined" &&
      state.userInformation.userType === "applicant"
    ) {
      getMyInteractions().then((res) => {
        setApplied(res.data.data.interactions.applied);
        setInterested(res.data.data.interactions.interesed);
        setMatches(res.data.data.interactions.match);
        console.log(res);
      });
    } else if (
      state.userInformation.userType !== "undefined" &&
      state.userInformation.userType === "offerer"
    ) {
      getMyInteractions().then((res) => {
        // setApplied(res.data.data.interactions.applied);
        // setInterested(res.data.data.interactions.interesed);
        // setMatches(res.data.data.interactions.match);
        console.log(res);
      });

      console.log("a correr los lakers");
    }
  }, []);

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
          {interested?.map((i) => (
            <OfferStrip key={i._id} responseInfo={i}></OfferStrip>
          ))}
          <span className="summarypage__title">
            Demostraste interés por estas empresas
          </span>
          {applied?.map((a) => (
            <OfferStrip key={a._id} responseInfo={a}></OfferStrip>
          ))}
          <span className="summarypage__title">Matches</span>
          {match?.map((m) => (
            <OfferStrip key={m._id} responseInfo={m}></OfferStrip>
          ))}
        </div>
      ) : (
        <div className="summarypage__inner">
          <div className="summarypage__inner">
            <div>
              <select className="form__select" name="offer" ref={register}>
                {offers?.data.data.offers.map((offer) => (
                  <option key={offer._id} value={offer._id}>
                    {offer.title}
                  </option>
                ))}
              </select>
              {/* {offers?.data.data.offers.map((offer) => (
                <div>
                  <span
                    className="summarypage__title"
                    key={offer._id}
                    value={offer._id}
                  >
                    {offer.title}
                  </span>
                  {interested?.map((i) => (
                    <OfferStrip key={i._id} responseInfo={i}></OfferStrip>
                  ))}
                </div>
              ))} */}
            </div>
            {/* <span className="summarypage__title">
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
            <OfferStrip></OfferStrip> */}
          </div>{" "}
        </div>
      )}
    </div>
  );
};

export default SummaryPage;
