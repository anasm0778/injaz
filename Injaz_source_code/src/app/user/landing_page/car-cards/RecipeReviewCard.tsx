"use client";
import React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "../car-cards/carCard.css";
import { Container, Grid } from "@mui/material";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { carCategories } from "./data";
import Link from "next/link";

const CarCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
}));

export default function RecipeReviewCard() {
  const router = useRouter();

  return (
    <div className="card_section" id="carWithCategoryID">
      <Container maxWidth="xl">
        <div className="card_heading">
          <h1>INJAZ RENTAL CARS – Deposit Free</h1>
        </div>

        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          {carCategories.map((car, index) => (
            <Grid item xs={6} md={3} sm={3} lg={3} key={index}>
              <CarCard
                className={car.class}
                onClick={() =>
                  router.push(`/pages/carWithCategory?category=${car.category}`)
                }
              >
                <CardContent>
                  <Typography
                    className="car_cat_text_categories"
                    variant="body2"
                    color="text.secondary"
                  >
                    {car.category}
                  </Typography>
                </CardContent>
                <Image
                  src={car.src}
                  alt="carTwo.gif"
                  loading="lazy"
                  sizes="100vw"
                  style={{
                    width: "100%",
                    height: "auto",
                  }}
                />
              </CarCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}
