import React, { useState, useEffect } from "react";
import "./Profile-selection-Style.css";
import { getMe } from "../../utils/apiRequests";

const PictureContainer = ({ newImage }) => {
  const [image, setImage] = useState("");
  const getImage = async () => {
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
  }, [newImage]);

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
