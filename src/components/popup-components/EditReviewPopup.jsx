import React, { useState } from "react";
import { useForm } from "react-hook-form";
import StarRating from "../../components/starrating-components/StarRating";
import { useStateMachine } from "little-state-machine";
import { updateReview } from "../../utils/apiRequests";
import { deleteReview } from "../../utils/apiRequests";
import { getAllReviews } from "../../utils/apiRequests";
import updateAction from "../../updateAction";
import "./EditReviewPopup-Style.css";

const EditReviewPopup = ({ hide, review, userId, setReviews }) => {
  const { register, handleSubmit } = useForm();

  const { state } = useStateMachine(updateAction);
  const [starValue, setStarValue] = useState();

  //
  const onSubmit = (data) => {
    data.rating = starValue;
    updateReview(userId, review._id, data).then((res) => {
      getAllReviews(userId).then((resp) => {
        setReviews(resp.data?.data.data);
      });
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
        <button
          onClick={() => {
            getAllReviews(userId).then((resp) => {
              setReviews(resp.data?.data.data);
            });
          }}
        >
          KLK
        </button>
        <h2 className="EmpresaView__rate-title">Edita tu review</h2>
        <div className="EmpresaView__rate-description">
          <div className="EmpresaView__rating-pp">
            <img
              className="EmpresaView__rating-img EmpresaView__rating-pp--mob"
              src={state?.userInformation?.profilePicture}
              alt="user profilepic"
            />
          </div>
          <div className="edit-review__form">
            <h3 className="EmpresaView__rate-name">{`${state.userInformation.name} ${state.userInformation.lastname}`}</h3>
            <form
              onSubmit={handleSubmit((data) => {
                onSubmit(data);

                hide();
              })}
            >
              <StarRating starValue={starValue} setStarValue={setStarValue} />
              <textarea
                type="textarea"
                name="review"
                placeholder="Description"
                defaultValue={review.review}
                title="Por favor, ingrese los detalles de su review"
                className="edit-review__textarea"
                ref={register({
                  required: "Por favor ingrese la descripción",
                })}
              />
              <div className="create-rate__buttons">
                <input
                  type="submit"
                  value="Confirmar"
                  className="create-review__submit"
                ></input>
                <input
                  type="reset"
                  value="Descartar"
                  className="create-review__submit create-review__submit--light"
                ></input>
                <input
                  type="reset"
                  value="Eliminar review"
                  className="create-review__submit create-review__submit--red"
                  onClick={() => {
                    removeReview();
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
