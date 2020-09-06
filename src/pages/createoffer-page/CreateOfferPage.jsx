import React from "react";

import "./CreateOfferPage-Style.css";

import { useForm } from "react-hook-form";

import { useStateMachine } from "little-state-machine";

import { createOffer } from "../../utils/apiRequests";

import { ErrorMessage } from "@hookform/error-message";

const CreateOfferPage = () => {
  const { register, handleSubmit, errors, watch } = useForm({
    mode: "onBlur",
  });

  //aniadir manualmente los atributos para asuntos de pruebas

  /* 
      1. Coger la data del form con la libreria que me dijo jay
      2. Tomar esa data y completarla usando el data.atributo
      3. Mandar el request de Createoffer al backend
      4. Dar el formato requerido a cada input para que sea restricted
      o que haga input validation
      5. Dar CSS
      6. git pull develop y git merge para usar componentes de jay


      NOTA: la oferta debe de tener de 3 a 10 tags

 */
  const onSubmit = (data) => {
    data.category = "health";
    data.tags = [
      "5f518b2c47667760a0c79ef5",
      "5f518b3d1f33143b50ff0614",
      "5f518b450368007bf46c862b",
    ];

    // console.log(createOffer(data));
    console.log(data);
  };

  return (
    <div className="create-offer__container">
      <form onSubmit={handleSubmit(onSubmit)} className="create-offer__form">
        <h1 className="create-offer__header-title">Creacion de ofertas</h1>
        <div className="create-offer__paired-input">
          <span>Título</span>

          <input
            type="text"
            name="title"
            placeholder="Título"
            title="Por favor, ingrese el título de la oferta"
            ref={register({ required: "Por favor ingrese el titulo" })}
          />
          <ErrorMessage
            errors={errors}
            name="title"
            render={({ message }) => (
              <div className="input__msg input__msg--error">
                <i class="fa fa-asterisk"></i> {message}
              </div>
            )}
          />
        </div>
        <div className="create-offer__paired-input">
          <span>Descripción</span>

          <input
            type="text"
            name="description"
            placeholder="Descripción"
            title="Por favor, ingrese la descripción de la oferta"
            ref={register({ required: "Por favor ingrese la descripcion" })}
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
        <div className="create-offer__paired-input">
          <span>Tipo de oferta</span>

          <select
            name="offerType"
            ref={register({
              required: "Por favor seleccione un tipo de oferta",
            })}
          >
            <option value="free">Free</option>
            <option value="fixed">Fixed</option>
          </select>

          <ErrorMessage
            errors={errors}
            name="offerType"
            render={({ message }) => (
              <div className="input__msg input__msg--error">
                <i class="fa fa-asterisk"></i> {message}
              </div>
            )}
          />
        </div>
        <div className="create-offer__paired-input">
          <span>Ubicacion</span>

          <input
            type="text"
            placeholder="Ubicacion [opcional]"
            title="Por favor, ingrese la Ubicacion de la oferta [opcional]"
            name="location"
            ref={register}
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
        </div>
        <div className="create-offer__paired-input">
          <span>Category</span>

          <input
            type="text"
            name="category"
            placeholder="Categoria"
            title="Por favor, ingrese la categoria de la oferta"
            ref={register({ required: "Por favor ingrese la categoria" })}
          />
          <ErrorMessage
            errors={errors}
            name="category"
            render={({ message }) => (
              <div className="input__msg input__msg--error">
                <i class="fa fa-asterisk"></i> {message}
              </div>
            )}
          />
        </div>

        <div className="create-offer__paired-input">
          <span>Tags</span>

          <input
            type="text"
            name="tags"
            placeholder="Tags"
            title="Por favor, ingrese los tags de la oferta"
            ref={register({ required: "Por favor ingrese los tags" })}
          />
          <ErrorMessage
            errors={errors}
            name="tags"
            render={({ message }) => (
              <div className="input__msg input__msg--error">
                <i class="fa fa-asterisk"></i> {message}
              </div>
            )}
          />
        </div>
        <div className="create-offer__paired-input">
          <span>Salary Range</span>

          <input
            type="text"
            name="salaryRange"
            placeholder="Rango salarial [opcional]"
            ref={register}
            title="Por favor, ingrese el rango salarial de la oferta [opcional]"
          />
          <ErrorMessage
            errors={errors}
            name="salaryRange"
            render={({ message }) => (
              <div className="input__msg input__msg--error">
                <i class="fa fa-asterisk"></i> {message}
              </div>
            )}
          />
        </div>
        <div className="create-offer__paired-input">
          <span>Closing Date</span>

          <input
            type="date"
            name="closingDate"
            placeholder="Fecha de cierre"
            ref={register}
            title="Por favor, ingrese la fecha de cierre de la oferta"
          />
          <ErrorMessage
            errors={errors}
            name="closingDate"
            render={({ message }) => (
              <div className="input__msg input__msg--error">
                <i class="fa fa-asterisk"></i> {message}
              </div>
            )}
          />
        </div>

        <input type="submit" value="Create Offer"></input>
      </form>
    </div>
  );
};

export default CreateOfferPage;
