import React, { useState } from "react";
import "./ForgotPassword-Style.css";
import "../../App.css";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { sendEmail } from "../../utils/apiRequests";
import { store } from 'react-notifications-component';
import Header from "../../components/navbar-components/Navbar";
import Footer from "../../components/footer-components/Footer";

const FPassword = () => {
  const { register, handleSubmit, errors } = useForm();
  const [userObject] = useState("");

  const onSubmit = (data) => {
    sendEmail(data)
      .then((res) => {
        if (res?.data?.status && res?.data?.status === 'success') {
          store.addNotification({
            title: "Mensaje Enviado",
            message: "Hemos enviado un mensaje con las instrucciones para reestablecer su contrase­ña",
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
        } else {
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
    <div>
      <Header />
      <div className="forgot-wrapper">
        <div className="green-line">
          <form className="sizing-container" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="forgot-container__popup-title">
              Restauración de Contraseña
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

      </div>
      <Footer />
    </div>
  );
};

export default FPassword;






