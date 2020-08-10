import React from "react";
import "./LoginPage-Style.css";
import "../../App.css";
import { useModal } from "../../hooks/useModal";
import QuestionPopup from "../../components/popup-components/QuestionPopup";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useStateMachine } from "little-state-machine";
import updateAction from "../../updateAction";

const LoginPage = React.memo(() => {
  const { register, handleSubmit, errors } = useForm();
  const { state, action } = useStateMachine(updateAction);

  const {
    show: showQuestionModal,
    RenderModal: QuestionModal,
    // hide: hideQuestionModal,
  } = useModal();

  const onSubmit = (data) => {
    action(data);
    console.log(data);
  };
  return (
    <div className="login-wrapper">
      <QuestionModal>
        <QuestionPopup />
      </QuestionModal>
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
              name="user"
            />
            <ErrorMessage
              errors={errors}
              name="user"
              render={({ message }) => (
                <div className="input__errormsg">
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
                <div className="input__errormsg">
                  <i class="fa fa-asterisk"></i> {message}
                </div>
              )}
            />
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
            <input
              className="custom-button bg-green"
              type="submit"
              value="Acceder"
            />
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
