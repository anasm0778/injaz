"use client";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";
import { serverUrl, getImageUrl } from "@/utils/helper";

const BANNER_HEIGHT = "70vh";    // 70% of viewport height
const ARROW_COLOR  = "#ffffff";  // <- white arrows

interface Banner {
  id: string;
  name: string;
  imageUrl: string;
  altText: string;
  isActive: boolean;
  displayOrder: number;
}

// Let slide wrappers control height; recolor arrows to white
const carouselStyles = `
  .carousel-container,
  .carousel-container .carousel-root,
  .carousel-container .carousel-slider,
  .carousel .slider-wrapper,
  .carousel .slider {
    height: auto !important;
    width: 100% !important;
  }
  .carousel .control-dots { height: auto !important; }

  /* Arrow button cleanup */
  .carousel .control-arrow,
  .carousel.carousel-slider .control-arrow {
    opacity: 1 !important;
    background: transparent !important;
    box-shadow: none !important;
  }
  .carousel .control-arrow { top: 50% !important; transform: translateY(-50%); }

  /* Bigger triangles */
  .carousel .control-arrow:before {
    border-top: 12px solid transparent !important;
    border-bottom: 12px solid transparent !important;
  }

  /* WHITE arrows */
  .carousel .control-prev.control-arrow:before {
    border-right: 14px solid ${ARROW_COLOR} !important;
  }
  .carousel .control-next.control-arrow:before {
    border-left: 14px solid ${ARROW_COLOR} !important;
  }

  /* Optional: soft hover halo for visibility on dark/light backgrounds */
  .carousel .control-arrow:hover {
    background: rgba(255,255,255,0.08) !important;
  }
`;

const CarouselComponent: React.FC = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`${serverUrl}/admin/getBanners`);
        if (response?.data?.status === 200 && response?.data?.data) {
          const active =
            (response.data.data as Banner[])
              .filter((b) => b.isActive)
              .sort((a, b) => a.displayOrder - b.displayOrder) || [];
          setBanners(active);
        } else {
          throw new Error("Invalid API response");
        }
      } catch (error) {
        console.error("Error fetching banners:", error);
        setBanners([
          {
            id: "1",
            name: "Default Banner",
            imageUrl: "/banner-injaz-1.jpg",
            altText: "Default Banner",
            isActive: true,
            displayOrder: 1,
          },
        ]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          width: "100%",
          height: BANNER_HEIGHT,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#f5f5f5",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Box sx={{ fontSize: 18, color: "#666", mb: 1 }}>Loading banners...</Box>
        </Box>
      </Box>
    );
  }

  if (banners.length === 0) {
    return (
      <Box
        sx={{
          width: "100%",
          height: BANNER_HEIGHT,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#f5f5f5",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Box sx={{ fontSize: 18, color: "#666", mb: 1 }}>No banners available</Box>
          <Box sx={{ fontSize: 14, color: "#999" }}>Please add banners from the admin panel</Box>
        </Box>
      </Box>
    );
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: carouselStyles }} />
      <Box sx={{ width: "100%" }}>
        <Carousel
          infiniteLoop
          showStatus={false}
          showThumbs={false}
          autoPlay
          showArrows
          showIndicators={false}
          interval={10000}
          transitionTime={3000}
          className="carousel-container"
        >
          {banners.map((banner) => (
            <Box
              key={banner.id}
              sx={{
                width: "100%",
                position: "relative",
                height: BANNER_HEIGHT,
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#000", // side space color when aspect ratios differ
              }}
            >
              <Image
                src={getImageUrl(banner.imageUrl, "/banner-injaz-1.jpg")}
                alt={`${banner.altText || banner.name} - Injaz Rent A Car Dubai - Affordable Car Rental No Deposit`}
                title={`${banner.name} - Best Car Rental Dubai - No Deposit Required`}
                fill
                priority
                quality={95}
                style={{
                  objectFit: "contain",
                  objectPosition: "center",
                  width: "100%",
                  height: "100%",
                }}
              />
            </Box>
          ))}
        </Carousel>
      </Box>
    </>
  );
};

export default CarouselComponent;
