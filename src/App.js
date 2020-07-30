import React from "react";
import "./App.css";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./pages/landing-page/LandingPage";

function App() {
  axios
    .get("http://ec2-3-133-94-54.us-east-2.compute.amazonaws.com:3000/")
    .then(function (response) {
      // handle success
      console.log(response);
    });

  console.log("Testing");
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={LandingPage}></Route>
          <Route path="/dummy" component={DummyPage}></Route>
        </Switch>
      </div>
    </Router>
  );
}

const DummyPage = () => (
  <div>
    <h1>DummyPage</h1>
  </div>
);

export default App;
