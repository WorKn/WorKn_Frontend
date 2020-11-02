import React from "react";
import { Link } from "react-router-dom";
import "./EmailNotValidated-Styles.css";

const EmailNotValidated = () => (
  <div className="emailnotvalidated__container">
    <div className="emailnotvalidated__body">
      <img
        src="https://i.imgur.com/cDCOxmU.png"
        alt=""
        className="emailnotvalidated__img"
      />
      <h1 className="emailnotvalidated__title">
        Su correo no ha sido validado
      </h1>
      <span>
        Lo sentimos, para acceder a este contenido requerimos que su cuenta de
        correo esté validada; aparentemente su cuenta aun no ha sido validada,
        por favor, diríjase a su correo para continuar con el proceso.
      </span>
      <Link to="/userprofile" className="emailnotvalidated__button">
        <div>Volver a tu perfil</div>
      </Link>
    </div>
  </div>
);

export default EmailNotValidated;
