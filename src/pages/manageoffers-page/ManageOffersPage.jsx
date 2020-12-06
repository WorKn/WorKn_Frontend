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
import EmailNotValidated from "../../components/emailnotvalidated-components/EmailNotValidated";
import { useStateMachine } from "little-state-machine";
import { useForm } from "react-hook-form";
import Banner from "../../components/banner-components/Banner";
import Footer from "../../components/footer-components/Footer";

const ManageOffersPage = () => {
  const [myoffers, setMyOffers] = useState([]);
  const [organizationInfo, setMyOrganization] = useState();
  const [success, setSuccess] = useState(false);
  const [offersToDisplay, setOffersToDisplay] = useState("active");
  const { state } = useStateMachine(updateAction);
  const { register, handleSubmit } = useForm({});
  const {
    show: showAddOfferModal,
    RenderModal: AddOfferModal,
    hide: hideAddOfferModal,
  } = useModal();

  let history = useHistory();

  const activeOffers = useMemo(
    () =>
      myoffers.map((offer) =>
        offer && offer.state !== "deleted" ? (
          <CustomOfferStrip
            key={offer._id}
            organizationInformation={organizationInfo}
            offerInfo={offer}
            setMyOffers={setMyOffers}
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

  const onSubmit = (e) => {
    setOffersToDisplay(e.type);
    console.log(e);
  };

  useEffect(() => {
    //si fallo el get my offers y el usuario actual no es tipo ofertante entonces hay que rebotarlo. Por el otro lado, si fallo el getoffers y es ofertante dejarlo entrar
    if (state.userInformation.isEmailValidated) {
      setSuccess(true);
      getMyOffers().then((res) => {
        console.log(res)
        if (!res.data && state.userInformation.userType === "offerer") {
          // history.push("/");
        } else if (!res.data && state.userInformation.userType !== "offerer") {
          history.push("/login");
        } else {
          const offers = res.data.data.offers;
          console.log(offers)
          if (offers && Array.isArray(offers)) {
            setMyOffers(offers);
          }
        }
      });

      getMyOrganization().then((res) => {
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
          history.push("/login");
        } else {
          const organization = res?.data?.data?.data;
          setMyOrganization(organization);
        }
      });
    } else if (
      !state.userInformation.isEmailValidated &&
      !state.userInformation._id
    ) {
      history.push("/login");
    } else {
      setSuccess(false);
    }
  }, [
    history,
    state.userInformation.organizationRole,
    state.userInformation.profilePicture,
    state.userInformation.userType,
    state.userInformation._id,
    state.userInformation.isEmailValidated,
  ]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return success ? (
    <div>
      <div className="manageoffers-container">
        <Header></Header>
        <Banner image={"qiyrYvI.png"} />
        <AddOfferModal>
          <CreateOfferPopup
            hide={hideAddOfferModal}
            setMyOffers={setMyOffers}
          ></CreateOfferPopup>
        </AddOfferModal>
        <div className="manageoffers-inner">
          <div className="manageoffers__container">
            <span className="manageoffers__title--dark">
              Seleccione el tipo de oferta a mostrar
          </span>
          </div>
          <form
            className="summarypage__form manageoffers__typeselector"
            onSubmit={handleSubmit(onSubmit)}
          >
            <select className="form__select" name="type" ref={register}>
              <option value="active">Ofertas activas</option>
              <option value="inactive">Ofertas inactivas</option>
            </select>
            <input className="custom-button bg-green" type="submit" value="Ir" />
          </form>

          <div className="manageoffers__activecontainer">
            <div className="addoffer__newbutton" onClick={showAddOfferModal}>
              <i className="fa fas fa-plus manageoffers__icon"></i>
              <span className="manageoffers__title--dark">
                Crea una nueva oferta
            </span>
            </div>
          </div>
          <div>
            {myoffers.length === 0 ? (
              <div className="manageoffers__inner">
                <div className="summary__announcement">
                  <div className="summarypage__imgbg">
                    <img src="https://i.imgur.com/CAtVIjs.png" alt="applied" className="summarypage_appliedimg"></img>
                  </div>
                  <div className="summary__announcementinner">
                    <span className="summarypagea__title--dark">Aún no tienes ninguna oferta creada!</span>
                    <span>Clickea en el botón de crear una nueva oferta para que puedas empezar a trabajar en ellas.</span>
                  </div>
                </div>
              </div>
            ) : (
                ""
              )}
          </div>

          {offersToDisplay && offersToDisplay === "active" ? (
            <React.Fragment>
              <div className="manageoffers__offers-list">{activeOffers}</div>
            </React.Fragment>
          ) : (
              <React.Fragment>
                <div className="manageoffers__offers-list">
                  {inactiveOffers
                    ? inactiveOffers
                    : "Usted no ha colocado ninguna oferta como inactiva aún"}
                </div>
              </React.Fragment>
            )}
        </div>
      </div>
      <Footer />
    </div>
  ) : (
      <EmailNotValidated />
    );
};

export default ManageOffersPage;
