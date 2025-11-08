"use client";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import InfoIcon from "@mui/icons-material/Info";
import "../lux_spor_cars/lux_spor_cars.css";
import BookNow from "../car-offers/BookNow";
import { useRouter } from "next/navigation";
import Loader from "@/app/Loader";
import "../car-offers/caroffers.css";
import { Carousel } from "react-responsive-carousel";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CloseIcon from "@mui/icons-material/Close";
import CustomizedTooltips from "@/utils/reusableTooltip";
import Image from "next/image";
import { getValidImageUrl } from "@/utils/helper";

interface LuxCars {
  data: any;
  phoneData: any;
}

const LuxSports: React.FC<LuxCars> = ({ data, phoneData }) => {
  const [Rows, setrows] = useState([]);
  const [loader, setLoader] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (data.length > 0) {
      const newData = data?.filter((item: any) => item.category === "ECONOMY");
      setrows(newData);
      setLoader(false);
    }
  }, [data]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const onChange = (index: any) => {
    setCurrentIndex(index);
  };

  const onClickItem = (index: any) => {
    console.log(`Clicked item at index ${index}`);
  };

  const onClickThumb = (index: any) => {
    console.log(`Clicked thumb at index ${index}`);
  };

  // Group data into sets of three cards
  const groupedData = Rows.reduce((acc: any, current: any, index: any) => {
    const groupIndex = Math.floor(index / 3);
    if (!acc[groupIndex]) {
      acc[groupIndex] = [];
    }
    acc[groupIndex].push(current);
    return acc;
  }, []);

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
    const whatsappMessage = `Hi, \nI’m contacting you through Injazrent.ae. \nI’d like to rent the discounted ${brand} ${model} ${year} \n${url} \nfor ${discountedPriceDaily} D ${packageDetails}. \nIs it available?`;
    const whatsappLink = `https://wa.me/${
      phoneData?.phoneNumber
    }?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappLink);
  };

  return (
    <div className="car_offers">
      <Container maxWidth="xl">
        <div className="car_off_head">
          <h2>Affordable Wheels: Economy Car Rentals in Abu Dhabi & Dubai</h2>
        </div>
        <div className="car_off_text">
          <p>
            Discover Affordable Trendy Economy Car Rentals in Abu Dhabi & Dubai
            for Your Next Adventure in the Emirates!
          </p>
        </div>
        {!loader ? (
          <Carousel
            showStatus={false}
            showThumbs={false}
            autoPlay={true}
            showArrows={true}
            onChange={onChange}
            onClickItem={onClickItem}
            onClickThumb={onClickThumb}
            showIndicators={false}
            infiniteLoop={true}
            className="carouselHeight"
            interval={15000}
            transitionTime={5000}
          >
            {groupedData.map((group: any, groupIndex: any) => (
              <div key={groupIndex}>
                <Container maxWidth="lg">
                  <Grid container spacing={3}>
                    {group.map((car: any) => (
                      <Grid item xs={12} md={4} sm={4} lg={4} key={car._id}>
                        <Card
                          sx={{
                            maxWidth: 345,
                            boxShadow: 3,
                            paddingTop: "5px",
                          }}
                          className="carBorder"
                        >
                          <CardActionArea>
                            <CardContent
                              className="cardContent"
                              onClick={() => {
                                router.push(
                                  `/user/landing_page/get_car_details?verify=${car._id}`
                                );
                              }}
                            >
                              {car.cheapestCar === "Yes" && (
                                <Typography
                                  className="cheapestBatch"
                                  maxWidth="110px"
                                  variant="h6"
                                  color="initial"
                                  sx={{
                                    animation: "blink 0.5s infinite alternate",
                                    "@keyframes blink": {
                                      "0%": { opacity: 1 },
                                      "100%": { opacity: 0 },
                                    },
                                  }}
                                >
                                  Cheapest
                                </Typography>
                              )}
                              <Image
                                alt={car.brand || "Car image"}
                                src={getValidImageUrl(car.externalImage?.[0] || car.image, "/placeholder-car.png")}
                                height={200}
                                width={200}
                              />
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
                                  <Image
                                    alt={car.brand}
                                    src="/vehicles.png"
                                    height={20}
                                    width={20}
                                  />
                                  <h5>{car.category}</h5>
                                </div>
                                <div className="car_subint">
                                  <Image
                                    alt={car.brand}
                                    src="/car-seat.png"
                                    height={20}
                                    width={20}
                                  />
                                  <h5 title="seater">
                                    {car.seater.split(" ")[0]}
                                  </h5>
                                </div>
                                <div className="car_subint">
                                  <Image
                                    alt={car.brand}
                                    src="/car-engine.png"
                                    height={20}
                                    width={20}
                                  />
                                  <h5>{car.engineCapacity}</h5>
                                </div>
                                <div className="car_subint">
                                  <Image
                                    alt={car.brand}
                                    src="/manual-transmission.png"
                                    height={20}
                                    width={20}
                                  />
                                  <h5>{car.transmission}</h5>
                                </div>
                              </div>
                            </CardContent>
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
                                    sx={{
                                      color: "green",
                                      marginRight: "5px",
                                    }}
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
                                      {" "}
                                      Deposit: D {car.securityDeposit}
                                    </p>
                                  </div>
                                </CustomizedTooltips>
                              </div>
                              <div
                                className="book_btn"
                                // style={{ textAlign: "center" }}
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
                              title={`Basic insurance is comperehensive will cover non fautly accident only, there is excess charges for faulty accident D ${car.securityDeposit}, We recommend you to buy a full insurance CDW to avoid this faulty axcess charges to zero amount`}
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
                          </CardActionArea>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Container>
              </div>
            ))}
          </Carousel>
        ) : (
          <>
            <br />
            <br />
            <Loader />
            <br />
            <br />
          </>
        )}
      </Container>
    </div>
  );
};

export default LuxSports;
