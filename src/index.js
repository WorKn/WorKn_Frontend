import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "font-awesome/css/font-awesome.min.css";
import { BrowserRouter } from "react-router-dom";
import { StateMachineProvider, createStore } from "little-state-machine";
import { DevTool } from "little-state-machine-devtools";

createStore({
  userInformation: {
    name: "",
    lastname: "",
    bio: "",
    identificationNumber: "",
    location: "",
    phone: "",
    email: "",
    birthday: "",
    password: "",
    passwordConfirm: "",
    userType: "",
    category: "",
    tags: "",
    organization: "",
    organizationRole: "",
    organizationObject: "",
  },
});

ReactDOM.render(
  <React.StrictMode>
    <StateMachineProvider>
      <DevTool />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StateMachineProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
