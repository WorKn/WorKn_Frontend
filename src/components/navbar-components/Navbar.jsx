import React, { useState } from "react";

import "./Navbar-Style.css";

import { Link } from "react-router-dom";

import auth from "../../utils/authHelper";

import updateAction from "../../updateAction";

import { useStateMachine } from "little-state-machine";

const Navbar = () => {
  const isLoggedIn = auth.isAuthenticated();
  const { state } = useStateMachine(updateAction);
  const [hideOnMobile, setHideOnMobile] = useState(true);

  const toggleHiddenMobile = () => {
    setHideOnMobile(!hideOnMobile);
  };

  return (
    <div className="navbar">
      <div className="navbar__left-items navbar__logo-link">
        <Link to="/" className="navbar__link">
          <img
            className="navbar__logo"
            src="https://i.imgur.com/klMjRck.png"
            alt=""
          />
        </Link>

        <Link
          className={
            hideOnMobile
              ? "navbar__link navbar__link--hidden navbar__hide-on-mobile"
              : "navbar__link navbar__link--hidden"
          }
          to="#"
        >
          Ofertas
        </Link>
        <Link
          className={
            hideOnMobile
              ? "navbar__link navbar__link--hidden navbar__hide-on-mobile"
              : "navbar__link navbar__link--hidden"
          }
          to="#"
        >
          Exploración
        </Link>
        <Link
          className={
            hideOnMobile
              ? "navbar__link navbar__link--hidden navbar__hide-on-mobile"
              : "navbar__link navbar__link--hidden"
          }
          to="#"
        >
          Resumen
        </Link>
        <Link
          className={
            hideOnMobile
              ? "navbar__link navbar__link--hidden navbar__hide-on-mobile"
              : "navbar__link navbar__link--hidden"
          }
          to="#"
        >
          Mensajeria
        </Link>
      </div>

      {isLoggedIn ? (
        <div className="navbar__right-items">
          <Link
            to="/userprofilepage"
            className={
              hideOnMobile
                ? "navbar__profile-button-link navbar__hide-on-mobile"
                : "navbar__profile-button-link"
            }
          >
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
          <i
            class="fas fa-bars"
            id="navbar__hidden"
            onClick={toggleHiddenMobile}
          ></i>
        </div>
      ) : (
        <div className="navbar__right-items">
          <Link
            className={
              hideOnMobile
                ? "navbar__link navbar__link--highlighted navbar__hide-on-mobile"
                : "navbar__link navbar__link--highlighted"
            }
            to="/loginpage"
          >
            Iniciar sesión
          </Link>
          <Link
            className={
              hideOnMobile
                ? "navbar__link navbar__link--highlighted navbar__hide-on-mobile"
                : "navbar__link navbar__link--highlighted"
            }
            to="/registerpage"
          >
            Registrate
          </Link>
          <i
            class="fa fa-bars icon-2x"
            id="navbar__hidden"
            onClick={toggleHiddenMobile}
          ></i>
        </div>
      )}
    </div>
  );
};

export default Navbar;
