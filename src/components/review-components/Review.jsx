import React from "react";
import { useModal } from "../../hooks/useModal";
import { useStateMachine } from "little-state-machine";
import updateAction from "../../updateAction";
import StarRating from "../../components/starrating-components/StarRating";
import EditReviewPopup from "../../components/popup-components/EditReviewPopup";

import "./Review-Style.css";

const ReviewBody = ({ review, userId, setReviews }) => {
  const {
    show: showEditReviewModal,
    RenderModal: EditReviewModal,
    hide: hideEditReviewModal,
  } = useModal();

  const { state } = useStateMachine(updateAction);

  return (
    <div className="EmpresaView__rating-body">
      <div className="EmpresaView__rating-pp">
        <img
          className="EmpresaView__rating-img EmpresaView__rating-pp--mob"
          src={review.createdBy.profilePicture}
          alt="user profilepic"
        />
      </div>

      <EditReviewModal>
        <EditReviewPopup
          hide={hideEditReviewModal}
          review={review}
          userId={userId}
          setReviews={setReviews}
        ></EditReviewPopup>
      </EditReviewModal>

      <div className="EmpresaView__rating--description">
        <div className="EmpresaView__rating-header">
          <h2>{`${review.createdBy.name} ${review.createdBy.lastname}`}</h2>
          {review.createdBy._id === state.userInformation._id ? (
            <i className="fa fa-edit" onClick={showEditReviewModal}></i>
          ) : null}
        </div>
        <StarRating ratingNumber={review.rating}></StarRating>
        <p>{review.review}</p>
      </div>
    </div>
  );
};

export default ReviewBody;
