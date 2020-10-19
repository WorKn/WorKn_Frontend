import React from "react";
import Auth from "../../utils/authHelper";
import Cookies from "js-cookie";
import Header from "../../components/navbar-components/Navbar";
import Banner from "../../components/banner-components/Banner";
import "./UserProfilePage-Style.css";
import UserForm from "../../components/form-components/UserForm";
import Footer from "../../components/footer-components/Footer";
import { useStateMachine } from "little-state-machine";
import updateAction from "../../updateAction";
import { useModal } from "../../hooks/useModal";
import PasswordPopup from "../../components/popup-components/PasswordPopup";
import AnnouncementBanner from "../../components/announcemnet-components/Announcement-Banner";
import { Link } from "react-router-dom";

const UserProfilePage = (props) => {
  const { state } = useStateMachine(updateAction);
  const {
    show: showPasswordModal,
    RenderModal: PasswordModal,
    // hide: hideQuestionModal,
  } = useModal();
  return (
    <div className="pagewrap">
      <PasswordModal>
        <PasswordPopup></PasswordPopup>
      </PasswordModal>
      <Header />
      <Banner image={"VfeSojP.png"} />
      <AnnouncementBanner></AnnouncementBanner>
      <div className="profilewrap">
        <div className="klk">
          <img
            src="https://i.imgur.com/of8M7Z2.png"
            className="profilewrap__img"
            alt=""
          />
          <div className="userform__footer">
            <span className="userform__title">Panel de control de usuario</span>
            <span className="userform__text">
              Aquí podrás gestionar tu información confidencial, recuerda nunca
              dar tu constraseña a ningún usuario a través de WorKn, los
              administradores nunca te la solicitarán.
            </span>
            <button className="userprofile__action" onClick={showPasswordModal}>
              <i className="fa fa-cog userprofile__icon"></i>
              Cambiar constraseña
            </button>
            {(typeof (state.userInformation.organizationRole !== "undefined") &&
              state.userInformation.organizationRole === "owner") ||
              state.userInformation.organizationRole === "member" ||
              state.userInformation.organizationRole === "supervisor" ? (
                <Link to="/organizationprofile" style={{ textDecoration: "none" }}>
                  <button className="userprofile__action">
                    <i className="fa fa-cog userprofile__icon"></i>
                  Manejar organización
                </button>
                </Link>
              ) : (
                ""
              )}
            {typeof state.userInformation !== "undefined" &&
              state.userInformation.organizationRole === "" &&
              state.userInformation.userType === "offerer" ? (
                <Link to="/manageoffers" style={{ textDecoration: "none" }}>
                  <button className="userprofile__action">
                    <i className="fa fa-cog userprofile__icon"></i>
                  Manejar ofertas
                </button>
                </Link>
              ) : (
                ""
              )}
            <button
              className="userprofile__action"
              onClick={() => {
                Cookies.remove("jwt");
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
          <UserForm></UserForm>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default UserProfilePage;
