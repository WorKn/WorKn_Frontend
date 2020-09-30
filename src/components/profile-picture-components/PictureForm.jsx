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
      console.log(res.data.data.user);
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

//const uploadImage = (e) => {
//     const files = e.target.files[0];
//     const fd = new FormData();
//     fd.append("upload_preset", "TestFolder");
//     fd.append("file", files);
//     axios
//       .post("https://api.cloudinary.com/v1_1/dkmdbpnvc/image/upload", fd)
//       .then((res) => {
//         setImage(res.data.secure_url);
//         console.log(res);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//     // const file = e.target.files[0];
//     // console.log(file);
//     // const reader = new FileReader();
//     // // const data = new FormData();
//     // if (file) {
//     //   reader.readAsDataURL(file);
//     // }
//     // // if (file && file.type.match("image.*")) {
//     // reader.onload = async () => {
//     //   if (reader.readyState === 2) {
//     //     setImage(reader.result);
//     //     console.log(reader.result);
//     //     try {
//     //       sendImage(reader.result).then((res) => {
//     //         console.log(res);
//     //       });
//     //       setSuccessMsg("Image uploaded successfully");
//     //     } catch (err) {
//     //       console.error(err);
//     //       setErrMsg("Something went wrong!");
//     //     }
//     //   }
//     // };
//     // reader.onerror = () => {
//     //   console.log("Something went wrong");
//     //   setErrMsg("Something went wrong!");
//     // };
//     // // }
//   };

//   // const uploadImage = async (base64EncodedImage) => {
//   //   const data = base64EncodedImage;
//   //   try {
//   //     await sendImage(data).then((res) => {
//   //       console.log(res);
//   //     });
//   //     setSuccessMsg("Image uploaded successfully");
//   //   } catch (err) {
//   //     console.error(err);
//   //     setErrMsg("Something went wrong!");
//   //   }
//   // };

//   // const uploadImage = (e) => {
//   //   const file = e.target.files[0];
//   //   console.log(file);
//   //   const reader = new FileReader();
//   //   if (file && file.type.match("image.*")) {
//   //     reader.onload = () => {
//   //       if (reader.readyState === 2) {
//   //         setImage(reader.result);
//   //       }
//   //     };
//   //   }
//   //   if (file) {
//   //     reader.readAsDataURL(file);
//   //   }
//   // };
