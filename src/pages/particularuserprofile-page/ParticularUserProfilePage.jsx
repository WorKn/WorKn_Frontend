import React, { useState, useEffect } from "react";
import { getUserById } from "../../utils/apiRequests";
import { useHistory } from "react-router-dom";
import Header from "../../components/navbar-components/Navbar.jsx";

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
  }, [id, history]);

  return (
    <div>
      {retrieved ? (
        <div className="particularprofilepage-container">
          <Header></Header>
          <div className="particularprofilepage-banner">
            <h1 className="particularprofilepage-banner__title">
              {/* Bienvenido al perfil de {`${userInfo?.name} ${userInfo?.lastname}`} */}
            </h1>
          </div>
          <h1>
            Bienvenido a la profile page de:{" "}
            {`${userInfo?.name} ${userInfo?.lastname}`}
          </h1>
          <div className="particularprofilepage-body">
            <div className="ppp-imagecontainer">
              <img
                // src={userInfo?.profilePicture}
                src="https://www.biography.com/.image/c_fill%2Ccs_srgb%2Cfl_progressive%2Ch_400%2Cq_auto:good%2Cw_620/MTY2MzU3Nzk2OTM2MjMwNTkx/elon_musk_royal_society.jpg"
                alt=""
                className="particularprofilepage__img"
              />
            </div>
            <div className="pppinfocontainer__container">
              <p className="pppinfocontainer__name">
                {" "}
                {`${userInfo?.name} ${userInfo?.lastname}`}
              </p>
              <span className="pppinfocontainer__usertype">
                {userInfo?.userType}
              </span>
              <span className="pppinfocontainer__bio">{userInfo?.bio}</span>
            </div>
          </div>
        </div>
      ) : (
        <h1>klk</h1>
      )}
    </div>
  );
};

export default ParticularUserProfilePage;
