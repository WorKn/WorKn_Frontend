import React, { useEffect, useState } from "react";
import { useModal } from "../../hooks/useModal";
import { googleAuth, validateUserGoogleAuthRegister } from "../../utils/apiRequests";
import queryString from "query-string";
import LoginPage from "../login-page/LoginPage";
import { useStateMachine } from "little-state-machine";
import updateAction from "../../updateAction";
import GoogleQuestionPopup from "../../components/popup-components/GoogleQuestionPopup";

const GoogleAuthPage = ({ location }) => {
    const [userGoogleInfo, setUserGoogleInfo] = useState()
    const { state, action } = useStateMachine(updateAction);
    const {
        show: showGoogleQuestionModal,
        RenderModal: GoogleQuestionModal,
        // hide: hideQuestionModal,
    } = useModal();


    useEffect(() => {
        console.log(location)
        const urlParams = queryString.parse(location.search);
        if (urlParams.error) {
            console.log("Error");
        } else {
            console.log(`The code is: ${urlParams.code}`);
            const redirect_uri = "http://127.0.0.1:3001/googleAuth/";
            validateUserGoogleAuthRegister(urlParams.code, redirect_uri).then((res) => {
                if (res.data.data.isUserRegistered) {
                    console.log("pasa")
                } else {
                    showGoogleQuestionModal()
                }
                console.log(res)
            });
        }
    }, []);



    return (
        <div>
            <GoogleQuestionModal location={location.search}>
                <GoogleQuestionPopup location={location.search} />
            </GoogleQuestionModal>
            <LoginPage></LoginPage>
        </div>
    )
};

export default GoogleAuthPage;
