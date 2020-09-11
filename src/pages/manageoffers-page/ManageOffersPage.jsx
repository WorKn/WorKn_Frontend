import React, { useEffect, useState } from "react";

import "./ManageOffersPage-Style.css";

import Header from "../../components/navbar-components/Navbar.jsx";

import { getMyOffers } from "../../utils/apiRequests";

const ManageOffersPage = () => {
  const [myoffers, setMyOffers] = useState([]);
  useEffect(() => {
    getMyOffers().then((res) => {
      console.log(res.data.data.offers);
      setMyOffers(res.data.data.offers);
    });
  }, []);

  return (
    <div className="manageoffers-container">
      <Header></Header>
      <div className="manageoffers-banner">
        <h1 className="manageoffers-banner__title">Resumen de ofertas</h1>
      </div>
      {myoffers.map((offer) => (
        <h1 key={offer._id}>{offer.title}</h1>
      ))}

      <h1>Maneje sus ofertas</h1>
    </div>
  );
};

export default ManageOffersPage;
