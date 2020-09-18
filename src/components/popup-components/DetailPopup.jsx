import React, { useEffect, useState } from "react";
import { createInteraction } from "../../utils/apiRequests";

const DetailPopup = ({ responseInfo }) => {
  const [offerToApply, setOfferToApply] = useState();

  useEffect(() => {
    if (offerToApply) {
      createInteraction(offerToApply).then((res) => {
        if (res !== undefined) {
          console.log(res);
        }
      });
    }
  }, [offerToApply]);

  return (
    <div>
      <h1>
        {responseInfo?.title}
        <button
          onClick={() => {
            console.log(responseInfo?._id);
            setOfferToApply(responseInfo?._id);
          }}
        >
          Aplicar
        </button>
      </h1>
    </div>
  );
};

export default DetailPopup;
