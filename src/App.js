import React from "react";
import "./App.css";
import axios from "axios";

function App() {
  axios
    .get("http://ec2-3-133-94-54.us-east-2.compute.amazonaws.com:3000/")
    .then(function (response) {
      // handle success
      console.log(response);
    });

  console.log("Testing");
  return (
    <div className="App">
      <h1>Test your components here</h1>
    </div>
  );
}

export default App;
