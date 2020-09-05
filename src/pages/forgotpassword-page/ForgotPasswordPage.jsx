import React, { useState } from "react";
import "./ForgotPassword-Style.css";
import "../../App.css";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { sendEmail } from "../../utils/apiRequests";

const FPassword = () => {
  const { register, handleSubmit, errors } = useForm();
  const [userObject, setUserObject] = useState("");

  const onSubmit = (data) => {
    sendEmail(data).then((res) => {
      if (res.data !== undefined) {
        console.log(res.data);
      }
    });
  };

  return (
    <div className="login-wrapper">
      <form className="forgot-container" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="forgot-container__popup-title">
          ¡Olvide mi contraseña!
        </h1>
        <span className="forgot-container__popup-text">Correo</span>
        <input
          className="forgot-container__form-input"
          type="email"
          name="email"
          placeholder="Email"
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
        <div className="input__msg input__msg--error">{userObject.message}</div>
        <input
          className="forgot-container__custom-button bg-green"
          type="submit"
          value="Enviar"
        />
      </form>
    </div>
  );
};

export default FPassword;
