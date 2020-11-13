import React, { useState } from "react";
import "./ForgotPassword-Style.css";
import "../../App.css";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { sendEmail } from "../../utils/apiRequests";
import { store } from 'react-notifications-component';


const FPassword = () => {
  const { register, handleSubmit, errors } = useForm();
  const [userObject] = useState("");

  const onSubmit = (data) => {
    sendEmail(data)
      .then((res) => {
        if (res?.status && res?.status === "success") {
          store.addNotification({
            title: "Correo enviado correctamente",
            message: "Por favor revise su correo",
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
          console.log(res.data);
        } else if (res?.status && res?.status === "fail"){
          store.addNotification({
            title: "Ha ocurrido un error",
            message: res?.message,
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
      })
      .catch((err) => {
        store.addNotification({
          title: "Ha ocurrido un error",
          message: err,
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
      });
  };

  return (
    <div className="forgot-wrapper">
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






