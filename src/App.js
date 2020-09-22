import React, { useContext } from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import { __RouterContext } from "react-router";
import { useTransition, animated } from "react-spring";
import LandingPage from "./pages/landing-page/LandingPage";
import LoginPage from "./pages/login-page/LoginPage.js";
import RegisterPage from "./pages/register-page/RegisterPage";
import RegisterPageC1 from "./pages/register-page/RegisterPage-C1";
import RegisterPageC2 from "./pages/register-page/RegisterPage-C2";
import QuestionPopup from "./components/popup-components/QuestionPopup";
import UserProfilePage from "./pages/profile-page/UserProfilePage";
import EmpresaProfilePage from "./pages/profile-page/EmpresaProfilePage";
import ManageOffersPage from "./pages/manageoffers-page/ManageOffersPage";
import { ProtectedRoute } from "./components/route-components/ProtectedRoute";
import AddMember from "./pages/addmember-page/AddMemberPage";
import ManagePopup from "./components/popup-components/ManagePopup";
import ForgotPasswordPage from "./pages/forgotpassword-page/ForgotPasswordPage.jsx";
import NewPasswordPage from "./pages/newpassword-page/NewPasswordPage.jsx";
import EmailValidation from "./pages/emailvalidation-page/EmailValidation";
import { ProtectedRoute } from "./components/route-components/ProtectedRoute";
import AddMember from "./pages/addmember-page/AddMemberPage";
import ManagePopup from "./components/popup-components/ManagePopup";
import SummaryPage from "./pages/summary-page/SummaryPage";
import ExplorePage from "./pages/explore-page/ExplorePage";
require("dotenv").config({ path: "./.env" });

function App() {
  const { location } = useContext(__RouterContext);
  const transitions = useTransition(location, (location) => location.pathname, {
    from: { opacity: 0, transform: "translate(100%,0)" },
    enter: { opacity: 1, transform: "translate(0%,0)" },
    leave: { opacity: 0, transform: "translate(-50%,0)" },
  });

  return (
    <div className="App">
      {transitions.map(({ item, props, key }) => (
        <animated.div key={key} style={props}>
          <Switch location={item}>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/LandingPage" component={LandingPage} />
            <Redirect exact from="/" to="/LandingPage" />
            <Route exact path="/registerpage" component={RegisterPage} />
            <Route exact path="/registerpagec1" component={RegisterPageC1} />
            <Route exact path="/registerpagec2" component={RegisterPageC2} />
            <Route exact path="/loginpage" component={LoginPage} />
            <Route
              exact
              path="/landingpage/question"
              component={QuestionPopup}
            />
            <ProtectedRoute
              exact
              path="/userprofilepage"
              component={UserProfilePage}
            />
            <ProtectedRoute
              exact
              path="/empresaprofilepage"
              component={EmpresaProfilePage}
            />
            <Route
              exact
              path="/addMember/:orgid/:token"
              component={AddMember}
            />
            <Route exact path="/manageoffers" component={ManageOffersPage} />
            <Route exact path="/addMember/:token" component={AddMember} />
            <Route exact path="/resumen" component={SummaryPage} />
            <Route exact path="/explore" component={ExplorePage} />
            <Route exact path="/managemembers" component={ManagePopup} />
            <Route path="*" component={() => "404 NOT FOUND"} />
          </Switch>
        </animated.div>
      ))}
    </div>
  );
}

export default App;
