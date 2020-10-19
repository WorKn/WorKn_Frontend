import React, { useState } from "react";
import { useForm } from "react-hook-form";
import StarRating from "../../components/starrating-components/StarRating";
import { useStateMachine } from "little-state-machine";
import { updateReview } from "../../utils/apiRequests";
import updateAction from "../../updateAction";
import "./EditReviewPopup-Style.css";

const EditReviewPopup = ({ hide, review, userId }) => {
  const { register, handleSubmit } = useForm();

  const { state } = useStateMachine(updateAction);
  const [starValue, setStarValue] = useState();
  const onSubmit = (data) => {
    data.rating = starValue;
    updateReview(userId, review._id, data);
    console.log(data);
  };

  return (
    <div className="edit-review__container">
      <div className="edit-review__body">
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
            <form onSubmit={handleSubmit(onSubmit)}>
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
