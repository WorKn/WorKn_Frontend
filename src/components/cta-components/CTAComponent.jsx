import React from "react";

import "./CTAComponent-Style.css";

const CTAComponent = ({
  params: { imageUrl }
}) => (
  <div className="jumbotron-container">

    <div className="jumbotron-container__jumbotron-text">
      <h1 className="jumbotron-container__title">De forma rápida y sencilla</h1>
      <p className="jumbotron-container__description">Crea y encuentra ofertas de trabajo perfectas para tus necesidades.</p>
      <a href="/loginpage">
          <div className="jumbotron-container__ctabutton">
            <img
              src="https://i.imgur.com/SE2JiQf.png"
              className="button-image"
              alt="icon"
            ></img>
            Únete o inicia sesión
          </div>
        </a>
    </div>

    {imageUrl ? (
        <div className="jumbotron-container__image">
            <img src={imageUrl} alt="A CTA" />
        </div>
    ) : null}

  </div>
);

export default CTAComponent;
