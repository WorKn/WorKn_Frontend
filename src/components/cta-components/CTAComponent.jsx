import React, { useState } from "react";
import { useStateMachine } from "little-state-machine";
import updateAction from "../../updateAction";
import "./CTAComponent-Style.css";

const CTAComponent = ({ params: { imageUrl } }) => {
  const [isHovered, setHovered] = useState(true);
  const toggleHover = () => {
    setHovered(!isHovered);
  };

  const { state, action } = useStateMachine(updateAction);

  return (
    <div className="cta-container">
      <div className="cta-container__jumbotron-text">
        <h1 className="cta-container__title">De forma rápida y sencilla</h1>
        <p className="cta-container__description">
          Crea y encuentra ofertas de trabajo perfectas para tus necesidades.
        </p>
        {state.userInformation._id ? (
          <a href="/userprofile">
            <div
              className={
                isHovered
                  ? "cta-container__ctabutton"
                  : "cta-container__ctabutton cta-container__ctabutton--highlighted"
              }
              onMouseEnter={toggleHover}
              onMouseLeave={toggleHover}
            >
              <i class="fa fa-address-card cta-container__profile-icon"></i>
              Ir a tu perfil
            </div>
          </a>
        ) : (
          <a href="/login">
            <div
              className={
                isHovered
                  ? "cta-container__ctabutton"
                  : "cta-container__ctabutton cta-container__ctabutton--highlighted"
              }
              onMouseEnter={toggleHover}
              onMouseLeave={toggleHover}
            >
              <img
                src="https://i.imgur.com/SE2JiQf.png"
                className="button-image"
                alt="icon"
              ></img>
              Únete o inicia sesión
            </div>
          </a>
        )}
        {/* <a href="/login">
          <div
            className={
              isHovered
                ? "cta-container__ctabutton"
                : "cta-container__ctabutton cta-container__ctabutton--highlighted"
            }
            onMouseEnter={toggleHover}
            onMouseLeave={toggleHover}
          >
            <img
              src="https://i.imgur.com/SE2JiQf.png"
              className="button-image"
              alt="icon"
            ></img>
            Únete o inicia sesión
          </div>
        </a> */}
      </div>

      {imageUrl ? (
        <div className="cta-container__image">
          <img src={imageUrl} alt="A CTA" />
        </div>
      ) : null}
    </div>
  );
};

export default CTAComponent;
