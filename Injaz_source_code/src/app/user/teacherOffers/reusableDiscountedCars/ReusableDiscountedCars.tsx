"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  styled,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import InfoIcon from "@mui/icons-material/Info";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CustomizedTooltips from "@/utils/reusableTooltip";
import BookNow from "../../landing_page/car-offers/BookNow";
import axios from "axios";
import { serverUrl } from "@/utils/helper";
import "../../../../app/globals.css";
import "../../landing_page/car-offers/caroffers.css";

interface ReusableDiscountedCarsInterface {
  cars: any;
  headingText: any;
}

const MainBox = styled(Box)(({ theme }) => ({
  margin: "1.5rem 0",
}));
const MainHeading = styled(Typography)(({ theme }) => ({
  color: "#01437D",
  fontSize: "2.5rem",
  fontWeight: 600,
  textAlign: "center",
}));

const calculateDiscount = (
  actualValue: number,
  offeredValue: number
): string => {
  const actual = +actualValue;
  const offer = +offeredValue/12;
  const discount = ((actual - offer) / actual) * 100;
  return discount.toFixed(1) + "%";
};

const ReusableDiscountedCars: React.FC<ReusableDiscountedCarsInterface> = ({
  cars,
  headingText,
}) => {
  const router = useRouter();
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

  const handleWhatsappClick = (carDetails: any) => {
    const {
      brand,
      model,
      year,
      offerType,
      discountedPriceMonthly,
      twelveMonthPriceOf2500Km,
      _id,
    } = carDetails;
    const baseUrl =
      "https://injazrent.ae/user/landing_page/get_car_details?verify=";
    const url = `${baseUrl}${_id}`;
    const whatsappMessage = `Hi, \nI'm contacting you through Injazrent.ae. \nI'd like to rent the ${calculateDiscount(
      discountedPriceMonthly,
      twelveMonthPriceOf2500Km
    )} discounted ${brand} ${model} ${year} In ${offerType} \n${url}  \nfor ${twelveMonthPriceOf2500Km} D Per 12 Month. \nIs it available?`;
    const whatsappLink = `https://wa.me/${
      phoneData?.phoneNumber
    }?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappLink);
  };
  return (
    <>
      <MainBox>
        <MainHeading variant="h4" color="initial" gutterBottom>
          {headingText}
        </MainHeading>
        <div className="car_with_brand" style={{ marginTop: "20px" }}>
          <Container maxWidth="lg">
            <Grid container spacing={3}>
              {cars.map((car: any) => (
                <Grid item xs={12} md={4} sm={4} lg={4} key={car._id}>
                  <Card sx={{ maxWidth: 345 }} className="carBorder">
                    <CardActionArea>
                      <Box
                        sx={{
                          borderRadius: "5px",
                          background:
                            "linear-gradient(45deg, #800080, #dc51d7)",
                          display: "flex",
                          alignItems: "center",
                          width: "150px",
                          padding: "10px 0px",
                          position: "absolute",
                          left: "20px",
                          top: "5px",
                        }}
                      >
                        <Box
                          sx={{
                            position: "relative",
                            right: "15px",
                            padding: "0px 5px",
                          }}
                        >
                          <Typography
                            variant="h6"
                            color="initial"
                            gutterBottom
                            sx={{
                              margin: 0,
                              background: "#ffb400",
                              color: "black",
                              fontWeight: 600,
                              padding: "0px 5px",
                              borderRadius: "3px",
                            }}
                          >
                            {calculateDiscount(
                              car.discountedPriceMonthly,
                              car.twelveMonthPriceOf2500Km
                            )}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography
                            variant="body1"
                            color="initial"
                            gutterBottom
                            sx={{
                              margin: 0,
                              color: "white",
                              lineHeight: 1.2,
                              fontSize: "0.8rem",
                              marginLeft: "0px",
                              fontFamily: "math",
                            }}
                          >
                            Extra Off For Teachers
                          </Typography>
                        </Box>
                      </Box>
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
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignContent: "center",
                          }}
                        >
                          <Typography
                            sx={{
                              backgroundColor: "#C6DCFF",
                              textAlign: "center",
                              color: "#DA3335",
                              fontWeight: 800,
                              width: "200px",
                            }}
                            variant="subtitle1"
                            color="initial"
                            gutterBottom
                          >
                            {car.twelveMonthPriceOf2500Km} D / Month
                          </Typography>
                        </Box>
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
                              <CheckIcon
                                sx={{ color: "green", marginRight: "5px" }}
                              />
                              <p
                                className="carInfoPara"
                                style={{ color: "green" }}
                              >
                                {" "}
                                8 Months and above Deal for Teachers
                              </p>
                            </div>
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
                                Cheapest Car:{" "}
                                {car.cheapestCar ? car.cheapestCar : "No"}
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
        </div>
      </MainBox>
    </>
  );
};

export default ReusableDiscountedCars;
