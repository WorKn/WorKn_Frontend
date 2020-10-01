import React, { useState, useEffect } from "react";
import "./Profile-selection-Style.css";
import updateAction from "../../updateAction";
import { useStateMachine } from "little-state-machine";

const PictureContainer = ({ newInfo, isOrg }) => {
  const [image, setImage] = useState("");
  const { state, action } = useStateMachine(updateAction);

  const getImage = async () => {
    if (isOrg === false) {
      if (state.userInformation.profilePicture) {
        setImage(state.userInformation.profilePicture);
        if (newInfo) {
          action({ profilePicture: newInfo });
        }
      } else {
        console.log("loading");
      }
    } else {
      if (state.userInformation.data?.profilePicture) {
        setImage(state.userInformation.data?.profilePicture);
        if (newInfo) {
          action({ data: newInfo });
        }
      } else {
        console.log("loading");
      }
    }
  };

  useEffect(() => {
    getImage();
  }, [
    newInfo,
    state.userInformation.profilePicture,
    state.userInformation.data,
  ]);

  const configureImage = (image) => {
    if (!image) {
      return;
    } else {
      return image;
    }
  };

  return (
    <div className="Pic-selector">
      <span>Foto de perfil</span>
      <div className="Pic-selector__profile-container">
        <div className="Pic-selector__img-holder">
          <img
            src={configureImage(image)}
            alt={image}
            id="img"
            className="Pic-selector__img"
          />
        </div>
      </div>
    </div>
  );
};

export default PictureContainer;
