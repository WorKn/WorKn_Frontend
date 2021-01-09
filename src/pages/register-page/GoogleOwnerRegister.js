import React, { useState, useEffect } from "react";
import "./RegisterPage-Style.css";
import "../../App.css";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import updateAction from "../../updateAction";
import { useStateMachine } from "little-state-machine";
import { ErrorMessage } from "@hookform/error-message";
import { getAge } from "../../utils/ageCalculation";
import { orgUserSignup } from "../../utils/apiRequests";
import auth from "../../utils/authHelper";
import Cookies from "js-cookie";
import { store } from 'react-notifications-component';
import Header from "../../components/navbar-components/Navbar";
import Footer from "../../components/footer-components/Footer";

const GoogleOwnerRegister = ({ location }) => {
    const [userObject, setUserObject] = useState("");
    const { state, action } = useStateMachine(updateAction);
    const { register, handleSubmit, errors } = useForm({
        defaultValues: state.userInformation,
    });
    const { push } = useHistory();

    const onSubmit = (data) => {
        data.userType = "offerer";
        data.organizationRole = "owner";
        data.password = state.userInformation.sub
        data.passwordConfirm = state.userInformation.sub
        data.signUpMethod = "google";
        data.profilePicture = state.userInformation.profilePicture;
        data.isEmailValidated = state.userInformation.isEmailValidated;

        action(data);
        action({ hasCreatedAccount: true })
        orgUserSignup(data).then((res) => {
            console.log(res)
            if (res.status === "fail") {
                store.addNotification({
                    title: "Ha ocurrido un error",
                    message: res.message,
                    type: "danger",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                        duration: 10000,
                        onScreen: true
                    }
                });
            }
            setUserObject(res);
        });
    };


    useEffect(() => {
        if (userObject.data !== undefined && userObject.data.status === "success") {
            action(userObject.data.data.user);
            Cookies.set("jwt", userObject.data.token, { expires: 7 });
        }
        const user = Cookies.get("jwt");
        if (user && state.userInformation.category && state.userInformation.tags) {
            auth.login();
            push("/userprofile");
        } else if (
            user &&
            !state.userInformation.category &&
            !state.userInformation.tags
        ) {
            auth.login();
            push("/userprofile");
        }
    }, [
        userObject,
        push,
        action,
        state.userInformation.category,
        state.userInformation.tags,
    ]);

    return (
        <div>
            <Header />
            <div className="login-wrapper">
                <div className="green-line">
                    <form className="sizing-container" onSubmit={handleSubmit(onSubmit)}>
                        <div className="logo-container">
                            <img
                                className="logo-header"
                                src="https://i.imgur.com/klMjRck.png"
                                alt="logo"
                            />
                        </div>
                        <span className="popup-title">Registra tu cuenta con Google </span>
                        <span className="sub-title">
                            Primero crearemos tu cuenta de administrador de la empresa o negocio. Ayudanos a completar las siguientes informaciones.
                        </span>
                        <div className="picture__previewcont">
                            <div className="Pic-selector__profile-container">
                                <div className="Pic-selector__img-holder">
                                    <img
                                        src={state.userInformation.profilePicture}
                                        alt="preview"
                                        id="img"
                                        className="Pic-selector__img"
                                    // style={{ display: "none" }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="paired-container">
                            <div className="paired-input">
                                <span className="popup-text">Nombre</span>
                                <input
                                    disabled
                                    className="form-input"
                                    type="text"
                                    name="name"
                                    ref={register({ required: "Por favor ingrese su nombre" })}
                                    value={state.userInformation.name}

                                />
                                <ErrorMessage
                                    errors={errors}
                                    name="name"
                                    render={({ message }) => (
                                        <div className="input__msg input__msg--error">
                                            <i className="fa fa-asterisk"></i> {message}
                                        </div>
                                    )}
                                />
                            </div>
                            <div className="paired-input lspacer">
                                <span className="popup-text">Apellido</span>
                                <input
                                    disabled
                                    className="form-input"
                                    type="text"
                                    name="lastname"
                                    ref={register({ required: "Por favor ingrese su apellido" })}
                                    value={state.userInformation.lastname}

                                />
                                <ErrorMessage
                                    errors={errors}
                                    name="lastname"
                                    render={({ message }) => (
                                        <div className="input__msg input__msg--error">
                                            <i className="fa fa-asterisk"></i> {message}
                                        </div>
                                    )}
                                />
                            </div>
                        </div>
                        <span className="popup-text">Correo</span>
                        <input
                            disabled
                            className="form-input"
                            type="email"
                            name="email"
                            ref={register({ required: "Por favor ingrese su correo" })}
                            value={state.userInformation.email}

                        />
                        <ErrorMessage
                            errors={errors}
                            name="email"
                            render={({ message }) => (
                                <div className="input__msg input__msg--error">
                                    <i className="fa fa-asterisk"></i> {message}
                                </div>
                            )}
                        />

                        <span className="popup-text">Fecha de nacimiento</span>
                        <input
                            className="userform__input userform__input--outlined"
                            name="birthday"
                            id="birthday"
                            type="date"
                            min="1899-01-01"
                            ref={register({
                                required: "Por favor ingrese su fecha de nacimiento",
                                validate: (value) =>
                                    getAge(value) >= 16 ||
                                    "Debes ser mayor de 16 años para utilizar WorKn",
                            })}
                        />
                        <ErrorMessage
                            errors={errors}
                            name="birthday"
                            render={({ message }) => (
                                <div className="input__msg input__msg--error">
                                    <i className="fa fa-asterisk"></i> {message}
                                </div>
                            )}
                        />
                        <input
                            className="custom-button bg-green"
                            type="submit"
                            value="Siguiente"
                        />
                        <div className="line-separator">
                            <span className="hl"></span>
                            <span className="spacer">o</span>
                            <span className="hl"></span>
                        </div>
                        <div className="ctext-separator">
                            <span className="remind-me">
                                Ya tienes cuenta? {""}
                                <a className="popup-link " href="/login">
                                    Inicia sesión
              </a>
                            </span>
                        </div>

                        {/* <span className="custom-button bg-blue">
              <div className="inner-container">
                <i className="fa fa-facebook-official"></i>
                <span className="vl"></span>
                <span>Regístrate con Facebook</span>
              </div>
            </span>
            <span className="custom-button bg-red">
              <div className="inner-container">
                <i className="fa fa-google"></i>
                <span className="vl"></span>
                <span>Regístrate con Google</span>
              </div>
            </span> */}
                    </form>
                </div>
            </div>
            <Footer></Footer>
        </div>

    );
};

export default GoogleOwnerRegister;
