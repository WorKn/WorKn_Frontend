import React from "react";
import { Link } from "react-router-dom";
import "./Footer-Style.css";
import Icon from "./Icon.jsx";

const Footer = () => {
  return (
    <div className="Footer">
      <div className="right-foot">
        <div className="up-text">
          {/* TODO:al hacer click te lleva a tu inbox y prepara un correo para ser enviado a esa direccion */}
          Email: 
          <a href="https://www.google.com/intl/es-419/gmail/about/#">
            workninfo@gmail.com
          </a>
        </div>
        <div className="down-text">
          <Link className="utobj" to="#">
            Terms of Service.
          </Link>
          <Link className="utobj" to="#">
            Privacy Policy.
          </Link>
          <div className="Rights">
            &copy;{new Date().getFullYear()} All rights reserved.
          </div>
        </div>
      </div>
      <div className="left-foot">
        <div className="up-content">
          <div className="flogo">
            <Link to="/">
              <img src="https://imgur.com/klMjRck.png" alt="workn-logo" />
            </Link>
            <p>Find your missing piece</p>
          </div>
          <div className="fnavbar">
            <Link className="fobj" to="#">
              Ofertas
            </Link>
            <Link className="fobj" to="#">
              Exploración
            </Link>
            <Link className="fobj" to="#">
              Resumen
            </Link>
            <Link className="fobj" to="#">
              Mensajería
            </Link>
          </div>
        </div>
        <div className="middle-content">
          <div>
            <Icon
              path={"https://www.facebook.com/WorKn"}
              media={"XL6Cvrz.png"}
            />
          </div>
          <div>
            <Icon
              path={"https://www.instagram.com/WorKn/"}
              media={"uxM8asb.png"}
            />
          </div>
          <div>
            <Icon path={"https://twitter.com/WorKn"} media={"3mO0prt.png"} />
          </div>
        </div>
        <div className="down-content">
          <span>Desarrollado en la Republica Dominicana, SD</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
