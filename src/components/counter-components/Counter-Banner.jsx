import React from "react";
import "./Counter-Style.css";
import Counter from "./Counter";
import Icon from "./Icons";

function CounterBanner() {
  return (
    <div className="CB-banner">
      <div className="obj-container">
        <div className="counter">
          <Icon media={"ZeBUdRh.png"} />
          <Counter />
        </div>
        <span className="up-text">Usuarios Registrados</span>
        <div className="down-text">
          en nuestra <b>plataforma</b>
        </div>
      </div>
      <div className="obj-container">
        <div className="counter">
          <Icon media={"sZ4Bg4L.png"} />
          <Counter />
        </div>
        <span className="up-text">Empresas o negocios</span>
        <div className="down-text">
          buscando <b>empleados</b> como tú
        </div>
      </div>
      <div className="obj-container">
        <div className="counter">
          <Icon media={"qeh182O.png"} />
          <Counter />
        </div>
        <span className="up-text">Matches Realizados</span>
        <div className="down-text">
          encontramos la <b>oferta</b> perfecta
        </div>
      </div>
    </div>
  );
}

export default CounterBanner;
