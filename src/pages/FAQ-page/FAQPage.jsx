import React, { useState } from "react";
import Footer from "../../components/footer-components/Footer.jsx";
import Header from "../../components/navbar-components/Navbar.jsx";
import Banner from "../../components/banner-components/Banner.jsx";
import "../termsofservice/TermsOfService-Style.css";
import "../../App.css";

const SECTIONS = [
  "¿Qué es WorKn?",
  "¿En qué se diferencia una organización de un ofertante independiente?",
  "¿Qué es un ofertante?",
  "¿Qué es un aplicante?",
  "¿Qué es un match?",
  "¿Cuál es el objetivo de WorKn?",
  "¿Qué es un tag y para qué sirven?",
  "¿Cómo puedo validar mi cuenta?",
  "¿Si rechazo una oferta/aplicación la otra persona será notificada?",
  "¿En qué se diferencia una oferta freelance de una fija/indefinida?",
];

const FAQPage = () => {
  const [active, setIsActive] = useState(0);

  return (
    <React.Fragment>
      <Header />
      <Banner image={"vs0tBUH.png"} />
      <div className="tos-wrapper">
        <div className="tos-container__left-items">
          <ol>
            {SECTIONS.map((sectionName, idx) => (
              <li
                key={sectionName}
                onClick={() => {
                  setIsActive(idx);
                }}
                className={
                  active === idx
                    ? "tos-container__li--green"
                    : "tos-container__li--black"
                }
              >
                <a href={`#section${idx}`}>{sectionName}</a>
              </li>
            ))}
          </ol>
        </div>
        <div className="tos-container__right-items">
          <h3 className="tos-container__title" id="section1">
            1. ¿Qué es WorKn?
          </h3>
          <p className="tos-container__section">
            WorKn es una plataforma para reclutamiento que permite que las
            personas puedan aplicar y crear puestos de empleos fijos,
            temporales, ofertas de pasantías o trabajos de tipo
            freelancing/independientes con contratos de una sola ocasión o
            informales no fijos, como eventos u otros. Ofreciendo facilidad de
            realizar sugerencias a los <span>ofertantes </span>(empleadores), de
            perfiles de personas aptas para la posición que busca; y, para los{" "}
            <span>aplicantes</span>, con ofertas de trabajo compatibles con sus
            competencias y habilidades.
          </p>

          <h3 className="tos-container__title" id="section2">
            2. ¿En qué se diferencia una organización de un ofertante
            independiente?
          </h3>
          <div className="tos-container__section">
            <p>
              Una <span>organización</span> consiste en un conjunto de usuarios
              quienes colaboran como grupo para manejar ofertas e interacciones
              entre aplicantes, mientras que un{" "}
              <span>ofertante independiente</span> consiste en un usuario quien
              por su cuenta y sin asociarse con otro usuario, desea publicar a
              ofertas e interactuar con usuarios.
            </p>
          </div>

          <h3 className="tos-container__title" id="section3">
            3. ¿Qué es un ofertante?
          </h3>
          <div className="tos-container__section">
            <p>
              Son personas que pueden utilizar la plataforma para publicar
              ofertas de trabajo y reclutar individuos en base a sus aptitudes y
              destrezas. Estos usuarios se dividen a su vez en
              empresas/organizaciones y personas (individuos).
            </p>
          </div>

          <h3 className="tos-container__title" id="section4">
            4. ¿Qué es un aplicante?
          </h3>
          <div className="tos-container__section">
            <p>
              Son personas que pueden utilizar la plataforma para aplicar a
              alguna oferta de trabajo en base a sus aptitudes y destrezas.
            </p>
          </div>

          <h3 className="tos-container__title" id="section5">
            5. ¿Qué es un match?
          </h3>
          <div className="tos-container__section">
            <p>
              Es una interacción existente entre dos usuarios donde ambos
              demuestran interés por el otro en términos de sus capacidades
              laborales ofrecidas y las condiciones de la oferta de trabajo
              publicada.
            </p>
          </div>

          <h3 className="tos-container__title" id="section6">
            6. ¿Cuál es el objetivo de WorKn?
          </h3>
          <div className="tos-container__section">
            <p>
              El objetivo de WorKn consiste en servir de enlace entre
              dominicanos y dominicanas quienes desean expandir sus horizontes
              mediante la aplicación a distintas ofertas laborales al igual que
              busca ampliar el alcance al que llegan los ofertantes de trabajo
              actualmente para ponerlos en contacto con personas asombrosas y
              capaces en menor tiempo y con mayor exactitud.
            </p>
          </div>

          <h3 className="tos-container__title" id="section7">
            7. ¿Qué es un tag y para qué sirven?
          </h3>
          <div className="tos-container__section">
            <p>
              Un tag consiste en una habilidad específica que se puede catalogar
              dentro de una “categoría” la cual indica la destreza de quien la
              posee en cierta materia. Por ejemplo, “Interpretación y Análisis
              de Datos” o “Comunicación Interpersonal”, entre otras.
            </p>
          </div>
          <h3 className="tos-container__title" id="section8">
            8. ¿Cómo puedo validar mi cuenta?
          </h3>
          <div className="tos-container__section">
            <p>
              Para validar tu cuenta, simplemente debes acceder a la bandeja de
              entrada de tu correo electrónico y abrir el correo que fue enviado
              a nombre de <span>“soporte.worknrd@gmail.com”</span> con el asunto
              de <span>“Validación de email”</span>. Luego, simplemente debes
              hacer clic al botón <span>“Confirmar email”</span>, y listo!
            </p>
          </div>
          <h3 className="tos-container__title" id="section9">
            9. ¿Si rechazo una oferta/aplicación la otra persona será
            notificada?
          </h3>
          <div className="tos-container__section">
            <p>
              No, eres libre de rechazar cualquier oferta sin que tu libertad de
              decisión se vea comprometida.
            </p>
          </div>
          <h3 className="tos-container__title" id="section10">
            10. ¿En qué se diferencia una oferta freelance de una
            fija/indefinida?
          </h3>
          <div className="tos-container__section">
            <p>
              Las ofertas <span>freelancer</span> consisten en ofertas de
              carácter temporal, es decir, se contrata a una persona para
              realizar un trabajo puntual, mientras que las{" "}
              <span>fija/indefinida</span> son para buscar una persona para un
              puesto fijo en el trabajo. Una persona contratada mediante una
              oferta <span>freelancer</span> puede recibir una reviews dentro de
              la página, mientras que una persona contratada mediante una oferta
              <span>fija/indefinida</span> no.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default FAQPage;
