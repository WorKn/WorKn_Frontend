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
// import { ProtectedRoute } from "./components/route-components/ProtectedRoute";
import ManagePopup from "./components/popup-components/ManagePopup";
import ForgotPasswordPage from "./pages/forgotpassword-page/ForgotPasswordPage.jsx";
import NewPasswordPage from "./pages/newpassword-page/NewPasswordPage.jsx";
import EmailValidation from "./pages/emailvalidation-page/EmailValidation";
import AddMember from "./pages/addmember-page/AddMemberPage";
import SummaryPage from "./pages/summary-page/SummaryPage";
import NotFound from "./pages/not_found-page/not_found";
import ExplorePage from "./pages/explore-page/ExplorePage";
import EmpresaViewPage from "./pages/viewside-page/EmpresaViewPage";
import RecommendationsPage from "./pages/recommendations-page/RecommendationsPage";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";


// import ChatPage from "./pages/chat-page/ChatPage";
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
      <ReactNotification />
      {transitions.map(({ item, props, key }) => (
        <animated.div key={key} style={props}>
          <Switch location={item}>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/landing" component={LandingPage} />
            <Redirect exact from="/" to="/landing" />
            <Route exact path="/register" component={RegisterPage} />
            <Route exact path="/registerc1" component={RegisterPageC1} />
            <Route exact path="/registerc2" component={RegisterPageC2} />
            <Route exact path="/login" component={LoginPage} />
            <Route
              exact
              path="/forgotPassword"
              component={ForgotPasswordPage}
            ></Route>
            <Route
              exact
              path="/resetPassword/:token"
              component={NewPasswordPage}
            ></Route>
            <Route
              exact
              path="/landingpage/question"
              component={QuestionPopup}
            />
            <Route
              exact
              path="/userprofile"
              component={UserProfilePage}
            />
            <Route
              exact
              path="/organizationprofile"
              component={EmpresaProfilePage}
            />
            <Route
              exact
              path="/recommendations"
              component={RecommendationsPage}
            />
            <Route
              exact
              path="/emailvalidation/:token"
              component={EmailValidation}
            />

            <Route
              exact
              path="/addMember/:orgid/:token"
              component={AddMember}
            />
            <Route
              exact
              path="/organizations/:id"
              component={EmpresaViewPage}
            />
            <Route exact path="/manageoffers" component={ManageOffersPage} />
            <Route exact path="/addMember/:token" component={AddMember} />
            <Route exact path="/summary" component={SummaryPage} />
            <Route exact path="/explore" component={ExplorePage} />
            <Route exact path="/managemembers" component={ManagePopup} />
            {/* <Route exact path="/chat" component={ChatPage} /> */}
            <Route path="*" component={NotFound} />
          </Switch>
        </animated.div>
      ))}
    </div>
  );
}

export default App;
