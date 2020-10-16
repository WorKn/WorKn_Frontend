import React from "react";
import { Link } from "react-router-dom";
import "./not_found-Style.css";

const NotFound = () => {
  return (
    <div className="not_found-page">
      <div className="not_found-container">
        <img
          src="https://i.imgur.com/siTaWZ0.png"
          alt="404_image"
          className="not_found-image"
        />
        <h2>Esta pagina no existe</h2>
        <p>Lo sentimos, la pagina solicitada no existe</p>
        <Link to="/login" className="not_found-container__button">
          <div>Atrás</div>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
