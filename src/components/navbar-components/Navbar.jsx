import React from "react";

import "./Navbar-Style.css";

import { Link } from "react-router-dom";

const Navbar = () => (
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
      <Link className="navbar__link" to="/resumen">
        Resumen
      </Link>
      <Link className="navbar__link" to="#">
        Mensajeria
      </Link>
    </div>

    <div className="navbar__right-items">
      <Link className="navbar__link navbar__link--highlighted" to="#">
        Iniciar sesión
      </Link>
      <Link className="navbar__link navbar__link--highlighted" to="#">
        Registrate
      </Link>
      {/* <button>
                <img src="https://i.imgur.com/JCXGx2c.png" alt="" className="navbar__hamburger"/>
            </button> */}
    </div>
  </div>
);

export default Navbar;
