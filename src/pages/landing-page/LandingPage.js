import React from "react";
import "./LandingPage-Style.css";
import JumbotronComponent from '../../components/jumbotron-components/Jumbotron';
import NavbarComponent from './../../components/navbar-components/Navbar';

function LandingPage() {

  const CTAComponent = {
    imageUrl : "https://i.imgur.com/qVlXstT.png",
    h1Text : "De forma rápida y confiable",
    pText : "Crea y encuentra ofertas de trabajo perfectas para tus necesidades",
    bText : "Únete o inicia sesión",
    inverted: false
  };

  const helpJumbotron = {
    imageUrl : "https://i.imgur.com/MXzY7rs.png",
    h1Text : "En Workn buscamos ayudarte",
    pText : `Encargándonos de unir automáticamente profesionales, empresas y freelancers en nuestra plataforma mediante ofertas que nos permiten saber lo que necesitas y donde te necesitan`,
    bText : "",
    inverted: true
  };

  return (
    <div>
      <h1>This is our landing page</h1>
      <button>Tester</button>
      {/* <HeaderComponent></HeaderComponent> */}
      <NavbarComponent></NavbarComponent>
      <JumbotronComponent params={CTAComponent}></JumbotronComponent>
      <JumbotronComponent params={helpJumbotron}></JumbotronComponent>
    </div>
  );
}

export default LandingPage;
