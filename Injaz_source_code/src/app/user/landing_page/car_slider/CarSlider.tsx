"use client";
import SimpleImageSlider from "react-simple-image-slider";
import "./hero_slider.css";

const images = [
  { url: "/banner.jpg" },
  { url: "/nissansunny.jpg" },
  { url: "/misbahattrage.jpg" },
  { url: "/Mazda6.jpg" },
  { url: "/HyundaiElantra.jpg" },
  { url: "/HyundaiCreta.jpg" },
  { url: "/HyundaiAccent.jpg" },
];

export const CarSlider = () => {
  return (
    <div>
      <SimpleImageSlider
        // width="100%"
        style={{ backgroundPosition: "center" }}
        // style={{ position:"initial", objectFit:"contain", transition:"2s" }}
        // height="65vh"
        images={images}
        showBullets={true}
        showNavs={true}
        autoPlay={true}
        width={354}
        // width="100%"
        height={504}
      />
    </div>
  );
};
