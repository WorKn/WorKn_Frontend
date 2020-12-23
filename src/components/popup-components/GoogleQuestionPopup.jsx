import React from "react";
import "./QuestionPopup-Style.css";
import "../../App.css";
import queryString from "query-string";

const GoogleQuestionPopup = ({ location }) => {

    // const params = {
    //     client_id: process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID,
    //     redirect_uri: "http://127.0.0.1:3001/googleMemberRegister",
    //     scope: [
    //         "https://www.googleapis.com/auth/userinfo.email",
    //         "https://www.googleapis.com/auth/userinfo.profile",
    //     ].join(" "),
    //     response_type: "code",
    //     access_type: "offline",
    //     prompt: "consent",
    // }


    // const setUri = (redirect_uri) => {
    //     console.log(redirect_uri)
    //     params.redirect_uri = redirect_uri
    //     const stringifiedParams = queryString.stringify(params);
    //     const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;
    //     return () => {
    //         console.log(params)
    //         window.open(googleLoginUrl);
    //     }
    // }


    return (
        <div className="popup-wrapper">
            <div className="sizing-container">
                <span className="popup-btitle">
                    Como quieres acceder a nuestro sistema? G
                </span>
                <a href={`/googleOwnerRegister${location}`}>
                    <span className="custom-button bg-green">
                        <span>Empresa</span>
                    </span>
                </a>
                <div className="info-container">
                    <i className="fa fa-info icon"></i>
                    <p>
                        Las cuentas de empresa permiten gestionar equipos de recursos
                        humanos, crear ofertas de trabajo orientadas principalmente al
                        empleo fijo, medio tiempo o pasantías .
                    </p>
                </div>
                <span>
                    <span className="custom-button bg-green">
                        <span>Persona</span>
                    </span>
                </span>
                <div className="info-container">
                    <i className="fa fa-info icon"></i>
                    <p>
                        Las cuentas de persona están pensadas para todo aquel que desee
                        utilizar el sistema para crear o aplicar a ofertas de trabajo, tanto
                        a ofertas de empresas como independientes o de freelancing.
                     </p>
                </div>
            </div>
        </div >
    );
};

export default GoogleQuestionPopup;
