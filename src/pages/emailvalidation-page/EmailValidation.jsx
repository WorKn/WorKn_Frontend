import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import "./EmailValidation-Style.css";

import { validateEmail } from "../../utils/apiRequests";

const EmailValidation = ({
  match: {
    params: { token },
  },
}) => {
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    validateEmail(token).then((res) => {
      console.log(res);
      if (res == "success") {
        setValidated(true);
      } else {
        setValidated(false);
      }
    });
  }, []);

  return (
    <div className="email-validation__container">
      {validated ? (
        <div className="email-validation__body">
          <img
            src="https://i.imgur.com/rzMTQaf.png"
            alt=""
            className="email-validation__img"
          />
          <h1 className="email-validation__title">
            Usuario validado correctamente
          </h1>
          <span>
            Su usuario ha sido validado correctamente, por favor, puede volver
            al menu de inicio a través del siguiente botón
          </span>
          <Link to="/" className="email-validation__button">
            <div>Volver a inicio</div>
          </Link>
        </div>
      ) : (
        <div className="email-validation__body">
          <img
            src="https://i.imgur.com/cDCOxmU.png"
            alt=""
            className="email-validation__img"
          />
          <h1 className="email-validation__title">
            Error al validar su correo
          </h1>
          <span>
            Lo sentimos, aparentemente un error interno no ha permitido validar
            su usuario, por favor, puede volver al menu de inicio a través del
            siguiente botón
          </span>
          <Link to="/" className="email-validation__button">
            <div>Volver a inicio</div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default EmailValidation;
