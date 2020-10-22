import React, { useEffect } from "react";
import "./LandingPage-Style.css";
import CounterBanner from "../../components/counter-components/Counter-Banner";
import Banner from "../../components/banner-components/Banner.jsx";
import Footer from "../../components/footer-components/Footer.jsx";
import Header from "../../components/navbar-components/Navbar.jsx";
import JumbotronComponent from "../../components/jumbotron-components/Jumbotron.jsx";
import CtaComponent from "../../components/cta-components/CTAComponent";

const LandingPage = () => {
  const CTAComponent = {
    imageUrl: "https://i.imgur.com/qVlXstT.png",
    h1Text: "De forma rápida y confiable",
    pText: "Crea y encuentra ofertas de trabajo perfectas para tus necesidades",
    bText: "Únete o inicia sesión",
  };

  const helpJumbotron = {
    imageUrl: "https://i.imgur.com/MXzY7rs.png",
    h1Text: "En Workn buscamos ayudarte",
    pText: `Encargándonos de unir automáticamente profesionales, empresas y freelancers en nuestra plataforma mediante ofertas que nos permiten saber lo que necesitas y donde te necesitan`,
    bText: "",
  };

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div>
      <Header />
      <Banner image={"GCzxKLw.png"} />
      <CtaComponent params={CTAComponent}></CtaComponent>
      <CounterBanner />
      <JumbotronComponent params={helpJumbotron}></JumbotronComponent>
      <Footer />
    </div>
  );
};

export default LandingPage;
