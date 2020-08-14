import React from "react";
import "./RegisterPage-Style.css";
import "../../App.css";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import updateAction from "../../updateAction";
import { useStateMachine } from "little-state-machine";
import { userSignup } from "../../utils/apiRequests";

const RegisterPageC1 = () => {
  const { state, action } = useStateMachine(updateAction);
  const { register, handleSubmit } = useForm();
  const { push } = useHistory();
  const onSubmit = (data) => {
    action(data);
    userSignup(state.userInformation).then((res) => {
      console.log(res);
      // setUserInfo(res);
    });
    push("/loginpage");
  };
  return (
    <div className="register-wrapper">
      <div className="green-line">
        <form className="sizing-container" onSubmit={handleSubmit(onSubmit)}>
          <span>
            <a href="/registerpage" className="backtick">
              <i class="fa fa-chevron-left"></i>Volver
            </a>
          </span>
          <div className="logo-container">
            <img
              className="logo-header"
              src="https://i.imgur.com/klMjRck.png"
              alt="logo"
            />
          </div>
          <span className="popup-title">Cuéntanos sobre ti </span>
          <span className="popup-text">Cómo pretendes usar Workn?</span>
          <div className="role-container">
            <div className="role-inner">
              <p className="role-title">Aplicante</p>
              <img
                className="role-img"
                src="https://i.imgur.com/C632Oku.png"
                alt=""
              />
              <p className="role-text">
                Podrás encontrar ofertas de trabajo perfectas, ya sean de tiempo
                completo, medio o freelancing.
              </p>
            </div>
            <div className="role-inner">
              <p className="role-title">Ofertante</p>

              <img
                className="role-img"
                src="https://i.imgur.com/nrXLDj0.png"
                alt=""
              />
              <p className="role-text">
                Si buscas una persona que te cubra un puesto de empleo o
                necesidad, esta es tu categoría.{" "}
              </p>
            </div>
          </div>
          <select className="form__select" name="userType" ref={register}>
            <option value="applicant">Aplicante</option>
            <option value="offerer">Ofertante</option>
          </select>
          <input
            className="custom-button bg-green"
            type="submit"
            value="Regístrate"
          />
        </form>
      </div>
    </div>
  );
};

export default RegisterPageC1;
