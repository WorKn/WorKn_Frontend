import React, { useState, useEffect, Component } from "react";
import axios from "axios";
import "./Profile-selection-Style.css";
import { sendImage, getMe } from "../../utils/apiRequests";
import { Form } from "react-bootstrap";

const PictureContainer = ({ newImage }) => {
  const [images, setImages] = useState("");
  const getImages = async () => {
    try {
      getMe().then((res) => {
        console.log(res);
        res.data.files = res.data.data.profilePicture;
        if (!res.data.files) {
          console.log("dude!, where is my picture? ");
          return;
        } else {
          setImages(res.data.files);
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getImages();
  }, [newImage]);

  const configureImage = (image) => {
    if (!image) {
      return "https://i0.wp.com/postmatura.al/wp-content/uploads/2018/10/blank-profile-picture-png.png?fit=512%2C512&ssl=1";
    } else {
      return image;
    }
  };

  //console.log(images);

  return (
    <div className="Pic-selector">
      <span>Foto de perfil</span>
      <div className="Pic-selector__profile-container">
        <div className="Pic-selector__img-holder">
          <img
            src={configureImage(images)}
            alt={images}
            id="img"
            className="Pic-selector__img"
          />
        </div>
      </div>
    </div>
  );
};

export default PictureContainer;

//https://res.cloudinary.com/dkmdbpnvc/image/upload/v1599181267/h5dusrjyvhynmk964wig.jpg

// const uploadImage = (e) => {
//   const files = e.target.files[0];
//   const fd = new FormData();
//   fd.append("upload_preset", "TestFolder");
//   fd.append("file", files);
//   axios
//     .post("https://api.cloudinary.com/v1_1/dkmdbpnvc/image/upload", fd)
//     .then((res) => {
//       setImage(res.data.secure_url);
//       console.log(res);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   // const file = e.target.files[0];
//   // console.log(file);
//   // const reader = new FileReader();
//   // // const data = new FormData();
//   // if (file) {
//   //   reader.readAsDataURL(file);
//   // }
//   // // if (file && file.type.match("image.*")) {
//   // reader.onload = async () => {
//   //   if (reader.readyState === 2) {
//   //     setImage(reader.result);
//   //     console.log(reader.result);
//   //     try {
//   //       sendImage(reader.result).then((res) => {
//   //         console.log(res);
//   //       });
//   //       setSuccessMsg("Image uploaded successfully");
//   //     } catch (err) {
//   //       console.error(err);
//   //       setErrMsg("Something went wrong!");
//   //     }
//   //   }
//   // };
//   // reader.onerror = () => {
//   //   console.log("Something went wrong");
//   //   setErrMsg("Something went wrong!");
//   // };
//   // // }
// };

// const uploadImage = async (base64EncodedImage) => {
//   const data = base64EncodedImage;
//   try {
//     await sendImage(data).then((res) => {
//       console.log(res);
//     });
//     setSuccessMsg("Image uploaded successfully");
//   } catch (err) {
//     console.error(err);
//     setErrMsg("Something went wrong!");
//   }
// };

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
