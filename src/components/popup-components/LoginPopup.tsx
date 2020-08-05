import React from "react";
import "./LoginPopup-Style.css";
import "../../App.css";

const LoginPopup = () => {
  return (
    <div className="popup-wrapper">
      <span className="popup-title">Iniciar sesión en workn</span>
      <span className="popup-text">Correo</span>
      <input className="form-input" type="text" />
      <span className="popup-text">Contraseña</span>
      <input className="form-input" type="password" />
      <div className="text-separator">
        <div>
          <input className="form-checkbox" type="checkbox" />
          <span className="popup-text remind-me">Recuerdame</span>
        </div>
        <span className="remind-me">
          <a className="popup-link " href="/dummy">
            ¿Olvidaste tu contraseña?
          </a>
        </span>
      </div>
      <span className="custom-button bg-green">
        <span>Acceder</span>
      </span>
      <span className="custom-button bg-gray">
        <span>Registrate</span>
      </span>
      <div className="line-separator">
        <span className="hl"></span>
        <span className="spacer">o</span>
        <span className="hl"></span>
      </div>
      <span className="custom-button bg-blue">
        <div className="inner-container">
          <i className="fa fa-facebook-official"></i>
          <span className="vl"></span>
          <span>Accede con Facebook</span>
        </div>
      </span>
      <span className="custom-button bg-red">
        <div className="inner-container">
          <i className="fa fa-google"></i>
          <span className="vl"></span>
          <span>Accede con Google</span>
        </div>
      </span>
    </div>
  );
};

export default LoginPopup;
