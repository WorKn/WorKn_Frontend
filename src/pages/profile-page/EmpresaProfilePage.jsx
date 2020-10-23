import React, { useEffect } from "react";
import Auth from "../../utils/authHelper";
import Cookies from "js-cookie";
import Header from "../../components/navbar-components/Navbar";
import Banner from "../../components/banner-components/Banner";
import "./UserProfilePage-Style.css";
import "./EmpresaProfilePage-Style.css";
import EmpresaForm from "../../components/form-components/EmpresaForm";
import Footer from "../../components/footer-components/Footer";
import { useStateMachine } from "little-state-machine";
import updateAction from "../../updateAction";
import { useModal } from "../../hooks/useModal";
import MembersPopup from "../../components/popup-components/MembersPopup";
import { Link } from "react-router-dom";
import AnnouncementBanner from "../../components/announcemnet-components/Announcement-Banner";
import ManagePopup from "../../components/popup-components/ManagePopup";


const EmpresaProfilePage = (props) => {
  const { state } = useStateMachine(updateAction);
  const {
    show: showMembersModal,
    RenderModal: MembersModal,
    // hide: hideQuestionModal,
  } = useModal();

  const {
    show: ShowManageModal,
    RenderModal: ManageModal,
    // hide: hideQuestionModal,
  } = useModal();

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="pagewrap">
      <ManageModal>
        <ManagePopup></ManagePopup>
      </ManageModal>
      <MembersModal>
        <MembersPopup></MembersPopup>
      </MembersModal>
      <Header />
      <Banner image={"VfeSojP.png"} />
      <AnnouncementBanner></AnnouncementBanner>
      <div className="profilewrap">
        <div className="klk">
          {typeof state.userInformation.data !== "undefined" ? (
            <span className="profile__header">
              {state.userInformation.data.name}
            </span>
          ) : (
              <span className="profile__header">Nombres de la Empresa</span>
            )}
          <Link to="/userprofile" style={{ textDecoration: "none" }}>
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
            <span className="userform__title">
              Panel de control de organización
            </span>
            <span className="userform__text">
              Aquí podrás gestionar la información de tu organización, recuerda
              nunca dar tu constraseña a ningún usuario a través de WorKn, los
              administradores nunca te la solicitarán.
            </span>
            {typeof state.userInformation.organizationRole !== "undefined" &&
              (state.userInformation.organizationRole === "owner" ||
                state.userInformation.organizationRole === "supervisor") ? (
                <div>
                  <button
                    className="userprofile__action"
                    onClick={showMembersModal}
                  >
                    <i className="fa fa-cog userprofile__icon"></i>
                  Manejar invitaciones de miembros
                </button>
                  <button
                    className="userprofile__action"
                    onClick={ShowManageModal}
                  >
                    <i className="fa fa-cog userprofile__icon"></i>
                  Manejar miembros
                </button>
                </div>
              ) : (
                ""
              )}
            <Link to="/manageoffers">
              <button className="userprofile__action">
                <i className="fa fa-cog userprofile__icon"></i>
                Manejar ofertas
              </button>
            </Link>
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
          <EmpresaForm></EmpresaForm>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default EmpresaProfilePage;
