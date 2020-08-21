import React from "react";

import "./CTAComponent-Style.css";

const CTAComponent = ({
  params: { imageUrl }
}) => (
  <div className="cta-container">

    <div className="cta-container__jumbotron-text">
      <h1 className="cta-container__title">De forma rápida y sencilla</h1>
      <p className="cta-container__description">Crea y encuentra ofertas de trabajo perfectas para tus necesidades.</p>
      <a href="/loginpage">
          <div className="cta-container__ctabutton">
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
        <div className="cta-container__image">
            <img src={imageUrl} alt="A CTA" />
        </div>
    ) : null}

  </div>
);

export default CTAComponent;
