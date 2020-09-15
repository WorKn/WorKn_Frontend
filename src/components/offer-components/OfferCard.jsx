import React from "react";
import Tag from "../tag-components/Tag";
import "./OfferCard-Style.css";

const OfferCard = () => {
  return (
    <div className="offercard__wrapper">
      <div className="offercard__header">
        <img
          src="https://alianzaong.org.do/wp-content/uploads/2011/06/LinkedIn-Logo-500x500.png"
          alt="misco"
          className="offercard__picture"
        ></img>
        <div className="offercard__text">
          <span className="offercard__text--title">
            Solicitamos programador full stack para plataforma desarrollada en
            .NET
          </span>
          <span className="offercard__text--subtitle">
            Por <span className="offercard__text--highlight">LinkedIn</span> en{" "}
            <span className="offercard__text--highlight">Santo Domingo</span>
          </span>
        </div>
      </div>
      <div className="offercard__data">
        <span>Medio Tiempo</span>
        <div className="offercard__vl"></div>
        <span>14/07/2020</span>
        <div className="offercard__vl"></div>
        <span>Software</span>
      </div>
      <div className="offercard__tags">
        <Tag text="Software" theme="tag tag__text tag__text--gray"></Tag>
        <Tag text="Programación" theme="tag tag__text tag__text--gray"></Tag>
        <Tag text=".NET" theme="tag tag__text tag__text--gray"></Tag>
        {/* <Tag text="Linux" theme="tag tag__text tag__text--gray"></Tag>
        <Tag text="React" theme="tag tag__text tag__text--gray"></Tag>
        <Tag text="Javascript" theme="tag tag__text tag__text--gray"></Tag> */}
      </div>
    </div>
  );
};

export default OfferCard;
