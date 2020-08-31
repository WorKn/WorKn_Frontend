import React from "react";
import Auth from "../../utils/authHelper";
import Cookies from "js-cookie";
import Header from "../../components/navbar-components/Navbar";
import Banner from "../../components/banner-components/Banner";
import "./UserProfilePage-Style.css";
import "./EmpresaProfilePage-Style.css";
import EmpresaForm from "../../components/form-components/EmpresaForm";
import CustomButton from "../../components/button-components/CustomButton";
import Footer from "../../components/footer-components/Footer";
import { StateMachineContext } from "little-state-machine";
import { useStateMachine } from "little-state-machine";
import updateAction from "../../updateAction";
import { useModal } from "../../hooks/useModal";
import PasswordPopup from "../../components/popup-components/PasswordPopup";
import MembersPopup from "../../components/popup-components/MembersPopup";
import { Link } from "react-router-dom";
import AnnouncementBanner from "../../components/announcemnet-components/Announcement-Banner";

const EmpresaProfilePage = (props) => {
  const { state, action } = useStateMachine(updateAction);
  const {
    show: showPasswordModal,
    RenderModal: PasswordModal,
    // hide: hideQuestionModal,
  } = useModal();

  const {
    show: showMembersModal,
    RenderModal: MembersModal,
    // hide: hideQuestionModal,
  } = useModal();

  return (
    <div className="pagewrap">
      <PasswordModal>
        <PasswordPopup></PasswordPopup>
      </PasswordModal>
      <MembersModal>
        <MembersPopup></MembersPopup>
      </MembersModal>
      <Header />
      <Banner image={"kiwVnMm.png"} />
      <AnnouncementBanner></AnnouncementBanner>
      <div className="profilewrap">
        <div className="klk">
          {typeof state.userInformation.organization !== "undefined" ? (
            <span className="profile__header">
              {state.userInformation.organization.name}
            </span>
          ) : (
            <span className="profile__header">Nombres de la Empresa</span>
          )}
          <Link to="/userprofilepage" style={{ textDecoration: "none" }}>
            <div className="profile__backtick">
              <i className="fa fa-chevron-left icon"></i>
              <span>Volver al perfil de propietario</span>
            </div>
          </Link>

          <img
            src="https://i.imgur.com/PZF6dTN.png"
            className="profilewrap__img"
            alt=""
          />
          <div className="userform__footer">
            <span className="userform__title">Panel de control de empresa</span>
            <span className="userform__text">
              Aquí podrás gestionar tu información confidencial, recuerda nunca
              dar tu constraseña a ningún usuario a través de WorKn, los
              administradores nunca te la solicitarán.
            </span>
            <button className="userprofile__action" onClick={showPasswordModal}>
              <i className="fa fa-cog userprofile__icon"></i>
              Cambiar constraseña
            </button>
            <button className="userprofile__action" onClick={showMembersModal}>
              <i className="fa fa-cog userprofile__icon"></i>
              Manejar usuarios
            </button>
            <button className="userprofile__action">
              <i className="fa fa-cog userprofile__icon"></i>
              Manejar ofertas
            </button>
            <button
              className="userprofile__action"
              onClick={() => {
                Cookies.remove("jwt");
                // state.userInformation = null;
                Auth.logout(() => {
                  props.history.push("/");
                });
              }}
            >
              <i className="fa fa-sign-out userprofile__icon"></i>
              Cerrar sesión
            </button>
          </div>
        </div>
        <div className="formss">
          <EmpresaForm></EmpresaForm>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default EmpresaProfilePage;
