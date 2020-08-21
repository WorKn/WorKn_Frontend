import React, { useRef } from "react";
import "./QuestionPopup-Style.css";
import "../../App.css";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { updatePassword } from "../../utils/apiRequests";
import { useHistory } from "react-router-dom";

import Cookies from "js-cookie";

const MembersPopup = () => {
  const { register, handleSubmit, errors, watch } = useForm();
  const newPassword = useRef({});
  newPassword.current = watch("newPassword", "");
  const { push } = useHistory();

  const onSubmit = (data) => {
    updatePassword(data).then((res) => {
      if (res.data != undefined) {
        Cookies.set("jwt", res.data.token);
      }
      push("/loginpage");
    });
  };

  return (
    <div className="popup-wrapper">
      <form className="sizing-container" onSubmit={handleSubmit(onSubmit)}>
        <span className="popup-btitle">Manejo de miembros</span>
        <div className="userform__LIP">
          <span className="userform__label">Agregar usuario</span>
          <input
            className="form-input"
            type="password"
            name="currentPassword"
            // pattern="[a-zA-Z]*"
            ref={register({ required: "Por favor ingrese su constraseña" })}
          />
          <ErrorMessage
            errors={errors}
            name="currentPassword"
            render={({ message }) => (
              <div className="input__msg input__msg--error">
                <i class="fa fa-asterisk"></i> {message}
              </div>
            )}
          />
        </div>
        {/* <div className="userform__LIP">
          <span className="userform__label">Ingrese su nueva contraseña</span>
          <input
            className="form-input"
            type="password"
            name="newPassword"
            // pattern="[a-zA-Z]*"
            ref={register({
              required:
                "Por favor ingrese su nueva contraseña, debe tener al menos 8 dígitos",
              minLength: {
                value: 8,
                message: "Por favor utilice más de 8 caracteres",
              },
            })}
          />
          <ErrorMessage
            errors={errors}
            name="newPassword"
            render={({ message }) => (
              <div className="input__msg input__msg--error">
                <i class="fa fa-asterisk"></i> {message}
              </div>
            )}
          />
        </div>
        <div className="userform__LIP">
          <span className="userform__label">Confirme su nueva contraseña</span>
          <input
            className="form-input"
            type="password"
            name="newPasswordConfirm"
            // pattern="[a-zA-Z]*"
            title="Por favor no incluya números en su nombre"
            ref={register({
              validate: (value) =>
                value === newPassword.current || "Las contraseñas no coinciden",
            })}
          />
          <ErrorMessage
            errors={errors}
            name="newPasswordConfirm"
            render={({ message }) => (
              <div className="input__msg input__msg--error">
                <i class="fa fa-asterisk"></i> {message}
              </div>
            )}
          />
        </div> */}
        <span className="userform__label">Usuarios de la organización</span>
        <span className="userform__label">Invitaciones enviadas</span>

        <input
          className="custom-button bg-green"
          type="submit"
          value="Guardar cambios"
        />

        <div className="info-container">
          <i className="fa fa-info icon"></i>
          <p>
            Te recomendamos crear una constraseña fuerte, que contenga símbolos,
            números y al menos un caracter en mayúsculas. Recuerda usar 8
            dígitos o más.
          </p>
        </div>
        {/*
        <NavLink to="/registerpage" style={{ textDecoration: "none" }}>
          <span className="custom-button bg-green">
            <span>Persona</span>
          </span>
        </NavLink>

        <div className="info-container">
          <i className="fa fa-info icon"></i>
          <p>
            Las cuentas de persona están pensadas para todo aquel que desee
            utilizar el sistema para crear o aplicar a ofertas de trabajo, tanto
            a ofertas de empresas como independientes o de freelancing.
          </p>
        </div> */}
      </form>
    </div>
  );
};

export default MembersPopup;
