import React, { useEffect, useState } from "react";
import "./ExplorePage-Style.css";
import Banner from "../../components/banner-components/Banner";
import Header from "../../components/navbar-components/Navbar";
import { useForm } from "react-hook-form";
import OfferCard from "../../components/offer-components/OfferCard";
import { getAllUsers, getAllOffers } from "../../utils/apiRequests";
import updateAction from "../../updateAction";
import { useStateMachine } from "little-state-machine";

const ExplorePage = () => {
  const [response, setResponse] = useState("");
  const { register, handleSubmit } = useForm({});
  const { state } = useStateMachine(updateAction);
  const onSubmit = (data) => {
    console.log(data);
  };

  useEffect(() => {
    if (
      state.userInformation.userType !== "undefined" &&
      state.userInformation.userType === "offerer"
    ) {
      getAllUsers().then((res) => {
        console.log(res);
        console.log("ofertante detected");
      });
    } else if (
      state.userInformation.userType !== "undefined" &&
      state.userInformation.userType === "applicant"
    ) {
      getAllOffers().then((res) => {
        console.log(res);
        console.log("aplicante detected");
      });
    } else {
      getAllOffers().then((res) => {
        console.log("no type detected");
        console.log(res);
      });
    }
  }, [state.userInformation.userType]);

  return (
    <div>
      <div className="explorepage">
        <Header />
        <Banner image={"kiwVnMm.png"} />
        <div className="explorepage__inner">
          <form className="explorepage__wrapper">
            <div className="explorepage__searchbox">
              <input
                name="query"
                type="text"
                className="explorepage__inputsearch"
                placeholder="Busca nombres, empresas, organizaciones o etiquetas"
                ref={register()}
              ></input>
              <div
                onClick={handleSubmit(onSubmit)}
                className="explorepage__searchbtn"
              >
                <i className="fa fa-search"></i>{" "}
              </div>
            </div>
          </form>
          <div className="explorepage__cardscontainer">
            <OfferCard></OfferCard>
            <OfferCard></OfferCard>
            <OfferCard></OfferCard>
            <OfferCard></OfferCard>
            <OfferCard></OfferCard>
            <OfferCard></OfferCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
