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
  Typography,
} from "@mui/material";
import React from "react";
import BookNow from "../car-offers/BookNow";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import CheckIcon from "@mui/icons-material/Check";
import InfoIcon from "@mui/icons-material/Info";
import "../car-offers/caroffers.css";
import Loader from "@/app/Loader";
import { serverUrl } from "@/utils/helper";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import "../../../../app/[locale]/globals.css";
import NavFooter from "@/utils/Na_Fo";
import CloseIcon from "@mui/icons-material/Close";
import CustomizedTooltips from "@/utils/reusableTooltip";

const serverAPI = "https://logicrent.ae/api";
const localAPI = "http://localhost:4000";

const CarWithLocation = () => {
  const [cars, setcars] = useState([]);
  const [initialData, setInitialData] = useState([]);
  const router = useRouter();

  const searchParams = useSearchParams();
  const location = searchParams.get("location");
  const brand = searchParams.get("brand");
  const category = searchParams.get("category");
  const daily = searchParams.get("daily");
  const weekly = searchParams.get("weekly");
  const monthly = searchParams.get("monthly");
  const [loading, setLoading] = useState(true); // Add loading state
  const [sortByPriceAscending, setSortByPriceAscending] = useState(true);
  const [phoneemail, setPhoneEmail] = useState({});
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

  useEffect(() => {
    setLoading(true);
    axios
      .get(serverUrl + `/user/getAllCars`)
      .then((res) => {
        const newData = res.data.data?.filter(
          (item: any) => item.status === "Active"
        );
        const filteredCars = newData.filter((item: any) => {
          return (
            (!location ||
              (Array.isArray(item.location) &&
                item.location.includes(location))) &&
            (!brand || item.brand === brand) &&
            (!category || item.category === category)
          );
        });
        // Sort cars based on smaller to larger price
        if (sortByPriceAscending) {
          filteredCars.sort(
            (a: any, b: any) => a.discountedPriceDaily - b.discountedPriceDaily
          );
        } else {
          filteredCars.sort(
            (a: any, b: any) => b.discountedPriceDaily - a.discountedPriceDaily
          );
        }
        setcars(filteredCars);
        setInitialData(filteredCars);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err, "errorrrrr");
      });
  }, [location, brand, category, sortByPriceAscending]);

  const toggleSortOrder = () => {
    setSortByPriceAscending((prevSortOrder) => !prevSortOrder);
  };

  if (loading) {
    return (
      <>
        <NavFooter /> <br />{" "}
        <div style={{ marginTop: "" }}>
          <Loader />
        </div>
      </>
    );
  }

  const handleWhatsappClick = (carDetails: any) => {
    const {
      brand,
      model,
      year,
      package: packageDetails,
      discountedPriceDaily,
      discountedPriceWeekly,
      discountedPriceMonthly,
      _id,
    } = carDetails;
    const baseUrl = "https://logicrent.ae/pages/getCarDetails?verify=";
    const url = `${baseUrl}${_id}`;
    const whatsappMessage = `Hi, \nI'm contacting you through Injazrent.ae. \nI'd like to rent the discounted ${brand} ${model} ${year} \nfor ${
      !monthly
        ? `D ${discountedPriceDaily} Daily & D ${discountedPriceWeekly} Weekly`
        : ""
    }  ${
      !weekly ? `D ${discountedPriceMonthly} Monthly` : ""
    } . \n${url}  \nIs it available?`;
    // Remove spaces and special characters from phone number for WhatsApp URL
    const formattedPhoneNumber = phoneData?.phoneNumber?.replace(/\s+/g, '').replace(/[^\d+]/g, '') || '+971509960498';
    const whatsappLink = `https://wa.me/${formattedPhoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    if (window.gtag) {
      window.gtag("event", "whatsapp_click", {
        event_category: "User Interaction",
        event_label: "WhatsApp Contact",
        value: phoneData?._id,
      });
    }
    window.open(whatsappLink);
  };

  return (
    <>
      <NavFooter footer="true">
        <section className="carWithLocation" style={{ margin: "1rem 0rem" }}>
          <Box sx={{ textAlign: "center", marginBottom: "10px" }}>
            <Button
              variant="contained"
              size="small"
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
          <div className="car_with_brand" style={{ marginTop: "20px" }}>
            <Container maxWidth="lg">
              <Grid container spacing={6}>
                {cars.map((car: any) => (
                  <Grid item xs={12} md={4} sm={4} lg={4} xl={4} key={car._id}>
                    <Card className="carBorder" sx={{ boxShadow: 3 }}>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="200"
                          image={car.externalImage?.[0] || car.image}
                          alt={car.brand}
                          onClick={() => {
                            localStorage.setItem(car._id, JSON.stringify(car));
                            router.push(
                              `/pages/getCarDetails?verify=${car._id}`
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
                          <div className="car_prices">
                            {daily && (
                              <div className="car_prices_child">
                                D {car.discountedPriceDaily} / Day
                              </div>
                            )}
                            {daily || weekly || monthly ? (
                              ""
                            ) : (
                              <div className="car_prices_child">
                                D {car.discountedPriceDaily} / Day
                              </div>
                            )}
                            {weekly && (
                              <>
                                <div className="car_prices_child">
                                  D {car.discountedPriceWeekly} / Week
                                </div>{" "}
                              </>
                            )}
                            {daily || weekly || monthly ? (
                              ""
                            ) : (
                              <div className="car_prices_child">
                                D {car.discountedPriceWeekly} / Week
                              </div>
                            )}
                            {monthly && (
                              <div className="car_prices_child">
                                D{" "}
                                {car.nineMonthPriceOf2500Km
                                  ? car.nineMonthPriceOf2500Km
                                  : car.discountedPriceMonthly}{" "}
                                / Month
                              </div>
                            )}
                            {daily || weekly || monthly ? (
                              ""
                            ) : (
                              <div className="car_prices_child">
                                D {car.discountedPriceMonthly} / Month
                              </div>
                            )}
                          </div>
                          <div className="car_KM">
                            {daily && (
                              <div className="car_KM_child">
                                {car.freeDailyKM} KM / Day
                              </div>
                            )}
                            {daily || weekly || monthly ? (
                              ""
                            ) : (
                              <div className="car_KM_child">
                                {car.freeDailyKM} KM / Day
                              </div>
                            )}
                            {weekly && (
                              <>
                                <div className="car_KM_child">
                                  {car.freeWeeklyKM} KM / Week
                                </div>
                              </>
                            )}
                            {daily || weekly || monthly ? (
                              ""
                            ) : (
                              <div className="car_KM_child">
                                {car.freeWeeklyKM} KM / Week
                              </div>
                            )}
                            {monthly && (
                              <div className="car_KM_child">
                                2500 KM / Month
                              </div>
                            )}
                            {daily || weekly || monthly ? (
                              ""
                            ) : (
                              <div className="car_KM_child">
                                {car.freeMonthlyKM} KM / Month
                              </div>
                            )}
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
                                  {(daily && "Min. 2 days rental") ||
                                    (weekly && "Min. 1 week rental") ||
                                    (monthly && "Min. 1 month rental")}
                                  {daily || weekly || monthly
                                    ? ""
                                    : "Min. 2 days rental"}
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
                                startIcon={
                                  <WhatsAppIcon className="wts-icon" />
                                }
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
                            <div
                              className="int_icon"
                              style={{ padding: "0px 13px" }}
                            >
                              <CheckIcon
                                sx={{
                                  color: "green",
                                  marginRight: "5px",
                                }}
                              />
                              <p className="carInfoPara">
                                {(daily &&
                                  `Full Insurrance: D ${car.cdwDaily} /
                              Day`) ||
                                  (weekly &&
                                    `Full Insurrance: D ${car.cdwWeekly} /
                              Week`) ||
                                  (monthly &&
                                    `Full Insurrance: D ${car.cdwMonthly} /
                              Month`)}
                                {daily || weekly || monthly
                                  ? ""
                                  : `Full Insurrance: D ${car.cdwDaily} /
                                  Day, D ${car.cdwWeekly} / Week, D ${car.cdwMonthly} / Month`}
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
          </div>
        </section>
      </NavFooter>
    </>
  );
};

export default CarWithLocation;
