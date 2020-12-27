import React from "react";
import { useModal } from "../../hooks/useModal";
import { useStateMachine } from "little-state-machine";
import { useHistory } from "react-router-dom";
import updateAction from "../../updateAction";
import StarRating from "../../components/starrating-components/StarRating";
import EditReviewPopup from "../../components/popup-components/EditReviewPopup";
import { Link } from "react-router-dom";

const ReviewBody = ({ review, userId, setReviews }) => {
  const {
    show: showEditReviewModal,
    RenderModal: EditReviewModal,
    hide: hideEditReviewModal,
  } = useModal();

  const { state } = useStateMachine(updateAction);
  let history = useHistory();
  const redirectToUser = () => {
    window.open(`users/${review.createdBy._id}`);
  };

  return (
    <div className="pprofilepage__rating-body">
      <div className="pprofilepage__rating-pp">
        <img
          className="pprofilepage__rating-img pprofilepage__rating-pp--mob"
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

      <div className="pprofilepage__rating--description">
        <div className="pprofilepage__rating-header">
          {/* Prueba de enrutamiento por perfil de usuario */}
          <h2
            onClick={redirectToUser}
          >{`${review.createdBy.name} ${review.createdBy.lastname}`}</h2>
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
