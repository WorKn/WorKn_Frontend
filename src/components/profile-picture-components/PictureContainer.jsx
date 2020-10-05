import React, { useState, useEffect } from "react";
import "./Profile-selection-Style.css";
import updateAction from "../../updateAction";
import { useStateMachine } from "little-state-machine";

const PictureContainer = ({ newImage }) => {
  const [image, setImage] = useState("");
  const { state, action } = useStateMachine(updateAction);

  const getImage = async () => {
    if (state.userInformation.profilePicture) {
      setImage(state.userInformation.profilePicture);
      if (newImage) {
        action({ profilePicture: newImage });
      }
    } else {
      console.log("loading");
    }
    try {
      getMe().then((res) => {
        const pp = res?.data?.data?.data?.profilePicture;
        if (!pp) {
          return;
        } else {
          setImage(pp);
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getImage();
  }, [newImage, state.userInformation.profilePicture]);

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
