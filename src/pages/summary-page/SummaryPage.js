import React, { useEffect, useState } from "react";
import { useStateMachine } from "little-state-machine";
import updateAction from "../../updateAction";
import Banner from "../../components/banner-components/Banner";
import Header from "../../components/navbar-components/Navbar";
import Footer from "../../components/footer-components/Footer";
import EmailNotValidated from "../../components/emailnotvalidated-components/EmailNotValidated";
import "./SummaryPage-Style.css";
import OfferStrip from "../../components/offer-components/OfferStrip";
import { getMyInteractions, getMyOffers } from "../../utils/apiRequests";
import { useForm } from "react-hook-form";
import { store } from "react-notifications-component";


const SummaryPage = () => {
  const [offers, setOffers] = useState();
  const [applied, setApplied] = useState();
  const [interested, setInterested] = useState();
  const [success, setSuccess] = useState(true);
  const [match, setMatches] = useState();
  const { state, action } = useStateMachine(updateAction);
  const { register, handleSubmit } = useForm({});
  const [selectedOffer, setSelectedOffer] = useState();

  const onSubmit = (data) => {
    setSelectedOffer(data.offer);
  };

  useEffect(() => {
    getMyOffers().then((res) => {
      if (res !== undefined) {
        console.log(res);
        setOffers(res);
      }
    });
  }, []);

  useEffect(() => {
    if (state.userInformation.updateFlag && state.userInformation.updateFlag === true) {
      setTimeout(() => {  
        store.addNotification({
          title: "Acción realizada",
          message: "En caso de haber aceptado, el usuario será notificado de tu demostración de interés, puedes comunicarte a través de los Matches.",
          type: "success",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 10000,
            onScreen: true,
          },
        });
        action({updateFlag: false});
      }, 2000);

    }
  }, [action, state.userInformation.updateFlag ]);

  useEffect(() => {
    if (!state.userInformation.isEmailValidated) {
      setSuccess(false);
    } else {
      if (
        state.userInformation.userType !== "undefined" &&
        state.userInformation.userType === "applicant"
      ) {
        getMyInteractions().then((res) => {
          setApplied(res.data.data.interactions.applied);
          const filteredInterested = res.data.data.interactions.interested.filter(
            (interaction) => !interaction.rejected
          );
          setInterested(filteredInterested);
          setMatches(res.data.data.interactions.match);
          console.log(res);
        });
      }
    }
  }, [state.userInformation.userType, state.userInformation.isEmailValidated, state.userInformation.updateFlag]);

  useEffect(() => {
    if (!state.userInformation.isEmailValidated) {
      setSuccess(false);
    } else {
      if (
        state.userInformation.userType !== "undefined" &&
        state.userInformation.userType === "offerer" &&
        selectedOffer
      ) {
        getMyInteractions(selectedOffer).then((res) => {
          if (res !== undefined) {
            console.log(res);
            setApplied(res?.data?.data?.interactions?.applied);
            setInterested(res?.data?.data?.interactions?.interested);
            setMatches(res?.data?.data?.interactions?.match);
          }

        });
      }
    }
  }, [
    selectedOffer,
    state.userInformation.userType,
    state.userInformation.isEmailValidated,
    state.userInformation.updateFlag
  ]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return success ? (
    <div className="summarypage">
      <Header />
      <Banner image={"qSOKi8h.png"} />
      {typeof state.userInformation.userType !== "undefined" &&
      state.userInformation.userType === "applicant" ? (
        <div className="summarypage__inner">
          <span className="summarypage__title">Interesados en ti</span>
          {typeof interested &&  (interested?.length < 1 || interested === undefined) ? (
             <div className="summary__announcement">
            <div className="summarypage__imgbg">
              <img src="https://i.imgur.com/VhPGUOU.png" alt="applied" className="summarypage_appliedimg"></img>
            </div>
              <div className="summary__announcementinner">
                <span className="summarypagea__title--dark">Ninguna organización ha demostrado interés por ti aún.</span>
                <span>Asegurate de crear un perfil llamativo que atrape a los usuarios que se encuentren contigo en la plataforma.</span>
              </div>
             </div>
            ) : (
              ""
            )}
          {interested?.map((i) => (
            <OfferStrip
              key={i._id}
              responseInfo={i}
              interactionId={i._id}
              isInteraction="true"
            ></OfferStrip>
          ))}
          <span className="summarypage__title">
            Demostraste interés por estas ofertas
          </span>
          {typeof applied &&  (applied?.length < 1 || applied === undefined) ? (
            <div className="summary__announcement">
            <div className="summarypage__imgbg">
              <img src="https://i.imgur.com/CAtVIjs.png" alt="applied" className="summarypage_appliedimg"></img>
            </div>
              <div className="summary__announcementinner">
                <span className="summarypagea__title--dark">No has demostrado interés por ninguna oferta.</span>
                <span>Accede a nuestra página de Recomendaciones o de Exploración para encontrar ofertas perfectas para ti.</span>
              </div>
             </div>
            ) : (
              ""
            )}
          {applied?.map((a) => (
            <OfferStrip
              key={a._id}
              responseInfo={a}
              interactionId={a._id}
              isInterested="true"
            ></OfferStrip>
          ))}
          <span className="summarypage__title">Matches</span>
          {typeof match &&  (match?.length < 1 || match === undefined) ? (
            <div className="summary__announcement">
              <div className="summarypage__imgbg">
              <img src="https://i.imgur.com/BztLr0l.png" alt="applied" className="summarypage_appliedimg"></img>
              </div>
              <div className="summary__announcementinner">
                <span className="summarypagea__title--dark">Todavía no tienes ningún Match.</span>
                <span>Recuerda que para que exista un Match, deben haber demostraciones de interés mutuas entre un ofertante y tu.</span>
              </div>
             </div>
            ) : (
              ""
            )}
          {match?.map((m) => (
            <OfferStrip
              key={m._id}
              interactionId={m._id}
              responseInfo={m}
              isMatch="true"
            ></OfferStrip>
          ))}
        </div>
      ) : (
        <div className="summarypage__inner">
          <div className="summarypage__inner">
            <div className="summarypage__header">
              <span className="summarypage__title--dark">
                Selecciona la oferta que quieres revisar
              </span>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="summarypage__form"
              >
                <select className="form__select" name="offer" ref={register}>
                  {offers?.data?.data?.offers.map((offer) => (
                    <option key={offer._id} value={offer._id}>
                      {offer.title}
                    </option>
                  ))}
                </select>
                <input
                  className="custom-button bg-green"
                  type="submit"
                  value="Ir"
                />
              </form>
            </div>

            <span className="summarypage__title">
              Estas personas están interesadas
            </span>
            {typeof applied &&  (applied?.length < 1 || applied === undefined) ? (
             <div className="summary__announcement">
            <div className="summarypage__imgbg">
              <img src="https://i.imgur.com/VhPGUOU.png" alt="applied" className="summarypage_appliedimg"></img>
            </div>
              <div className="summary__announcementinner">
                <span className="summarypagea__title--dark">Ningún usuario ha demostrado interés por esta oferta aún.</span>
                <span>Asegurate de crear una oferta llamativa que atrape a los usuarios que se encuentren con ella en la plataforma.</span>
              </div>
             </div>
            ) : (
              ""
            )}
            {applied?.map((a) => (
              <OfferStrip
                key={a._id}
                responseInfo={a}
                interactionId={a._id}
                isInteraction="true"
              ></OfferStrip>
            ))}
            <span className="summarypage__title">
              Demostraste interés por estas personas
            </span>
            {typeof interested &&  (interested?.length < 1 || interested === undefined) ? (
            <div className="summary__announcement">
            <div className="summarypage__imgbg">
              <img src="https://i.imgur.com/CAtVIjs.png" alt="applied" className="summarypage_appliedimg"></img>
            </div>
              <div className="summary__announcementinner">
                <span className="summarypagea__title--dark">No has demostrado interés por nadie en esta oferta.</span>
                <span>Accede a nuestra página de Recomendaciones o de Exploración para encontrar aplicantes perfectos para ti.</span>
              </div>
             </div>
            ) : (
              ""
            )}
            {interested?.map((i) => (
              <OfferStrip
                key={i._id}
                responseInfo={i}
                interactionId={i._id}
                isInterested="true"
              ></OfferStrip>
            ))}

            <span className="summarypage__title">Matches</span>
            {typeof match &&  (match?.length < 1 || match === undefined) ? (
            <div className="summary__announcement">
              <div className="summarypage__imgbg">
              <img src="https://i.imgur.com/BztLr0l.png" alt="applied" className="summarypage_appliedimg"></img>
              </div>
              <div className="summary__announcementinner">
                <span className="summarypagea__title--dark">Todavía no tienes ningún Match.</span>
                <span>Recuerda que para que exista un Match, deben haber demostraciones de interés mutuas entre un aplicante y tu.</span>
              </div>
             </div>
            ) : (
              ""
            )}
            {match?.map((m) => (
              <OfferStrip
                key={m._id}
                interactionId={m._id}
                responseInfo={m}
                isMatch="true"
              ></OfferStrip>
            ))}
          </div>{" "}
        </div>
      )}
      <Footer />
    </div>
  ) : (
    <EmailNotValidated />
  );
};

export default SummaryPage;
