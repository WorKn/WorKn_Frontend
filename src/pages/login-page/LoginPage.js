import React, { useState, useEffect } from "react";
import "./LoginPage-Style.css";
import "../../App.css";
import { useModal } from "../../hooks/useModal";
import QuestionPopup from "../../components/popup-components/QuestionPopup";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useStateMachine } from "little-state-machine";
import updateAction from "../../updateAction";
import { userLogin } from "../../utils/apiRequests";
import { useHistory } from "react-router-dom";
import auth from "../../utils/authHelper";
import Cookies from "js-cookie";
import { store } from 'react-notifications-component';
import Header from "../../components/navbar-components/Navbar";
import Footer from "../../components/footer-components/Footer";


const LoginPage = React.memo((props) => {
  const [userObject, setUserObject] = useState("");
  const { register, handleSubmit, errors } = useForm();
  const { state, action } = useStateMachine(updateAction);
  const {
    show: showQuestionModal,
    RenderModal: QuestionModal,
    // hide: hideQuestionModal,
  } = useModal();

  const { push } = useHistory();
  const onSubmit = (data) => {
    userLogin(data).then((res) => {
      if (res !== undefined) {
        setUserObject(res);
      }
    });
  };

  useEffect(() => {
    action({ name: '', lastname: '', bio: "", identificationNumber: "", location: "", phone: "", email: "", birthday: "", password: "", passwordConfirm: "", userType: "", category: "", tags: '', organization: '', organizationRole: '', isEmailValidated: "", createdAt: '', profilePicture: "", _id: '', __v: "", passwordChangedAt: '', signUpMethod: "", isSignupCompleted: "", id: '', data: '', hasPasswordUpdated: false, hasCreatedAccount: false, updatedAt: "", isActive: false, tokens: "", chats: "", chatPivot: "", })
  }, [action])

  useEffect(() => {
    if (userObject.data !== undefined && userObject.data.status === "success") {
      action(userObject.data.data.user);
      action({ hasPasswordUpdated: false })
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
      console.log("not completed!");
    }
  }, [
    userObject,
    push,
    action,
    state.userInformation.category,
    state.userInformation.tags,
  ]);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (state.userInformation.isUserFromNav && state.userInformation.isUserFromNav === true) {
      setTimeout(() => {
        showQuestionModal();
      }, 1000)
      setTimeout(() => {
        action({ isUserFromNav: false })
      }, 1500)
    }
  }, [action, showQuestionModal, state.userInformation.isUserFromNav])


  useEffect(() => {
    if (state.userInformation.hasPasswordUpdated !== "undefined" && state.userInformation.hasPasswordUpdated === true) {
      setTimeout(() => {
        store.addNotification({
          title: "Contraseña cambiada exitosamente!",
          message: "Accede utilizando tus nuevas credenciales",
          type: "success",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 10000,
            onScreen: true
          }
        });
      }, 1500);
    } else (
      console.log("Loading...")
    )
  }, [state.userInformation.hasPasswordUpdated])

  return (
    <div className="login-wrapper">
      <QuestionModal>
        <QuestionPopup />
      </QuestionModal>
      <Header />
      <div className="green-line">
        <div>
          <form className="sizing-container" onSubmit={handleSubmit(onSubmit)}>
            <div className="logo-container">
              <img
                className="logo-header"
                src="https://i.imgur.com/klMjRck.png"
                alt="logo"
              />
            </div>
            <span className="popup-title">Inicio de sesión</span>
            <span className="popup-text">Correo</span>
            <input
              className="form-input"
              type="email"
              ref={register({ required: "Por favor ingrese su correo" })}
              name="email"
            />
            <ErrorMessage
              errors={errors}
              name="email"
              render={({ message }) => (
                <div className="input__msg input__msg--error">
                  <i class="fa fa-asterisk"></i> {message}
                </div>
              )}
            />
            <span className="popup-text">Contraseña</span>
            <input
              className="form-input"
              type="password"
              ref={register({ required: "Por favor ingrese su contraseña" })}
              name="password"
            />
            <ErrorMessage
              errors={errors}
              name="password"
              render={({ message }) => (
                <div className="input__msg input__msg--error">
                  <i class="fa fa-asterisk"></i> {message}
                </div>
              )}
            />
            {typeof userObject.data !== "undefined" &&
              userObject.data.status === "success" ? (
                <div className="input__msg input__msg--success">
                  Bienvenido, {userObject.data.data.user.name}
                </div>
              ) : (
                ""
              )}
            <div className="input__msg input__msg--error">
              {userObject.message}
            </div>
            <div className="text-separator">
              <div>
                <input className="form-checkbox" type="checkbox" />
                <span className="popup-text remind-me">Recuerdame</span>
              </div>
              <span className="remind-me">
                <a className="popup-link " href="/forgotPassword">
                  ¿Olvidaste tu contraseña?
                </a>
              </span>
            </div>
            <input
              className="custom-button bg-green"
              type="submit"
              value="Iniciar sesión"
            />
            <div className="line-separator">
              <span className="hl"></span>
              <span className="spacer">o</span>
              <span className="hl"></span>
            </div>
            <span onClick={showQuestionModal} className="custom-button bg-jet">
              <span>Regístrate ahora</span>
            </span>
            <span className="custom-button bg-red">
              <div className="inner-container">
                <i className="fa fa-google"></i>
                <span className="vl"></span>
                <span>Accede con Google</span>
              </div>
            </span>
          </form>
        </div>
      </div>
      <Footer></Footer>
    </div>

  );
});

export default LoginPage;
