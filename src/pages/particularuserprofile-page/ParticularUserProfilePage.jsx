import React, { useState, useEffect, useMemo } from "react";

import { getUserById } from "../../utils/apiRequests";
import { getCategoryById } from "../../utils/apiRequests";
import { getOffersByUserId } from "../../utils/apiRequests";
import { getAllReviews } from "../../utils/apiRequests";
import { getReviewValidation } from "../../utils/apiRequests";
import { createReview } from "../../utils/apiRequests";
import { useHistory } from "react-router-dom";
import Header from "../../components/navbar-components/Navbar";
import Banner from "../../components/banner-components/Banner";
import Footer from "../../components/footer-components/Footer";
import OfferMini from "../../components/offer-components/OfferMini";
import Tag from "../../components/tag-components/Tag";
import StarRating from "../../components/starrating-components/StarRating";
import { useStateMachine } from "little-state-machine";
import updateAction from "../../updateAction";
import { useForm } from "react-hook-form";

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
  const { state, action } = useStateMachine(updateAction);
  const [starValue, setStarValue] = useState();
  const { register, handleSubmit } = useForm();

  let MyDictionary = {};
  MyDictionary["offerer"] = "Ofertante";
  MyDictionary["applicant"] = "Aplicante";

  let history = useHistory();

  const onSubmit = (data) => {
    data.starValue = starValue;
    createReview(id, data);
    console.log(data);
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
          getAllReviews(res.data?.data?._id).then((resp) => {
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
      <div className="EmpresaView">
        <div className="EmpresaView__up">
          <div className="EmpresaView__pp EmpresaView__pp--mob">
            <img
              className="EmpresaView__image EmpresaView__image--mob"
              src={userInfo?.profilePicture}
              alt="user profilepic"
            />
          </div>
          <div className="EmpresaView__bio">
            <div className="EmpresaView__bioleft">
              <h2>Biografía</h2>
              <span className="EmpresaView__up--span">{`${userInfo?.name} ${userInfo?.lastname}`}</span>
              <p>{MyDictionary[userInfo?.userType]}</p>
              <p>{userInfo?.bio}</p>
            </div>
          </div>
          <div className="EmpresaView__upper">
            <div className="EmpresaView__contact EmpresaView__contact--mob">
              <h2>Contacto</h2>
              <span className="EmpresaView__up--span">Email:</span>
              <a href={`mailto:${userInfo?.email}`}>{`${userInfo?.email}`}</a>
            </div>
            {!isOfferer && (
              <div className="EmpresaView__tags EmpresaView__tags--mob">
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
            <div className="EmpresaView__metrics EmpresaView__metrics--mob">
              <h2>Información</h2>
              <span className="EmpresaView__up--span">Al servicio desde</span>
              <p>{userInfo?.createdAt.substring(0, 10)}</p>
              <span className="EmpresaView__up--span">Rating </span>
              <p>4.75/5</p>
            </div>
          </div>
        </div>

        {isOfferer ? (
          <div className="EmpresaView__down">
            <h2>Ofertas</h2>
            <div className="ppp-offers">{activeOffers}</div>
          </div>
        ) : null}

        <div className="EmpresaView__rating">
          <h2 className="EmpresaView__rating-title">Reviews</h2>
          <div className="EmpresaView__rating-container">
            {reviews?.map((review) => (
              <React.Fragment key={review._id}>
                <div className="EmpresaView__rating-body">
                  <div className="EmpresaView__rating-pp">
                    <img
                      className="EmpresaView__rating-img EmpresaView__rating-pp--mob"
                      src={review.createdBy.profilePicture}
                      alt="user profilepic"
                    />
                  </div>
                  <div className="EmpresaView__rating--description">
                    <div className="EmpresaView__rating-header">
                      <h2>{`${review.createdBy.name} ${review.createdBy.lastname}`}</h2>

                      <i className="fa fa-edit"></i>
                    </div>
                    <StarRating ratingNumber={review.rating}></StarRating>
                    <p>{review.review}</p>
                  </div>
                </div>
              </React.Fragment>
            ))}

            {canReview && (
              <div className="EmpresaView__rate-body">
                <h2 className="EmpresaView__rate-title">Publica tu review</h2>
                <div className="EmpresaView__rate-description">
                  <div className="EmpresaView__rating-pp">
                    <img
                      className="EmpresaView__rating-img EmpresaView__rating-pp--mob"
                      src={state?.userInformation?.profilePicture}
                      alt="user profilepic"
                    />
                  </div>
                  <div className="EmpresaView__form">
                    <h3 className="EmpresaView__rate-name">{`${state.userInformation.name} ${state.userInformation.lastname}`}</h3>
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
