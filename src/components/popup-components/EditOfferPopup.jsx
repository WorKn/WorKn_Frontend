import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { editOffer } from "../../utils/apiRequests";
import { getMyOffers } from "../../utils/apiRequests";
import { ErrorMessage } from "@hookform/error-message";
import categoryContext from "../../utils/categoryContext";
import CategoryInput from "../input-components/CategoryInput";
import tagsContext from "../../utils/tagsContext";
import TagsInput from "../input-components/TagsInput";
import Tag from "../tag-components/Tag";
import { store } from "react-notifications-component";
import "./CreateOfferPopup-Style.css";

const EditOfferPopup = ({ hide, offerInfo, setMyOffers }) => {
  const { register, handleSubmit, errors } = useForm({
    // mode: "onBlur",
  });
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [showSuccess, setSuccess] = useState(false);

  const onSubmit = (data) => {
    data.category = selectedCategory.value;

    let newArray = [];
    selectedTags.forEach((tag) => newArray.push(tag.value));
    data.tags = newArray;

    data._id = offerInfo._id;
    //eliminar aquellos atributos que sean iguales a ""
    Object.keys(data).forEach(
      (property) => data[property] === "" && delete data[property]
    );

    data.salaryRange = [data.salaryRangeFrom, data.salaryRangeTo];
    delete data["salaryRangeFrom"];
    delete data["salaryRangeTo"];
    if (!data.salaryRange[0] || !data.salaryRange[1]) {
      delete data["salaryRange"];
    }

    editOffer(data).then((res) => {
      if (res === "success") {
        setSuccess(true);
        store.addNotification({
          title: "Oferta editada exitosamente",
          message: "Su oferta será mostrada a los usuarios en WorKn.",
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
        getMyOffers().then((res) => {
          setMyOffers(res.data.data.offers);
        });
        setTimeout(() => {
          hide();
        }, 1500);
      } else {
        setSuccess(false);
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
            onScreen: true,
          },
        });
      }
    });
  };

  return (
    <categoryContext.Provider value={{ selectedCategory, setSelectedCategory }}>
      <tagsContext.Provider value={{ selectedTags, setSelectedTags }}>
        <div className="popup-wrapper">
          <form
            onSubmit={handleSubmit((data) => {
              onSubmit(data);
            })}
            className="sizing-container"
          >
            <div className="create-offer__header">
              <h1 className="create-offer__header-title">Edicion de ofertas</h1>
              {/* <i
                className="fa fa-times offerstrip__icon offerstrip__delete"
                onClick={hide}
              ></i> */}
            </div>
            <div className="create-offer__paired-input">
              <span>Título</span>

              <input
                type="text"
                name="title"
                placeholder="Título"
                defaultValue={offerInfo.title}
                title="Por favor, ingrese el título de la oferta"
                ref={register({ required: "Por favor ingrese el titulo" })}
              />
              <ErrorMessage
                errors={errors}
                name="title"
                render={({ message }) => (
                  <div className="input__msg input__msg--error">
                    <i className="fa fa-asterisk"></i> {message}
                  </div>
                )}
              />
            </div>
            <div className="create-offer__paired-input">
              <span>Descripción</span>

              <textarea
                type="textarea"
                name="description"
                placeholder="Descripción"
                defaultValue={offerInfo.description}
                title="Por favor, ingrese la descripción de la oferta"
                className="create-offer__description-input"
                ref={register({ required: "Por favor ingrese la descripcion" })}
              />
              <ErrorMessage
                errors={errors}
                name="description"
                render={({ message }) => (
                  <div className="input__msg input__msg--error">
                    <i className="fa fa-asterisk"></i> {message}
                  </div>
                )}
              />
            </div>
            <div className="create-offer__input-row">
              <div className="create-offer__paired-input create-offer__paired-input--half">
                <span>Tipo de oferta</span>

                <select
                  name="offerType"
                  defaultValue={offerInfo.offerType}
                  ref={register({
                    required: true,
                  })}
                >
                  <option value="">--Seleccionar--</option>
                  <option value="free">Freelancer</option>
                  <option value="fixed">Fijo/Indefinido</option>
                </select>

                <ErrorMessage
                  errors={errors}
                  name="offerType"
                  message="Por favor, seleccione un tipo de oferta"
                  render={({ message }) => (
                    <div className="input__msg input__msg--error">
                      <i className="fa fa-asterisk"></i> {message}
                    </div>
                  )}
                />
              </div>
              <div className="create-offer__paired-input create-offer__paired-input--half">
                <span>Fecha de cierre</span>

                <input
                  type="date"
                  name="closingDate"
                  placeholder="Fecha de cierre [opcional]"
                  className="create-offer__date"
                  defaultValue={
                    offerInfo.closingDate
                      ? offerInfo.closingDate.substring(0, 10)
                      : null
                  }
                  title="Por favor, ingrese la fecha de cierre de la oferta"
                />
              </div>
            </div>

            <div className="create-offer__paired-input">
              <span>Ubicación</span>

              <input
                type="text"
                placeholder="Ubicacion [opcional]"
                // defaultValue={offerInfo.location ? offerInfo.location : ""}
                title="Por favor, ingrese la Ubicacion de la oferta [opcional]"
                name="location"
                ref={register}
              />
              <ErrorMessage
                errors={errors}
                name="location"
                render={({ message }) => (
                  <div className="input__msg input__msg--error">
                    <i className="fa fa-asterisk"></i> {message}
                  </div>
                )}
              />
            </div>
            <div className="create-offer__paired-input">
              <span>
                Categoría{" "}
                <i className="fa fa-info-circle tooltip">
                  <span className="tooltiptext">
                    Las categorías te permiten filtrar los tags.
                  </span>
                </i>
              </span>
              <CategoryInput></CategoryInput>
            </div>

            <div className="create-offer__paired-input">
              <span>
                Etiquetas{" "}
                <i className="fa fa-info-circle tooltip">
                  <span className="tooltiptext">
                    Son etiquetas que definen las habilidades que buscas para la
                    oferta.
                  </span>
                </i>
              </span>

              <TagsInput
                query={`http://stagingworknbackend-env.eba-hgtcjrfm.us-east-2.elasticbeanstalk.com/api/v1/categories/${selectedCategory.value}/tags`}
              ></TagsInput>
              <div className="userform__tagscontainer">
                {offerInfo.tags.map((tag) => (
                  <Tag
                    key={tag._id}
                    text={tag.name}
                    theme="tag tag__text tag__text--gray"
                  ></Tag>
                ))}
              </div>
            </div>
            <div className="create-offer__paired-input">
              <span>Rango Salarial</span>
              <div className="create-offer__input-row">
                <div className="create-offer__money-range">
                  <input
                    type="number"
                    step="any"
                    name="salaryRangeFrom"
                    defaultValue={
                      offerInfo.salaryRange ? offerInfo.salaryRange[0] : ""
                    }
                    placeholder="Desde [opcional]"
                    ref={register}
                    title="Por favor, ingrese el rango inicial sin comas [opcional]"
                    className="create-offer__salaryRangeFrom c-o__paired-input--money"
                  />
                  <span>RD$</span>
                </div>

                <ErrorMessage
                  errors={errors}
                  name="salaryRangeFrom"
                  render={({ message }) => (
                    <div className="input__msg input__msg--error">
                      <i className="fa fa-asterisk"></i> {message}
                    </div>
                  )}
                />

                <div className="create-offer__money-range">
                  <input
                    type="number"
                    step="any"
                    name="salaryRangeTo"
                    defaultValue={
                      offerInfo.salaryRange ? offerInfo.salaryRange[1] : ""
                    }
                    placeholder="Hasta [opcional]"
                    ref={register}
                    title="Por favor, ingrese el rango final [opcional]"
                    className="create-offer__salaryRangeFrom c-o__paired-input--money"
                  />
                  <span>RD$</span>
                </div>

                <ErrorMessage
                  errors={errors}
                  name="salaryRangeTo"
                  render={({ message }) => (
                    <div className="input__msg input__msg--error">
                      <i className="fa fa-asterisk"></i> {message}
                    </div>
                  )}
                />
              </div>
            </div>

            <input
              type="submit"
              value="Editar oferta"
              className="create-offer__submit"
            ></input>

            {showSuccess ? (
              <span className="create-offer__success">
                Oferta editada correctamente, puede cerrar este menu
              </span>
            ) : null}
          </form>
        </div>
      </tagsContext.Provider>
    </categoryContext.Provider>
  );
};

export default EditOfferPopup;
