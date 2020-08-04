import React, { Component } from "react";
import { Carousel } from "react-responsive-carousel";
import Banner from "../banner-components/Banner.jsx";
import "react-responsive-carousel/lib/styles/carousel.min.css";

class DemoCarousel extends Component {
  render() {
    return (
      <Carousel>
        <div>
          <Banner image={"https://imgur.com/kiwVnMm.png"} />
        </div>
        <div>
          <Banner image={"https://imgur.com/lcHQ2QP.png"} />
        </div>
        <div>
          <Banner image={"https://imgur.com/NOhFX6S.png"} />
        </div>
      </Carousel>
    );
  }
}

export default DemoCarousel;
