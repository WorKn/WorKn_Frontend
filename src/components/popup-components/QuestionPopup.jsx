import React from "react";
import "./QuestionPopup-Style.css";
import "../../App.css";

const QuestionPopup = () => {
  return (
    <div className="popup-wrapper">
      <span className="popup-btitle">
        Como quieres acceder a nuestro sistema?
      </span>
      <span className="custom-button bg-green">
        <span>Empresa</span>
      </span>
      <div className="info-container">
        <i className="fa fa-info icon"></i>
        <p>
          Las cuentas de empresa permiten gestionar equipos de recursos humanos,
          crear ofertas de trabajo orientadas principalmente al empleo fijo,
          medio tiempo o pasantías .
        </p>
      </div>
      <span className="custom-button bg-green">
        <span>Persona</span>
      </span>
      <div className="info-container">
        <i className="fa fa-info icon"></i>
        <p>
          Las cuentas de persona están pensadas para todo aquel que desee
          utilizar el sistema para crear o aplicar a ofertas de trabajo, tanto a
          ofertas de empresas como independientes o de freelancing.
        </p>
      </div>
    </div>
  );
};

export default QuestionPopup;
