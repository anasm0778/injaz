"use client";
import { CardMedia, Container, Grid, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./CreatedCars.css";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { serverUrl } from "@/utils/helper";

interface getCarData {
  _id: string;
  brand: string;
  model: string;
  category: string;
  year: string;
  image: string;
  location: string[];
  vehicleType: string;
  cheapestCar: string;
  status: string;
  services: string[];
  description: string;
  actualPriceDaily: string;
  discountedPriceDaily: string;
  actualPriceWeekly: string;
  discountedPriceWeekly: string;
  actualPriceMonthly: string;
  discountedPriceMonthly: string;
  transmission: string;
  engineCapacity: string;
  laggageBootCapacity: string;
  securityDeposit: string;
  cashType: string[];
  paiInsuranceDaily: string;
  paiInsuranceWeekly: string;
  paiInsuranceMonthly: string;
  paymentType: string[];
  seater: string;
  requirementsForUAEResidents: string[];
  requirementsForTourists: string[];
  externalImage: string[];
  babySeatChargeDaily: string;
  babySeatChargeWeekly: string;
  babySeatChargeMonthly: string;
  freeDailyKM: string;
  freeWeeklyKM: string;
  freeMonthlyKM: string;
  cdwDaily: string;
  cdwWeekly: string;
  cdwMonthly: string;
  keyFeatures: string[];
  deliveryChargeDaily: string;
  deliveryChargeWeekly: string;
  deliveryChargeMonthly: string;
  additionalMileageCharge: string;
  excessClaimCharge: string;
  salikTollCharge: string;
}

const serverAPI = "https://injazrent.ae/api";
const localAPI = "http://localhost:4000";

const CreatedCar = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("verify");

  const [data, setData] = useState<getCarData>({
    _id: "",
    brand: "",
    model: "",
    category: "",
    year: "",
    image: "",
    location: [],
    vehicleType: "",
    cheapestCar: "",
    status: "",
    services: [],
    description: "",
    actualPriceDaily: "",
    discountedPriceDaily: "",
    actualPriceWeekly: "",
    discountedPriceWeekly: "",
    actualPriceMonthly: "",
    discountedPriceMonthly: "",
    transmission: "",
    engineCapacity: "",
    laggageBootCapacity: "",
    securityDeposit: "",
    cashType: [],
    paiInsuranceDaily: "",
    paiInsuranceWeekly: "",
    paiInsuranceMonthly: "",
    paymentType: [],
    seater: "",
    requirementsForUAEResidents: [],
    requirementsForTourists: [],
    externalImage: [],
    babySeatChargeDaily: "",
    babySeatChargeWeekly: "",
    babySeatChargeMonthly: "",
    freeDailyKM: "",
    freeWeeklyKM: "",
    freeMonthlyKM: "",
    cdwDaily: "",
    cdwWeekly: "",
    cdwMonthly: "",
    keyFeatures: [],
    deliveryChargeDaily: "",
    deliveryChargeWeekly: "",
    deliveryChargeMonthly: "",
    additionalMileageCharge: "",
    excessClaimCharge: "",
    salikTollCharge: "",
  });

  useEffect(() => {
    if (id) {
      axios
        .get(serverUrl + `/user/getCar/${id}`)
        .then((res) => {
          //  ;
          setData(res.data.data);
          console.log(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <section className="createdCars">
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <div className="createdCarsTop">
              <div className="imageHead">
                <h3>Car Image</h3>
              </div>
              <div className="createdImg">
                <CardMedia
                  component="img"
                  height={400}
                  sx={{ objectFit: "contain" }}
                  image={data?.externalImage[0]}
                  alt=""
                />
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <div className="createdCarSpec">
              <div className="carSpecHead">
                <h3>Car</h3>
              </div>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <div className="carSpecMain">
                    <p>
                      Name :{" "}
                      <span className="dynamicData">
                        {data?.brand} {data?.model}
                      </span>
                    </p>
                    <p>
                      Actual Price (Monthly) :{" "}
                      <span className="dynamicData">
                        {data?.actualPriceMonthly}
                      </span>{" "}
                      D
                    </p>
                    <p>
                      Actual Price (Weekly) :{" "}
                      <span className="dynamicData">
                        {data?.actualPriceWeekly}
                      </span>{" "}
                      D
                    </p>
                    <p>
                      Actual Price (Daily) :{" "}
                      <span className="dynamicData">
                        {data?.actualPriceDaily}
                      </span>{" "}
                      D
                    </p>
                    <p>
                      Vehicle Type :{" "}
                      <span className="dynamicData">{data?.vehicleType}</span>
                    </p>
                    <p>
                      Model :{" "}
                      <span className="dynamicData">
                        {data?.brand} {data?.model} {data?.year}
                      </span>
                    </p>
                    <p>
                      Cheapest Car? :{" "}
                      <span className="dynamicData">{data?.cheapestCar}</span>
                    </p>
                    <p>Included :</p>
                    <span className="dynamicData"></span>
                    {data?.services.slice(1).map((req, index) => (
                      <p key={index}>
                        - <span className="dynamicData">{req}</span>
                      </p>
                    ))}
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <div className="carSpecMain">
                    <p>
                      Year : <span className="dynamicData">{data?.year}</span>
                    </p>
                    <p>
                      Discounted Price (Monthly) :{" "}
                      <span className="dynamicData">
                        {data?.discountedPriceMonthly}
                      </span>{" "}
                      D
                    </p>
                    <p>
                      Discounted Price (Weekly) :{" "}
                      <span className="dynamicData">
                        {data?.discountedPriceWeekly}
                      </span>{" "}
                      D
                    </p>
                    <p>
                      Discounted Price (Daily) :{" "}
                      <span className="dynamicData">
                        {data?.discountedPriceDaily}
                      </span>{" "}
                      D
                    </p>
                    <p>
                      Brand : <span className="dynamicData">{data?.brand}</span>
                    </p>
                    <p>
                      Category :{" "}
                      <span className="dynamicData">{data?.category}</span>
                    </p>
                    <p>
                      Status :{" "}
                      <span className="dynamicData">{data?.status}</span>
                    </p>
                    <p>
                      Locations :{" "}
                      <span className="dynamicData">
                        {data?.location.join(", ")}
                      </span>
                    </p>
                    <p>
                      Additional Mileage Charge :{" "}
                      <span className="dynamicData">
                        {data?.additionalMileageCharge}
                      </span>{" "}
                      D
                    </p>
                    <p>
                      Excess Claim Charge :{" "}
                      <span className="dynamicData">
                        {data?.excessClaimCharge}
                      </span>{" "}
                      D
                    </p>
                    <p>
                      Salik/Toll Charge :{" "}
                      <span className="dynamicData">
                        {data?.salikTollCharge}
                      </span>{" "}
                      D
                    </p>
                  </div>
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <div className="createdCarDesc">
              <div className="carDescHead">
                <h3>Description</h3>
              </div>
              <div className="carDescContent">
                <p>{data?.description}</p>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4}>
            <div className="createdCarDetails">
              <div className="CarDetHead">
                <h3>Contract Package</h3>
              </div>
              <div className="carDetMain">
                <Grid container spacing={1}>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <p>Free KMs Daily</p>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <p>
                      :{" "}
                      <span className="dynamicDataTwo">
                        {data?.freeDailyKM}
                      </span>{" "}
                      KM
                    </p>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <p>Free KMs Weekly</p>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <p>
                      :{" "}
                      <span className="dynamicDataTwo">
                        {data?.freeWeeklyKM}
                      </span>{" "}
                      KM
                    </p>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <p>Free KMs Monthly</p>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <p>
                      :{" "}
                      <span className="dynamicDataTwo">
                        {data?.freeMonthlyKM}
                      </span>{" "}
                      KM
                    </p>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <p>CDW Daily</p>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <p>
                      : <span className="dynamicDataTwo">{data?.cdwDaily}</span>{" "}
                      D
                    </p>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <p>CDW Weekly</p>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <p>
                      :{" "}
                      <span className="dynamicDataTwo">{data?.cdwWeekly}</span>{" "}
                      D
                    </p>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <p>CDW Monthly</p>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <p>
                      :{" "}
                      <span className="dynamicDataTwo">{data?.cdwMonthly}</span>{" "}
                      D
                    </p>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <p>PAI Insaurance Daily</p>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <p>
                      :{" "}
                      <span className="dynamicDataTwo">
                        {data?.paiInsuranceDaily}
                      </span>{" "}
                      D
                    </p>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <p>PAI Insaurance Weekly</p>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <p>
                      :{" "}
                      <span className="dynamicDataTwo">
                        {data?.paiInsuranceWeekly}
                      </span>{" "}
                      D
                    </p>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <p>PAI Insaurance Monthly</p>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <p>
                      :{" "}
                      <span className="dynamicDataTwo">
                        {data?.paiInsuranceMonthly}
                      </span>{" "}
                      D
                    </p>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <p>Baby Seat charge Daily</p>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <p>
                      :{" "}
                      <span className="dynamicDataTwo">
                        {data?.babySeatChargeDaily}
                      </span>{" "}
                      D
                    </p>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <p>Baby Seat charge Weekly</p>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <p>
                      :{" "}
                      <span className="dynamicDataTwo">
                        {data?.babySeatChargeWeekly}
                      </span>{" "}
                      D
                    </p>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <p>Baby Seat charge Monthly</p>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <p>
                      :{" "}
                      <span className="dynamicDataTwo">
                        {data?.babySeatChargeMonthly}
                      </span>{" "}
                      D
                    </p>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <p>Delivery Charge Daily</p>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <p>
                      :{" "}
                      <span className="dynamicDataTwo">
                        {data?.deliveryChargeDaily}
                      </span>{" "}
                      D
                    </p>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <p>Delivery Charge Weekly</p>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <p>
                      :{" "}
                      <span className="dynamicDataTwo">
                        {data?.deliveryChargeWeekly}
                      </span>{" "}
                      D
                    </p>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <p>Delivery Charge Monthly</p>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <p>
                      :{" "}
                      <span className="dynamicDataTwo">
                        {data?.deliveryChargeMonthly}
                      </span>{" "}
                      D
                    </p>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <p>Security Deposit</p>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <p>
                      :{" "}
                      <span className="dynamicDataTwo">
                        {data?.securityDeposit}
                      </span>{" "}
                      D
                    </p>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <p>Security Deposit Payment</p>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <p>
                      :{" "}
                      <span className="dynamicDataTwo">
                        Credit Card Lock
                        {/* {data?.cashType.join(", ").slice(2)} */}
                      </span>
                    </p>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <p>Security Deposit Refunded In</p>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <p>
                      :{" "}
                      <span className="dynamicDataTwo">
                        21 Days
                        {/* {data?.cashType.join(", ").slice(2)} */}
                      </span>
                    </p>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <p>Payment Type</p>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <p>
                      :{" "}
                      <span className="dynamicDataTwo">
                        {data?.paymentType.join(", ").slice(2)}
                      </span>
                    </p>
                  </Grid>
                </Grid>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4}>
            <div className="createdCarFeatuers">
              <div className="carFeatHead">
                <h3>Car Features</h3>
              </div>
              <div className="carFeatMain">
                <Grid container spacing={1}>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <p>Engine Capacity</p>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <p>
                      :{" "}
                      <span className="dynamicDataTwo">
                        {data?.engineCapacity} Litre
                      </span>
                    </p>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <p>Seater</p>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <p>
                      : <span className="dynamicDataTwo">{data?.seater}</span>
                    </p>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <p>Transmission</p>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <p>
                      :{" "}
                      <span className="dynamicDataTwo">
                        {data?.transmission}
                      </span>
                    </p>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <p>Luggage</p>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <p>
                      :{" "}
                      <span className="dynamicDataTwo">
                        {data?.laggageBootCapacity}
                      </span>
                    </p>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <p>
                      <b>Key Features</b>
                    </p>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    {data?.keyFeatures
                      .slice(1)
                      .map((kyefeat: any, index: any) => (
                        <p key={index}>
                          - <span className="dynamicDataTwo">{kyefeat}</span>
                        </p>
                      ))}
                  </Grid>
                </Grid>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4}>
            <div className="createdCarRequirements">
              <div className="CarReqHead">
                <h3>Requirements</h3>
              </div>
              <div className="carReqMain">
                <div className="uaeResReq">
                  <h5>Requirements (for UAE Residents) :</h5>
                  {data?.requirementsForUAEResidents
                    .slice(1)
                    .map((docuae: any, index: any) => (
                      <p key={index}>
                        - <span className="dynamicDataTwo">{docuae}</span>
                      </p>
                    ))}
                </div>
                <div className="tourResReq">
                  <h5>Requirements (for Tourists):</h5>
                  {data?.requirementsForTourists
                    .slice(1)
                    .map((doctour: any, index: any) => (
                      <p key={index}>
                        - <span className="dynamicDataTwo">{doctour}</span>
                      </p>
                    ))}
                </div>
              </div>
            </div>
            <Paper sx={{ marginTop: "1.3rem" }} elevation={4}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6113.930645090803!2d54.52542178395218!3d24.333778154208204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5e38b07e85e8bd%3A0x209405b2a9ed26d2!2sAl%20Mihad%20St%20-%20Mohamed%20Bin%20Zayed%20City%20-%20ME-10%20-%20Abu%20Dhabi%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sin!4v1710322800420!5m2!1sen!2sin"
                width="100%"
                height="250"
                style={{ border: 0 }}
                loading="lazy"
              ></iframe>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default CreatedCar;