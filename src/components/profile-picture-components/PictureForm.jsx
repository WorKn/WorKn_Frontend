import React, { useState } from "react";
import "./Profile-selection-Style.css";
import { sendImage } from "../../utils/apiRequests";
import "react-toastify/dist/ReactToastify.css";
import PictureContainer from "./PictureContainer";

const PictureForm = ({ handleNewImage }) => {
  const [image, setImage] = useState();
  const [preview, setPreview] = useState(false);
  const [newImage, setNewImage] = useState();

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
    setPreview(true);
  };

  const clearImage = () => {
    setPreview(false);
    setImage("");
  };

  const handleSubmit = () => {
    sendImage(image).then((res) => {
      const pp = res?.data?.data?.user?.profilePicture;
      setNewImage(pp);
    });
    setPreview(false);
    setImage(false);
    handleNewImage();
  };

  return (
    <div className="PicSelector">
      <PictureContainer newImage={newImage}></PictureContainer>
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
