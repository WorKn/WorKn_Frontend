import React, { useState, useEffect, useMemo } from "react";
import { getOrgById, getAllOffers } from "../../utils/apiRequests";
import { useHistory } from "react-router-dom";
import Header from "../../components/navbar-components/Navbar";
import Banner from "../../components/banner-components/Banner";
import Footer from "../../components/footer-components/Footer";
import OfferMini from "../../components/offer-components/OfferMini";
import "./EmpresaViewPage-Style.css";

const EmpresaViewPage = ({
  match: {
    params: { id },
  },
}) => {
  //user ID para pruebas: 5f4d9b2665327c4bc17f3017
  const [orgOffer, setOrgOffer] = useState([]);
  const [orgInfo, setOrgInfo] = useState();

  let history = useHistory();

  const orgMyOffers = useMemo(
    () =>
      orgOffer.map((offer) =>
        offer &&
        offer.organization?._id === orgInfo._id &&
        offer.state !== "deleted" ? (
          <OfferMini
            key={offer._id}
            organizationInformation={orgInfo}
            offerInfo={offer}
          ></OfferMini>
        ) : null
      ),
    [orgOffer, orgInfo]
  );

  useEffect(() => {
    getOrgById(id).then((res) => {
      if (res.status === "success") {
        setOrgInfo(res.data.data);
      } else {
        history.push("/404");
      }
    });

    getAllOffers().then((res) => {
      if (!res.data) {
        history.push("/404");
      } else {
        const offers = res.data.data.data;
        if (offers && Array.isArray(offers)) {
          setOrgOffer(offers);
          console.log(offers);
        }
      }
    });
  }, [id, history]);
  //kiwVnMm.png
  return (
    <div className="pagewrap">
      <Header />
      <Banner image={"VfeSojP.png"}></Banner>
      <div className="EmpresaView">
        <div className="EmpresaView__up">
          <div className="EmpresaView__pp">
            <img
              className="EmpresaView__image"
              src={orgInfo?.profilePicture}
              alt=""
            />
          </div>
          <div className="EmpresaView__bio">
            <div className="EmpresaView__bioleft">
              <h2>Biografía</h2>
              <span>{`${orgInfo?.name}`}</span>
              <p>{orgInfo?.bio}</p>
            </div>
          </div>
          <div className="EmpresaView__contact">
            <h2>Contacto</h2>
            <span>Email:</span>
            <a href={`mailto:${orgInfo?.email}`}>{`${orgInfo?.email}`}</a>
            <span>Telefono:</span>
            <p>{`${orgInfo?.phone}`}</p>
          </div>
          <div className="EmpresaView__metrics">
            <h2>Información</h2>
            <span>Al servicio desde</span>
            <p>10/02/2020</p>
            <span>Rating </span>
            <p>4.75/5</p>
          </div>
        </div>
        <div className="EmpresaView__down">
          <h2>Ofertas</h2>
          <div className="EmpresaView__offers">{orgMyOffers}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EmpresaViewPage;
