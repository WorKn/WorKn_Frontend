import React, { useEffect, useState } from "react";

import "./ManageOffersPage-Style.css";

import Header from "../../components/navbar-components/Navbar.jsx";

import { getMyOffers } from "../../utils/apiRequests";
import { getMyOrganization } from "../../utils/apiRequests";

import CustomOfferStrip from "../../components/offer-components/CustomOfferStrip";

import updateAction from "../../updateAction";

import { useStateMachine } from "little-state-machine";

const ManageOffersPage = () => {
  const [myoffers, setMyOffers] = useState([]);

  const { state } = useStateMachine(updateAction);

  const currentUserPicture = state.userInformation.profilePicture;

  const organizationInfo = getMyOrganization();

  /*
  Utilizar UseMemo para el myoffers.map
  */

  useEffect(() => {
    getMyOffers().then(
      ({
        data: {
          data: { offers },
        },
      }) => {
        console.log(offers);
        setMyOffers(offers);
      }
    );
  }, []);

  return (
    <div className="manageoffers-container">
      <Header></Header>
      <div className="manageoffers-banner">
        <h1 className="manageoffers-banner__title">Resumen de ofertas</h1>
      </div>
      <div className="manageoffers__inner">
        {myoffers.map((offer) => (
          <CustomOfferStrip
            key={offer.id}
            profilePic={currentUserPicture}
            offerInfo={offer}
            organizationName={organizationInfo.name}
          ></CustomOfferStrip>
        ))}
      </div>

      <h1>Maneje sus ofertas</h1>
    </div>
  );
};

export default ManageOffersPage;
