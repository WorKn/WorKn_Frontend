import React from "react";
import "./../../pages/login-page/LoginPage-Style.css";
import "./GoogleSignUpButton-Style.css";
import { useModal } from "../../hooks/useModal";
import GoogleQuestionPopup from "../../components/popup-components/GoogleQuestionPopup";
import queryString from "query-string";

require("dotenv").config({ path: "./.env" });

const GoogleSignUpButton = () => {

  const params = {
    client_id: process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID,
    redirect_uri: "http://127.0.0.1:3001/googleAuth/",
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ].join(" "),
    response_type: "code",
    access_type: "offline",
    prompt: "consent",
  }

  const stringifiedParams = queryString.stringify(params);
  const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;

  const {
    show: showQuestionModal,
    RenderModal: QuestionModal,
    // hide: hideQuestionModal,
  } = useModal();



  return (
    <div>

      <span className="custom-button bg-red">
        <div className="inner-container">
          <i className="fa fa-google"></i>
          <span className="vl"></span>
          <span>
            <a className="google" href={googleLoginUrl}>
              Accede con Google
            </a>
          </span>
        </div>
      </span>
    </div>

  );
};

export default GoogleSignUpButton;
