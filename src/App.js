import React, { useContext } from "react";
import "./App.css";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { __RouterContext } from "react-router";
import { useTransition, animated } from "react-spring";
import LandingPage from "./pages/landing-page/LandingPage";
import LoginPage from "./pages/login-page/LoginPage.js";
import RegisterPage from "./pages/register-page/RegisterPage";
import RegisterPageC1 from "./pages/register-page/RegisterPage-C1";
import RegisterPageC2 from "./pages/register-page/RegisterPage-C2";

import QuestionPopup from "./components/popup-components/QuestionPopup";

function App() {
  const { location } = useContext(__RouterContext);

  const transitions = useTransition(location, (location) => location.pathname, {
    from: { opacity: 0, transform: "translate(100%,0)" },
    enter: { opacity: 1, transform: "translate(0%,0)" },
    leave: { opacity: 0, transform: "translate(-50%,0)" },
  });

  axios
    .get("http://ec2-3-133-94-54.us-east-2.compute.amazonaws.com:3000/")
    .then(function (response) {
      // handle success
      console.log(response);
    });

  return (
    <div className="App">
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/LandingPage" component={LandingPage} />
      {transitions.map(({ item, props, key }) => (
        <animated.div key={key} style={props}>
          <Switch location={item}>
            <Route exact path="/registerpage" component={RegisterPage} />
            <Route exact path="/registerpagec1" component={RegisterPageC1} />
            <Route exact path="/registerpagec2" component={RegisterPageC2} />
            <Route exact path="/loginpage" component={LoginPage} />
            <Route
              exact
              path="/landingpage/question"
              component={QuestionPopup}
            />
          </Switch>
        </animated.div>
      ))}
    </div>
  );
}

export default App;
