import React, { useState, useEffect } from "react";
import { getUserById } from "../../utils/apiRequests";
import { getCategoryById } from "../../utils/apiRequests";
import { getOffersByUserId } from "../../utils/apiRequests";
import { useHistory } from "react-router-dom";
import Header from "../../components/navbar-components/Navbar.jsx";
import Banner from "../../components/banner-components/Banner";
import Footer from "../../components/footer-components/Footer";
import Tag from "../../components/tag-components/Tag";
import categoryContext from "../../utils/categoryContext";
import tagsContext from "../../utils/tagsContext";
// import { getMyOffers } from "../../utils/apiRequests";
// import CustomOfferStrip from "../../components/offer-components/CustomOfferStrip";
import OfferMini from "../../components/offer-components/OfferMini";
import "./ParticularUserProfilePage-Style.css";

const ParticularUserProfilePage = ({
  match: {
    params: { id },
  },
}) => {
  //user ID para pruebas: 5f4d750f7633ba631b89f97c
  //user ID de jeremy aplicante: 5f4d74307633ba631b89f97b
  //user ID Albert ofertante: 5f70dc57f0880f2d975bd1ff
  const [userInfo, setUserInfo] = useState();
  const [retrieved, setRetrieved] = useState(false);
  const [isOfferer, setIsOfferer] = useState(false);
  const [category, setCategory] = useState();
  const [myoffers, setMyOffers] = useState([]);
  const [profilePicture, setMyProfilePicture] = useState();

  const [selectedCategory, setSelectedCategory] = useState({ label: "health" });
  const [selectedTags, setSelectedTags] = useState([]);

  let MyDictionary = {};
  MyDictionary["offerer"] = "Ofertante";
  MyDictionary["applicant"] = "Aplicante";

  let history = useHistory();

  const activeOffers = myoffers.map((offer) =>
    offer && offer.state !== "deleted" ? (
      <OfferMini
        key={offer._id}
        organizationInformation={profilePicture}
        offerInfo={offer}
      ></OfferMini>
    ) : null
  );

  useEffect(() => {
    getUserById(id).then((res) => {
      console.log(res);
      if (res.status === "success") {
        setUserInfo(res.data.data);
        setRetrieved(true);

        //es una organizacion
        if (
          res.data.data.userType === "offerer" &&
          res.data.data.organization
        ) {
          history.push("/404");
          setRetrieved(false);

          //es un ofertante
        } else if (
          res.data.data.userType === "offerer" &&
          !res.data.data.organization
        ) {
          setIsOfferer(true);
          getOffersByUserId(id).then((res) => {
            console.log("these are my offers:");
            console.log(res);
            setMyOffers(res.data?.data?.data);
          });

          setMyProfilePicture({
            profilePicture: res.data?.data?.profilePicture,
          });
        }
        //es un aplicante
        else {
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
              <div className="particularprofilepage-banner"></div>

              <div className="ppp-up">
                <div className="ppp-imagecontainer">
                  <img
                    src={userInfo?.profilePicture}
                    alt=""
                    className="particularprofilepage__img"
                  />
                </div>

                <div className="pppinfo-container__body">
                  <h2>Biografía</h2>
                  <span className="pppinfo-container__name">
                    {`${userInfo?.name} ${userInfo?.lastname}`}
                  </span>
                  <ul className="pppinfo-container__usertype">
                    <li>{MyDictionary[userInfo?.userType]}</li>
                  </ul>
                  <p className="pppinfo-container__bio">{userInfo?.bio}</p>
                </div>

                <div className="pppcontact-container">
                  <h2 className="pppcontact-title">Contacto</h2>
                  <span>Email</span>
                  <a
                    href={`mailto:${userInfo?.email}`}
                  >{`${userInfo?.email}`}</a>
                </div>

                {isOfferer ? null : (
                  <div className="pppmultimedia-container">
                    <h2 className="pppmultimedia-title">{category}</h2>
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
                  <h2>Miembro desde</h2>
                  <ul>
                    <li>{userInfo?.createdAt.substring(0, 10)}</li>
                  </ul>
                  <span>Rating</span>
                  <p>4.75/5</p>
                </div>
              </div>

              {isOfferer ? (
                <div className="ppp-down">
                  <h2>Ofertas</h2>
                  <div className="ppp-offers">{activeOffers}</div>
                </div>
              ) : null}
            </div>
          ) : (
            <h1>
              Lo sentimos, existe un error al cargar los datos de este perfil
            </h1>
          )}
          <Footer></Footer>
        </div>
      </tagsContext.Provider>
    </categoryContext.Provider>
  );
};

export default ParticularUserProfilePage;
