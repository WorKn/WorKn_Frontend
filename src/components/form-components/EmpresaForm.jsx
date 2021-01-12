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
import { store } from 'react-notifications-component';


const normalizeId = (value) => {
  return value.replace(/\s/g, "").match(/.{1,4}/g)?.join("").substr(0, 9) || "";
}

const normalizePhone = (value) => {
  return value.replace(/\s/g, "").match(/.{1,4}/g)?.join("").substr(0, 10) || "";
}



const EmpresaForm = () => {
  const [updated, setUpdated] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const { state, action } = useStateMachine(updateAction);
  const { register, handleSubmit, errors, watch } = useForm({});
  let isOrg = true;
  const onSubmit = (data) => {
    Object.keys(data).forEach((key) => {
      if ((key === "phone" || key === "RNC") && data[key] === "") delete data[key]
    })
    if (state.userInformation.organization === "" && state.userInformation.data === "") {
      createOrganization(data).then((res) => {
        if (res.data !== undefined) {
          if (res?.data?.status && res?.data?.status === "success") {
            action({ data: res.data.data.organization })
            setUpdated(res.data.data.organization);
            store.addNotification({
              title: "Organización creada correctamente!",
              message: "Ahora puedes proceder a Manejar  tu Organización",
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
            setIsEditMode(false);
          }
        }
      });
    } else {
      data.id = state.userInformation.organization;
      editOrganization(data).then((res) => {
        if (res.data !== undefined) {
          if (res.data.status && res.data.status === "success") {
            setUpdated(res.data.data.organization);
            store.addNotification({
              title: "Organización editada correctamente!",
              message: "Ahora puedes proceder a Manejar  tu Organización",
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
            setIsEditMode(false);
          } else if (res.data.status && res.data.status === "fail") {
            setUpdated(state.userInformation.data);
            store.addNotification({
              title: "Ha ocurrido un error",
              message: res.data.message,
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
        }
      });
    }
  };
  useEffect(() => {
    getMyOrganization().then((res) => {
      if (res.data !== undefined) {
        action({ data: res.data.data.data });
        setUpdated(res.data.data.data)
      }
    });
    getMe().then((res) => {
      if (res.data !== undefined) {
        action(res.data.data.data);
      }
    });
  }, [action, state.userInformation.hasMemberBeenDeleted]);

  useEffect(() => {
    setUpdated(state.userInformation.data)
  }, [state.userInformation.data]);
  const password = useRef({});
  password.current = watch("password", "");

  const abortEdit = () => {
    setIsEditMode(false)
    setUpdated(state.userInformation.data)
  }

  return (
    <div>
      <div className="userform__LIP">
        <PicSelector isOrg={isOrg}></PicSelector>
      </div>
      {typeof isEditMode && isEditMode === false ? (
        <div className="userform" onSubmit={handleSubmit(onSubmit)}>
          <div className="userform__2col">
            <div className="userform__LIP">
              <span className="userform__label">Nombre</span>
              <div className="userform__placeholder">
                <span>{updated.name}</span>
              </div>
            </div>
            <div className="userform__LIP userform__LIP--separated">
              <span className="userform__label">RNC</span>
              <div className="userform__placeholder">
                <span>{updated.RNC}</span>
              </div>
            </div>
          </div>
          <div className="userform__LIP">
            <span className="userform__label">Descripción</span>
            <div className="userform__placeholder userform__placeholder--bio">
              <span>{updated.bio}</span>
            </div>
          </div>
          <div className="userform__2col">
            <div className="userform__LIP">
              <span className="userform__label">Teléfono</span>
              <div className="userform__placeholder">
                <span>{updated.phone}</span>
              </div>
            </div>
          </div>
          <div className="userform__LIP">
            <span className="userform__label">Correo de contacto</span>
            <div className="userform__placeholder">
              <span>{updated.email}</span>
            </div>
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
          <button className="custom-button bg-green" onClick={() => { setIsEditMode(true) }}>Editar Perfil</button>
        </div>
      ) : (
          <form className="userform" onSubmit={handleSubmit(onSubmit)}>
            <div className="userform__2col">
              <div className="userform__LIP">
                <span className="userform__label">Nombre</span>
                <input
                  className="userform__input"
                  type="text"
                  name="name"
                  value={updated.name}
                  onChange={
                    (e) => {
                      setUpdated({ ...updated, name: e.target.value })
                    }
                  }
                  ref={register({
                    required: "Por favor ingrese el nombre de la empresa",
                  })}
                />
                <ErrorMessage
                  errors={errors}
                  name="name"
                  render={({ message }) => (
                    <div className="input__msg input__msg--error">
                      <i className="fa fa-asterisk"></i> {message}
                    </div>
                  )}
                />
              </div>
              <div className="userform__LIP userform__LIP--separated">
                <span className="userform__label">RNC</span>
                <input
                  className="userform__input"
                  type="number"
                  name="RNC"
                  value={updated.RNC}
                  pattern="[0-9]+"
                  title="Por solo incluya numeros en el campo"
                  ref={register({
                    maxLength: {
                      value: 9,
                      message: "Por favor utilice 9 caracteres para su RNC",
                    },
                  })}
                  inputMode="numeric"
                  onChange={(e) => {
                    const { value } = e.target
                    e.target.value = normalizeId(value)
                    setUpdated({ ...updated, RNC: e.target.value })
                  }}
                />
                <ErrorMessage
                  errors={errors}
                  name="RNC"
                  render={({ message }) => (
                    <div className="input__msg input__msg--error">
                      <i className="fa fa-asterisk"></i> {message}
                    </div>
                  )}
                />
              </div>
            </div>
            <div className="userform__LIP">
              <span className="userform__label">Descripción</span>
              <textarea
                className="userform__input userform__input--lg userform__input-bio"
                type="textarea"
                name="bio"
                value={updated.bio}
                onChange={
                  (e) => {
                    setUpdated({ ...updated, bio: e.target.value })
                  }
                }
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
                    <i className="fa fa-asterisk"></i> {message}
                  </div>
                )}
              />
            </div>
            <div className="userform__2col">
              <div className="userform__LIP">
                <span className="userform__label">Teléfono</span>
                <input
                  className="userform__input"
                  type="number"
                  name="phone"
                  defaultValue={updated.phone}
                  ref={register}
                  inputMode="numeric"
                  onChange={(e) => {
                    const { value } = e.target
                    e.target.value = normalizePhone(value)
                    setUpdated({ ...updated, phone: e.target.value })
                  }}
                />
                <ErrorMessage
                  errors={errors}
                  name="phone"
                  render={({ message }) => (
                    <div className="input__msg input__msg--error">
                      <i className="fa fa-asterisk"></i> {message}
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
                value={updated.email}
                onChange={
                  (e) => {
                    setUpdated({ ...updated, email: e.target.value })
                  }
                }
                ref={register}
              />
              <ErrorMessage
                errors={errors}
                name="email"
                render={({ message }) => (
                  <div className="input__msg input__msg--error">
                    <i className="fa fa-asterisk"></i> {message}
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
            <input
              className="custom-button bg-green"
              type="submit"
              value="Guardar Perfil de Empresa"
            />
            <button className="custom-button bg-red" onClick={abortEdit}>Cancelar</button>
          </form>
        )}

    </div>

  );
};

export default EmpresaForm;
