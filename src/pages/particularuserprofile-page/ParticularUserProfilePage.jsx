import React, { useState, useEffect } from "react";
import { getUserById } from "../../utils/apiRequests";
import { useHistory } from "react-router-dom";

import "./ParticularUserProfilePage-Style.css";

const ParticularUserProfilePage = ({
  match: {
    params: { id },
  },
}) => {
  //user ID para pruebas: 5f4d750f7633ba631b89f97c
  const [userInfo, setUserInfo] = useState();
  const [retrieved, setRetrieved] = useState(false);

  let history = useHistory();
  useEffect(() => {
    getUserById(id).then((res) => {
      console.log(res);
      if (res.status === "success") {
        setUserInfo(res.data.data);
        setRetrieved(true);
      } else {
        history.push("/404");
        setRetrieved(false);
      }
    });
  }, [id]);

  return setRetrieved ? (
    <div className="particularprofilepage-container">
      <h1>
        Bienvenido a la profile page de:{" "}
        {`${userInfo?.name} ${userInfo?.lastname}`}
      </h1>
      <h1>{userInfo?.bio}</h1>
      <img src={userInfo?.profilePicture} alt="" />
    </div>
  ) : (
    <h1></h1>
  );
};

export default ParticularUserProfilePage;
