import React from "react";
import "./../../pages/login-page/LoginPage-Style.css";
import "./GoogleSignUpButton-Style.css";
import queryString from "query-string";

require("dotenv").config({ path: "./.env" });

const GoogleSignUpButton = () => {
  const redirect_uri = `http://${window.location.host}/googleAuth/`;

  const params = {
    client_id: process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID,
    redirect_uri,
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ].join(" "),
    response_type: "code",
    access_type: "offline",
    prompt: "consent",
  };

  const stringifiedParams = queryString.stringify(params);
  const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;

  return (
    <div>
      <a className="custom-button bg-red google" href={googleLoginUrl}>
        <div className="inner-container">
          <i className="fa fa-google"></i>
          <span className="vl"></span>
          <span>
            <span className="google" >
              Accede con Google
            </span>
          </span>
        </div>
      </a>
    </div>
  );
};

export default GoogleSignUpButton;
