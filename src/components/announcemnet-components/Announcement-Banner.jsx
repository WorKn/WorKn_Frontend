import React, { useState, useEffect } from "react";
import "./Announcement-Style.css";
import Announcement from "./Announcement";
import updateAction from "../../updateAction";
import { useStateMachine } from "little-state-machine";

const AnnouncementBanner = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { state } = useStateMachine(updateAction);

  useEffect(() => {
    if (state.userInformation.isSignupCompleted === false) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [state.userInformation.isSignupCompleted]);

  return isOpen ? (
    <div className="BA-image-container">
      <Announcement isOpen={isOpen} onClose={() => setIsOpen(false)}>
        Casi creamos tu perfil, ayúdanos completando las siguientes
        informaciones. Mientras más precisa sea la información proporcionada
        mejor será tu experiencia en Workn.
      </Announcement>
    </div>
  ) : null;
};

export default AnnouncementBanner;
