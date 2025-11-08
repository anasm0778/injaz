"use client";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

interface ReusableBannerInterface {
  banner: string;
}

const ReusableBanner: React.FC<ReusableBannerInterface> = ({ banner }) => {
  return (
    <>
      <Carousel
        infiniteLoop={true}
        showStatus={false}
        showThumbs={false}
        autoPlay={false}
        showArrows={true}
        showIndicators={false}
        interval={10000}
        transitionTime={3000}
      >
        <div>
          <img src={banner} alt="Legend 1" />
        </div>
        <div>
          <img src={banner} alt="Legend 1" />
        </div>
      </Carousel>
    </>
  );
};

export default ReusableBanner;
