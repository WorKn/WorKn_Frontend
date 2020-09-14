import React, { useEffect, useState, useMemo } from "react";
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

  //State y props son los unicos que re-renderizan components. Para evitar que funciones innecesarias se ejecuten usamos hooks:

  //Para que solo se ejecute una vez organizationInfo y no cada vez que se re renderice se usa useMemo.
  //useMemo se usa cuando utilizo una variable directa de la que dependo , useEffect cuando quiero realizar un efecto secundario que no devuelve data,
  //useCallback cuando quiero que mi funcion se guarde y no se redefina muchas veces. Ej: una funcion de evento

  const organizationInfo = useMemo(getMyOrganization, []);

  useEffect(() => {
    getMyOffers().then(
      ({
        data: {
          data: { offers },
        },
      }) => {
        //validar si hay una respuesta de ofertas, y si esta respuesta es de tipo arreglo
        if (offers && Array.isArray(offers)) {
          setMyOffers(offers);
        }
      }
    );
  }, []);

  //funcion useMemo() para memoizar las ofertas. Evita hacer api requests innecesarios si la data no cambia
  const offers = useMemo(
    () =>
      myoffers.map((offer) =>
        offer ? (
          <CustomOfferStrip
            key={offer._id}
            profilePic={currentUserPicture}
            offerInfo={offer}
            organizationName={organizationInfo.name}
          ></CustomOfferStrip>
        ) : null
      ),
    [myoffers, organizationInfo, currentUserPicture]
  );

  return (
    <div className="manageoffers-container">
      <Header></Header>
      <div className="manageoffers-banner">
        <h1 className="manageoffers-banner__title">Resumen de ofertas</h1>
      </div>
      <div className="manageoffers__inner">{offers}</div>
    </div>
  );
};

export default ManageOffersPage;
