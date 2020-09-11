import React from "react";

import "./ManageOffersPage-Style.css";

import Header from "../../components/navbar-components/Navbar.jsx";

const ManageOffersPage = () => (
  <div className="manageoffers-container">
    <Header></Header>
    <div className="manageoffers-banner">
      {/* Hacer boton mamalon que llame a CreateOffer */}
      <h1 className="manageoffers-banner__title">Resumen de ofertas</h1>
    </div>

    <h1>Maneje sus ofertas</h1>
  </div>
);

export default ManageOffersPage;
