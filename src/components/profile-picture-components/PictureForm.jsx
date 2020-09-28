import React, { useState } from "react";
import "./Profile-selection-Style.css";
import { sendImage } from "../../utils/apiRequests";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PictureForm = ({ handleNewImage }) => {
  const [image, setImage] = useState();
  const [preview, setPreview] = useState(false);
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
      console.log(res);
      try {
        if (res.data.status === "success") {
          toast.success(
            `Bien! ahora refresca la pagina para ver tu nueva foto de perfil`,
            {
              className: "Picture_success",
              position: toast.POSITION.TOP_LEFT,
              closeButton: false,
              draggable: true,
            }
          );
          console.log(res.data);
        } else {
          toast.error(`Hubo un error, intentalo de nuevo`, {
            className: "Picture_fail",
            position: toast.POSITION.TOP_LEFT,
            closeButton: false,
            draggable: true,
          });
        }
      } catch (err) {
        toast.error(err, {
          className: "Picture_fail",
          position: toast.POSITION.TOP_LEFT,
          closeButton: false,
          draggable: true,
        });
      }
    });
    setPreview(false);
    setImage(false);
    handleNewImage();
  };

  return (
    <div>
      <ToastContainer />
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
