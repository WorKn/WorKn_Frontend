import React, { useState } from "react";
import { useForm } from "react-hook-form";
import StarRating from "../../components/starrating-components/StarRating";
import { useStateMachine } from "little-state-machine";
import { ErrorMessage } from "@hookform/error-message";
import { updateReview } from "../../utils/apiRequests";
import { deleteReview } from "../../utils/apiRequests";
import { getAllReviews } from "../../utils/apiRequests";
import updateAction from "../../updateAction";
import { store } from 'react-notifications-component';
import "./EditReviewPopup-Style.css";

const EditReviewPopup = ({ hide, review, userId, setReviews }) => {
  const { register, handleSubmit, errors } = useForm();
  const { state } = useStateMachine(updateAction);
  const [starValue, setStarValue] = useState();
  const onSubmit = (data) => {
    data.rating = starValue;
    updateReview(userId, review._id, data).then((res) => {
      console.log(res)
      if (res.data.status === "success") {
        hide();
        getAllReviews(userId).then((resp) => {
          setReviews(resp.data?.data.data);
        });
        store.addNotification({
          title: "Tu review ha sido actualizada",
          message: "Nos aseguraremos de que sea recibida por el usuario.",
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
      }

    });
    console.log(data);
  };

  const removeReview = (data) => {
    deleteReview(userId, review._id).then((res) => {
      getAllReviews(userId).then((resp) => {
        setReviews(resp.data?.data.data);
      });
    });
  };

  return (
    <div className="edit-review__container">
      <div className="edit-review__body">
        <h2 className="ProfileView__rate-title">Edita tu review</h2>
        <div className="ProfileView__rate-description">
          <div className="ProfileView__rating-pp">
            <div className="pprofilepage__pp pprofilepage__pp--mob">
              <img
                className="pprofilepage__image pprofilepage__image--mob"
                src={state?.userInformation?.profilePicture}
                alt="user profilepic"
              />
            </div>
          </div>
          <div className="edit-review__form">
            <h3 className="ProfileView__rate-name ">{`${state.userInformation.name} ${state.userInformation.lastname}`}</h3>
            <form
              onSubmit={handleSubmit((data) => {
                onSubmit(data);
              })}
            >
              {/* <div className="input__msg input__msg--error edit-review__required">
                <i className="fa fa-asterisk"></i>
                Campo requerido
              </div> */}
              <StarRating starValue={starValue} setStarValue={setStarValue} />
              <textarea
                type="textarea"
                name="review"
                placeholder="Description"
                defaultValue={review.review}
                title="Por favor, ingrese los detalles de su review a editar"
                className="edit-review__textarea"
                ref={register({
                  required: "Por favor ingrese la descripción",
                })}
              />
              <ErrorMessage
                errors={errors}
                name="review"
                render={({ message }) => (
                  <div className="input__msg input__msg--error">
                    <i class="fa fa-asterisk"></i> {message}
                  </div>
                )}
              />
              <div className="create-rate__buttons--center">
                <input
                  type="submit"
                  value="Confirmar"
                  className="create-review__submit create-review__submit--mini"
                ></input>
                <input
                  type="reset"
                  value="Descartar"
                  className="create-review__submit create-review__submit--light create-review__submit--mini"
                // onClick={() => {
                //   hide();
                // }}
                ></input>
                <input
                  type="reset"
                  value="Eliminar"
                  className="create-review__submit create-review__submit--red create-review__submit--mini"
                  onClick={() => {
                    removeReview();
                    store.addNotification({
                      title: "Tu review ha sido eliminada",
                      message: "Ya no mostraremos tu review en el perfil de este usuario.",
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
                    hide();
                  }}
                ></input>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditReviewPopup;
