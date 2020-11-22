import React, { useState } from "react";
import "../../App.css";
import Header from "../../components/navbar-components/Navbar";
import Banner from "../../components/banner-components/Banner";
import Footer from "../../components/footer-components/Footer";
import "./TermsOfServicePage-Style.css";

const SECTIONS = [
  "Introduccion",
  "Terminos y Condiciones",
  "Cookies",
  "Licencia",
  "Hipervínculos a nuestro contenido",
  "iFrames",
  "Responsabilidad del contenido",
  "Reserva de derechos",
  "Eliminación de enlaces de nuestro sitio web",
  "Descargo de responsabilidad",
  "Política de datos",
];

const TermsOfServicePage = () => {
  const [active, setIsActive] = useState(0);

  const toggleActive = (idx) => {
    setIsActive(idx);
  };

  return (
    <React.Fragment>
      <Header />
      <Banner image={"VfeSojP.png"}></Banner>
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

            {/* <li>
              <a href="#section4">Licencia</a>
            </li>
            <li>
              <a href="#section5">Hipervínculos a nuestro contenido</a>
            </li>
            <li>
              <a href="#section6">iFrames</a>
            </li>
            <li>
              <a href="#section7">Responsabilidad del contenido</a>
            </li>
            <li>
              <a href="#section8">Reserva de derechos</a>
            </li>
            <li>
              <a href="#section9">
                Eliminación de enlaces de nuestro sitio web
              </a>
            </li>
            <li>
              <a href="#section10">Descargo de responsabilidad</a>
            </li>
            <li>
              <a href="#section11">Política de datos</a>
            </li> */}
          </ol>
        </div>
        <div className="tos-container__right-items">
          <h3 className="tos-container__title" id="section1">
            1. Introducción
          </h3>
          <p className="tos-container__section">
            El siguiente documento denominado Términos y Condiciones actúa como
            contrato entre nosotros <span>WorKn</span> y nuestros clientes (los
            usuarios). Este documento previene que los usuarios puedan abusar de
            nuestro servicio y por igual establece límites del uso de nuestra
            plataforma.
          </p>

          <h3 className="tos-container__title" id="section2">
            2. Términos y Condiciones
          </h3>
          <div className="tos-container__section">
            <p>
              ¡Bienvenido a <span>WorKn</span>!
            </p>
            <p>
              Estos términos y condiciones describen las reglas y regulaciones
              para el uso del sitio web de <span>WorKn</span>, ubicado en{" "}
              <span>http://workn.com.</span>
            </p>
            <p>
              {" "}
              Al acceder a este sitio web asumimos que acepta estos términos y
              condiciones. No continúe usando <span>WorKn</span> si no está de
              acuerdo con todos los términos y condiciones establecidos en esta
              página.
            </p>
            <p>
              La siguiente terminología se aplica a estos Términos y
              condiciones, declaración de privacidad y aviso de exención de
              responsabilidad y todos los acuerdos: "Cliente", "Usted" y "Su" se
              refieren a usted, la persona que inicia sesión en este sitio web y
              que cumple con los términos y condiciones de la Compañía. "La
              Compañía", "Nosotros", "Nosotros", "Nuestro" y "Nosotros" se
              refieren a nuestra organización <span>WorKn</span>. "Parte",
              "Partes" o "Nosotros", se refiere tanto al Cliente como a nosotros
              mismos. Todos los términos se refieren a la oferta, aceptación y
              consideración del pago necesario para llevar a cabo el proceso de
              nuestra asistencia al Cliente de la manera más apropiada con el
              propósito expreso de satisfacer las necesidades del Cliente con
              respecto a la prestación de los servicios declarados por la
              Compañía, de acuerdo con y sujeto a la legislación vigente de la
              <span> República Dominicana</span>. Cualquier uso de la
              terminología anterior u otras palabras en singular, plural,
              mayúsculas y / o él / ella o ellos, se toman como intercambiables
              y, por lo tanto, se refieren a los mismos.{" "}
            </p>

            <p>
              Nosotros no venderemos sus datos personales a terceros y no
              compartiremos su información salvo que nos otorgue el permiso para
              hacerlo. En este apartado se especificará de qué manera se usarán
              sus datos para el funcionamiento de <span>WorKn</span>.
            </p>
          </div>

          <h3 className="tos-container__title" id="section3">
            3. Cookies
          </h3>
          <div className="tos-container__section">
            <p>
              Empleamos el uso de <span>cookies</span>. Al acceder a{" "}
              <span>WorKn</span>, acordó utilizar cookies de acuerdo con la
              Política de privacidad de <span>WorKn</span>.
            </p>
            <p>
              La mayoría de los sitios web interactivos utilizan{" "}
              <span>cookies</span> para permitirnos recuperar los detalles del
              usuario para cada visita. Nuestro sitio web utiliza cookies para
              habilitar la funcionalidad de ciertas áreas para que sea más fácil
              para las personas que visitan nuestro sitio web. Algunos de
              nuestros socios publicitarios / afiliados también pueden utilizar
              cookies.
            </p>
          </div>

          <h3 className="tos-container__title" id="section4">
            4. Licencia
          </h3>
          <div className="tos-container__section">
            <p>
              A menos que se indique lo contrario, <span>WorKn</span> y / o sus
              licenciantes poseen los derechos de propiedad intelectual de todo
              el material de <span>WorKn</span>. Todos los derechos de propiedad
              intelectual están reservados. Puede acceder a esto desde{" "}
              <span>WorKn</span> para su uso personal sujeto a las restricciones
              establecidas en estos términos y condiciones.
            </p>
            <p>
              No debes:
              <ul>
                <li>
                  Republicar material de <span>WorKn</span>.
                </li>
                <li>
                  Vender, alquilar o sublicenciar material de <span>WorKn</span>
                  .
                </li>
                <li>
                  Reproducir, duplicar o copiar material de <span>WorKn</span>.
                </li>
                <li>
                  Redistribuir contenido de <span>WorKn</span>.
                </li>
              </ul>
            </p>
            <p>
              La vigencia de este acuerdo comenzará inmediatamente se acepte el
              mismo.
            </p>
            <p>
              Partes de este sitio web ofrecen a los usuarios la oportunidad de
              publicar e intercambiar opiniones e información en determinadas
              áreas del sitio web. <span>WorKn</span> no filtra, edita, publica
              ni revisa los Comentarios, Reviews u Ofertas antes de su presencia
              en el sitio web. Los comentarios no reflejan los puntos de vista y
              opiniones de <span>WorKn</span>, sus agentes y / o afiliados. Los
              Comentarios / Reviews / Ofertas reflejan los puntos de vista y
              opiniones de la persona que publica sus puntos de vista y
              opiniones. En la medida en que lo permitan las leyes aplicables,{" "}
              <span>WorKn</span> no será responsable de los Comentarios /
              Reviews / Ofertas ni de ninguna responsabilidad, daños o gastos
              causados ​​y / o sufridos como resultado de cualquier uso y / o
              publicación y / o aparición de los Comentarios / Reviews / Ofertas
              en este sitio web.
            </p>
            <p>
              <span>WorKn</span> se reserva el derecho de monitorear todos los
              Comentarios / Reviews / Ofertas y eliminar cualquier
              Comentario/Review/Oferta que pueda considerarse inapropiado,
              ofensivo o que cause el incumplimiento de estos Términos y
              Condiciones.
            </p>
            <p>Usted garantiza y manifiesta que:</p>
            <p>
              Tiene derecho a publicar los{" "}
              <span>Comentarios / Reviews / Ofertas</span> en nuestro sitio web
              y tiene todas las licencias y consentimientos necesarios para
              hacerlo; Los <span>Comentarios / Reviews / Ofertas</span> no
              invaden ningún derecho de propiedad intelectual, incluidos, entre
              otros, los derechos de autor, patentes o marcas comerciales de
              terceros; Los <span>Comentarios / Reviews / Ofertas</span> no
              contienen ningún material difamatorio, calumnioso, ofensivo,
              indecente o ilegal de cualquier otro modo que sea una invasión de
              la privacidad. Los
              <span>Comentarios / Reviews / Ofertas</span> no se utilizarán para
              solicitar o promover negocios o actividades comerciales
              personalizadas sin justificación o actividades ilegales. Por la
              presente, otorga a <span>WorKn</span> una licencia no exclusiva
              para usar, reproducir, editar y autorizar a otros a usar,
              reproducir y editar cualquiera de sus{" "}
              <span>Comentarios / Reviews / Ofertas</span> en todas y cada una
              de las formas, formatos o medios.
            </p>
          </div>

          <h3 className="tos-container__title" id="section5">
            5. Hipervínculos a nuestro contenido
          </h3>
          <div className="tos-container__section">
            <p>
              Las siguientes organizaciones pueden vincularse a nuestro sitio
              web sin aprobación previa por escrito:
            </p>
            <p>
              Agencias gubernamentales, los motores de búsqueda, organizaciones
              de noticias; los distribuidores de directorios en línea pueden
              vincularse a nuestro sitio web de la misma manera que hacen
              hipervínculos a los sitios web de otras empresas que figuran en la
              lista; y empresas acreditadas de todo el sistema, excepto las
              organizaciones sin fines de lucro, los centros comerciales de
              caridad y los grupos de recaudación de fondos de caridad que no
              pueden hacer hipervínculos a nuestro sitio web.
            </p>
            <p>
              Estas organizaciones pueden enlazar a nuestra página de inicio, a
              publicaciones u otra información del sitio web siempre que el
              enlace: (a) no sea engañoso de ninguna manera; (b) no implica
              falsamente patrocinio, respaldo o aprobación de la parte
              vinculante y sus productos y / o servicios; y (c) encaja en el
              contexto del sitio de la parte vinculante.
            </p>
            <p>
              Podemos considerar y aprobar otras solicitudes de enlace de los
              siguientes tipos de organizaciones:
              <ul>
                <li>
                  Fuentes de información de consumidores y / o empresas
                  comúnmente conocidas
                </li>
                <li>
                  Asociaciones u otros grupos que representan organizaciones
                  benéficas
                </li>
                <li>Distribuidores de directorios en línea</li>
                <li>Portales de internet</li>
                <li>Firmas de contabilidad, derecho y consultoría.</li>
              </ul>
            </p>
            <p>
              Aprobaremos las solicitudes de enlace de estas organizaciones si
              decidimos que: (a) el enlace no nos haría vernos desfavorablemente
              a nosotros mismos ni a nuestras empresas vinculadas; (b) la
              organización no tiene registros negativos con nosotros; (c) el
              beneficio para nosotros de la visibilidad del hipervínculo
              compensa la ausencia de <span>WorKn</span>; y (d) el enlace está
              en el contexto de información general de recursos.
            </p>
            <p>
              Estas organizaciones pueden enlazar a nuestra página de inicio
              siempre que el enlace: (a) no sea engañoso de ninguna manera; (b)
              no implica falsamente patrocinio, respaldo o aprobación de la
              parte vinculante y sus productos o servicios; y (c) encaja en el
              contexto del sitio de la parte vinculante.
            </p>
            <p>
              Si usted es una de las organizaciones enumeradas en el párrafo
              anterior y está interesado en vincularse a nuestro sitio web, debe
              informarnos enviando un correo electrónico a <span>WorKn</span>.
              Incluya su nombre, el nombre de su organización, la información de
              contacto, así como la URL de su sitio, una lista de las URL desde
              las que desea vincular a nuestro sitio web y una lista de las URL
              de nuestro sitio a las que le gustaría enlace. Y espere entre 2-4
              semanas para una respuesta.
            </p>
            <p>
              Las organizaciones aprobadas pueden hacer hipervínculos a nuestro
              sitio web de la siguiente manera:
              <ul>
                <li>Mediante el uso de nuestra razón social</li>
                <li>
                  Mediante el uso del localizador uniforme de recursos al que se
                  vincula
                </li>
                <li>
                  Mediante el uso de cualquier otra descripción de nuestro sitio
                  web al que esté vinculado que tenga sentido dentro del
                  contexto y formato del contenido en el sitio de la parte
                  vinculante.
                </li>
              </ul>
            </p>
          </div>

          <h3 className="tos-container__title" id="section6">
            6. iFrames
          </h3>
          <div className="tos-container__section">
            <p>
              Sin la aprobación previa y el permiso por escrito, no puede crear
              marcos alrededor de nuestras páginas web que alteren de alguna
              manera la presentación visual o la apariencia de nuestro sitio
              web.
            </p>
          </div>

          <h3 className="tos-container__title" id="section7">
            7. Responsabilidad del contenido
          </h3>
          <div className="tos-container__section">
            <p>
              No seremos responsables de ningún contenido que aparezca en su
              sitio web. Usted acepta protegernos y defendernos contra todos los
              reclamos que surjan en su sitio web. Ningún enlace (s) debe
              aparecer en ningún sitio web que pueda interpretarse como
              difamatorio, obsceno o criminal, o que infrinja, de otra manera
              viole o defienda la infracción u otra violación de derechos de
              terceros.
            </p>
          </div>
          <h3 className="tos-container__title" id="section8">
            8. Reserva de derechos
          </h3>
          <div className="tos-container__section">
            <p>
              Nos reservamos el derecho a solicitar que elimine todos los
              enlaces o cualquier enlace en particular a nuestro sitio web.
              Usted aprueba eliminar de inmediato todos los enlaces a nuestro
              sitio web cuando lo solicite. También nos reservamos el derecho de
              modificar estos términos y condiciones y su política de
              vinculación en cualquier momento. Al vincular continuamente a
              nuestro sitio web, usted acepta estar obligado y seguir estos
              términos y condiciones de vinculación.
            </p>
          </div>
          <h3 className="tos-container__title" id="section9">
            9. Eliminación de enlaces de nuestro sitio web
          </h3>
          <div className="tos-container__section">
            <p>
              Si encuentra algún enlace en nuestro sitio web que sea ofensivo
              por cualquier motivo, puede contactarnos e informarnos en
              cualquier momento. Consideraremos las solicitudes para eliminar
              enlaces, pero no estamos obligados a hacerlo ni a responderle
              directamente.
            </p>
            <p>
              No nos aseguramos de que la información pertinente a los enlaces
              disponibles en este sitio web sea correcta, no garantizamos su
              integridad o exactitud; tampoco nos comprometemos a garantizar que
              el sitio web permanezca disponible o que el material en el sitio
              web se mantenga actualizado.
            </p>
          </div>
          <h3 className="tos-container__title" id="section10">
            10. Descargo de responsabilidad
          </h3>
          <div className="tos-container__section">
            <p>
              En la medida máxima permitida por la ley aplicable, excluimos
              todas las representaciones, garantías y condiciones relacionadas
              con nuestro sitio web y el uso de este sitio web. Nada en este
              descargo de responsabilidad va a:
              <ul>
                <li>
                  Limitar o excluir nuestra responsabilidad o la suya por muerte
                  o lesiones personales
                </li>
                <li>
                  Limitar o excluir nuestra responsabilidad o la suya por fraude
                  o tergiversación fraudulenta
                </li>
                <li>
                  Limitar cualquiera de nuestras responsabilidades o las suyas
                  de cualquier manera que no esté permitida por la ley aplicable
                  y que no sea justificable.
                </li>
              </ul>
            </p>
            <p>
              Siempre que el sitio web y la información y los servicios en el
              sitio web se proporcionen de forma gratuita, no seremos
              responsables de ninguna pérdida o daño de cualquier naturaleza.
            </p>
          </div>
          <h3 className="tos-container__title" id="section11">
            11. Política de datos
          </h3>
          <div className="tos-container__section">
            <p>
              Para poder proveer el funcionamiento principal de{" "}
              <span>WorKn</span> nosotros recolectamos información provista por
              usted en virtud del uso transparente de la misma. Esta información
              abarca el uso de informaciones tales como:
              <ul>
                <li>Su nombre, apellidos y documento de identidad</li>
                <li>Su dirección de residencia o de domicilio de su empresa</li>
                <li>Su número telefónico y dirección de correo</li>
                <li>Sus áreas de conocimiento profesional o de interés</li>
                <li>Su foto elegida para representarlo en su perfil</li>
                <li>
                  Informaciones pertinentes a su dispositivo de uso para fines
                  de soporte o retroalimentación tales como: señales wifi o
                  bluetooth, conexiones a redes y cookies.
                </li>
              </ul>
            </p>
            <p>
              Estas informaciones permiten que <span>WorKn</span> pueda trabajar
              ofreciendo sus servicios de Match, entendiéndose por esto la
              actividad principal de la plataforma que consiste en vincular dos
              usuarios de acuerdo a sus preferencias y aptitudes profesionales.
            </p>
            <p>
              Estas informaciones son utilizadas para proveer, personalizar y
              mejorar nuestros productos. Los cuales estarán sujetos a cambios
              de manera constante de acuerdo con cómo el equipo lo determine.
              Alguna parte de su información pública será disponible para otros
              usuarios independientemente estén afiliados a nuestra plataforma.
            </p>
            <p>
              De igual manera, estos datos serán compartidos con nuestros
              partners y servicios utilizados de la manera necesaria, por
              ejemplo servicios de ubicación, procesamiento de imágenes u otras
              API externas.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default TermsOfServicePage;
