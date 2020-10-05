import React, { useRef, useState, useEffect } from "react";
import "./UserForm-Style.css";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import updateAction from "../../updateAction";
import { useStateMachine } from "little-state-machine";
import {
  createOrganization,
  getMyOrganization,
  editOrganization,
  getMe,
} from "../../utils/apiRequests";
import PicSelector from "../profile-picture-components/PicSelector";

const EmpresaForm = () => {
  const [updated, setUpdated] = useState("");
  const [disabled, setDisabled] = useState(false);
  const { state, action } = useStateMachine(updateAction);
  const { register, handleSubmit, errors, watch } = useForm({
    defaultValues: state.userInformation.data,
  });

  let isOrg = true;

  const onSubmit = (data) => {
    if (!state.userInformation.organization) {
      createOrganization(data).then((res) => {
        if (res.data !== undefined) {
          setUpdated(res);
        }
      });
    } else {
      data.id = state.userInformation.organization;
      editOrganization(data).then((res) => {
        if (res.data !== undefined) {
          setDisabled(true);
          setUpdated(res);
        }
      });
    }
  };
  useEffect(() => {
    getMyOrganization().then((res) => {
      if (res.data !== undefined) {
        action(res.data.data);
      }
    });
    getMe().then((res) => {
      if (res.data !== undefined) {
        action(res.data.data.data);
      }
    });
  }, [updated, action]);
  const password = useRef({});
  password.current = watch("password", "");

  return (
    <form className="userform" onSubmit={handleSubmit(onSubmit)}>
      <div className="userform__LIP">
        <PicSelector isOrg={isOrg}></PicSelector>
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
      <div className="userform__LIP">
        <span className="userform__label">Descripción</span>
        <input
          className="userform__input userform__input--lg"
          type="text"
          name="bio"
          ref={register({
            maxLength: {
              value: 400,
              message: "Por favor utilice menos de 400 caracteres",
            },
          })}
        />
        <ErrorMessage
          errors={errors}
          name="bio"
          render={({ message }) => (
            <div className="input__msg input__msg--error">
              <i class="fa fa-asterisk"></i> {message}
            </div>
          )}
        />
      </div>
      <div className="userform__2col">
        <div className="userform__LIP">
          <span className="userform__label">Teléfono</span>
          <input
            className="userform__input"
            type="text"
            name="phone"
            ref={register}
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
        <span className="userform__label">Correo de contacto</span>
        <input
          className="userform__input"
          type="email"
          name="email"
          ref={register}
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
      {typeof updated.data !== "undefined" &&
      updated.data.status === "success" ? (
        <div className="input__msg input__msg--success">
          El perfil de {updated.data.data.organization.name} fue actualizado
          correctamente
        </div>
      ) : (
        ""
      )}
      <div className="input__msg input__msg--error">{updated.message}</div>
      <input
        className="custom-button bg-green"
        type="submit"
        value="Guardar Perfil de Empresa"
      />
    </form>
  );
};

export default EmpresaForm;
