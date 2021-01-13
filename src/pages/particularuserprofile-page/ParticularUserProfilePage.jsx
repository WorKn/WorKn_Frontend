import React, { useState, useEffect, useMemo } from "react";

import { getUserById } from "../../utils/apiRequests";
import { getCategoryById } from "../../utils/apiRequests";
import { getOffersByUserId } from "../../utils/apiRequests";
import { getAllReviews } from "../../utils/apiRequests";

import { getReviewValidation } from "../../utils/apiRequests";
import { ErrorMessage } from "@hookform/error-message";
import { createReview } from "../../utils/apiRequests";
import { useHistory } from "react-router-dom";
import Header from "../../components/navbar-components/Navbar";
import Footer from "../../components/footer-components/Footer";
import Tag from "../../components/tag-components/Tag";
import StarRating from "../../components/starrating-components/StarRating";
import Review from "../../components/review-components/Review";
import { useStateMachine } from "little-state-machine";
import updateAction from "../../updateAction";
import { useForm } from "react-hook-form";
import OfferCard from "../../components/offer-components/OfferCard";
import { store } from "react-notifications-component";
import "./ParticularUserProfilePage-Style.css";

const EmpresaViewPage = ({
  match: {
    params: { id },
  },
}) => {
  //user ID para pruebas drope *empresa: 5f4d9b2665327c4bc17f3017
  //user ID para pruebas: 5f4d750f7633ba631b89f97c
  //user ID de jeremy aplicante: 5f4d74307633ba631b89f97b
  //user ID Albert ofertante: 5f70dc57f0880f2d975bd1ff

  const [userInfo, setUserInfo] = useState();
  const [isOfferer, setIsOfferer] = useState(false);
  const [category, setCategory] = useState();
  const [myoffers, setMyOffers] = useState([]);
  const [profilePicture, setMyProfilePicture] = useState();
  const [reviews, setReviews] = useState();
  const [canReview, setCanReview] = useState();
  const { state } = useStateMachine(updateAction);
  const [starValue, setStarValue] = useState();
  const { register, handleSubmit, errors } = useForm();
  const [itemsToShow, setItemsToShow] = useState(5);

  let MyDictionary = {};
  MyDictionary["offerer"] = "Ofertante";
  MyDictionary["applicant"] = "Aplicante";

  let history = useHistory();

  const onSubmit = (data) => {
    data.starValue = starValue;
    createReview(id, data).then((res) => {
      if (res.data.status === "success") {
        getAllReviews(id).then((res) => {
          setReviews(res.data?.data.data);
        });
        store.addNotification({
          title: "Tu review ha sido creada",
          message: "Nos aseguraremos de que sea recibida por el usuario.",
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
          message:
            "No hemos podido crear tu review, asegurate de que hayas seleccionado una puntuación",
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

  const LoadMoreReviews = () => {
    // if (itemsToShow + 5 <= reviews.length) {
    //   setCanLoadMoreReviews(false);
    // }
    setItemsToShow(itemsToShow + 5);
  };

  useEffect(() => {
    getAllReviews(id).then((res) => {
      setReviews(res.data?.data.data);
    });
  }, [id]);

  useEffect(() => {
    getUserById(id).then((res) => {
      if (res.status === "success") {
        setUserInfo(res.data.data);
        if (
          res.data.data.userType === "offerer" &&
          res.data.data.organization
        ) {
          history.push("/404");
        } else if (
          res.data.data.userType === "offerer" &&
          !res.data.data.organization
        ) {
          setIsOfferer(true);
          getOffersByUserId(id).then((res) => {
            setMyOffers(res.data?.data?.data);
          });
          setMyProfilePicture(res.data?.data?.profilePicture);
        } else {
          getCategoryById(res.data.data.category).then((resp) => {
            setCategory(resp.data.data[0].name);
          });

          getAllReviews(id).then((res) => {
            setReviews(res?.data.data.data);
          });
        }
      } else {
        history.push("/404");
      }
      getReviewValidation(id).then((res) => {
        setCanReview(res?.data?.data?.userCanBeReviewed);
      });
    });
    // eslint-disable-next-line
  }, []);

  const activeOffers = useMemo(
    () =>
      myoffers.map((offer) =>
        offer && offer.state !== "deleted" ? (
          <OfferCard
            key={offer._id}
            profilePic={profilePicture}
            offerInfo={offer}
          ></OfferCard>
        ) : null
      ),
    [myoffers, profilePicture]
  );

  return (
    <div className="pagewrap">
      <Header />
      <div className="pprofilepage">
        <div className="pprofilepage__up">
          <div className="pprofilepage__pp pprofilepage__pp--mob">
            <img
              className="pprofilepage__image pprofilepage__image--mob"
              src={userInfo?.profilePicture}
              alt="user profilepic"
            />
          </div>
          <div className="pprofilepage__bio">
            <div className="pprofilepage__bioleft">
              <h2>Biografía</h2>
              <span className="pprofilepage__up--span">{`${userInfo?.name} ${userInfo?.lastname}`}</span>
              <p>{MyDictionary[userInfo?.userType]}</p>
              <p>{userInfo?.bio}</p>
            </div>
          </div>
          <div className="pprofilepage__upper">
            <div className="pprofilepage__contact pprofilepage__contact--mob">
              <h2>Contacto</h2>
              <span className="pprofilepage__up--span">Email:</span>
              <a href={`mailto:${userInfo?.email}`}>{`${userInfo?.email}`}</a>
            </div>
            {!isOfferer && (
              <div className="pprofilepage__tags pprofilepage__tags--mob">
                <h2>{category}</h2>
                <div className="ppptags-container">
                  {userInfo?.tags &&
                    userInfo?.tags.map((tag) => (
                      <Tag
                        key={tag._id}
                        text={tag.name}
                        theme="tag tag__text tag__text--white"
                      ></Tag>
                    ))}
                </div>
              </div>
            )}
            <div className="pprofilepage__metrics pprofilepage__metrics--mob">
              <h2>Información</h2>
              <span className="pprofilepage__up--span">Al servicio desde</span>
              <p>{userInfo?.createdAt.substring(0, 10)}</p>
              <span className="pprofilepage__up--span">Rating </span>
              <p>4.75/5</p>
            </div>
          </div>
        </div>

        {isOfferer ? (
          <div className="pprofilepage__down">
            <h2>Ofertas</h2>
            <div className="ppp-offers">{activeOffers}</div>
          </div>
        ) : null}

        <div className="pprofilepage__rating">
          <h2 className="pprofilepage__rating-title">Reviews</h2>
          {!reviews || reviews.length === 0 ? (
            <p style={{ marginLeft: "30px" }}>
              Este usuario no tiene reviews públicas aun
            </p>
          ) : (
              <div className="pprofilepage__rating-container">
                <div className="profilepage__reviewcontainer">
                  {reviews?.slice(0, itemsToShow).map((review) => (
                    <Review
                      key={review._id}
                      review={review}
                      userId={id}
                      setReviews={setReviews}
                    ></Review>
                  ))}
                </div>
                {itemsToShow < reviews?.length && (
                  <div
                    className="addoffer__newbutton load-reviews__submit"
                    onClick={LoadMoreReviews}
                  >
                    <i className="fa fas fa-plus manageoffers__icon"></i>
                    <span className="load-reviews__title">
                      Cargar más reviews
                  </span>
                  </div>
                )}
              </div>
            )}
          <div className="pprofilepage__rating-container">
            {canReview && (
              <div className="pprofilepage__rate-body">
                <h2 className="pprofilepage__rate-title">Publica tu review</h2>
                <div className="pprofilepage__rate-description">
                  <div className="pprofilepage__rating-pp">
                    <img
                      className="pprofilepage__rating-img pprofilepage__rating-pp--mob"
                      src={state?.userInformation?.profilePicture}
                      alt="user profilepic"
                    />
                  </div>
                  <div className="pprofilepage__form">
                    <h3 className="pprofilepage__rate-name">{`${state.userInformation.name} ${state.userInformation.lastname}`}</h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <StarRating
                        starValue={starValue}
                        setStarValue={setStarValue}
                        ref={register({
                          required: "Por favor ingrese la descripción",
                        })}
                      />
                      <textarea
                        type="textarea"
                        name="review"
                        placeholder="Descripción"
                        title="Por favor, ingrese los detalles de su review"
                        className="create-review__textarea"
                        ref={register({
                          required: "Por favor ingrese la descripción",
                        })}
                      />

                      <ErrorMessage
                        errors={errors}
                        name="review"
                        render={({ message }) => (
                          <div className="input__msg input__msg--error">
                            <i className="fa fa-asterisk"></i> {message}
                          </div>
                        )}
                      />
                      <div className="create-rate__buttons">
                        <input
                          type="submit"
                          value="Publicar review"
                          className="create-review__submit"
                        ></input>
                        <input
                          type="reset"
                          value="Descartar"
                          className="create-review__submit create-review__submit--light"
                        ></input>
                      </div>
                      {/* {couldComment && (
                        <span className="create-review__success">
                          <i className="fa fa-check-circle"></i>Comentario
                          publicado correctamente
                        </span>
                      )} */}
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EmpresaViewPage;
