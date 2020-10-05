import React, { useState } from "react";
import "./Profile-selection-Style.css";
import {
  sendUserProfilePicture,
  sendOrgProfilePicture,
} from "../../utils/apiRequests";
import PictureContainer from "./PictureContainer";

const PictureForm = ({ handleNewImage, isOrg }) => {
  const [image, setImage] = useState();
  const [preview, setPreview] = useState(false);
  const [newInfo, setNewInfo] = useState();

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
    setPreview(true);
  };

  const clearImage = () => {
    setPreview(false);
    setImage("");
  };

  const handleSubmit = () => {
    if (isOrg === false) {
      sendUserProfilePicture(image).then((res) => {
        const pp = res?.data?.data?.user?.profilePicture;
        setNewInfo(pp);
      });
    } else {
      sendOrgProfilePicture(image).then((res) => {
        const pp = res?.data?.data?.organization;
        setNewInfo(pp);
      });
    }

    setPreview(false);
    setImage(false);
    handleNewImage();
  };

  return (
    <div className="PicSelector">
      <PictureContainer newInfo={newInfo} isOrg={isOrg}></PictureContainer>
      {preview ? (
        <>
          <div className="PicForm">
            <img
              src={URL.createObjectURL(image)}
              alt="preview"
              className="Pic-selector__img"
              style={{ display: "none" }}
            />
            <button onClick={handleSubmit} className="PicForm_cbutton">
              Confirmar
            </button>
            <button onClick={clearImage} className="PicForm_xbutton">
              Cancelar
            </button>
          </div>
        </>
      ) : (
        <>
          <input
            type="file"
            onChange={handleImageUpload}
            accept="png jpg jpeg"
            id="inputPF"
            style={{ display: "none" }}
            className="PicForm_chbutton"
          />
          <div className="Pic-selector__label ">
            <label htmlFor="inputPF" className="Pic-selector__image-upload">
              <i className="material-icons">add_a_photo</i>
            </label>
          </div>
        </>
      )}
    </div>
  );
};

export default PictureForm;
