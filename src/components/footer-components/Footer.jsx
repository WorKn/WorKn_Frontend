import React from "react";
import { Link } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import "./Footer-Style.css";
import Icon from "./Icon.jsx";

const Footer = () => {
  const { state } = useStateMachine();

  return (
    <div className="Footer">
      <div className="right-foot">
        <div className="right-foot__right-up">
          Correo:
          <a href="mailto:soporte.worknrd@gmail.com">
            {" "}
            soporte.worknrd@gmail.com
          </a>
        </div>
        <div className="right-foot__right-down">
          <Link to="/tos">Términos de servicio.</Link>
          <Link to="/faq">Preguntas frecuentes.</Link>
        </div>
        &copy;{new Date().getFullYear()} WorKn Todos los derechos reservados.
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
              to="/recommendations"
            >
              Recomendaciones
            </Link>
            {state.userInformation.userType === "offerer" ? (
              <Link
                className="left-foot__nobj"
                to="/manageoffers"
              >
                Ofertas
              </Link>
            ) : null}
            <Link className="left-foot__nobj" to="/explore">
              Exploración
            </Link>
            <Link className="left-foot__nobj" to="/summary">
              Resumen
            </Link>
            <Link className="left-foot__nobj" to="/chat">
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
          <span>Desarrollado en la República Dominicana, S.D.</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
