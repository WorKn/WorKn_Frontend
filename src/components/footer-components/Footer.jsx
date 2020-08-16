import React from "react";
import { Link } from "react-router-dom";
import "./Footer-Style.css";
import Icon from "./Icon.jsx";

const Footer = () => {
  return (
    <div className="Footer">
      <div className="right-foot">
        <div className="right-foot__right-up">
          Email:
          <a href="mailto:workninfo@gmail.com">workninfo@gmail.com</a>
        </div>
        <div className="right-foot__right-down">
          <Link className="right-foot__utobj" target="_blank" to="/Terms">
            Terms of Service.
          </Link>
          <Link className="right-foot__utobj" target="_blank" to="/Privacy">
            Privacy Policy.
          </Link>
        </div>
        &copy;{new Date().getFullYear()} WorKn All rights reserved.
      </div>
      <div className="left-foot">
        <div className="left-foot__up-content">
          <div className="left-foot__logo">
            <Link to="/">
              <img src="https://imgur.com/21FKDzL.png" alt="workn-logo" />
            </Link>
          </div>
          <div className="left-foot__navbar">
            <Link className="left-foot__nobj" target="_blank" to="/Ofertas">
              Ofertas
            </Link>
            <Link className="left-foot__nobj" target="_blank" to="/Exploracion">
              Exploración
            </Link>
            <Link className="left-foot__nobj" target="_blank" to="/Resumen">
              Resumen
            </Link>
            <Link className="left-foot__nobj" target="_blank" to="/Mensajeria">
              Mensajería
            </Link>
          </div>
        </div>
        <div className="left-foot__middle-content">
          <div className="left-foot__icon-container">
            <Icon
              path={"https://www.facebook.com/WorKn"}
              media={"XL6Cvrz.png"}
            />
          </div>
          <div className="left-foot__icon-container">
            <Icon path={"https://twitter.com/WorKn"} media={"3mO0prt.png"} />
          </div>
          <div className="left-foot__icon-container">
            <Icon
              path={"https://www.instagram.com/WorKn/"}
              media={"uxM8asb.png"}
            />
          </div>
        </div>
        <div className="left-foot__down-content">
          <span>Desarrollado en la Republica Dominicana, SD</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
