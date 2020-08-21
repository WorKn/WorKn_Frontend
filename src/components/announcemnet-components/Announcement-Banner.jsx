import React, { Component, useState } from "react";
import "./Announcement-Style.css";
import Announcement from "./Announcement";

class AnnouncementBanner extends Component {
  state = {
    isOpen: true,
  };

  render() {
    return (
      <div className="BA-image-container">
        <Announcement
          isOpen={this.state.isOpen}
          onClose={(e) => this.setState({ isOpen: false })}
        >
          Casi creamos tu perfil, ayúdanos completando las siguientes
          informaciones, mientras más precisa sea la información proporcionada
          mejor será tu experiencia en Workn
        </Announcement>
      </div>
    );
  }
}

export default AnnouncementBanner;
