import React from "react";

import "./Navbar-Style.css";

import { Link } from "react-router-dom";

import auth from "../../utils/authHelper";

import updateAction from "../../updateAction";

import { useStateMachine } from "little-state-machine";

const Navbar = () => {
  const isLoggedIn = auth.isAuthenticated();
  const { state } = useStateMachine(updateAction);

  return (
    <div className="navbar">
      <div className="navbar__left-items">
        <Link to="/" className="navbar__link">
          <img
            className="navbar__logo"
            src="https://i.imgur.com/klMjRck.png"
            alt=""
          />
        </Link>

        <Link className="navbar__link" to="#">
          Ofertas
        </Link>
        <Link className="navbar__link" to="#">
          Exploración
        </Link>
        <Link className="navbar__link" to="#">
          Resumen
        </Link>
        <Link className="navbar__link" to="#">
          Mensajeria
        </Link>
      </div>

      {isLoggedIn ? (
        <div className="navbar__right-items">
          <Link to="/userprofilepage" className="navbar__profile-button-link">
            <button className="navbar__profile-button">
              <span>Perfil</span>
              <div className="navbar__img-holder">
                <img
                  src={state.userInformation.profilePicture}
                  alt=""
                  className="navbar__profile-pic"
                />
              </div>
            </button>
          </Link>
        </div>
      ) : (
        <div className="navbar__right-items">
          <Link
            className="navbar__link navbar__link--highlighted"
            to="/loginpage"
          >
            Iniciar sesión
          </Link>
          <Link
            className="navbar__link navbar__link--highlighted"
            to="/registerpage"
          >
            Registrate
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
