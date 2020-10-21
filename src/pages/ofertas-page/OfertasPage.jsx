import React, { useEffect, useState } from "react";
import Banner from "../../components/banner-components/Banner";
import Header from "../../components/navbar-components/Navbar";
import Footer from "../../components/footer-components/Footer";
import OfferCard from "../../components/offer-components/OfferCard";
import updateAction from "../../updateAction";
import { useStateMachine } from "little-state-machine";
import {
  getOfferRecommendation,
  getUserRecommendation,
} from "../../utils/apiRequests";
import "./OfertasPage-Style.css";

const OfertasPage = () => {
  useEffect(() => {
    getUserRecommendation().then((res) => {
      console.log(res);
    });
  }, []);

  // const [parameter, setParameter] = useState("");
  return <h1>Welcome to ofertas page</h1>;
};

export default OfertasPage;
