import React from "react";
import Faq from "react-faq-component";
import "./FAQPage-Styles.css";
import Footer from "../../components/footer-components/Footer.jsx";
import Header from "../../components/navbar-components/Navbar.jsx";
import Banner from "../../components/banner-components/Banner.jsx";

const data = {
  title: "FAQ (Preguntas Frecuentes)",
  rows: [
    {
      title: "Ques Work n?",
      content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed tempor sem. Aenean vel turpis feugiat,
              ultricies metus at, consequat velit. Curabitur est nibh, varius in tellus nec, mattis pulvinar metus.
              In maximus cursus lorem, nec laoreet velit eleifend vel. Ut aliquet mauris tortor, sed egestas libero interdum vitae.
              Fusce sed commodo purus, at tempus turpis.`,
    },
    {
      title: "Porque no mejor uso fiverr?",
      content:
        "Nunc maximus, magna at ultricies elementum, risus turpis vulputate quam, vitae convallis ex tortor sed dolor.",
    },
    {
      title: "Porque no mejor uso Linkedin?",
      content: `Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc, ac sagittis leo elit vel lorem.
            Fusce tempor lacus ut libero posuere viverra. Nunc velit dolor, tincidunt at varius vel, laoreet vel quam.
            Sed dolor urna, lobortis in arcu auctor, tincidunt mattis ante. Vivamus venenatis ultricies nibh in volutpat.
            Cras eu metus quis leo vestibulum feugiat nec sagittis lacus.Mauris vulputate arcu sed massa euismod dignissim. `,
    },
  ],
};

const styles = {
  bgColor: "#f7f7f7",
  titleTextColor: "#5bba6f",
  rowTitleColor: "#4d4e52",
  rowContentColor: "#757575",
  arrowColor: "#757575",
  rowContentPaddingLeft: "10px",
  rowContentPaddingRight: "50px",
  rowContentPaddingBottom: "10px",
};

const config = {
  //   animate: true,
  //   arrowIcon: "V",
  //   tabFocus: true,
};

const FAQPage = () => {
  return (
    <div className="pagewrap">
      <Header></Header>
      <Banner image={"GCzxKLw.png"} />
      <Faq data={data} styles={styles} config={config} />
      <Footer></Footer>
    </div>
  );
};

export default FAQPage;
