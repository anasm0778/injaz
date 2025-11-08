"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import RecipeReviewCard from "./car-cards/RecipeReviewCard";
import ReqDocs from "./req_docs/ReqDocs";
import CustomizedAccordions from "./accordion/CustomizedAccordions";
import CarouselComponent from "./car_slider/HeroSlider";
import CompanyOverview from "./compoverview/CompanyOverview";
import WhyChooseUs from "./why_choose-us/WhyChooseUs";
import HowItWorks from "./how-it-works/HowItWorks";
import { serverUrl } from "../../../utils/helper";
import NavFooter from "@/utils/Na_Fo";
import CarContent from "./carContent/CarContent";

const LandingPage = () => {
  const [cars, setCars] = useState([]);
  const [phoneemail, setPhoneEmail] = useState({});

  useEffect(() => {
    const getAllCars = async () => {
      try {
        const res = await axios.get(serverUrl + "/user/getAllCars");
        const newData = res.data.data?.filter(
          (item: any) =>
            item.status === "Active" && item.isOfferApplied !== "Yes"
        );
        // Sort cars from cheapest to costliest based on daily price
        newData.sort((a: any, b: any) => a.discountedPriceDaily - b.discountedPriceDaily);
        setCars(newData);
      } catch (err) {
        console.log(err);
      }
    };

    const getSettings = async () => {
      try {
        const res = await axios.get(serverUrl + "/admin/getAllsettings");
        setPhoneEmail(res.data.data[0]);
        console.log(res.data.data[0], "phoneEmail");
      } catch (err) {
        console.log(err);
      }
    };

    getAllCars();
    getSettings();
  }, []);

  return (
    <>
      <NavFooter footer={true}>
        <CarouselComponent />
        <RecipeReviewCard />
        <div className="carsCardsSection">
          <CarContent phoneData={phoneemail} data={cars} />
        </div>
        <ReqDocs />
        <CompanyOverview />
        <WhyChooseUs />
        <HowItWorks />
        <CustomizedAccordions />
      </NavFooter>
    </>
  );
};
export default LandingPage;
