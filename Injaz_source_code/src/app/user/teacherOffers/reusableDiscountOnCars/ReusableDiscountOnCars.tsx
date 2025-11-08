"use client";
import React from "react";
import { Box, Container, Grid, styled, Typography } from "@mui/material";
import Image from "next/image";

const MainBox = styled(Box)(({ theme }) => ({
  margin: "1.5rem 0",
}));
const ImageBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent:"right",
  alignItems: "center",
}));
const MainHeading = styled(Typography)(({ theme }) => ({
  color: "#01437D",
  fontSize: "2.5rem",
  fontWeight: 600,
}));
const Para = styled(Typography)(({ theme }) => ({
  fontSize: "1.3rem",
  
}));

interface ReusableDiscountInterface {
  discountOnCars: any;
}

const ReusableDiscountOnCars: React.FC<ReusableDiscountInterface> = ({
  discountOnCars,
}) => {
  return (
    <>
      <MainBox>
        <Container maxWidth="xl">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
              <MainHeading variant="h4" color="initial" gutterBottom>
                {discountOnCars.heading}
              </MainHeading>
              {discountOnCars.para.map((item: any, index: any) => (
                <Para
                  key={index}
                  variant="body1"
                  color="initial"
                  gutterBottom
                >
                  {item}
                </Para>
              ))}
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
              <ImageBox>
                <Image
                  src={discountOnCars.image}
                  alt="image"
                  height={227}
                  width={304}
                />
              </ImageBox>
            </Grid>
          </Grid>
        </Container>
      </MainBox>
    </>
  );
};

export default ReusableDiscountOnCars;
