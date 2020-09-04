import React from "react";

import { Link } from "react-router-dom";

import "./ManageOffersPage-Style.css";

const ManageOffersPage = () => {
  return (
    <div className="manageoffers__background">
      <div className="manageoffers__container">
        <div className="manageoffers__body">
          <span className="userform__title">Panel de control de usuario</span>
          <br></br>
          <span className="userform__text">
            Aquí podrás gestionar tu información confidencial, recuerda nunca
            dar tu constraseña a ningún usuario a través de WorKn, los
            administradores nunca te la solicitarán.
          </span>
          <Link to="/manageoffers/createoffer">
            <button className="manageoffers__action">
              <i className="fa fas fa-plus manageoffers__icon"></i>
              Crear oferta
            </button>
          </Link>
          <Link to="/manageoffers/editoffer">
            <button className="manageoffers__action">
              <i className="fa fa-cog manageoffers__icon"></i>
              Editar oferta
            </button>
          </Link>
          <Link to="/manageoffers/deleteoffer">
            <button className="manageoffers__action">
              <i className="fa fa-trash-o manageoffers__icon"></i>
              Borrar oferta
            </button>
          </Link>
          <Link to="/empresaprofilepage">
            <button className="manageoffers__action">
              <i className="fa fa-sign-out manageoffers__icon"></i>
              Volver a mi perfil
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ManageOffersPage;
