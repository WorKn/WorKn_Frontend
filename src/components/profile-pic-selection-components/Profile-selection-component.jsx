import React, { Component, useState } from "react";
import axios from "axios";
import "./Profile-selection-Style.css";
import { sendImage } from "../../utils/apiRequests";
import { Form } from "react-bootstrap";

const Pic_Selector = () => {
  const [image, setImage] = useState(
    "https://i0.wp.com/postmatura.al/wp-content/uploads/2018/10/blank-profile-picture-png.png?fit=512%2C512&ssl=1"
  );
  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    const reader = new FileReader();
    const data = new FormData();
    if (file) {
      reader.readAsDataURL(file);
    }
    if (file && file.type.match("image.*")) {
      reader.onload = async () => {
        if (reader.readyState === 2) {
          setImage(reader.result);
          uploadImage(reader.result);
          console.log(reader.result);
        }
      };
      reader.onerror = () => {
        console.log("Something went wrong");
        setErrMsg("Something went wrong!");
      };
    }
  };

  const uploadImage = async (base64EncodedImage) => {
    const data = base64EncodedImage;
    try {
      await sendImage(data).then((res) => {
        console.log(res);
      });
      setSuccessMsg("Image uploaded successfully");
    } catch (err) {
      console.error(err);
      setErrMsg("Something went wrong!");
    }
  };

  // const uploadImage = (e) => {
  //   const file = e.target.files[0];
  //   console.log(file);
  //   const reader = new FileReader();
  //   if (file && file.type.match("image.*")) {
  //     reader.onload = () => {
  //       if (reader.readyState === 2) {
  //         setImage(reader.result);
  //       }
  //     };
  //   }
  //   if (file) {
  //     reader.readAsDataURL(file);
  //   }
  // };

  return (
    <div className="Pic-selector">
      <span>Foto de perfil</span>
      <div className="Pic-selector__profile-container">
        <label htmlFor="input" className="Pic-selector__image-upload">
          {/* <i className="material-icons">add_a_photo</i> */}
          <div className="Pic-selector__img-holder">
            <img src={image} alt="" id="img" className="Pic-selector__img" />
          </div>
        </label>
        <input
          type="file"
          name="Pic-selector__image-upload"
          id="input"
          accept="image/**"
          onChange={handleSubmit}
          style={{ display: "none" }}
        />
        {/* <div className="Pic-selector__label"></div> */}
      </div>
    </div>
  );
};

export default Pic_Selector;
