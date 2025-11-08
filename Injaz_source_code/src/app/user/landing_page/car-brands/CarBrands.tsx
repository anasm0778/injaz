"use client";
import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import "../car-brands/CarBrands.css";
import { useRouter } from "next/navigation";
import { Brandheading, Brandpara, carBrand } from "./data";

const CarBrands = () => {
  const router = useRouter();
  return (
    <div className="car_brands" id="carWithBrandID">
      <Container maxWidth="xl">
        <div className="car_brands_heading">
          <h2>{Brandheading}</h2>
        </div>
        <div className="car_brand_text">
          <p>{Brandpara}</p>
        </div>
        <Grid
          container
          spacing={3}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          {carBrand.map((item, index) => (
            <Grid key={index} item xs={6} md={2.4} sm={2.4}>
              <Card
                className="car_card"
                sx={{ maxWidth: 345 }}
                onClick={() =>
                  router.push(
                    `/user/landing_page/car-with-brand?brand=${item.brand}`
                  )
                }
              >
                <CardMedia
                  component="img"
                  height="100%"
                  image={item.src}
                  alt="Paella dish"
                />
                <CardContent>
                  <Typography
                    className="car_cat_text"
                    variant="body2"
                    color="text.secondary"
                  >
                    {item.brand}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default CarBrands;
