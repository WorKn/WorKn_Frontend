import React, { useEffect, useState, useMemo } from "react";
import "./ManageOffersPage-Style.css";
import Header from "../../components/navbar-components/Navbar.jsx";
import { getMyOffers } from "../../utils/apiRequests";
import { getMyOrganization } from "../../utils/apiRequests";
import { useHistory } from "react-router-dom";
import CreateOfferPopup from "../../components/popup-components/CreateOfferPopup";
import { useModal } from "../../hooks/useModal";
import CustomOfferStrip from "../../components/offer-components/CustomOfferStrip";
import updateAction from "../../updateAction";
import { useStateMachine } from "little-state-machine";
import { Link } from "react-router-dom";

const ManageOffersPage = () => {
  const [myoffers, setMyOffers] = useState([]);
  const [organizationInfo, setMyOrganization] = useState();
  const [success, setSuccess] = useState(false);
  const { state } = useStateMachine(updateAction);
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

  //funcion useMemo() para memoizar las ofertas activas e inactivas. Evita hacer api requests innecesarios si la data no cambia
  const activeOffers = useMemo(
    () =>
      myoffers.map((offer) =>
        offer && offer.state !== "deleted" ? (
          <CustomOfferStrip
            key={offer._id}
            organizationInformation={organizationInfo}
            offerInfo={offer}
          ></CustomOfferStrip>
        ) : null
      ),
    [myoffers, organizationInfo]
  );

  const inactiveOffers = useMemo(
    () =>
      myoffers.map((offer) =>
        offer && offer.state === "deleted" ? (
          <CustomOfferStrip
            key={offer._id}
            organizationInformation={organizationInfo}
            offerInfo={offer}
            isInactive={true}
          ></CustomOfferStrip>
        ) : null
      ),
    [myoffers, organizationInfo]
  );

  useEffect(() => {
    //si fallo el get my offers y el usuario actual no es tipo ofertante entonces hay que rebotarlo. Por el otro lado, si fallo el getoffers y es ofertante dejarlo entrar
    if (state.userInformation.isEmailValidated) {
      setSuccess(true);
      getMyOffers().then((res) => {
        if (!res.data && state.userInformation.userType === "offerer") {
          // history.push("/");
        } else if (!res.data && state.userInformation.userType !== "offerer") {
          history.push("/loginpage");
        } else {
          const offers = res.data.data.offers;
          if (offers && Array.isArray(offers)) {
            setMyOffers(offers);
          }
        }
      });

      getMyOrganization().then((res) => {
        //si el usuario actual es un ofertante sin organizacion
        if (
          !res.data &&
          state.userInformation.organizationRole === "" &&
          state.userInformation.userType === "offerer"
        ) {
          const organization = {
            profilePicture: state.userInformation.profilePicture,
          };
          setMyOrganization(organization);
        } else if (!res.data && state.userInformation.userType !== "offerer") {
          history.push("/loginpage");
        } else {
          const organization = res.data.data.data;
          setMyOrganization(organization);
        }
      });
    } else {
      setSuccess(false);
    }
  }, [
    history,
    state.userInformation.organizationRole,
    state.userInformation.profilePicture,
    state.userInformation.userType,
  ]);

  return success ? (
    <div className="manageoffers-container">
      <Header></Header>
      <div className="manageoffers-banner">
        <h1 className="manageoffers-banner__title">Resumen de ofertas</h1>
      </div>
      <AddOfferModal>
        <CreateOfferPopup hide={hideAddOfferModal}></CreateOfferPopup>
      </AddOfferModal>
      <h1 className="manageoffers__active-offers">Ofertas Activas</h1>
      <button
        type="button"
        className="manageoffers__create-button"
        onClick={showAddOfferModal}
      >
        <i className="fa fas fa-plus manageoffers__icon"></i>Crear oferta
      </button>

      <div className="manageoffers__inner">{activeOffers}</div>
      <h1 className="manageoffers__inactive-offers">Ofertas Inactivas</h1>
      <div className="manageoffers__inner">
        {inactiveOffers
          ? inactiveOffers
          : "Usted no ha borrado ninguna oferta aún"}
      </div>
    </div>
  ) : (
    <div className="manageoffers-nv__container">
      <div className="manageoffers-nv__body">
        <img
          src="https://i.imgur.com/cDCOxmU.png"
          alt=""
          className="manageoffers-nv__img"
        />
        <h1 className="manageoffers-nv__title">
          Su correo no ha sido validado
        </h1>
        <span>
          Lo sentimos, para acceder a este contenido requerimos que su cuenta de
          correo esté validada; aparentemente su cuenta aun no ha sido validada,
          por favor, diríjase a su correo para continuar con el proceso.
        </span>
        <Link to="/" className="manageoffers-nv__button">
          <div>Volver a inicio</div>
        </Link>
      </div>
    </div>
  );
};

export default ManageOffersPage;
