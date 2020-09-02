import React, { useRef } from "react";
import "./QuestionPopup-Style.css";
import "../../App.css";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { sendInvitation } from "../../utils/apiRequests";
import { useHistory } from "react-router-dom";
import updateAction from "../../updateAction";
import { useStateMachine } from "little-state-machine";
import Cookies from "js-cookie";

const MembersPopup = () => {
  const { state, action } = useStateMachine(updateAction);
  const { register, handleSubmit, errors, watch } = useForm();
  const newPassword = useRef({});
  newPassword.current = watch("newPassword", "");
  const { push } = useHistory();

  const onSubmit = (data) => {
    data.id = state.userInformation.organization;
    sendInvitation(data).then((res) => {
      console.log(data);
      if (res.data != undefined) {
        console.log(res);
        // Cookies.set("jwt", res.data.token);
      }
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
            type="email"
            name="email"
            // pattern="[a-zA-Z]*"
            ref={register({
              required: "Por favor ingrese el correo a invitar",
            })}
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
        </div>
        <span className="userform__label">Usuarios de la organización</span>

        <input
          className="custom-button bg-green"
          type="submit"
          value="Invitar Usuario"
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
