"use client";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import BookNow from "../car-offers/BookNow";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Navbar from "../navbar/Navbar";
import CheckIcon from "@mui/icons-material/Check";
import InfoIcon from "@mui/icons-material/Info";
import "../car-offers/caroffers.css";
import Loader from "@/app/Loader";
import "../../../globals.css";
import { serverUrl } from "@/utils/helper";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import NavFooter from "@/utils/Na_Fo";
import CloseIcon from "@mui/icons-material/Close";
import CustomizedTooltips from "@/utils/reusableTooltip";
interface getCars {
  internalImages: [];
}
const serverAPI = "https://logicrent.ae/api";
const localAPI = "http://localhost:4000";

const CarWithBrand = (props: any) => {
  const [cars, setcars] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const brand = searchParams.get("brand");
  const [loading, setLoading] = useState(true); // Add loading state
  // const [phoneemail, setPhoneEmail] = useState([]);
  const [phoneemail, setPhoneEmail] = useState({});
  const [sortByPriceAscending, setSortByPriceAscending] = useState(true);

  useEffect(() => {
    axios
      .get(serverUrl + "/admin/getAllsettings")
      .then((res) => {
        setPhoneEmail(res.data.data[0]);
        console.log(res.data.data[0], "phoneEmail");
      })
      .catch((err) => {
        console.log(err, "...error");
      });
  }, []);

  const phoneData: any = phoneemail;

  // useEffect(() => {
  //     axios
  //     .get(serverUrl + "/admin/getAllsettings")
  //     .then((res) => {
  //       setPhoneEmail(res.data.data);
  //       console.log(res.data.data, "phoneEmail");
  //     })
  //     .catch((err) => {
  //       console.log(err, "error");
  //     });

  // }, []);

  useEffect(() => {
    setLoading(true); // Set loading to true when fetching starts
    axios
      .get(serverUrl + `/user/getAllCars?brand=${brand}`)
      .then((res) => {
        const newData = res.data.data?.filter(
          (item: any) => item.status === "Active"
        );
        if (sortByPriceAscending) {
          newData.sort(
            (a: any, b: any) => a.discountedPriceDaily - b.discountedPriceDaily
          );
        } else {
          newData.sort(
            (a: any, b: any) => b.discountedPriceDaily - a.discountedPriceDaily
          );
        }
        setcars(newData);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((err) => {
        console.log(err, "errorrrrr");
      });
  }, [brand, sortByPriceAscending]);

  const toggleSortOrder = () => {
    setSortByPriceAscending((prevSortOrder) => !prevSortOrder);
  };

  const handleWhatsappClick = (carDetails: any) => {
    const {
      brand,
      model,
      year,
      package: packageDetails,
      discountedPriceDaily,
      _id,
    } = carDetails;
    const baseUrl =
      "https://logicrent.ae/user/landing_page/get_car_details?verify=";
    const url = `${baseUrl}${_id}`;
    const whatsappMessage = `Hi, \nI'm contacting you through Injazrent.ae. \nI'd like to rent the discounted ${brand} ${model} ${year} \n${url} \nfor ${discountedPriceDaily} D ${packageDetails}. \nIs it available?`;
    const whatsappLink = `https://wa.me/${
      phoneData?.phoneNumber
    }?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappLink);
  };

  return (
    <>
      <NavFooter />
      <Box sx={{ textAlign: "center", margin: "1rem 1rem" }}>
        <Button
          variant="contained"
          size="small"
          // color="primary"
          onClick={toggleSortOrder}
          sx={{
            backgroundImage:
              "linear-gradient(to right, #2b5876 0%, #4e4376 51%, #2b5876 100%)",
            color: "white",
            padding: "5px 10px",
            borderRadius: "5px",
            fontSize: "0.8rem",
            cursor: "pointer",
          }}
        >
          {sortByPriceAscending
            ? "Sort by Price (Descending)"
            : "Sort by Price (Ascending)"}
        </Button>
      </Box>
      <div
        className="car_with_brand"
        style={{ marginTop: "30px", marginBottom: "25px" }}
      >
        {!loading ? (
          <Container maxWidth="lg">
            <Grid container spacing={3}>
              {cars.map((car: any) => (
                <Grid item xs={12} md={4} sm={4} lg={4} key={car._id}>
                  <Card sx={{ maxWidth: 345 }} className="carBorder">
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="200"
                        image={car.externalImage?.[0] || car.image}
                        alt={car.brand}
                        onClick={() => {
                          localStorage.setItem(car._id, JSON.stringify(car));
                          router.push(
                            `/user/landing_page/get_car_details?verify=${car._id}`
                          );
                        }}
                      />
                      <CardContent className="cardContent">
                        <Typography
                          className="cardNameYear"
                          gutterBottom
                          variant="h6"
                          component="div"
                        >
                          {car.brand} {car.model} ({car.year})
                        </Typography>
                        <div className="actualPrice">
                          <div className="actualPriceChild">
                            D {car.actualPriceDaily} / Day
                          </div>
                          <div className="actualPriceChild">
                            D {car.actualPriceWeekly} / Week
                          </div>
                          <div className="actualPriceChild">
                            D {car.actualPriceMonthly} / Month
                          </div>
                        </div>
                        <div className="car_prices">
                          <div className="car_prices_child">
                            D {car.discountedPriceDaily} / Day
                          </div>
                          <div className="car_prices_child">
                            D {car.discountedPriceWeekly} / Week
                          </div>
                          <div className="car_prices_child">
                            D {car.discountedPriceMonthly} / Month
                          </div>
                        </div>
                        <div className="car_KM">
                          <div className="car_KM_child">
                            {car.freeDailyKM} KM / Day
                          </div>
                          <div className="car_KM_child">
                            {car.freeWeeklyKM} KM / Week
                          </div>
                          <div className="car_KM_child">
                            {car.freeMonthlyKM} KM / Month
                          </div>
                        </div>
                        <div className="car_interior">
                          <div className="car_subint">
                            <img
                              src="/vehicles.png"
                              width={20}
                              height={20}
                              alt="Picture of the author"
                            />
                            {""}
                            <h5>{car.category}</h5>
                          </div>
                          <div className="car_subint">
                            <img
                              src="/car-seat.png"
                              width={20}
                              height={20}
                              alt="Picture of the author"
                            />
                            {""}
                            <h5>{car.seater.split(" ")[0]}</h5>
                          </div>
                          <div className="car_subint">
                            <img
                              src="/car-engine.png"
                              width={20}
                              height={20}
                              alt="Picture of the author"
                            />
                            {""}
                            <h5>{car.engineCapacity}</h5>
                          </div>
                          <div className="car_subint">
                            <img
                              src="/manual-transmission.png"
                              width={20}
                              height={20}
                              alt="Picture of the author"
                            />
                            {""}
                            <h5>{car.transmission}</h5>
                          </div>
                        </div>
                        <div className="car_info_sec6">
                          <div className="carDDI">
                            <div className="int_icon">
                              {car.cheapestCar === "Yes" ? (
                                <CheckIcon
                                  sx={{
                                    color: "green",
                                    marginRight: "5px",
                                  }}
                                />
                              ) : (
                                <CloseIcon
                                  sx={{ color: "red", marginRight: "5px" }}
                                />
                              )}
                              <p className="carInfoPara">
                                Cheapest Car: {car.cheapestCar}
                              </p>
                            </div>
                            <div className="int_icon">
                              <CheckIcon
                                sx={{ color: "green", marginRight: "5px" }}
                              />
                              <p className="carInfoPara">
                                {" "}
                                Minimum 2 days rental
                              </p>
                            </div>
                            <CustomizedTooltips title="A security deposit is required exclusively via credit card. The deposit will be refunded within 21 days following your return date.">
                              <div className="int_icon">
                                <InfoIcon
                                  sx={{
                                    color: "orange",
                                    marginRight: "5px",
                                  }}
                                />
                                <p className="carInfoPara">
                                  {car.securityDeposit === 0 || car.securityDeposit === "0" 
                                    ? "No deposit required" 
                                    : `Deposit: D ${car.securityDeposit}`}
                                </p>
                              </div>
                            </CustomizedTooltips>
                          </div>
                          <div
                            className="book_btn"
                            style={{ textAlign: "center" }}
                          >
                            <Button
                              variant="contained"
                              startIcon={<WhatsAppIcon className="wts-icon" />}
                              size="small"
                              className="whts-btn"
                              onClick={() => handleWhatsappClick(car)}
                            >
                              Whatsapp
                            </Button>
                            <Button>
                              <BookNow details={car} />
                            </Button>
                          </div>
                        </div>
                        <CustomizedTooltips
                          title={`Basic insurance is comprehensive and will cover non-fault accidents only. There are excess charges for fault accidents of D ${car.securityDeposit}. We recommend you buy full insurance (CDW) to avoid these charges.`}
                        >
                          <div className="int_icon">
                            <CheckIcon
                              sx={{
                                color: "green",
                                marginRight: "5px",
                              }}
                            />
                            <p
                              style={{
                                color: "green",
                                marginRight: "5px",
                                display: "inline",
                              }}
                            >
                              {" "}
                              Full Insurrance: {car.cdwDaily}
                              D/Daily, {car.cdwWeekly}
                              D/Weekly, {car.cdwMonthly}
                              {""}
                              D/Monthly
                            </p>
                          </div>
                        </CustomizedTooltips>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        ) : (
          <>
            <br />
            <br />
            <div>
              <Loader />
            </div>
            <br />
            <br />
          </>
        )}
      </div>
    </>
  );
};

export default CarWithBrand;
