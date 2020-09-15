import React from "react";
import "./ExplorePage-Style.css";
import Banner from "../../components/banner-components/Banner";
import Header from "../../components/navbar-components/Navbar";
import { useForm } from "react-hook-form";

const ExplorePage = () => {
  const { register, handleSubmit } = useForm({});
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div>
      <div className="explorepage">
        <Header />
        <Banner image={"kiwVnMm.png"} />
        <div className="explorepage__inner">
          <form className="explorepage__wrapper">
            <div className="explorepage__searchbox">
              <input
                name="query"
                type="text"
                className="explorepage__inputsearch"
                placeholder="Busca nombres, empresas, organizaciones o etiquetas"
                ref={register()}
              ></input>
              <div
                onClick={handleSubmit(onSubmit)}
                className="explorepage__searchbtn"
              >
                <i className="fa fa-search"></i>{" "}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
