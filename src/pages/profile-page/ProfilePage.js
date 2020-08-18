import React from "react";
import Auth from "../../utils/authHelper";
import auth from "../../utils/authHelper";
import Cookies from "js-cookie";

const ProfilePage = (props) => {
  return (
    <div>
      <h1>klk</h1>
      <button
        onClick={() => {
          Cookies.remove("jwt");
          Auth.logout(() => {
            props.history.push("/");
          });
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;
