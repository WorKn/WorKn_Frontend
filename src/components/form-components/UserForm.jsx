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
import Tag from "../tag-components/Tag";

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
            <span className="userform__label">Biografía</span>
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
              <span className="userform__label">Telefono</span>
              <input
                className="userform__input"
                type="text"
                name="phone"
                ref={register}
              />
            </div>
          </div>
          <div>
            {typeof state.userInformation !== "undefined" &&
            state.userInformation.tags &&
            state.userInformation.category ? (
              <div>
                <div className="userform__LIP">
                  <span className="userform__label">Etiquetas</span>
                  <div className="userform__tagscontainer">
                    {state.userInformation.tags.map((tag) => (
                      <Tag
                        text={tag.name}
                        theme="tag tag__text tag__text--white"
                      ></Tag>
                    ))}
                  </div>
                </div>
                <div className="userform__LIP">
                  <span className="userform__label">Categoría</span>
                  <Tag
                    text={state.userInformation.tags[0].category.name}
                    theme="tag tag__text tag__text--white"
                  ></Tag>
                </div>
              </div>
            ) : (
              ""
            )}

            {typeof state.userInformation.organizationRole !== "undefined" &&
            state.userInformation.organizationRole !== "owner" &&
            state.userInformation.userType !== "offerer" ? (
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
        </form>
      </tagsContext.Provider>
    </categoryContext.Provider>
  );
};

export default UserForm;
