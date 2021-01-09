import React, { useState, useEffect } from "react";
import "./RegisterPage-Style.css";
import "../../App.css";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import updateAction from "../../updateAction";
import { useStateMachine } from "little-state-machine";
import { userSignup } from "../../utils/apiRequests";
import auth from "../../utils/authHelper";
import Cookies from "js-cookie";
import { store } from 'react-notifications-component';
import Header from "../../components/navbar-components/Navbar";
import Footer from "../../components/footer-components/Footer";

const RegisterPageC1 = () => {
  const [userObject, setUserObject] = useState("");
  const { state, action } = useStateMachine(updateAction);
  const { register, handleSubmit, errors } = useForm();
  const { push } = useHistory();
  const onSubmit = (data) => {
    state.userInformation.userType = data.userType
    data.organizationRole = "";
    action(data);
    action({ hasCreatedAccount: true })
    setTimeout(() => {
      userSignup(state.userInformation).then((res) => {
        setUserObject(res);
        if (res.status === "fail") {
          store.addNotification({
            title: "Ha ocurrido un error",
            message: res.message,
            type: "danger",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 10000,
              onScreen: true
            }
          });
        }
      });
    }, 1500);
  };

  // useEffect(() => {
  //   if (state.userInformation.userType !== "") {
  //     userSignup(state.userInformation).then((res) => {
  //       console.log(res)
  //       setUserObject(res);
  //     });
  //   } else {
  //     console.log("loading");
  //   }
  // }, [gotResponse, push, state.userInformation]);

  useEffect(() => {
    if (userObject.data !== undefined && userObject.data.status === "success") {
      action(userObject.data.data.user);
      Cookies.set("jwt", userObject.data.token, { expires: 7 });
    }
    const user = Cookies.get("jwt");
    if (user && state.userInformation.category && state.userInformation.tags) {
      auth.login();
      push("/userprofile");
    } else if (
      user &&
      !state.userInformation.category &&
      !state.userInformation.tags
    ) {
      auth.login();
      push("/userprofile");
    }
  }, [
    userObject,
    push,
    action,
    state.userInformation.category,
    state.userInformation.tags,
  ]);

  return (
    <div>
      <Header />
      <div className="login-wrapper">
        <div className="green-line">
          <form className="sizing-container" onSubmit={handleSubmit(onSubmit)}>
            <span>
              <a href="/register" className="backtick">
                <i className="fa fa-chevron-left"></i>Volver
            </a>
            </span>
            <div className="logo-container">
              <img
                className="logo-header"
                src="https://i.imgur.com/klMjRck.png"
                alt="logo"
              />
            </div>
            <span className="popup-title">Cuéntanos sobre ti </span>
            <span className="popup-text">Cómo pretendes usar Workn?</span>
            <div className="role-container">
              <div className="role-inner">
                <p className="role-title">Aplicante</p>
                <img
                  className="role-img"
                  src="https://i.imgur.com/C632Oku.png"
                  alt=""
                />
                <p className="role-text">
                  Podrás encontrar ofertas de trabajo perfectas, ya sean de tiempo
                  completo, medio o freelancing.
              </p>
              </div>
              <div className="role-inner">
                <p className="role-title">Ofertante</p>

                <img
                  className="role-img"
                  src="https://i.imgur.com/nrXLDj0.png"
                  alt=""
                />
                <p className="role-text">
                  Si buscas una persona que te cubra un puesto de empleo o
                necesidad, esta es tu categoría.{" "}
                </p>
              </div>
            </div>
            <select
              className="form__select"
              name="userType"
              ref={register({
                required: "Por favor ingrese el tipo de usuario que desea crear",
              })}
            >
              <option value="">Seleccione el tipo de usuario</option>
              <option value="applicant">Aplicante</option>
              <option value="offerer">Ofertante</option>
            </select>
            <ErrorMessage
              errors={errors}
              name="userType"
              render={({ message }) => (
                <div className="input__msg input__msg--error">
                  <i className="fa fa-asterisk"></i> {message}
                </div>
              )}
            />
            <input
              className="custom-button bg-green"
              type="submit"
              value="Regístrate"
            />
          </form>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default RegisterPageC1;
