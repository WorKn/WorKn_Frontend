import React from "react";
import "./OfferStrip-Style.css";
import Tag from "../tag-components/Tag";
import { useModal } from "../../hooks/useModal";
import InteractionPopup from "../../components/popup-components/InteractionPopup";
import updateAction from "../../updateAction";
const OfferStrip = ({ responseInfo }) => {
  const { show: showDetailModal, RenderModal: DetailModal } = useModal();

  return (
    <div>
      <DetailModal>
        <InteractionPopup responseInfo={responseInfo}></InteractionPopup>
      </DetailModal>
      <div className="offerstrip" onClick={showDetailModal}>
        <img
          src="https://i.imgur.com/lcHQ2QP.jpg"
          className="offerstrip__picture"
          alt="Offerpp"
        />
        <span className="offerstrip__text offerstrip__org">
          {responseInfo?.offer?._id}
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
    </div>
  );
};

export default OfferStrip;
