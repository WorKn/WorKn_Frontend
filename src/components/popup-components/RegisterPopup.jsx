import React from "react";
import "./RegisterPopup-Style.css";
import "../../App.css";

const RegisterPopup = () => {
  return (
    <div className="popup-wrapper">
      <span className="popup-title">Regístrate en Workn</span>
      <div className="paired-container">
        <div className="paired-input">
          <span className="popup-text">Nombre</span>
          <input className="form-input" type="text" />
        </div>
        <div className="paired-input lspacer">
          <span className="popup-text">Apellido</span>
          <input className="form-input" type="text" />
        </div>
      </div>
      <span className="popup-text">Correo</span>
      <input className="form-input" type="text" />
      <span className="popup-text">Contraseña</span>
      <input className="form-input" type="password" />
      <span className="popup-text">Accedes a Workn como</span>
      <div className="paired-container">
        <div>
          <input type="radio" value="Ofertante" />
          <span className="lspacer ">Ofertante</span>
        </div>
        <div className="lspacer">
          <input type="radio" value="Aplicante" />
          <span className="lspacer">Aplicante</span>
        </div>
      </div>
      <span className="custom-button bg-green">
        <span>Registrate</span>
      </span>
      <div className="ctext-separator">
        {/* <div>
          <input className="form-checkbox" type="checkbox" />
          <span className="popup-text remind-me">Recuerdame</span>
        </div> */}
        <span className="remind-me">
          Ya tienes cuenta? {""}
          <a className="popup-link " href="/dummy">
            Inicia sesión
          </a>
        </span>
      </div>
      {/* <span className="custom-button bg-gray">
        <span>Registrate</span>
      </span> */}
      <div className="line-separator">
        <span className="hl"></span>
        <span className="spacer">o</span>
        <span className="hl"></span>
      </div>
      <span className="custom-button bg-blue">
        <div className="inner-container">
          <i class="fa fa-facebook-official"></i>
          <span className="vl"></span>
          <span>Registrate con Facebook</span>
        </div>
      </span>
      <span className="custom-button bg-red">
        <div className="inner-container">
          <i class="fa fa-google"></i>
          <span className="vl"></span>
          <span>Registrate con Google</span>
        </div>
      </span>
    </div>
  );
};

export default RegisterPopup;
