import React, { useRef, useState, useEffect } from "react";
import "./UserForm-Style.css";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useHistory } from "react-router-dom";
import updateAction from "../../updateAction";
import { useStateMachine } from "little-state-machine";
// import CustomButton from "../button-components/CustomButton";
import TagInput from "../input-components/TagInput";
import {
  createOrganization,
  getMyOrganization,
  editOrganization,
} from "../../utils/apiRequests";
import Cookies from "js-cookie";
import { Pic_Selector } from "../../components/profile-pic-selection-components/Profile-selection-component";

const EmpresaForm = () => {
  const [updated, setUpdated] = useState("");
  const [disabled, setDisabled] = useState(false);
  const { state, action } = useStateMachine(updateAction);
  const [orgInfo, setOrgInfo] = useState("");
  const { register, handleSubmit, errors, watch } = useForm({
    defaultValues: state.userInformation.data,
  });
  const onSubmit = (data) => {
    if (!state.userInformation.organization) {
      console.log("no hay org, creating");
      createOrganization(data).then((res) => {
        if (res.data !== undefined) {
          setUpdated(res);
          // console.log(res);
        }
      });
    } else {
      console.log("hay org, updating");
      data.id = state.userInformation.organization;
      editOrganization(data).then((res) => {
        console.log(res);
        if (res.data !== undefined) {
          setDisabled(true);
          setUpdated(res);
          // console.log(res);
        }
      });
    }
  };
  useEffect(() => {
    getMyOrganization().then((res) => {
      if (res.data !== undefined) {
        action(res.data.data);
        // console.log(res);
      }
    });
  }, [updated]);
  const { push } = useHistory();
  const password = useRef({});
  password.current = watch("password", "");
  // console.log(state.userInformation.data.data.user);

  return (
    <form className="userform" onSubmit={handleSubmit(onSubmit)}>
      <div className="userform__LIP">
        <Pic_Selector></Pic_Selector>
      </div>
      <div className="userform__2col">
        <div className="userform__LIP">
          <span className="userform__label">Nombre</span>
          <input
            className="userform__input"
            type="text"
            name="name"
            ref={register({
              required: "Por favor ingrese el nombre de la empresa",
            })}
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
        <div className="userform__LIP userform__LIP--separated">
          <span className="userform__label">RNC</span>
          <input
            disabled={disabled}
            className="userform__input"
            type="text"
            name="RNC"
            pattern="[0-9]+"
            title="Por solo incluya numeros en el campo"
            ref={register({
              maxLength: {
                value: 9,
                message: "Por favor utilice 9 caracteres para su RNC",
              },
            })}
          />
          <ErrorMessage
            errors={errors}
            name="RNC"
            render={({ message }) => (
              <div className="input__msg input__msg--error">
                <i class="fa fa-asterisk"></i> {message}
              </div>
            )}
          />
        </div>
      </div>
      {/* <div className="userform__LIP">
        <span className="userform__label">Ubicación</span>
        <input
          className="userform__input"
          type="text"
          name="location"
          // pattern="[a-zA-Z]*"
          ref={register({
            required: "Por favor ingrese la ubicacion de la empresa",
          })}
        />
        <ErrorMessage
          errors={errors}
          name="location"
          render={({ message }) => (
            <div className="input__msg input__msg--error">
              <i class="fa fa-asterisk"></i> {message}
            </div>
          )}
        />
      </div> */}
      <div className="userform__LIP">
        <span className="userform__label">Descripcion</span>
        <input
          className="userform__input userform__input--lg"
          type="text"
          name="description"
          // pattern="[a-zA-Z]*"
          ref={register({
            maxLength: {
              value: 400,
              message: "Por favor utilice menos de 400 caracteres",
            },
          })}
        />
        <ErrorMessage
          errors={errors}
          name="description"
          render={({ message }) => (
            <div className="input__msg input__msg--error">
              <i class="fa fa-asterisk"></i> {message}
            </div>
          )}
        />
      </div>
      <div className="userform__2col">
        <div className="userform__LIP">
          <span className="userform__label">Telefono</span>
          <input
            className="userform__input"
            type="text"
            name="phone"
            ref={register}
            // pattern="[a-zA-Z]*"
          />
          <ErrorMessage
            errors={errors}
            name="phone"
            render={({ message }) => (
              <div className="input__msg input__msg--error">
                <i class="fa fa-asterisk"></i> {message}
              </div>
            )}
          />
        </div>
      </div>
      <div className="userform__LIP">
        <span className="userform__label">Correo</span>
        <input
          className="userform__input"
          type="email"
          name="email"
          ref={register({
            required: "Por favor ingrese el correo de la empresa",
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

      {/* <div className="userform__footer">
        <span className="userform__title">
          Selecciona tu categoría y tus etiquetas
        </span>
        <span className="userform__text">
          Las etiqueta sirven para emparejarte con ofertas de trabajo y personas
          en tus mismas áreas de conocimiento, la categoría sirve para filtrar
          dichas etiquetas de una manera más precisa.
        </span>
      </div> */}
      {/* <div className="userform__LIP">
        <span className="userform__label">Área del saber deseada</span>
        <TagInput></TagInput>
      </div>

      <div className="userform__LIP">
        <span className="userform__label">Selecciona tus etiquetas</span>
        <TagInput></TagInput>
      </div> */}

      <div>
        <div className="userform__footer">
          <span className="userform__title">Mantén tu perfil actualizado</span>
          <span className="userform__text">
            Recuerda que esta información será vista por los usuarios que deseen
            conocer tu organización, mantenla actualizada y crea una descripción
            llamativa. Ten en cuenta que solo puedes modificar el RNC una vez.
          </span>
        </div>
      </div>
      <input
        className="custom-button bg-green"
        type="submit"
        value="Guardar Perfil de Empresa"
      />
      {/* <CustomButton></CustomButton> */}

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

export default EmpresaForm;
