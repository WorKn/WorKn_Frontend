import React, { useState, useEffect } from "react";
import { getUserById } from "../../utils/apiRequests";
import { getCategoryById } from "../../utils/apiRequests";
import { useHistory } from "react-router-dom";
import Header from "../../components/navbar-components/Navbar.jsx";
import Tag from "../../components/tag-components/Tag";
import categoryContext from "../../utils/categoryContext";
import tagsContext from "../../utils/tagsContext";
import { getMyOffers } from "../../utils/apiRequests";
import CustomOfferStrip from "../../components/offer-components/CustomOfferStrip";

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
  const [isOfferer, setIsOfferer] = useState(false);
  const [category, setCategory] = useState();
  const [myoffers, setMyOffers] = useState([]);
  const [organizationInfo, setMyOrganization] = useState();

  const [selectedCategory, setSelectedCategory] = useState({ label: "health" });
  const [selectedTags, setSelectedTags] = useState([]);

  let MyDictionary = {};
  MyDictionary["offerer"] = "Ofertante";
  MyDictionary["applicant"] = "Aplicante";

  let history = useHistory();

  const activeOffers = myoffers.map((offer) =>
    offer && offer.state !== "deleted" ? (
      <CustomOfferStrip
        key={offer._id}
        organizationInformation={organizationInfo}
        offerInfo={offer}
        isCalledFromProfilePage={true}
      ></CustomOfferStrip>
    ) : null
  );

  const inactiveOffers = myoffers.map((offer) =>
    offer && offer.state === "deleted" ? (
      <CustomOfferStrip
        key={offer._id}
        organizationInformation={organizationInfo}
        offerInfo={offer}
        isInactive={true}
        isCalledFromProfilePage={true}
      ></CustomOfferStrip>
    ) : null
  );

  useEffect(() => {
    getUserById(id).then((res) => {
      console.log(res);
      if (res.status === "success") {
        setUserInfo(res.data.data);
        setRetrieved(true);

        if (res.data.data.userType === "offerer") {
          setIsOfferer(true);

          getMyOffers().then((res) => {
            setMyOffers(res.data.data.offers);
          });

          setMyOrganization({
            profilePicture: res.data.data.profilePicture,
          });
        } else {
          getCategoryById(res.data.data.category).then((resp) => {
            console.log(resp);
            setCategory(resp.data.data[0].name);
          });
        }
      } else {
        history.push("/404");
        setRetrieved(false);
      }
    });
  }, []);

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
                    src={userInfo?.profilePicture}
                    // src="https://www.biography.com/.image/c_fill%2Ccs_srgb%2Cfl_progressive%2Ch_400%2Cq_auto:good%2Cw_620/MTY2MzU3Nzk2OTM2MjMwNTkx/elon_musk_royal_society.jpg"
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

                  <p className="pppinfo-container__bio">{userInfo?.bio}</p>
                </div>
                {isOfferer ? null : (
                  <div className="pppmultimedia-container">
                    <h3 className="ppptitle pppmultimedia-title">{category}</h3>
                    <div className="ppptags-container">
                      {userInfo.tags &&
                        userInfo?.tags.map((tag) => (
                          <Tag
                            key={tag.id}
                            text={tag.name}
                            theme="tag tag__text tag__text--gray"
                          ></Tag>
                        ))}
                    </div>
                  </div>
                )}

                <div className="pppadditionalinfo-container__body">
                  <h3 className="ppptitle">Miembro desde:</h3>
                  <ul>
                    <li>{userInfo?.createdAt.substring(0, 10)}</li>
                  </ul>
                </div>
              </div>

              {isOfferer ? (
                <div className="pppoffers-container">
                  <h1 className="pppoffers-active">Ofertas activas</h1>
                  <div className="manageoffers__inner">{activeOffers}</div>
                  <h1 className="pppoffers-active">Ofertas Inactivas</h1>
                  <div className="manageoffers__inner">
                    {inactiveOffers
                      ? inactiveOffers
                      : "Usted no ha borrado ninguna oferta aún"}
                  </div>
                </div>
              ) : null}
            </div>
          ) : (
            <h1>
              Lo sentimos, existe un error al cargar los datos de este perfil
            </h1>
          )}
        </div>
      </tagsContext.Provider>
    </categoryContext.Provider>
  );
};

export default ParticularUserProfilePage;
