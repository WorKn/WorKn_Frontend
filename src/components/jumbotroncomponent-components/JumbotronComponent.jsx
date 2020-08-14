import React from "react";

import "./JumbotronComponent-Style.css";

const JumbotronComponent = ({
  params: {imageUrl },
}) => (
  <div className="jumbotron-container">

    {imageUrl ? (
        <div className="jumbotron-container__image">
            <img src={imageUrl} alt="A CTA" />
        </div>
    ) : null}
    <div className="jumbotron-container__jumbotron-text">
      <h1 className="jumbotron-container__title">En Workn buscamos ayudarte</h1>
      <p className="jumbotron-container__description">Encargándonos de unir automáticamente <b>profesionales</b>, <b>empresas</b> y <b>freelancers</b> en nuestra plataforma 
      mediante <b>ofertas</b> que nos permiten saber lo que necesitas y dónde te necesitan.
      </p>
      
    </div>

  </div>
);

export default JumbotronComponent;
