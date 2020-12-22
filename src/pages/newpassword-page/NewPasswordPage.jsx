import React, { useRef } from "react";
import "./NewPassword-Style.css";
import "../../App.css";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { resetPassword } from "../../utils/apiRequests";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import { useStateMachine } from "little-state-machine";
import updateAction from "../../updateAction";

const NewPassword = ({
  match: {
    params: { token },
  },
}) => {
  const { action } = useStateMachine(updateAction);
  const { register, handleSubmit, errors, watch } = useForm();
  const password = useRef({});
  password.current = watch("password", "");
  const { push } = useHistory();

  const onSubmit = (data) => {
    data.myToken = token;
    resetPassword(data).then((res) => {
      if (res?.data?.status && res?.data?.status === "success") {
        action({ hasPasswordUpdated: true })
        Cookies.set("jwt", res.data.token, { expires: 7 });
      }
      push("/login");
    });
  };

  return (
    <div className="forgot-wrapper">
      <div className='green-line'>
        <form className="sizing-container" onSubmit={handleSubmit(onSubmit)}>
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
    </div>
  );
};

export default NewPassword;
