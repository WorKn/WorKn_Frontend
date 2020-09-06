import React, { useRef, useState } from "react";
import "./QuestionPopup-Style.css";
import "../../App.css";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { removeMember } from "../../utils/apiRequests";
import updateAction from "../../updateAction";
import { useStateMachine } from "little-state-machine";

const ManagePopup = () => {
  const [invited, setInvited] = useState("");
  const { state } = useStateMachine(updateAction);
  const { register, handleSubmit, errors, watch } = useForm();
  const newPassword = useRef({});
  newPassword.current = watch("newPassword", "");

  const onSubmit = (data, e) => {
    console.log("test");
    data.OrgId = state.userInformation.organization;
    console.log(data);
    removeMember(data).then((res) => {
      if (res.data !== undefined) {
        setInvited(res);
        e.target.reset();
      }
    });
  };

  return (
    <div className="popup-wrapper">
      <form className="sizing-container" onSubmit={handleSubmit(onSubmit)}>
        <span className="popup-btitle">Eliminar usuario</span>
        <div className="userform__LIP">
          <span className="userform__label">Temporary</span>
          <input
            className="form-input"
            type="text"
            name="id"
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
        {typeof invited.data !== "undefined" &&
        invited.data.status === "success" ? (
          <div className="input__msg input__msg--success">
            <i class="fa fa-check"></i> Usuario eliminado correctamente
          </div>
        ) : (
          ""
        )}

        <input
          className="custom-button bg-green"
          type="submit"
          value="Eliminar Usuario"
        />

        <div className="info-container">
          <i className="fa fa-info icon"></i>
          <p>
            Ingresa aquí el correo del usuario que quieras eliminar a formar
            parte de tu organización, recuerda que por medio de ese correo podrá
            crear su cuenta para utilizar WorKn.
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

export default ManagePopup;
