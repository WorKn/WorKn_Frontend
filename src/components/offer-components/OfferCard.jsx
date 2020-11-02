import React, { useEffect, useState } from "react";
import Tag from "../tag-components/Tag";
import "./OfferCard-Style.css";
import { useModal } from "../../hooks/useModal";
import DetailPopup from "../../components/popup-components/DetailPopup";
import updateAction from "../../updateAction";
import { useStateMachine } from "little-state-machine";

const OfferCard = ({
  responseInfo,
  offerInfo,
  organizationInformation,
  profilePic,
}) => {
  const { state } = useStateMachine(updateAction);
  const {
    show: showDetailModal,
    RenderModal: DetailModal,
    hide: hideDetailModal,
  } = useModal();
  const [profilePictureRoute, setProfilePictureRoute] = useState("");
  const [offererTitleRoute, setOffererTitleRoute] = useState("");
  let MyDictionary = {};
  MyDictionary["free"] = "Freelancer";
  MyDictionary["fixed"] = "Fijo/Indefinido";
  MyDictionary["applicant"] = "Aplicante";

  useEffect(() => {
    if (!offerInfo) {
      if (responseInfo.organization) {
        setProfilePictureRoute(responseInfo?.organization?.profilePicture);
        setOffererTitleRoute(responseInfo?.organization?.name);
      } else {
        setProfilePictureRoute(responseInfo?.createdBy?.profilePicture);
        setOffererTitleRoute(responseInfo?.createdBy?.name);
      }
    }
    // eslint-disable-next-line
  }, [responseInfo]);

  return (
    <React.Fragment>
      {responseInfo ? (
        <div>
          <DetailModal>
            <DetailPopup
              responseInfo={responseInfo}
              hide={hideDetailModal}
            ></DetailPopup>
          </DetailModal>
          {(typeof state.userInformation.userType !== "undefined" &&
            state.userInformation.userType === "applicant") ||
          state.userInformation.userType === "" ? (
            <div className="offercard__wrapper" onClick={showDetailModal}>
              <div className="offercard__header">
                <img
                  src={profilePictureRoute}
                  alt="Profile"
                  className="offercard__picture"
                ></img>
                <div className="offercard__text">
                  <span className="offercard__text--title">
                    {" "}
                    {responseInfo?.title}
                  </span>
                  <span className="offercard__text--subtitle">
                    Por{" "}
                    <span className="offercard__text--highlight">
                      {offererTitleRoute}
                    </span>{" "}
                    en{" "}
                    <span className="offercard__text--highlight">
                      Santo Domingo
                    </span>
                  </span>
                </div>
              </div>
              <div className="offercard__data">
                {MyDictionary[responseInfo?.offerType]}
                <div className="offercard__vl"></div>
                <span>{responseInfo?.closingDate?.slice(0, 10)}</span>
                <div className="offercard__vl"></div>
                <span>{responseInfo?.category?.name}</span>
              </div>
              <div className="offercard__tags">
                {responseInfo?.tags.map((tag) => (
                  <Tag
                    key={tag.id}
                    text={tag.name}
                    theme="tag tag_text tag_text--gray"
                  ></Tag>
                ))}
              </div>
            </div>
          ) : (
            <div className="offercard__wrapper" onClick={showDetailModal}>
              <div className="offercard__header">
                <img
                  src={responseInfo?.profilePicture}
                  alt="misco"
                  className="offercard__picture"
                ></img>
                <div className="offercard__text">
                  <span className="offercard__text--title">
                    {" "}
                    {responseInfo?.name} {responseInfo?.lastname}
                  </span>
                  <span className="offercard__text--subtitle">
                    <span className="offercard__text--highlight">
                      {/* {responseInfo?.organization.name} */}
                    </span>{" "}
                    En{" "}
                    <span className="offercard__text--highlight">
                      Santo Domingo
                    </span>
                  </span>
                </div>
              </div>
              <div className="offercard__data">
                {MyDictionary[responseInfo?.userType]}
                <div className="offercard__vl"></div>
                <span>{responseInfo?.bio?.slice(0, 20)}...</span>
                <div className="offercard__vl"></div>
                <span>{responseInfo?.category?.name}</span>
              </div>
              <div className="offercard__tags">
                {responseInfo?.tags?.map((tag) => (
                  <Tag
                    key={tag.id}
                    text={tag.name}
                    theme="tag tag_text tag_text--gray"
                  ></Tag>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          {organizationInformation ? (
            <div className="offercard__wrapper">
              <div className="offercard__header">
                <img
                  src={organizationInformation.profilePicture}
                  alt="Offerpp"
                  className="offercard__picture"
                />
                <div className="offercard__text">
                  <span className="offercard__text--title">
                    {offerInfo ? offerInfo.title : "Titulo no disponible"}
                  </span>
                  <span className="offercard__text--subtitle">
                    Por{" "}
                    <span className="offercard__text--highlight">
                      {organizationInformation.name}
                    </span>{" "}
                    en{" "}
                    <span className="offercard__text--highlight">
                      Santo Domingo
                    </span>
                  </span>
                </div>
              </div>
              <div className="offercard__data">
                {MyDictionary[offerInfo?.offerType]}
                <div className="offercard__vl"></div>
                <span>{offerInfo?.closingDate?.slice(0, 10)}</span>
                <div className="offercard__vl"></div>
                <span>{offerInfo?.category?.name}</span>
              </div>
              <div className="offercard__tags">
                {offerInfo.tags.map((tag) => (
                  <Tag
                    key={tag._id}
                    text={tag.name}
                    theme="tag tag_text tag_text--gray "
                  ></Tag>
                ))}
              </div>
            </div>
          ) : (
            <div className="offercard__wrapper">
              <div className="offercard__header">
                <img
                  src={profilePic}
                  alt="Profile"
                  className="offercard__picture"
                ></img>
                <div className="offercard__text">
                  <span className="offercard__text--title">
                    {" "}
                    {offerInfo.title}
                  </span>
                  <span className="offercard__text--subtitle">
                    Por{" "}
                    <span className="offercard__text--highlight">
                      {offerInfo?.createdBy?.name}{" "}
                      {offerInfo?.createdBy?.lastname}
                    </span>{" "}
                    en{" "}
                    <span className="offercard__text--highlight">
                      Santo Domingo
                    </span>
                  </span>
                </div>
              </div>
              <div className="offercard__data">
                {MyDictionary[offerInfo?.offerType]}
                <div className="offercard__vl"></div>
                <span>{offerInfo?.closingDate?.slice(0, 10)}</span>
                <div className="offercard__vl"></div>
                <span>{offerInfo?.category?.name}</span>
              </div>
              <div className="offercard__tags">
                {offerInfo?.tags.map((tag) => (
                  <Tag
                    key={tag.id}
                    text={tag.name}
                    theme="tag tag_text tag_text--gray"
                  ></Tag>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </React.Fragment>
  );
};
export default OfferCard;