import React, { useRef } from "react";
import "./QuestionPopup-Style.css";
import "../../App.css";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { sendInvitation } from "../../utils/apiRequests";
import { store } from 'react-notifications-component';

// import updateAction from "../../updateAction";
// import { useStateMachine } from "little-state-machine";

const MembersPopup = () => {
  // const [invited, setInvited] = useState("");
  // const { state } = useStateMachine(updateAction);
  const { register, handleSubmit, errors, watch } = useForm();
  const newPassword = useRef({});
  newPassword.current = watch("newPassword", "");

  const onSubmit = (data, e) => {
    sendInvitation(data).then((res) => {
      if (res.data !== undefined) {
        if (res?.data?.status && res?.data?.status === "success") {
          // setInvited(res);
          e.target.reset();
          store.addNotification({
            title: "Invitacón enviada correctamente",
            message: "El usuario recibirá un correo para registrar su cuenta",
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
        } else if (res?.data?.status && res?.data?.status === "fail") {
          store.addNotification({
            title: "Ha ocurrido un error",
            message: res?.data?.message,
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

      }
    });
  };

  return (
    <div className="popup-wrapper">
      <form className="sizing-container" onSubmit={handleSubmit(onSubmit)}>
        <span className="popup-btitle">Manejo de invitaciones</span>
        <div className="userform__LIP">
          <span className="userform__label">Ingrese el correo</span>
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
          <span className="userform__label">Rol del invitado</span>
          <select
            className="form__select"
            name="role"
            id="role"
            ref={register({
              required: "Por favor ingrese el correo a invitar",
            })}
            placeholder="test"
          >
            <option selected value="Por favor seleccione un rol">Seleccione el rol del usuario</option>
            <option value="member">Miembro</option>
            <option value="supervisor">Supervisor</option>
          </select>
        </div>
        {/* {typeof invited.data !== "undefined" &&
          invited.data.status === "success" ? (
            <div className="input__msg input__msg--success">
              <i class="fa fa-check"></i> Usuario invitado correctamente
            </div>
          ) : (
            ""
          )} */}

        <input
          className="custom-button bg-green"
          type="submit"
          value="Invitar Usuario"
        />

        <div className="info-container">
          <i className="fa fa-info icon"></i>
          <p>
            Ingresa aquí el correo del usuario que quieras invitar a formar
            parte de tu organización, recuerda que por medio de ese correo podrá
            crear su cuenta para utilizar WorKn.
          </p>
        </div>
        {/*
        <NavLink to="/register" style={{ textDecoration: "none" }}>
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
