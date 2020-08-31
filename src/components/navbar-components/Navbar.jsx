import React from "react";

import "./Navbar-Style.css";

import { Link } from "react-router-dom";

import auth from "../../utils/authHelper";

const Navbar = () => {
  const isLoggedIn = auth.isAuthenticated();

  //en esta parte debo de consultar al API por una profile picture, y sino la jaya pues renderizar la defecto

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
          <Link to="/userProfilePage" className="navbar__profile-button-link">
            <button className="navbar__profile-button">
              <span>Perfil</span>
              <div className="navbar__img-holder">
                <img
                  src="https://i0.wp.com/postmatura.al/wp-content/uploads/2018/10/blank-profile-picture-png.png?fit=512%2C512&ssl=1"
                  alt=""
                  className="navbar__hamburger"
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
          <Link className="navbar__link navbar__link--highlighted" to="#">
            Registrate
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
