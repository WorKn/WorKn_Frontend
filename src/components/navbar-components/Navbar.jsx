import React from 'react';

import './Navbar-Style.css';

import { Link } from "react-router-dom";


const Header = () => (
    <div className="header">
        <div className="left-items">

            <Link className="logo" to="/">
                <img src="https://i.imgur.com/klMjRck.png" alt=""/>
            </Link>

            <Link className="ofertas" to="#">
                Ofertas
            </Link>
            <Link className="Exploración" to="#">
                Exploración
            </Link>
            <Link className="resumen" to="#">
                Resumen
            </Link>
            <Link className="mensajeria" to="#">
                Mensajeria
            </Link>

        </div>

        <div className="right-items">
            <div className="login">
                Inicia Sesión
            </div>
            <div className="register">
                Registrate
            </div>

        </div>

    </div>
);

export default Header;