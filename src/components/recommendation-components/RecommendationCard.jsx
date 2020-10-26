import React, { useEffect, useState } from "react";
import Tag from "../tag-components/Tag";
import "./RecommendationCard-Style.css";
// import { useModal } from "../../hooks/useModal";
// import DetailPopup from "../popup-components/DetailPopup";
import updateAction from "../../updateAction";
import { useStateMachine } from "little-state-machine";
import { getCategoryById } from "../../utils/apiRequests";
import "./RecommendationCard-Style.css";

const RecommendationCard = ({ personInfo, offerInfo }) => {
  const { state } = useStateMachine(updateAction);
  const [profilePictureRoute, setProfilePictureRoute] = useState("");

  const [category, setCategory] = useState([]);

  let MyDictionary = {};
  MyDictionary["free"] = "Freelancer";
  MyDictionary["fixed"] = "Fijo/Indefinido";
  MyDictionary["applicant"] = "Aplicante";

  useEffect(() => {
    if (offerInfo?.createdBy?.profilePicture) {
      setProfilePictureRoute(offerInfo?.createdBy?.profilePicture);
    } else {
      setProfilePictureRoute(personInfo.profilePicture);
      getCategoryById(personInfo.category).then((res) => {
        setCategory(res.data?.data[0].name);
      });
    }
  }, []);

  return (
    <div>
      {/* <DetailModal>
        <DetailPopup responseInfo={responseInfo}></DetailPopup>
      </DetailModal> */}
      {state.userInformation.userType === "offerer" ? (
        <div className="offercard__wrapper">
          <div className="offercard__header">
            <img
              src={profilePictureRoute}
              alt="Profile"
              className="offercard__picture"
            ></img>
            <div className="offercard__text">
              <span className="offercard__text--title">
                {personInfo.name} {personInfo.lastname}
              </span>
              <span className="offercard__text--subtitle">
                <span className="offercard__text--highlight">
                  {personInfo.email}
                </span>{" "}
              </span>
            </div>
          </div>
          <div className="offercard__data">
            {MyDictionary[personInfo.userType]}
            <div className="offercard__vl"></div>
            <span>{personInfo.bio.slice(0, 20)}...</span>
            <div className="offercard__vl"></div>
            <span className="offercard__category-name">{category}</span>
          </div>
          <div className="offercard__tags">
            {personInfo?.tags.map((tag) => (
              <Tag
                key={tag._id}
                text={tag.name}
                theme="tag tag__text tag__text--gray"
              ></Tag>
            ))}
          </div>
        </div>
      ) : (
        <div className="offercard__wrapper">
          <div className="offercard__header">
            <img
              src={profilePictureRoute}
              alt="Profile"
              className="offercard__picture"
            ></img>
            <div className="offercard__text">
              <span className="offercard__text--title">
                {offerInfo?.createdBy?.name}
              </span>
              <span className="offercard__text--subtitle">
                <span className="offercard__text--highlight">
                  {offerInfo?.createdBy?.email}
                </span>{" "}
              </span>
            </div>
          </div>
          <div className="offercard__data">
            {MyDictionary[offerInfo?.offerType]}
            <div className="offercard__vl"></div>
            <span>{offerInfo?.description.slice(0, 20)}...</span>
            <div className="offercard__vl"></div>
            <span className="offercard__category-name">
              {offerInfo?.category?.name}
            </span>
          </div>
          <div className="offercard__tags">
            {offerInfo?.tags.map((tag) => (
              <Tag
                key={tag.id}
                text={tag.name}
                theme="tag tag__text tag__text--gray"
              ></Tag>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecommendationCard;
