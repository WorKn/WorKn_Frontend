import React, { useEffect, useState } from "react";
import {
  createInteractionAO,
  createInteractionOA,
} from "../../utils/apiRequests";
import updateAction from "../../updateAction";
import { useStateMachine } from "little-state-machine";
import { getMyOffers } from "../../utils/apiRequests";
import { register } from "../../serviceWorker";
import { useForm } from "react-hook-form";

const DetailPopup = ({ responseInfo }) => {
  const { state } = useStateMachine(updateAction);
  const [interactionTarget, setInteractionTarget] = useState();
  const [offers, setOffers] = useState();
  const [selectedOffer, setSelectedOffer] = useState();
  const { register, handleSubmit } = useForm({});
  useEffect(() => {
    getMyOffers().then((res) => {
      if (res !== undefined) {
        console.log(res);
        setOffers(res);
      }
    });
  }, []);

  useEffect(() => {
    if (interactionTarget && state.userInformation.userType === "applicant") {
      createInteractionAO(interactionTarget).then((res) => {
        if (res !== undefined) {
          console.log(res);
        }
      });
    } else {
      console.log("es ofertante");
    }
  }, [interactionTarget]);

  useEffect(() => {
    createInteractionOA(interactionTarget, selectedOffer).then((res) => {
      if (res !== undefined) {
        console.log(res);
      }
    });
  }, [interactionTarget, selectedOffer]);

  const onSubmit = (data) => {
    setSelectedOffer(data.offer);
    setInteractionTarget(responseInfo?._id);
    // if (selectedOffer !== undefined && interactionTarget !== undefined) {
    //   createInteractionOA(interactionTarget, selectedOffer).then((res) => {
    //     console.log(interactionTarget);
    //     console.log(selectedOffer);
    //     console.log("all good");
    //     if (res !== undefined) {
    //       console.log(res);
    //     }
    //   });
    // } else {
    //   console.log("loading");
    // }
  };

  return (
    <div>
      {(typeof state.userInformation.userType !== "undefined" &&
        state.userInformation.userType === "applicant") ||
      state.userInformation.userType === "" ? (
        <div>
          <h1>{responseInfo?.title}</h1>
          <button
            onClick={() => {
              console.log(responseInfo?._id);
              setInteractionTarget(responseInfo?._id);
              console.log(selectedOffer);
            }}
          >
            Aplicar
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>
            {responseInfo?.name} {responseInfo?.lastname}
          </h1>
          <select className="form__select" name="offer" ref={register}>
            {offers?.data.data.offers.map((offer) => (
              <option key={offer._id} value={offer._id}>
                {offer.title}
              </option>
            ))}
          </select>
          {/* <button
            onClick={() => {
              setInteractionTarget(responseInfo?._id);
            }}
          >
            Aplicar
          </button> */}
          <input
            className="custom-button bg-green"
            type="submit"
            value="Demostrar interés"
          />
        </form>
      )}
    </div>
  );
};

export default DetailPopup;
