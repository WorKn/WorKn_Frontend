import React, { useRef, useEffect, useState } from "react";
import "./UserForm-Style.css";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import updateAction from "../../updateAction";
import { useStateMachine } from "little-state-machine";
import {
  updateProfile,
  getMe,
  getMyOrganization,
} from "../../utils/apiRequests";
import CategoryInput from "../input-components/CategoryInput";
import PicSelector from "../profile-picture-components/PicSelector";
import categoryContext from "../../utils/categoryContext";
import TagsInput from "../input-components/TagsInput";
import tagsContext from "../../utils/tagsContext";

const UserForm = () => {
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [updated, setUpdated] = useState("");
  const { state, action } = useStateMachine(updateAction);
  const password = useRef({});
  const { register, handleSubmit, errors, watch } = useForm({
    defaultValues: state.userInformation,
  });
  password.current = watch("password", "");
  const onSubmit = (data) => {
    data.category = selectedCategory.value;
    let newArray = [];
    selectedTags.forEach((tag) => newArray.push(tag.value));
    data.tags = newArray;
    updateProfile(data).then((res) => {
      setUpdated(res);
    });
  };

  useEffect(() => {
    if (state.userInformation.userType !== "") {
      getMe().then((res) => {
        if (res.data !== undefined) {
          action(res.data.data.data);
        }
      });
      getMyOrganization().then((res) => {
        if (res.data !== undefined) {
          action(res.data.data);
        }
      });
    } else {
      console.log("loading");
    }
  }, [updated, action, state.userInformation.userType]);

  return (
    <categoryContext.Provider value={{ selectedCategory, setSelectedCategory }}>
      <tagsContext.Provider value={{ selectedTags, setSelectedTags }}>
        <form className="userform" onSubmit={handleSubmit(onSubmit)}>
          <div className="userform__LIP">
            <PicSelector></PicSelector>
          </div>
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
              <span className="userform__label">Apellido</span>
              <input
                className="userform__input"
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
          <div className="userform__LIP">
            <span className="userform__label">Identificación</span>
            <input
              className="userform__input"
              type="text"
              name="identificationNumber"
              // pattern="[a-zA-Z]*"
              ref={register({
                maxLength: {
                  value: 11,
                  message: "Su ID debe tener 11 digitos",
                },
              })}
            />
            <ErrorMessage
              errors={errors}
              name="identificationNumber"
              render={({ message }) => (
                <div className="input__msg input__msg--error">
                  <i class="fa fa-asterisk"></i> {message}
                </div>
              )}
            />
          </div>
          <div className="userform__LIP">
            <span className="userform__label">Biografia</span>
            <input
              className="userform__input userform__input--lg"
              type="text"
              name="bio"
              // pattern="[a-zA-Z]*"
              ref={register({
                required:
                  "Por favor ingrese su biografía, de menos de 400 caracteres",
                maxLength: {
                  value: 400,
                  message: "Por faovr utilice menos de 400 caracteres",
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
              <span className="userform__label">Telefono</span>
              <input
                className="userform__input"
                type="text"
                name="phone"
                // pattern="[a-zA-Z]*"
                title="Por favor no incluya números en su nombre"
                ref={register({ required: "Por favor ingrese su nombre" })}
              />
            </div>
            {/* <div className="userform__LIP userform__LIP--separated">
          <span className="userform__label">Telefono</span>
          <input
            className="userform__input"
            type="text"
            name="phonee"
            // pattern="[a-zA-Z]*"
            title="Por favor no incluya números en su nombre"
            ref={register({ required: "Por favor ingrese su nombre" })}
          />
        </div> */}
          </div>
          <div>
            {typeof state.userInformation.organizationRole !== "undefined" &&
            state.userInformation.organizationRole !== "owner" ? (
              <div>
                <div className="userform__footer">
                  <span className="userform__title">
                    Selecciona tu categoría y tus etiquetas
                  </span>
                  <span className="userform__text">
                    Las etiqueta sirven para emparejarte con ofertas de trabajo
                    y personas en tus mismas áreas de conocimiento, la categoría
                    sirve para filtrar dichas etiquetas de una manera más
                    precisa.
                  </span>
                </div>
                {/* <div className="userform__LIP">
              <span className="userform__label">Área del saber deseada</span>
              <TagInput></TagInput>
            </div> */}
                <div className="userform__LIP">
                  <span className="userform__label">
                    Selecciona tu categoria
                  </span>
                  <CategoryInput></CategoryInput>
                </div>
                <div className="userform__LIP">
                  <span className="userform__label">
                    Selecciona tus etiquetas
                  </span>
                  <TagsInput
                    query={`http://stagingworknbackend-env.eba-hgtcjrfm.us-east-2.elasticbeanstalk.com/api/v1/categories/${selectedCategory.value}/tags`}
                  ></TagsInput>
                </div>
              </div>
            ) : (
              <div>
                <div className="userform__footer">
                  <span className="userform__title">
                    Mantén tu perfil actualizado
                  </span>
                  <span className="userform__text">
                    Recuerda que esta información será vista por los usuarios
                    que deseen interactuar contigo, mantenla actualizada y crea
                    una descripción llamativa. Ten en cuenta que solo puedes
                    modificar tu Identificación una vez.
                  </span>
                </div>
              </div>
            )}
          </div>
          {typeof updated.data !== "undefined" &&
          updated.data.status === "success" ? (
            <div className="input__msg input__msg--success">
              {updated.data.data.user.name}, tu perfil fue actualizado
              correctamente
            </div>
          ) : (
            ""
          )}
          <div className="input__msg input__msg--error">{updated.message}</div>
          <input
            className="custom-button bg-green"
            type="submit"
            value="Guardar Perfil"
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
      </tagsContext.Provider>
    </categoryContext.Provider>
  );
};

export default UserForm;
