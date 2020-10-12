import React from "react";
import "./../../pages/login-page/LoginPage-Style.css";
import "./GoogleSignUpButton-Style.css";

import queryString from "query-string";

require("dotenv").config({ path: "./.env" });

const GoogleSignUpButton = () => {
  const stringifiedParams = queryString.stringify({
    client_id: process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID,
    redirect_uri: "http://127.0.0.1:3001/authenticate/google/",
    // redirect_uri: "http://127.0.0.1:3001/",
    //   redirect_uri: 'http://workn-testing.s3-website.us-east-2.amazonaws.com',
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ].join(" "),
    response_type: "code",
    access_type: "offline",
    prompt: "consent",
  });

  const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;

  return (
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
  );
};

export default GoogleSignUpButton;
