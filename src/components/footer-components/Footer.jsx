import React from "react";
import { Link } from "react-router-dom";
import "./Footer-Style.css"

const Footer = () => {
    return(
        <div className= "Footer">
            <div className= "right-foot">
                <div className= "up-text">
                    {/* TODO:al hacer click te lleva a tu inbox y prepara un correo para ser enviado a esa direccion */}
                    Email: <a href="https://www.google.com/intl/es-419/gmail/about/#">workninfo@gmail.com</a>
                </div>
                <div className= "down-text">
                    <div>
                        All rights reserved.
                    </div>
                    <Link to="/Terms of Service"> © Terms of Service </Link>
                    <span>.</span>
                    <Link to="/Terms of Service"> Privacy Policy </Link>
                </div>
            </div>
            <div className= "left-foot">
                <div className= "up-content">
                    <div className="flogo">
                        <img src="https://imgur.com/klMjRck.png" alt="workn-logo"/>
                        <p>Find your missing piece</p>
                    </div>
                    <div className="fnavbar">
                        <span>Ofertas</span>
                        <span>Exploración</span>
                        <span>Resumen</span>
                        <span>Mensajería</span>
                    </div>
                </div>
                <div className= "middle-content">
                        <div>
                        <img src="https://imgur.com/XL6Cvrz.png" alt="facebook-logo"/>
                        </div>
                        <div>
                        <img src="https://imgur.com/uxM8asb.png" alt="instagram-logo"/>
                        </div>
                        <div>
                        <img src="https://imgur.com/3mO0prt.png" alt="twitter-logo"/>
                        </div>
                </div>
                <div className= "down-content">
                        <span>Desarrollado en la Republica Dominicana, SD</span>
                </div>
            </div>
        </div>
    )
}

export default  Footer;