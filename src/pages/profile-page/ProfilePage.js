import React from "react";
import Auth from "../../utils/authHelper";
import authHelper from "../../utils/authHelper";
const logout = Auth.logout;

const ProfilePage = (props) => {
  return (
    <div>
      <h1>klk</h1>
      <button
        onClick={() => {
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
