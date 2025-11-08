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
import "../car-offers/caroffers.css";
import BookNow from "./BookNow";
import { useRouter } from "next/navigation";
import Loader from "@/app/Loader";
import Image from "next/image";

interface CarOffers {
  data: any;
}

const CarOffers: React.FC<CarOffers> = ({ data }) => {
  const [loader, setLoader] = useState(true);
  // console.log(data, "data from the offer");
  const router = useRouter();
  useEffect(() => {
    if (data.length > 0) {
      setLoader(false);
    }
  }, [data]);

  return (
    <div className="car_offers">
      <Container maxWidth="lg">
        <div className="car_off_head">
          <h2>Latest Car Rental Offers in Dubai</h2>
        </div>
        <div className="car_off_text">
          <p>
            Get on a road-trip now with the best deals for high-end cars
            manufactured by top automobile companies in the world.
          </p>
        </div>
        {!loader ? (
          <Container maxWidth="lg">
          <Grid container spacing={3}>
            {data?.map((car: any, index: any) => {
              if (index < 3) {
                return (
                  <Grid item xs={12} md={4} sm={4} lg={4} key={car._id}>
                    <Card sx={{ maxWidth: 345 }} className="carBorder">
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="200"
                          image={car.externalImage?.[0] || car.image}
                          alt={car.brand}
                          onClick={() => {
                            // localStorage.setItem(car._id, JSON.stringify(car));
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
                            {car.name} ({car.year})
                          </Typography>
                          <div className="car_prices">
                            <div className="car_prices_child">
                              D {car.discountedPriceDaily} / D
                            </div>
                            <div className="car_prices_child">
                              D {car.actualPriceWeekly} / W
                            </div>
                            <div className="car_prices_child">
                              D {car.discountedPriceMonthly} / M
                            </div>
                          </div>
                          <div className="car_KM">
                            <div className="car_KM_child">100 KM / D</div>
                            <div className="car_KM_child">200 KM / W</div>
                            <div className="car_KM_child">300 KM / M</div>
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
                              <h5>{car.seater}</h5>
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
                                <p className="carInfoPara">
                                  {" "}
                                  Minimum 2 days rental
                                </p>
                              </div>
                              <div className="int_icon">
                                <InfoIcon
                                  sx={{ color: "orange", marginRight: "5px" }}
                                />
                                <p className="carInfoPara">
                                  {" "}
                                  Deposit: D {car.securityDeposit}
                                </p>
                              </div>
                              <div className="int_icon">
                                <CheckIcon
                                  sx={{ color: "green", marginRight: "5px" }}
                                />
                                <p className="carInfoPara">
                                  {" "}
                                  Insurance Included
                                </p>
                              </div>
                            </div>
                            <div
                              className="book_btn"
                              style={{ textAlign: "center" }}
                            >
                              <Button>
                                <BookNow details={car} />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                );
              }
            })}
          </Grid>
          </Container>
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

export default CarOffers;
