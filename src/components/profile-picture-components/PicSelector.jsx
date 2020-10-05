import React, { useState } from "react";
import PictureForm from "./PictureForm";

const PicSelector = () => {
  const [newImage, setNewImage] = useState();
  const handleNewImage = () => {
    setNewImage(newImage);
  };

  return (
    <div>
      <PictureForm handleNewImage={handleNewImage}></PictureForm>
    </div>
  );
};

export default PicSelector;
