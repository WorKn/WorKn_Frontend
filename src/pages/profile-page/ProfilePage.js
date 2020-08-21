import React from "react";
import Auth from "../../utils/authHelper";
import Cookies from "js-cookie";
import Header from "../../components/navbar-components/Navbar";
import Banner from "../../components/banner-components/Banner";
import "./ProfilePage-Style.css";
import UserForm from "../../components/form-components/UserForm";
import CustomButton from "../../components/button-components/CustomButton";
import Footer from "../../components/footer-components/Footer";

const ProfilePage = (props) => {
  return (
    <div className="pagewrap">
      <Header />
      <Banner image={"kiwVnMm.png"} />
      <div className="profilewrap">
        <div className="klk">
          <img
            src="https://i.imgur.com/of8M7Z2.png"
            className="profilewrap__img"
            alt=""
          />
          <div className="userform__footer">
            <span className="userform__title">
              Selecciona tu categoría y tus etiquetas
            </span>
            <span className="userform__text">
              Las etiqueta sirven para emparejarte con ofertas de trabajo y
              personas en tus mismas áreas de conocimiento, la categoría sirve
              para filtrar dichas etiquetas de una manera más precisa.
            </span>
          </div>
          <CustomButton></CustomButton>
        </div>
        <div className="formss">
          <UserForm></UserForm>
        </div>
      </div>
      <button
        onClick={() => {
          Cookies.remove("jwt");
          Auth.logout(() => {
            props.history.push("/");
          });
        }}
      >
        Logout
      </button>
      <Footer></Footer>
    </div>
  );
};

export default ProfilePage;
