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
import { store } from "react-notifications-component";

const normalizeId = (value) => {
  return (
    value
      .replace(/\s/g, "")
      .match(/.{1,4}/g)
      ?.join("")
      .substr(0, 11) || ""
  );
};

const normalizePhone = (value) => {
  return (
    value
      .replace(/\s/g, "")
      .match(/.{1,4}/g)
      ?.join("")
      .substr(0, 10) || ""
  );
};

const UserForm = () => {
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [updated, setUpdated] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const { state, action } = useStateMachine(updateAction);
  const password = useRef({});
  const { register, handleSubmit, errors, watch } = useForm({
    defaultValues: state.userInformation,
  });

  let isOrg = false;

  password.current = watch("password", "");

  const onSubmit = (data) => {
    console.log(data);
    data.category = selectedCategory.value;
    let newArray = [];
    selectedTags.forEach((tag) => newArray.push(tag.value));
    data.tags = newArray;
    updateProfile(data).then((res) => {
      setUpdated(res);
      if (res?.data?.status && res?.data?.status === "success") {
        store.addNotification({
          title: "Perfil actualizado correctamente",
          message: "Ya puedes seguir navegando con tu nueva información",
          type: "success",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 10000,
            onScreen: true,
          },
        });
      } else {
        store.addNotification({
          title: "Ha ocurrido un error",
          message: res.message,
          type: "danger",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 10000,
            onScreen: true,
          },
        });
      }
    });
    setIsEditMode(false);
  };

  useEffect(() => {
    if (state.userInformation.userType !== "") {
      getMe().then((res) => {
        console.log(res)
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
    }
  }, [updated, action, state.userInformation.userType]);

  useEffect(() => {
    getMe().then((res) => {
      if (res.data !== undefined) {
        action(res.data.data.data);
      }
    });
  }, [action]);

  return (
    <categoryContext.Provider value={{ selectedCategory, setSelectedCategory }}>
      <tagsContext.Provider value={{ selectedTags, setSelectedTags }}>
          <div className="userform__LIP">
            <PicSelector isOrg={isOrg}></PicSelector>
          </div>
          {typeof isEditMode && isEditMode === false ? (
            <div className="userform" onSubmit={handleSubmit(onSubmit)}>
              <div className="userform__2col">
              <div className="userform__LIP">
              <span className="userform__label">Nombre</span>
              <div className="userform__placeholder">
                  <span>{state.userInformation.name}</span>
              </div>
              </div>
            <div className="userform__LIP userform__LIP--separated">
              <span className="userform__label">Apellido</span>
              <div className="userform__placeholder">
                  <span>{state.userInformation.lastname}</span>
              </div>
            </div>
          </div>
          <div className="userform__LIP">
              <span className="userform__label">Identificación</span>
              <div className="userform__placeholder">
                  <span>{state.userInformation.identificationNumber}</span>
              </div>
            </div>    
            <div className="userform__LIP">
              <span className="userform__label">Biografia</span>
              <div className="userform__placeholder userform__placeholder--bio">
                  <span>{state.userInformation.bio}</span>
              </div>
            </div>
          <div className="userform__2col">
          <div className="userform__LIP">
              <span className="userform__label">Telefono</span>
              <div className="userform__placeholder">
                  <span>{state.userInformation.phone}</span>
              </div>
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
                        key={tag._id}
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
                    Categoría{" "}
                    <i className="fa fa-info-circle tooltip">
                      <span className="tooltiptext">
                        Las categorías te permiten filtrar los tags.
                      </span>
                    </i>
                  </span>
                  <CategoryInput></CategoryInput>
                </div>
                <div className="userform__LIP">
                  <span className="userform__label">
                    Etiquetas{" "}
                    <i className="fa fa-info-circle tooltip">
                      <span className="tooltiptext">
                        Son palabras clave que definen las habilidades que
                        tienes para ofrecer.
                      </span>
                    </i>
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
          {/* <input
            className="custom-button bg-green"
            type="submit"
            value="Viejo Guardar Perfil"
          /> */}
          <button className="custom-button bg-green" onClick={()=> {setIsEditMode(true)}}>Editar Perfil</button>

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
                // pattern="[a-zA-ZáÁéÉíÍóÓúÚýÝ ]*"
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
                // pattern="[a-zA-Z]*"

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
              type="number"
              name="identificationNumber"
              ref={register({
                maxLength: {
                  value: 11,
                  message: "Su ID debe tener 11 digitos",
                },
              })}
              inputMode="numeric"
              autoComplete="cc-number"
              onChange={(e) => {
                const { value } = e.target;
                e.target.value = normalizeId(value);
              }}
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
            <textarea
              className="userform__input userform__input--lg userform__input-bio"
              type="textarea"
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
                type="number"
                name="phone"
                ref={register}
                inputMode="numeric"
                autoComplete="cc-number"
                onChange={(e) => {
                  const { value } = e.target;
                  e.target.value = normalizePhone(value);
                }}
              />
            </div>
          </div>
          <div className="userform__LIP">
              <span className="userform__label">Correo</span>
              <input
                className="form-input"
                type="email"
                name="email"
                ref={register}
                disabled
              />
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
                        key={tag._id}
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
                    Categoría{" "}
                    <i className="fa fa-info-circle tooltip">
                      <span className="tooltiptext">
                        Las categorías te permiten filtrar los tags.
                      </span>
                    </i>
                  </span>
                  <CategoryInput></CategoryInput>
                </div>
                <div className="userform__LIP">
                  <span className="userform__label">
                    Etiquetas{" "}
                    <i className="fa fa-info-circle tooltip">
                      <span className="tooltiptext">
                        Son palabras clave que definen las habilidades que
                        tienes para ofrecer.
                      </span>
                    </i>
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
          <input
            className="custom-button bg-green"
            type="submit"
            value="Guardar Perfil"
          />
        </form>
          )}
          
        
      </tagsContext.Provider>
    </categoryContext.Provider>
  );
};

export default UserForm;
