import React from "react";
import "./LandingPage-Style.css";
import Footer from "../../components/footer-components/Footer.jsx";
import Banner from "../../components/banner-components/Banner.jsx";
import CounterBanner from "../../components/counter-components/Counter-Banner";

const LandingPage = () => {
  return (
    <div>
      <h1>This is our landing page</h1>
      <button>Tester</button>
      <Banner image={"kiwVnMm.png"} />
      <CounterBanner />
      <Footer />
    </div>
  );
};

export default LandingPage;