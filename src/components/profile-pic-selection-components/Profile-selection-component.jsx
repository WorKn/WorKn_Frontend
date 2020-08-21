import React, { Component } from "react";
import "./Profile-selection-Style.css";

export class Pic_Selector extends Component {
  state = {
    profileImg:
      "https://i0.wp.com/postmatura.al/wp-content/uploads/2018/10/blank-profile-picture-png.png?fit=512%2C512&ssl=1",
  };
  imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        this.setState({ profileImg: reader.result });
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  render() {
    const { profileImg } = this.state;
    return (
      <div className="page">
        <div className="Pic-selector">
          <span>Foto de perfil</span>
          <div className="Pic-selector__profile-container">
            <div className="Pic-selector__img-holder">
              <img
                src={profileImg}
                alt=""
                id="img"
                className="Pic-selector__img"
              />
            </div>
            <input
              type="file"
              name="Pic-selector__image-upload"
              id="input"
              accept="image/**"
              onChange={this.imageHandler}
            />
            <div className="Pic-selector__label">
              <label htmlFor="input" className="Pic-selector__image-upload">
                <i className="material-icons">add_a_photo</i>
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
