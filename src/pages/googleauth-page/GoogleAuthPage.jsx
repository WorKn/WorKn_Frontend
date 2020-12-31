import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useModal } from "../../hooks/useModal";
import { googleAuth } from "../../utils/apiRequests";
import queryString from "query-string";
import LoginPage from "../login-page/LoginPage";
import { useStateMachine } from "little-state-machine";
import updateAction from "../../updateAction";
import GoogleQuestionPopup from "../../components/popup-components/GoogleQuestionPopup";
import Cookies from "js-cookie";
import auth from "../../utils/authHelper";
import { store } from 'react-notifications-component';

const GoogleAuthPage = ({ location }) => {
    const { push } = useHistory();
    const { state, action } = useStateMachine(updateAction);
    const {
        show: showGoogleQuestionModal,
        RenderModal: GoogleQuestionModal,
    } = useModal();

    useEffect(() => {
        console.log(state.userInformation.sub)
        console.log(location)
        const urlParams = queryString.parse(location.search);
        if (urlParams.error) {
            console.log("Error");
        } else {
            console.log(`The code is: ${urlParams.code}`);
            googleAuth(urlParams.code).then((res) => {
                console.log(res)
                if (res && res.data?.status === 'success') {
                    if (res.data.data.isUserRegistered === false) {
                        showGoogleQuestionModal()
                        action(res.data.data)
                    } else {
                        console.log("pasa")
                        Cookies.set("jwt", res.data.token, { expires: 7 });
                        auth.login();
                        push("/userprofile");
                    }
                } else if (res && res.status === 'error') {
                    push("/login")
                } else if (res && res.status === 'fail') {
                    store.addNotification({
                        title: "Ha ocurrido un error",
                        message: res.message,
                        type: "danger",
                        insert: "top",
                        container: "top-right",
                        animationIn: ["animate__animated", "animate__fadeIn"],
                        animationOut: ["animate__animated", "animate__fadeOut"],
                        dismiss: {
                            duration: 15000,
                            onScreen: true
                        }
                    });
                }
            });
        }
        // eslint-disable-next-line
    }, [state.userInformation.sub]);



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
