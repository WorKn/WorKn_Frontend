import React, { useEffect, useState, useMemo } from "react";
import "./ManageOffersPage-Style.css";
import Header from "../../components/navbar-components/Navbar.jsx";
import { getMyOffers } from "../../utils/apiRequests";
import { getMyOrganization } from "../../utils/apiRequests";
import OfferStrip from "../../components/offer-components/OfferStrip";
import { useHistory } from "react-router-dom";
import CreateOfferPopup from "../../components/popup-components/CreateOfferPopup";
import { useModal } from "../../hooks/useModal";

// import updateAction from "../../updateAction";
// import { useStateMachine } from "little-state-machine";

const ManageOffersPage = () => {
  const [myoffers, setMyOffers] = useState([]);
  const [organizationInfo, setMyOrganization] = useState();
  // const { state } = useStateMachine(updateAction);
  const {
    show: showAddOfferModal,
    RenderModal: AddOfferModal,
    hide: hideAddOfferModal,
  } = useModal();

  let history = useHistory();

  // if (state.userInformation.userType !== "offerer") {

  // }

  //State y props son los unicos que re-renderizan components. Para evitar que funciones innecesarias se ejecuten usamos hooks:

  //Para que solo se ejecute una vez organizationInfo y no cada vez que se re renderice se usa useMemo.
  //useMemo se usa cuando utilizo una variable directa de la que dependo , useEffect cuando quiero realizar un efecto secundario que no devuelve data,
  //useCallback cuando quiero que mi funcion se guarde y no se redefina muchas veces. Ej: una funcion de evento

  useEffect(() => {
    getMyOffers().then((res) => {
      if (!res.data) {
        history.push("/");
      } else {
        const offers = res.data.data.offers;
        if (offers && Array.isArray(offers)) {
          setMyOffers(offers);
        }
      }
    });

    getMyOrganization().then((res) => {
      if (!res.data) {
        history.push("/");
      } else {
        const organization = res.data.data.data;
        setMyOrganization(organization);
      }
    });
  }, [history]);

  //funcion useMemo() para memoizar las ofertas. Evita hacer api requests innecesarios si la data no cambia
  const offers = useMemo(
    () =>
      myoffers.map((offer) =>
        offer ? (
          <OfferStrip
            key={offer._id}
            organizationInformation={organizationInfo}
            offerInfo={offer}
          ></OfferStrip>
        ) : null
      ),
    [myoffers, organizationInfo]
  );

  return (
    <div className="manageoffers-container">
      <Header></Header>
      <div className="manageoffers-banner">
        <h1 className="manageoffers-banner__title">Resumen de ofertas</h1>
      </div>
      <AddOfferModal>
        <CreateOfferPopup hide={hideAddOfferModal}></CreateOfferPopup>
      </AddOfferModal>
      <button
        type="button"
        className="manageoffers__create-button"
        onClick={showAddOfferModal}
      >
        <i className="fa fas fa-plus manageoffers__icon"></i>Crear oferta
      </button>
      <div className="manageoffers__inner">{offers}</div>
    </div>
  );
};

export default ManageOffersPage;
