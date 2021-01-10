import React, { useState, useEffect } from "react";
import "./Counter-Style.css";
import Counter from "./Counter";
import Icon from "./Icons";
import { getLandingPageStats } from "../../utils/apiRequests";

function CounterBanner() {
  const [users, setUsers] = useState(0);
  const [orgs, setOrgs] = useState(0);
  const [matches, setMatches] = useState(0);

  useEffect(() => {
    getLandingPageStats().then((res) => {
      setUsers(res.data.data.users);
      setOrgs(res.data.data.organizations);
      setMatches(res.data.data.matches);
    });
  }, [users, orgs, matches]);

  return (
    <div className="Counter-Banner">
      <div className="Counter-obj-container">
        <Icon media={"ZeBUdRh.png"} />
        <Counter limit={users} />
        <span className="Counter-obj-container__up-text">
          Usuarios Registrados
        </span>
        <span className="Counter-obj-container__down-text">
          <b className="tooltip">
            Ofertantes
            <span className="tooltiptext">
              Usuarios que solicitan alguien que trabaje para ellos.
            </span>
          </b>{" "}
          y {""}
          <b className="tooltip">
            Aplicantes
            <span className="tooltiptext">
              Usuarios que ofrecen sus servicios aplicando a ofertas.
            </span>
          </b>{" "}
          en nuestra plataforma
        </span>
      </div>
      <div className="Counter-obj-container">
        <Icon media={"sZ4Bg4L.png"} />
        <Counter limit={orgs} />
        <span className="Counter-obj-container__up-text">
          Empresas o negocios
        </span>
        <span className="Counter-obj-container__down-text">
          Complementando sus{" "}
          <b className="tooltip">
            Organizaciones
            <span className="tooltiptext">
              WorKn permite crear perfiles de organizaciones con miembros y
              roles.
            </span>
          </b>
        </span>
      </div>
      <div className="Counter-obj-container">
        <Icon media={"qeh182O.png"} />
        <Counter limit={matches} />
        <span className="Counter-obj-container__up-text">
          Matches Realizados
        </span>
        <span className="Counter-obj-container__down-text">
          Encontramos la{" "}
          <b className="tooltip">
            <span className="tooltiptext">
              Una oferta especifica el trabajo a realizar y su naturaleza.
            </span>
            Oferta
          </b>{" "}
          perfecta
        </span>
      </div>
    </div>
  );
}

export default CounterBanner;
