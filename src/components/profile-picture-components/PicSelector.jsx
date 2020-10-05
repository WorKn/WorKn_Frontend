import React, { useState } from "react";
import PictureForm from "./PictureForm";

const PicSelector = ({ isOrg }) => {
  const [newImage, setNewImage] = useState();
  const handleNewImage = () => {
    setNewImage(newImage);
  };

  return (
    <div>
      <PictureForm handleNewImage={handleNewImage} isOrg={isOrg}></PictureForm>
    </div>
  );
};

export default PicSelector;
