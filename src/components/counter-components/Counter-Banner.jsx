import React from "react";
import "./Counter-Style.css";
import Counter from "./Counter";
import Icon from "./Icons";

function CounterBanner() {
  return (
    <div className="Counter-Banner">
      <div className="Counter-obj-container">
        <Icon media={"ZeBUdRh.png"} />
        <Counter />
        <span className="Counter-obj-container__up-text">
          Usuarios Registrados
        </span>
        <span className="Counter-obj-container__down-text">
          en nuestra <b>plataforma</b>
        </span>
      </div>
      <div className="Counter-obj-container">
        <Icon media={"sZ4Bg4L.png"} />
        <Counter />
        <span className="Counter-obj-container__up-text">
          Empresas o negocios
        </span>
        <span className="Counter-obj-container__down-text">
          buscando <b>empleados</b> como tú
        </span>
      </div>
      <div className="Counter-obj-container">
        <Icon media={"qeh182O.png"} />
        <Counter />
        <span className="Counter-obj-container__up-text">
          Matches Realizados
        </span>
        <span className="Counter-obj-container__down-text">
          encontramos la <b>oferta</b> perfecta
        </span>
      </div>
    </div>
  );
}

export default CounterBanner;
