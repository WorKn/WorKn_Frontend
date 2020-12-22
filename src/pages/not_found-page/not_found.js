import React from "react";
import { useHistory } from "react-router-dom";
import "./not_found-Style.css";

const NotFound = () => {
  let history = useHistory();

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
        <button
          className="not_found-container__button"
          onClick={() => history.goBack()}
        >
          Atrás
        </button>
      </div>
    </div>
  );
};

export default NotFound;
