import React, { useRef } from "react";
import "./NewPassword-Style.css";
import "../../App.css";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { resetPassword } from "../../utils/apiRequests";
import { useHistory } from "react-router-dom";

const NewPassword = ({
  match: {
    params: { token },
  },
}) => {
  const { register, handleSubmit, errors, watch } = useForm();
  const password = useRef({});
  password.current = watch("password", "");
  const { push } = useHistory();

  const onSubmit = (data) => {
    data.myToken = token;
    resetPassword(data).then((res) => {
      if (res.data !== undefined) {
        console.log(res.data);
      }
      push("/loginpage");
    });
  };

  return (
    <div className="login-wrapper">
      <form className="npassword-container" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="npassword-container__popup-title">
          Mi nueva contraseña
        </h1>
        <span className="npassword-container__popup-text">
          Nueva contraseña
        </span>
        <input
          className="npassword-container__form-input"
          type="password"
          name="password"
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
          name="password"
          render={({ message }) => (
            <div className="input__msg input__msg--error">
              <i class="fa fa-asterisk"></i> {message}
            </div>
          )}
        />

        <span className="npassword-container__popup-text">
          Confirme nueva contraseña
        </span>
        <input
          className="npassword-container__form-input"
          type="password"
          name="passwordConfirm"
          title="Por favor no incluya números en su nombre"
          ref={register({
            validate: (value) =>
              value === password.current || "Las contraseñas no coinciden",
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
        <input
          className="forgot-container__custom-button bg-green"
          type="submit"
          value="Confirmar"
        />
      </form>
    </div>
  );
};

export default NewPassword;
