import React from "react";
import "./Counter-Style.css";
import Counter from "./Counter";
import Icon from "./Icons";

function CounterBanner() {
  return (
    <div className="CB-banner">
      <div className="obj-container">
        <div className="up-content2">
          <Icon media={"ZeBUdRh.png"} />
          <Counter />
        </div>
        <span className="up-text">Usuarios Registrados</span>
        <span className="down-text">
          en nuestra
          <b>plataforma</b>
        </span>
      </div>
      <div className="obj-container">
        <div className="up-content2">
          <Icon media={"sZ4Bg4L.png"} />
          <Counter />
        </div>
        <span className="up-text">Empresas o negocios</span>
        <span className="down-text">
          buscando <b>empleados</b> como tú
        </span>
      </div>
      <div className="obj-container">
        <div className="up-content2">
          <Icon media={"qeh182O.png"} />
          <Counter />
        </div>
        <span className="up-text">Matches Realizados</span>
        <span className="down-text">
          encontramos la <b>oferta</b> perfecta
        </span>
      </div>
    </div>
  );
}

export default CounterBanner;
