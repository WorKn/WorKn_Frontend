import React from "react";
import { Link } from "react-router-dom";
import "../emailnotvalidated-components/EmailNotValidated-Styles.css";

const ProfileNotCompleted = () => (
  <div className="emailnotvalidated__container">
    <div className="emailnotvalidated__body">
      <img
        src="https://i.imgur.com/CAtVIjs.png"
        alt=""
        className="emailnotvalidated__img"
      />
      <h1 className="emailnotvalidated__title">
        Su perfil no ha sido completado
      </h1>
      <span>
        Lo sentimos, para acceder a este contenido requerimos que su perfil sea
        completado; por favor dirigirse a su página de perfil para continuar el
        proceso.
      </span>
      <Link to="/userprofile" className="emailnotvalidated__button">
        <div>Volver a tu perfil</div>
      </Link>
    </div>
  </div>
);

export default ProfileNotCompleted;
