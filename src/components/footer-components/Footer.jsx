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
          <a href="mailto:soporte.worknrd@gmail.com">
            {" "}
            soporte.worknrd@gmail.com
          </a>
        </div>
        <div className="right-foot__right-down">
          <Link className="right-foot__utobj" to="/tos">
            Términos de servicio
          </Link>
          <Link className="right-foot__utobj" to="/faq">
            Preguntas frecuentes
          </Link>
        </div>
        &copy;{new Date().getFullYear()} WorKn todos los derechos reservados.
      </div>
      <div className="left-foot">
        <div className="left-foot__up-content">
          <div className="left-foot__logo">
            <Link to="/">
              <img src="https://imgur.com/21FKDzL.png" alt="workn-logo" />
            </Link>
          </div>
          <div className="left-foot__navbar">
            <Link
              className="left-foot__nobj"
              target="_blank"
              to="/manageoffers"
            >
              Ofertas
            </Link>
            <Link className="left-foot__nobj" target="_blank" to="/explore">
              Exploración
            </Link>
            <Link className="left-foot__nobj" target="_blank" to="/summary">
              Resumen
            </Link>
            <Link className="left-foot__nobj" target="_blank" to="/chat">
              Mensajería
            </Link>
          </div>
        </div>
        <div className="left-foot__middle-content">
          <Icon path={"https://www.facebook.com"} media={"XL6Cvrz.png"} />

          <Icon path={"https://twitter.com"} media={"3mO0prt.png"} />

          <Icon path={"https://www.instagram.com"} media={"uxM8asb.png"} />
        </div>
        <div className="left-foot__down-content">
          <span>Desarrollado en la Republica Dominicana, SD</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
