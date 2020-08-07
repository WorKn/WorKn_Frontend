import React from "react";
import "./RegisterPage-Style.css";
import "../../App.css";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import updateAction from "./updateAction";
import { useStateMachine } from "little-state-machine";

const RegisterPageC2 = () => {
  const { state, action } = useStateMachine(updateAction);
  const { register, handleSubmit } = useForm({
    defaultValues: state.userInformation,
  });
  const { push } = useHistory();
  const onSubmit = (data) => {
    action(data);
    push("/loginpage");
  };

  console.log(state.userInformation);

  return (
    <div className="register-wrapper">
      <div className="green-line">
        <form className="sizing-container" onSubmit={handleSubmit(onSubmit)}>
          <div className="logo-container">
            <img
              className="logo-header"
              src="https://i.imgur.com/klMjRck.png"
              alt="logo"
            />
          </div>
          <span className="popup-title nomargin">Registra tu cuenta </span>
          <span className="sub-title">
            Primero crearemos tu cuenta de administrador de la empresa o negocio
          </span>
          <div className="paired-container">
            <div className="paired-input">
              <span className="popup-text">Nombre</span>
              <input
                className="form-input"
                type="text"
                name="userName"
                ref={register}
              />
            </div>
            <div className="paired-input lspacer">
              <span className="popup-text">Apellido</span>
              <input
                className="form-input"
                type="text"
                name="userLastName"
                ref={register}
              />
            </div>
          </div>
          <span className="popup-text">Correo</span>
          <input
            className="form-input"
            type="text"
            name="userMail"
            ref={register}
          />
          <div class="paired-container">
            <div class="paired-input">
              <span className="popup-text">Contraseña</span>
              <input
                className="form-input"
                name="userPassword"
                type="password"
                ref={register}
              />
            </div>
            <div className="paired-input lspacer">
              <span className="popup-text">Confirmar contraseña</span>
              <input
                className="form-input"
                name="userPasswordConfirm"
                type="password"
                ref={register}
              />
            </div>
          </div>
          <span className="popup-text">Fecha de nacimiento</span>
          <input
            className="form-input"
            name="userBirthday"
            type="text"
            ref={register}
          />
          <input
            className="custom-button bg-green"
            type="submit"
            value="Regístrate"
          />

          <div className="line-separator">
            <span className="hl"></span>
            <span className="spacer">o</span>
            <span className="hl"></span>
          </div>
          <span className="custom-button bg-blue">
            <div className="inner-container">
              <i class="fa fa-facebook-official"></i>
              <span className="vl"></span>
              <span>Regístrate con Facebook</span>
            </div>
          </span>
          <span className="custom-button bg-red">
            <div className="inner-container">
              <i class="fa fa-google"></i>
              <span className="vl"></span>
              <span>Regístrate con Google</span>
            </div>
          </span>
        </form>
      </div>
    </div>
  );
};

export default RegisterPageC2;
