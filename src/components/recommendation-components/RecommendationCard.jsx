import React, { useEffect, useState } from "react";
import Tag from "../tag-components/Tag";
import "./RecommendationCard-Style.css";
import { useModal } from "../../hooks/useModal";
import DetailPopup from "../popup-components/DetailPopup";
import updateAction from "../../updateAction";
import { useStateMachine } from "little-state-machine";
import { getCategoryById } from "../../utils/apiRequests";
import "./RecommendationCard-Style.css";

const RecommendationCard = ({ personInfo, organizationInfo }) => {
  const { state } = useStateMachine(updateAction);
  const [profilePictureRoute, setProfilePictureRoute] = useState("");
  const [offererTitleRoute, setOffererTitleRoute] = useState("");
  const [category, setCategory] = useState([]);

  let MyDictionary = {};
  MyDictionary["free"] = "Freelancer";
  MyDictionary["fixed"] = "Fijo/Indefinido";
  MyDictionary["applicant"] = "Aplicante";

  const getCategoryInfo = (categoryId) => {
    getCategoryById(categoryId).then((res) => {
      setCategory(res.data?.data[0].name);
      return <span>{category}</span>;
    });
  };

  useEffect(() => {
    setProfilePictureRoute(personInfo.profilePicture);
  }, []);

  return (
    <div>
      {/* <DetailModal>
        <DetailPopup responseInfo={responseInfo}></DetailPopup>
      </DetailModal> */}

      <div className="offercard__wrapper">
        <div className="offercard__header">
          <img
            src={profilePictureRoute}
            alt="Profile"
            className="offercard__picture"
          ></img>
          <div className="offercard__text">
            <span className="offercard__text--title"> {personInfo.name}</span>
            <span className="offercard__text--subtitle">
              <span className="offercard__text--highlight">
                {personInfo.bio}
              </span>{" "}
            </span>
          </div>
        </div>
        <div className="offercard__data">
          {MyDictionary[personInfo.userType]}
          <div className="offercard__vl"></div>
          <span>{personInfo.bio.slice(0, 15)}</span>
          <div className="offercard__vl"></div>
          <span>HEALTH</span>
        </div>
        <div className="offercard__tags">
          {personInfo?.tags.map((tag) => (
            <Tag
              key={tag.id}
              text={tag.name}
              theme="tag tag__text tag__text--gray"
            ></Tag>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendationCard;
