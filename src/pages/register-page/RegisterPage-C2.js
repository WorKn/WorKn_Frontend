import React, { useRef, useState, useEffect } from "react";
import "./RegisterPage-Style.css";
import "../../App.css";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import updateAction from "../../updateAction";
import { useStateMachine } from "little-state-machine";
import { ErrorMessage } from "@hookform/error-message";
import { getAge } from "../../utils/ageCalculation";
import { orgUserSignup } from "../../utils/apiRequests";

const RegisterPageC2 = () => {
  const [gotResponse, setGotResponse] = useState(false);
  const { state, action } = useStateMachine(updateAction);
  const { register, handleSubmit, watch, errors } = useForm({
    defaultValues: state.userInformation,
  });
  const { push } = useHistory();
  const onSubmit = (data) => {
    state.userInformation.userType = "offerer";
    state.userInformation.organizationRole = "owner";
    action(data);
    setGotResponse(true);
  };

  useEffect(() => {
    if (state.userInformation.userType !== "") {
      orgUserSignup(state.userInformation).then((res) => {
        // setUserInfo(res);
      });
      push("/loginpage");
    } else {
      console.log("loading");
    }
  }, [gotResponse]);

  const password = useRef({});
  password.current = watch("password", "");

  // console.log(state.userInformation);

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
          <span className="popup-title">Registra tu cuenta </span>
          <span className="sub-title">
            Primero crearemos tu cuenta de administrador de la empresa o negocio
          </span>
          <div className="paired-container">
            <div className="paired-input">
              <span className="popup-text">Nombre</span>
              <input
                className="form-input"
                type="text"
                name="name"
                pattern="[a-zA-Z]*"
                title="Por favor no incluya números en su nombre"
                ref={register({ required: "Por favor ingrese su nombre" })}
              />
              <ErrorMessage
                errors={errors}
                name="name"
                render={({ message }) => (
                  <div className="input__msg input__msg--error">
                    <i class="fa fa-asterisk"></i> {message}
                  </div>
                )}
              />
            </div>
            <div className="paired-input lspacer">
              <span className="popup-text">Apellido</span>
              <input
                className="form-input"
                type="text"
                name="lastname"
                pattern="[a-zA-Z]*"
                title="Por favor no incluya números en su apellido"
                ref={register({ required: "Por favor ingrese su apellido" })}
              />
              <ErrorMessage
                errors={errors}
                name="lastname"
                render={({ message }) => (
                  <div className="input__msg input__msg--error">
                    <i class="fa fa-asterisk"></i> {message}
                  </div>
                )}
              />
            </div>
          </div>
          <span className="popup-text">Correo</span>
          <input
            className="form-input"
            type="email"
            name="email"
            ref={register({ required: "Por favor ingrese su correo" })}
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
          <div class="paired-container">
            <div class="paired-input">
              <span className="popup-text">Contraseña</span>
              <input
                className="form-input"
                name="password"
                type="password"
                ref={register({
                  required: "Por favor ingrese su contraseña",
                  minLength: {
                    value: 8,
                    message: "Su contraseña debe tener al menos 8 caracteres",
                  },
                })}
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
            </div>
            <div className="paired-input lspacer">
              <span className="popup-text">Confirmar contraseña</span>
              <input
                className="form-input"
                name="passwordConfirm"
                type="password"
                ref={register({
                  validate: (value) =>
                    value === password.current ||
                    "Las contraseñas no coinciden",
                })}
              />
              <ErrorMessage
                errors={errors}
                name="passwordConfirm"
                render={({ message }) => (
                  <div className="input__msg input__msg--error">
                    <i class="fa fa-asterisk"></i> {message}
                  </div>
                )}
              />
            </div>
          </div>
          <span className="popup-text">Fecha de nacimiento</span>
          <input
            className="form-input"
            name="birthday"
            id="birthday"
            type="date"
            min="1899-01-01"
            ref={register({
              required: "Por favor ingrese su fecha de nacimiento",
              validate: (value) =>
                getAge(value) >= 16 ||
                "Debes ser mayor de 16 años para utilizar WorKn",
            })}
          />
          <ErrorMessage
            errors={errors}
            name="birthday"
            render={({ message }) => (
              <div className="input__msg input__msg--error">
                <i class="fa fa-asterisk"></i> {message}
              </div>
            )}
          />
          <input
            className="custom-button bg-green"
            type="submit"
            value="Siguiente"
          />
          <div className="ctext-separator">
            <span className="remind-me">
              Ya tienes cuenta? {""}
              <a className="popup-link " href="/loginpage">
                Inicia sesión
              </a>
            </span>
          </div>
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
