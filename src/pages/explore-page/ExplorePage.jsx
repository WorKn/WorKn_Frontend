import React from "react";
import "./ExplorePage-Style.css";
import Banner from "../../components/banner-components/Banner";
import Header from "../../components/navbar-components/Navbar";

const ExplorePage = () => {
  return (
    <div>
      <div className="explorepage">
        <Header />
        <Banner image={"kiwVnMm.png"} />
        <div className="explorepage__inner">
          <div className="explorepage__wrapper">
            <div className="explorepage__searchbox">
              <input
                type="text"
                className="explorepage__inputsearch"
                placeholder="Busca nombres, empresas, organizaciones o etiquetas"
              ></input>
              <div className="explorepage__searchbtn">
                <i className="fa fa-search"></i>{" "}
              </div>
            </div>
          </div>
        </div>
        {/* <div className="explorepage__searchbar">
            <div className="explorepage__input">
              <i class="fa fa-search"></i>
              <input type="text" />
            </div>
            <div className="explorepage__button">
              <span>Buscar</span>
            </div>
          </div> */}
        {/* <span className="explorepage__title">
            Estas empresas están interesadas en tí
          </span> */}
      </div>
    </div>
  );
};

export default ExplorePage;
