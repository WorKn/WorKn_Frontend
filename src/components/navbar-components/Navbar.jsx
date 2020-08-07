import React from 'react';

import './Navbar-Style.css';

import { Link } from "react-router-dom";


const Header = () => (
    <div className="header">
        <div className="left-items">

            <Link to="/">
                <img className="logo" src="https://i.imgur.com/klMjRck.png" alt=""/>
            </Link>

            <Link className="option" to="#">
                Ofertas
            </Link>
            <Link className="option" to="#">
                Exploración
            </Link>
            <Link className="option" to="#">
                Resumen
            </Link>
            <Link className="option" to="#">
                Mensajeria
            </Link>

        </div>

        <div className="right-items">
            <Link className="option login" to="#">
                Iniciar sesión
            </Link>
            <Link className="option register" to="#">
                Registrate
            </Link>
            <button>
                <img src="https://i.imgur.com/JCXGx2c.png" alt="" className="hamburger"/>
            </button>
        </div>

    </div>
);

export default Header;