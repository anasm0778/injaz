"use client";
import React, { useEffect, useState } from "react";
import NavFooter from "@/utils/Na_Fo";
import ReusableBanner from "./reusableBanner/ReusableBanner";
import ReusableDiscountOnCars from "./reusableDiscountOnCars/ReusableDiscountOnCars";
import ReusableTandC from "./reusableTandC/ReusableTandC";
import ReusableRecDocs from "./reusableReqDocs/ReusableRecDocs";
import { serverUrl } from "@/utils/helper";
import axios from "axios";
import ReusableDiscountedCars from "./reusableDiscountedCars/ReusableDiscountedCars";

const TeachersOffer = () => {
  const DiscountSectionData = {
    heading: "Teachers Discount on Car Rentals in Dubai",
    image: "/lnjaz cover 1.png",
    para: [
      "We're delighted to launch this exclusive promotion dedicated to supporting the incredibleeducators in our community.",
      "With this offer, teachers can now enjoy unmatched discounts and hassle-free car rentals, making their daily commutes, weekend getaways, and long-term rentals a breeze.",
    ],
  };

  const TermsAndConditionData = {
    heading: "Terms and Conditions",
    bulletPoints: [
      {
        point: "Contract period :",
        text: " during school year minimum of 8 months and above",
      },
      { point: " Mileage :", text: " Allowed mileage is 5000 km per month . " },
      {
        point: "Insurance :",
        text:
          "All cars has basic insurance if the teacher required full insurance then need to pay extra for full insurance.",
      },
      {
        point: "Excess Claim:",
        text:
          " Incase of faulty accident with full insurance coverage then the access amount is Zero.",
      },
    ],
    impNotes: [
      "Faulty accident if the car is repairable from the insurance company the access amount is 1500+ VAT 5%.",
      "Faulty accident if the cars is not repairable from the insurance company the access amount is D1500+ vat 5% + depreciation as per insurance policy amount.",
      "Contract cancellation before the school year end (early return) In this case the penalty is two months rent will be charged incase if early return before school year end .",
    ],
  };

  const RequiredDocumentsData = {
    heading: "Documents Required",
    subHeading:
      "To avail of the discount, you must have the following documents:",
    impNotes: [
      "You must have proof of employment as a Teacher",
      "Copy of valid ID/Passport",
      "Copy of valid UAE driving license",
      "Must be a UAE resident",
    ],
  };

  const [teachersOffer, setTeachersOffer] = useState([])

  useEffect(() => {
    axios
      .get(serverUrl + "/user/getAllCars")
      .then((res) => {
        const filterTeachersCars = res.data.data.filter((cars:any) => cars.offerType === "Teachers Offer")
        setTeachersOffer(filterTeachersCars)
      })
      .catch((err) => {
        console.log(err, "...error");
      });
  }, []);

  const teachersHeading= "Car Rental Deals for Teachers"
  return (
    <>
      <NavFooter footer={true}>
        <ReusableBanner banner="/teacher's offer 2024 banner 1 copy 1.png" />
        <ReusableDiscountedCars cars={teachersOffer} headingText={teachersHeading} />
        <ReusableDiscountOnCars discountOnCars={DiscountSectionData} />
        <ReusableTandC termsAndConditions={TermsAndConditionData} />
        <ReusableRecDocs reqDocs={RequiredDocumentsData}  />
      </NavFooter>
    </>
  );
};

export default TeachersOffer;
