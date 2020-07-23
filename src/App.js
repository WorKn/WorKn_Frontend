import React from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
  axios
    .get("http://ec2-3-133-94-54.us-east-2.compute.amazonaws.com:3000/")
    .then(function (response) {
      // handle success
      console.log(response);
    });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello WorKn.</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
