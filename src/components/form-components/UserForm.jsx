import React, { useRef } from "react";
import "./UserForm-Style.css";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useHistory } from "react-router-dom";
import updateAction from "../../updateAction";
import { useStateMachine } from "little-state-machine";
import CustomButton from "../button-components/CustomButton";

const UserForm = () => {
  const { state, action } = useStateMachine(updateAction);
  const { register, handleSubmit, errors, watch } = useForm({
    defaultValues: state.userInformation.data.data.user,
  });
  const onSubmit = (data) => {
    action(data);
    push("/registerpagec1");
  };
  const { push } = useHistory();
  const password = useRef({});
  password.current = watch("password", "");

  return (
    <form className="userform">
      <div className="userform__2col">
        <div className="userform__LIP">
          <span className="userform__label">Nombre</span>
          <input
            className="userform__input"
            type="text"
            name="name"
            pattern="[a-zA-Z]*"
            title="Por favor no incluya números en su nombre"
            ref={register({ required: "Por favor ingrese su nombre" })}
          />
        </div>
        <div className="userform__LIP userform__LIP--separated">
          <span className="userform__label">Apellido</span>
          <input
            className="userform__input"
            type="text"
            name="lastname"
            pattern="[a-zA-Z]*"
            title="Por favor no incluya números en su nombre"
            ref={register({ required: "Por favor ingrese su nombre" })}
          />
        </div>
      </div>
      <div className="userform__LIP">
        <span className="userform__label">Identificación</span>
        <input
          className="userform__input"
          type="text"
          name="name"
          pattern="[a-zA-Z]*"
          title="Por favor no incluya números en su nombre"
          ref={register({ required: "Por favor ingrese su nombre" })}
        />
      </div>
      <div className="userform__LIP">
        <span className="userform__label">Biografia</span>
        <input
          className="userform__input userform__input--lg"
          type="text"
          name="name"
          pattern="[a-zA-Z]*"
          title="Por favor no incluya números en su nombre"
          ref={register({ required: "Por favor ingrese su nombre" })}
        />
      </div>
      <div className="userform__2col">
        <div className="userform__LIP">
          <span className="userform__label">Telefono celular</span>
          <input
            className="userform__input"
            type="text"
            name="name"
            pattern="[a-zA-Z]*"
            title="Por favor no incluya números en su nombre"
            ref={register({ required: "Por favor ingrese su nombre" })}
          />
        </div>
        <div className="userform__LIP userform__LIP--separated">
          <span className="userform__label">Telefono</span>
          <input
            className="userform__input"
            type="text"
            name="name"
            pattern="[a-zA-Z]*"
            title="Por favor no incluya números en su nombre"
            ref={register({ required: "Por favor ingrese su nombre" })}
          />
        </div>
      </div>

      <div className="userform__footer">
        <span className="userform__title">
          Selecciona tu categoría y tus etiquetas
        </span>
        <span className="userform__text">
          Las etiqueta sirven para emparejarte con ofertas de trabajo y personas
          en tus mismas áreas de conocimiento, la categoría sirve para filtrar
          dichas etiquetas de una manera más precisa.
        </span>
      </div>
      <div className="userform__LIP">
        <span className="userform__label">Área del saber deseada</span>
        <select
          className="userform__select"
          name="category"
          ref={register({
            required: "Por favor ingrese el tipo de usuario que desea crear",
          })}
        >
          <option value="applicant">Software</option>
          <option value="offerer">Multimedia</option>
        </select>
      </div>

      <CustomButton></CustomButton>

      {/* <div className="paired-container">
        <div className="paired-input">
          <span className="popup-text">Nombre</span>
          <input
            className="form-input"
            type="text"
            name="name"
            pattern="[a-zA-Z]*"
            title="Por favor no incluya números en su nombre"
            ref={register({ required: "Por favor ingrese su nombre" })}
          />
          <ErrorMessage
            errors={errors}
            name="name"
            render={({ message }) => (
              <div className="input__msg input__msg--error">
                <i class="fa fa-asterisk"></i> {message}
              </div>
            )}
          />
        </div>
        <div className="paired-input lspacer">
          <span className="popup-text">Apellido</span>
          <input
            className="form-input"
            type="text"
            name="lastname"
            pattern="[a-zA-Z]*"
            title="Por favor no incluya números en su apellido"
            ref={register({ required: "Por favor ingrese su apellido" })}
          />
          <ErrorMessage
            errors={errors}
            name="lastname"
            render={({ message }) => (
              <div className="input__msg input__msg--error">
                <i class="fa fa-asterisk"></i> {message}
              </div>
            )}
          />
        </div>
      </div>
      <div className="userform_input userform_input--lg">
        <span className="popup-text">Biografia</span>
        <input
          className="form-input userform_input--lg"
          type="text"
          name="lastname"
          pattern="[a-zA-Z]*"
          title="Por favor no incluya números en su apellido"
          ref={register({ required: "Por favor ingrese su apellido" })}
        />
      </div>
      <div className="paired-container">
        <div className="paired-input">
          <span className="popup-text">Nombre</span>
          <input
            className="form-input"
            type="text"
            name="name"
            pattern="[a-zA-Z]*"
            title="Por favor no incluya números en su nombre"
            ref={register({ required: "Por favor ingrese su nombre" })}
          />
          <ErrorMessage
            errors={errors}
            name="name"
            render={({ message }) => (
              <div className="input__msg input__msg--error">
                <i class="fa fa-asterisk"></i> {message}
              </div>
            )}
          />
        </div>
        <div className="paired-input lspacer">
          <span className="popup-text">Apellido</span>
          <input
            className="form-input"
            type="text"
            name="lastname"
            pattern="[a-zA-Z]*"
            title="Por favor no incluya números en su apellido"
            ref={register({ required: "Por favor ingrese su apellido" })}
          />
          <ErrorMessage
            errors={errors}
            name="lastname"
            render={({ message }) => (
              <div className="input__msg input__msg--error">
                <i class="fa fa-asterisk"></i> {message}
              </div>
            )}
          />
        </div>
      </div> */}
    </form>
  );
};

export default UserForm;
