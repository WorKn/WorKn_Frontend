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
  const [selectedOffer, setSelectedOffer] = useState();

  const onSubmit = (data) => {
    setSelectedOffer(data.offer);
  };

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
        setInterested(res.data.data.interactions.interested);
        setMatches(res.data.data.interactions.match);
        console.log(res);
      });
    }
  }, []);

  useEffect(() => {
    if (
      state.userInformation.userType !== "undefined" &&
      state.userInformation.userType === "offerer" &&
      selectedOffer
    ) {
      getMyInteractions(selectedOffer).then((res) => {
        if (res !== undefined) {
          console.log(res);
        }
        setApplied(res.data.data.interactions.applied);
        setInterested(res.data.data.interactions.interested);
        setMatches(res.data.data.interactions.match);
      });
    }
  }, [selectedOffer]);

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
            Demostraste interés por estas ofertas
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
            <div className="summarypage__header">
              <span className="summarypage__title--dark">
                Selecciona la oferta que quieres revisar
              </span>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="summarypage__form"
              >
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
                <input
                  className="custom-button bg-green"
                  type="submit"
                  value="Ir"
                />
              </form>
            </div>

            <span className="summarypage__title">
              Estas personas están interesadas
            </span>
            {applied?.map((a) => (
              <OfferStrip key={a._id} responseInfo={a}></OfferStrip>
            ))}
            <span className="summarypage__title">
              Demostraste interés por estas personas
            </span>
            {interested?.map((i) => (
              <OfferStrip key={i._id} responseInfo={i}></OfferStrip>
            ))}

            <span className="summarypage__title">Matches</span>
            {match?.map((m) => (
              <OfferStrip key={m._id} responseInfo={m}></OfferStrip>
            ))}
          </div>{" "}
        </div>
      )}
    </div>
  );
};

export default SummaryPage;
