"use client";
import { CardMedia, Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import "../bookingScreen/BookingScreen.css";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { serverUrl } from "@/utils/helper";
import NavFooter from "@/utils/Na_Fo";

const BookingScreen = (props: any) => {
  const router = useRouter();

  const storedDataString: string | null =
    typeof window !== "undefined" ? localStorage.getItem("bookingData") : null;

  if (storedDataString === null) {
    // Handle the case when there's no data in localStorage
    // You can provide a default value or perform some other logic
    return null; // or handle it accordingly
  }

  const { carDetails, enquiryData }: any = JSON.parse(storedDataString);
  console.log(carDetails, enquiryData);
  //    ;
  console.log(router);

  return (
    <>
      <NavFooter />
      <section className="bookingScreen">
        <Container maxWidth="lg">
          <div className="bkngScnMain">
            <div className="bkngScnHead">
              <h2>
                thank you <span className="heading">{enquiryData.name}</span>{" "}
                your booking have been confirmed.
              </h2>
            </div>
            <div className="bkngPicdrop">
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <div className="pickDropLeft">
                    <h3>Pick Up:</h3>
                    <p>
                      {enquiryData.pickUpLoc} - {enquiryData.startDate}
                    </p>
                    <h3>Drop Off:</h3>
                    <p>
                      {enquiryData.dropLocation} - {enquiryData.endDate}
                    </p>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <div className="pickDropRight">
                    <h3>your confirmation number:</h3>
                    <h4> {carDetails._id.toUpperCase()}</h4>
                    {/* <p>modify/cancel/refund this booking</p> */}
                  </div>
                </Grid>
              </Grid>
            </div>
            <div className="bookingBilling">
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                  <div className="bookingImg">
                    <div className="bookImgHead">
                      <h3>Your Vehicle</h3>
                    </div>
                    <div className="bookingCarmedia">
                      <CardMedia
                        component="img"
                        sx={{
                          objectFit: "contain",
                          width: "50%",
                          paddingTop: "10px",
                        }}
                        image={carDetails.externalImage[0]}
                        alt="/front-left-side-47%20(1)"
                      />
                    </div>
                    <div className="bookingCardetail">
                      <h4>
                        name: {carDetails.brand} {carDetails.model}{" "}
                        {carDetails.year}
                      </h4>
                      <h4>
                        Free KM daily/weekly/monthly : {carDetails.freeDailyKM}{" "}
                        km/ {carDetails.freeWeeklyKM} km/
                        {carDetails.freeMonthlyKM} km
                      </h4>
                      <h4>transmission : {carDetails.transmission}</h4>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                  <div className="bookingImg">
                    <div className="bookImgHead">
                      <h3>Customer Details</h3>
                    </div>
                    <div className="bookingCardetail">
                      <h4 style={{marginBottom:"8px"}}>
                        Customer name: {enquiryData.name}
                      </h4>
                      <h4 style={{marginBottom:"8px"}}>
                        phone number : {enquiryData.phoneNumber}
                      </h4>
                      <h4 style={{marginBottom:"8px"}}>email : {enquiryData.email.toLowerCase()}</h4>
                      <h4 style={{marginBottom:"8px"}}>delivery Mode : {enquiryData.deliveryMode}</h4>
                      <h4 style={{marginBottom:"8px"}}>pick up location : {enquiryData.pickUpLoc}</h4>
                      <h4 style={{marginBottom:"8px"}}>drop location : {enquiryData.dropLocation}</h4>
                      <h4 style={{marginBottom:"8px"}}>package: {enquiryData.packages}</h4>
                      <h4 style={{marginBottom:"8px"}}>message: {enquiryData.message}</h4>
                    </div>
                  </div>
                </Grid>
              </Grid>
              <div className="billingCaution">
                <h3>
                  Additional Fee May Apply If Changes Are Made To Your Return
                  Date, Time And/Or Location
                </h3>
              </div>
            </div>
            <div className="locationInformation">
              <div className="locInfoHead">
                <h2>Location Information</h2>
              </div>
              <div className="locInfoMain">
                <Grid container spacing={3}>
                  <Grid item xs={6} sm={6} md={6} lg={6} xl={12}>
                    <div className="locInfoLeft">
                      <div className="locInfoLeftHead">
                        <h3>Pick Up Location</h3>
                      </div>
                      <div className="locInfoLeftPara">
                        <p>
                          Injaz Cars Rental Sole Proprietorship Llc Dubai Office
                          Office Number 554 Tamani Arts Offices Tower Fifth
                          Floor Al Alsayel Street Business Bay Dubai, uae.
                        </p>
                      </div>
                    </div>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6} xl={12}>
                    <div className="locInfoRight">
                      <div className="locInfoRightHead">
                        <h3>Pick Off Location</h3>
                      </div>
                      <div className="locInfoRightPara">
                        <p>
                          Injaz Cars Rental Sole Proprietorship Llc Dubai Office
                          Office Number 554 Tamani Arts Offices Tower Fifth
                          Floor Al Alsayel Street Business Bay Dubai, uae.
                        </p>
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default BookingScreen;
