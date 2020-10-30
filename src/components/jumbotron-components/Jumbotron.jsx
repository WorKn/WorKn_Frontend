import React from "react";
import "./Jumbotron-Style.css";

const JumbotronComponent = ({
  params: { imageUrl },
}) => (
    <div className="jumbotron-container">

      {imageUrl ? (
        <div className="jumbotron-container__image">
          <img src={imageUrl} alt="A CTA" />
        </div>
      ) : null}
      <div className="jumbotron-container__jumbotron-text">
        <h1 className="jumbotron-container__title">En Workn buscamos ayudarte</h1>
        <p className="jumbotron-container__description">Encargándonos de unir automáticamente{" "}
          <b className="tooltip">
            profesionales {" "}
            <span className="tooltiptext">
              En búsqueda de incorporarse en una organización que aproveche su conocimiento.
            </span>
          </b>,
          {" "}
          <b className="tooltip">
            empresas
            <span className="tooltiptext">
              Organizaciones y negocios que deseen expandirse usando WorKn.
            </span>
          </b> y
          <b className="tooltip">
            <span className="tooltiptext">
              Un freelancer es un trabajador independiente de cualquier organización.
            </span>freelancers
          </b> en nuestra plataforma mediante
          {" "}
          <b className="tooltip">ofertas
            <span className="tooltiptext">
              Una oferta especifica el trabajo a realizar y su naturaleza.
            </span>
          </b>
          {" "}
          que nos permiten saber lo que necesitas y dónde te necesitan.
      </p>

      </div>

    </div>
  );

export default JumbotronComponent;
