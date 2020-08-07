import React from "react";
import "./LandingPage-Style.css";
import CounterBanner from "../../components/counter-components/Counter-Banner";
import Banner from "../../components/banner-components/Banner.jsx";


function LandingPage() {
  return (
    <div>
      <h1>This is our landing page</h1>
      <button>Tester</button>
      <Banner image={"kiwVnMm.png"} />
      <CounterBanner />
    </div>
  );
}

export default LandingPage;