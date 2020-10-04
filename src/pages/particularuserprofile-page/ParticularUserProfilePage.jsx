import React, { useState, useEffect } from "react";
import { getUserById } from "../../utils/apiRequests";
import { useHistory } from "react-router-dom";
import Header from "../../components/navbar-components/Navbar.jsx";
import Tag from "../../components/tag-components/Tag";
import categoryContext from "../../utils/categoryContext";
import CategoryInput from "../../components/input-components/CategoryInput";
import tagsContext from "../../utils/tagsContext";
import TagsInput from "../../components/input-components/TagsInput";

import "./ParticularUserProfilePage-Style.css";

const ParticularUserProfilePage = ({
  match: {
    params: { id },
  },
}) => {
  //user ID para pruebas: 5f4d750f7633ba631b89f97c
  //user ID de jeremy aplicante: 5f4d74307633ba631b89f97b
  const [userInfo, setUserInfo] = useState();
  const [retrieved, setRetrieved] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({ label: "health" });
  const [selectedTags, setSelectedTags] = useState([]);

  let MyDictionary = {};
  MyDictionary["offerer"] = "Ofertante";
  MyDictionary["applicant"] = "Aplicante";

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
    <categoryContext.Provider value={{ selectedCategory, setSelectedCategory }}>
      <tagsContext.Provider value={{ selectedTags, setSelectedTags }}>
        <div>
          {retrieved ? (
            <div className="particularprofilepage-container">
              <Header></Header>
              <div className="particularprofilepage-banner">
                <h1 className="particularprofilepage-banner__title">
                  {/* Bienvenido al perfil de {`${userInfo?.name} ${userInfo?.lastname}`} */}
                </h1>
              </div>

              <div className="particularprofilepage-body">
                <div className="ppp-imagecontainer">
                  <img
                    // src={userInfo?.profilePicture}
                    src="https://www.biography.com/.image/c_fill%2Ccs_srgb%2Cfl_progressive%2Ch_400%2Cq_auto:good%2Cw_620/MTY2MzU3Nzk2OTM2MjMwNTkx/elon_musk_royal_society.jpg"
                    alt=""
                    className="particularprofilepage__img"
                  />
                </div>
                <div className="pppinfo-container__body">
                  <h3 className="pppinfo-container__name ppptitle">
                    {`${userInfo?.name} ${userInfo?.lastname}`}
                  </h3>
                  <ul className="pppinfo-container__usertype">
                    <li>{MyDictionary[userInfo?.userType]}</li>
                  </ul>
                  {/* <p className="pppinfo-container__usertype">
                    {MyDictionary[userInfo?.userType]}
                  </p> */}
                  <p className="pppinfo-container__bio">{userInfo?.bio}</p>
                </div>
                <div className="pppmultimedia-container">
                  <h3 className="ppptitle pppmultimedia-title">Multimedia</h3>
                  <div className="ppptags-container">
                    {userInfo?.tags.map((tag) => (
                      <Tag
                        key={tag.id}
                        text={tag.name}
                        theme="tag tag__text tag__text--gray"
                      ></Tag>
                    ))}
                  </div>
                </div>

                <div className="pppadditionalinfo-container__body">
                  <h3 className="ppptitle">Miembro desde:</h3>
                  <ul>
                    <li>{userInfo?.createdAt.substring(0, 10)}</li>
                  </ul>
                  {/* <p>{userInfo?.createdAt.substring(0, 10)}</p> */}
                </div>
              </div>
            </div>
          ) : (
            <h1>klk</h1>
          )}
        </div>
      </tagsContext.Provider>
    </categoryContext.Provider>
  );
};

export default ParticularUserProfilePage;
