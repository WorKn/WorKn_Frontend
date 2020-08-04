import React from "react";
import "./Banner-Style.css"

const Banner = ({image}) => {
    return(
        <div className="Banner-image-container">
            <img src={image} alt="Banner-media"/>
        </div>
    )
}

export default  Banner;