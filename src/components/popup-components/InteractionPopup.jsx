import React from "react";
import { acceptInteraction, rejectInteraction } from "../../utils/apiRequests";
import updateAction from "../../updateAction";
import { useStateMachine } from "little-state-machine";

const InteractionPopup = ({ responseInfo }) => {
  const { state } = useStateMachine(updateAction);
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
      {typeof state.userInformation.userType !== "undefined" &&
      state.userInformation.userType === "applicant" ? (
        <div>
          <h1>¿Te gustaría aceptar la oferta {responseInfo?.offer?.title}?</h1>
          {typeof responseInfo.state !== "undefined" &&
          responseInfo.state === "interested" ? (
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
      ) : (
        <div>
          <h1>¿Te gustaría aceptar la oferta {responseInfo?.offer?.title}?</h1>
          {typeof responseInfo.state !== "undefined" &&
          responseInfo.state === "applied" ? (
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
      )}
    </div>
  );
};

export default InteractionPopup;
