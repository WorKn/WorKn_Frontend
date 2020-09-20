import React from "react";
import { acceptInteraction, rejectInteraction } from "../../utils/apiRequests";

const InteractionPopup = ({ responseInfo }) => {
  const catchInteraction = () => {
    acceptInteraction(responseInfo._id).then((res) => {
      console.log(res);
    });
  };

  const deleteInteraction = () => {
    rejectInteraction(responseInfo._id).then((res) => {
      console.log(res);
    });
  };
  return (
    <div>
      <div>
        <h1>¿Te gustaría aceptar la oferta {responseInfo?.offer?.title}?</h1>
        {typeof responseInfo.state !== "undefined" &&
        responseInfo.state === "interesed" ? (
          <div>
            <button
              onClick={() => {
                catchInteraction(responseInfo?._id);
              }}
            >
              Aceptar
            </button>
            <button
              onClick={() => {
                deleteInteraction(responseInfo?._id);
              }}
            >
              Rechazar
            </button>
          </div>
        ) : (
          <h2>no</h2>
        )}
      </div>
    </div>
  );
};

export default InteractionPopup;
