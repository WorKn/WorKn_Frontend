import React from "react";
import "./LoginPage-Style.css";
import "../../App.css";
import { useModal } from "../../hooks/useModal";
import QuestionPopup from "../../components/popup-components/QuestionPopup";
import { useForm } from "react-hook-form";

const LoginPage = React.memo(() => {
  const { register, handleSubmit, errors } = useForm();
  const {
    show: showQuestionModal,
    RenderModal: QuestionModal,
    hide: hideQuestionModal,
  } = useModal();

  return (
    <div className="login-wrapper">
      <QuestionModal>
        <QuestionPopup />
      </QuestionModal>
      <div className="green-line">
        <div>
          <form action="" className="sizing-container">
            <div className="logo-container">
              <img
                className="logo-header"
                src="https://i.imgur.com/klMjRck.png"
                alt="logo"
              />
            </div>
            <span className="popup-title">Inicio de sesión</span>
            <span className="popup-text">Correo</span>
            <input className="form-input" type="text" ref={register} />
            <span className="popup-text">Contraseña</span>
            <input className="form-input" type="password" ref={register} />
            <div className="text-separator">
              <div>
                <input className="form-checkbox" type="checkbox" />
                <span className="popup-text remind-me">Recuerdame</span>
              </div>
              <span className="remind-me">
                <a className="popup-link " href="/dummy">
                  ¿Olvidaste tu contraseña?
                </a>
              </span>
            </div>
            <span className="custom-button bg-green">
              <span>Acceder</span>
            </span>
            <span onClick={showQuestionModal} className="custom-button bg-gray">
              <span>Regístrate</span>
            </span>
            <div className="line-separator">
              <span className="hl"></span>
              <span className="spacer">o</span>
              <span className="hl"></span>
            </div>
            <span className="custom-button bg-blue">
              <div className="inner-container">
                <i className="fa fa-facebook-official"></i>
                <span className="vl"></span>
                <span>Accede con Facebook</span>
              </div>
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
    </div>
  );
});

export default LoginPage;
