import React from "react";
import "./LandingPage-Style.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { useModal } from "../../hooks/useModal";
import LoginPopup from "../../components/popup-components/LoginPopup.tsx";
import RegisterPopup from "../../components/popup-components/RegisterPopup";
import QuestionPopup from "../../components/popup-components/QuestionPopup";

const LandingPage = React.memo(() => {
  const {
    show: showRegisterModal,
    RenderModal: RegisterModal,
    hide: hideRegisterModal,
  } = useModal();
  const {
    show: showLoginModal,
    RenderModal: LoginModal,
    hide: hideLoginModal,
  } = useModal();
  const {
    show: showQuestionModal,
    RenderModal: QuestionModal,
    hide: hideQuestionModal,
  } = useModal();

  return (
    <div>
      <div>
        <h1>This is my landing page</h1>

        <button onClick={showRegisterModal}>Register popup</button>

        <button onClick={showLoginModal}>Login popup</button>
        <button onClick={showQuestionModal}>Question popup</button>

        <RegisterModal>
          <RegisterPopup />
        </RegisterModal>

        <LoginModal>
          <LoginPopup />
        </LoginModal>

        <QuestionModal>
          <QuestionPopup />
        </QuestionModal>
      </div>
      <div id="modal-root" />
    </div>
  );
});

export default LandingPage;
