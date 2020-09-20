import React from "react";
import "./OfferStrip-Style.css";
import Tag from "../tag-components/Tag";
import { useModal } from "../../hooks/useModal";
import InteractionPopup from "../../components/popup-components/InteractionPopup";
import updateAction from "../../updateAction";
import { useStateMachine } from "little-state-machine";
const OfferStrip = ({ responseInfo }) => {
  const { show: showDetailModal, RenderModal: DetailModal } = useModal();
  const { state } = useStateMachine(updateAction);

  return (
    <div>
      <DetailModal>
        <InteractionPopup responseInfo={responseInfo}></InteractionPopup>
      </DetailModal>
      {(typeof state.userInformation.userType !== "undefined" &&
        state.userInformation.userType === "applicant") ||
      state.userInformation.userType === "" ? (
        <div className="offerstrip" onClick={showDetailModal}>
          <img
            src={responseInfo?.offer?.organization?.profilePicture}
            className="offerstrip__picture"
            alt="Offerpp"
          />
          <span className="offerstrip__text offerstrip__org">
            {responseInfo?.offer?.organization?.name}
          </span>
          <span className="offerstrip__vl offerstrip__vl--1"></span>
          <span className="offerstrip__text offerstrip__type">
            {responseInfo?.offer?.offerType}
          </span>
          <span className="offerstrip__vl offerstrip__vl--2"></span>
          <span className="offerstrip__text offerstrip__offer">
            {responseInfo?.offer?.title}
          </span>
          <span className="offerstrip__vl offerstrip__vl--3"></span>
          <div className="offerstrip__tagscontainer">
            {responseInfo?.offer?.tags?.map((tag) => (
              <Tag
                key={tag.id}
                text={tag.name}
                theme="tag tag__text tag__text--gray"
              ></Tag>
            ))}
          </div>
          <span className="offerstrip__vl offerstrip__vl--4"></span>
          <span className="offerstrip__text offerstrip__edit">Editar</span>
          <i className="fa fa-times offerstrip__icon offerstrip__delete"></i>
        </div>
      ) : (
        <div className="offerstrip" onClick={showDetailModal}>
          <img
            src={responseInfo?.applicant?.profilePicture}
            className="offerstrip__picture"
            alt="Offerpp"
          />
          <span className="offerstrip__text offerstrip__org">
            {responseInfo?.applicant?.category?.name}
          </span>
          <span className="offerstrip__vl offerstrip__vl--1"></span>
          <span className="offerstrip__text offerstrip__type">
            {responseInfo?.applicant?.email}
          </span>
          <span className="offerstrip__vl offerstrip__vl--2"></span>
          <span className="offerstrip__text offerstrip__offer">
            {responseInfo?.applicant?.name} {responseInfo?.applicant?.lastname}
          </span>
          <span className="offerstrip__vl offerstrip__vl--3"></span>
          <div className="offerstrip__tagscontainer">
            {responseInfo?.applicant?.tags?.map((tag) => (
              <Tag
                key={tag.id}
                text={tag.name}
                theme="tag tag__text tag__text--gray"
              ></Tag>
            ))}
          </div>
          <span className="offerstrip__vl offerstrip__vl--4"></span>
          <span className="offerstrip__text offerstrip__edit">Editar</span>
          <i className="fa fa-times offerstrip__icon offerstrip__delete"></i>
        </div>
      )}
    </div>
  );
};

export default OfferStrip;
