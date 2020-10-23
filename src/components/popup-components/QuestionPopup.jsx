import React from "react";
import "./QuestionPopup-Style.css";
import "../../App.css";
import { NavLink } from "react-router-dom";

const QuestionPopup = () => {
  return (
    <div className="popup-wrapper">
      <div className="sizing-container">
        <span className="popup-btitle">
          Como quieres acceder a nuestro sistema?
        </span>
        <NavLink to="/registerc2" style={{ textDecoration: "none" }}>
          <span className="custom-button bg-green">
            <span>Empresa</span>
          </span>
        </NavLink>

        <div className="info-container">
          <i className="fa fa-info icon"></i>
          <p>
            Las cuentas de empresa permiten gestionar equipos de recursos
            humanos, crear ofertas de trabajo orientadas principalmente al
            empleo fijo, medio tiempo o pasantías .
          </p>
        </div>
        <NavLink to="/register" style={{ textDecoration: "none" }}>
          <span className="custom-button bg-green">
            <span>Persona</span>
          </span>
        </NavLink>

        <div className="info-container">
          <i className="fa fa-info icon"></i>
          <p>
            Las cuentas de persona están pensadas para todo aquel que desee
            utilizar el sistema para crear o aplicar a ofertas de trabajo, tanto
            a ofertas de empresas como independientes o de freelancing.
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuestionPopup;
