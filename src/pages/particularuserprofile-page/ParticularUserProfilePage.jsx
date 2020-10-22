import React, { useState, useEffect, useMemo } from "react";

import { getUserById } from "../../utils/apiRequests";
import { getCategoryById } from "../../utils/apiRequests";
import { getOffersByUserId } from "../../utils/apiRequests";
import { getAllReviews } from "../../utils/apiRequests";
import { getXReviews } from "../../utils/apiRequests";
import { getReviewValidation } from "../../utils/apiRequests";
import { createReview } from "../../utils/apiRequests";
import { useHistory } from "react-router-dom";
import Header from "../../components/navbar-components/Navbar";
import Banner from "../../components/banner-components/Banner";
import Footer from "../../components/footer-components/Footer";
import OfferMini from "../../components/offer-components/OfferMini";
import Tag from "../../components/tag-components/Tag";
import StarRating from "../../components/starrating-components/StarRating";
import Review from "../../components/review-components/Review";
import { useStateMachine } from "little-state-machine";
import updateAction from "../../updateAction";
import { useForm } from "react-hook-form";

import "./ParticularUserProfilePage-Style.css";
import { Container } from "react-bootstrap";

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
  const { register, handleSubmit } = useForm();
  const [couldComment, setCouldComment] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [canLoadMoreReviews, setCanLoadMoreReviews] = useState(true);

  let MyDictionary = {};
  MyDictionary["offerer"] = "Ofertante";
  MyDictionary["applicant"] = "Aplicante";

  let history = useHistory();

  const onSubmit = (data) => {
    data.starValue = starValue;
    createReview(id, data).then((res) => {
      getAllReviews(id).then((res) => {
        setReviews(res.data?.data.data);
      });
    });
    setCouldComment(true);
  };

  const submit5 = () => {
    getXReviews(id, currentPage + 1, 5).then((res) => {
      console.log(res?.data?.data?.data);
      if (res?.data?.data?.data.length > 0) {
        setCurrentPage(currentPage + 1);
        const newArray = reviews.concat(res.data?.data?.data);
        setReviews(newArray);
        console.log(canLoadMoreReviews);
      } else {
        setCanLoadMoreReviews(false);
        console.log(canLoadMoreReviews);
      }
    });
  };
  const activeOffers = useMemo(
    () =>
      myoffers.map((offer) =>
        offer && offer.state !== "deleted" ? (
          <OfferMini
            key={offer._id}
            organizationInformation={profilePicture}
            offerInfo={offer}
          ></OfferMini>
        ) : null
      ),
    [myoffers, profilePicture]
  );

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
          setMyProfilePicture({
            profilePicture: res.data?.data?.profilePicture,
          });
        } else {
          getCategoryById(res.data.data.category).then((resp) => {
            setCategory(resp.data.data[0].name);
          });
          // getAllReviews(res.data?.data?._id).then((resp) => {
          //   setReviews(resp.data?.data.data);
          // });
          getXReviews(res.data?.data?._id, currentPage, 5).then((resp) => {
            setReviews(resp.data?.data.data);
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

  return (
    <div className="pagewrap">
      <Header />
      <Banner image={"VfeSojP.png"}></Banner>
      <div className="ProfileView">
        <div className="ProfileView__up">
          <div className="ProfileView__pp ProfileView__pp--mob">
            <img
              className="ProfileView__image ProfileView__image--mob"
              src={userInfo?.profilePicture}
              alt="user profilepic"
            />
          </div>
          <div className="ProfileView__bio">
            <div className="ProfileView__bioleft">
              <h2>Biografía</h2>
              <span className="ProfileView__up--span">{`${userInfo?.name} ${userInfo?.lastname}`}</span>
              <p>{MyDictionary[userInfo?.userType]}</p>
              <p>{userInfo?.bio}</p>
            </div>
          </div>
          <div className="ProfileView__upper">
            <div className="ProfileView__contact ProfileView__contact--mob">
              <h2>Contacto</h2>
              <span className="ProfileView__up--span">Email:</span>
              <a href={`mailto:${userInfo?.email}`}>{`${userInfo?.email}`}</a>
            </div>
            {!isOfferer && (
              <div className="ProfileView__tags ProfileView__tags--mob">
                <h2>{category}</h2>
                <div className="tags-container">
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
            <div className="ProfileView__metrics ProfileView__metrics--mob">
              <h2>Información</h2>
              <span className="ProfileView__up--span">Al servicio desde</span>
              <p>{userInfo?.createdAt.substring(0, 10)}</p>
              <span className="ProfileView__up--span">Rating </span>
              <p>4.75/5</p>
            </div>
          </div>
        </div>

        {isOfferer ? (
          <div className="ProfileView__down">
            <h2>Ofertas</h2>
            <div className="ppp-offers">{activeOffers}</div>
          </div>
        ) : null}

        <div className="ProfileView__rating">
          <h2 className="ProfileView__rating-title">Reviews</h2>
          {!reviews ? (
            <p style={{ marginLeft: "30px" }}>
              Este usuario no tiene reviews públicas aun
            </p>
          ) : (
            <div className="ProfileView__rating-container">
              {reviews?.map((review) => (
                <Review
                  key={review._id}
                  review={review}
                  userId={id}
                  setReviews={setReviews}
                ></Review>
              ))}

              {canLoadMoreReviews && (
                <button
                  className="ProfileView__generate-offers"
                  onClick={submit5}
                >
                  Generar 5 mas
                </button>
              )}
            </div>
          )}
          <div className="ProfileView__rating-container">
            {canReview && (
              <div className="ProfileView__rate-body">
                <h2 className="ProfileView__rate-title">Publica tu review</h2>
                <div className="ProfileView__rate-description">
                  <div className="ProfileView__rating-pp">
                    <img
                      className="ProfileView__rating-img ProfileView__rating-pp--mob"
                      src={state?.userInformation?.profilePicture}
                      alt="user profilepic"
                    />
                  </div>
                  <div className="ProfileView__form">
                    <h3 className="ProfileView__rate-name">{`${state.userInformation.name} ${state.userInformation.lastname}`}</h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <StarRating
                        starValue={starValue}
                        setStarValue={setStarValue}
                      />
                      <textarea
                        type="textarea"
                        name="review"
                        placeholder="Description"
                        title="Por favor, ingrese los detalles de su review"
                        className="create-review__textarea"
                        ref={register({
                          required: "Por favor ingrese la descripción",
                        })}
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
                      {couldComment && (
                        <span className="create-review__success">
                          <i className="fa fa-check-circle"></i>Comentario
                          publicado correctamente
                        </span>
                      )}
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
