"use client";
import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import "../why_choose-us/WhyChooseUs.css";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { sectionData, whyChooseCardData } from "./data";

const WhyChooseUs = () => {
  return (
    <section className="whyChooseUs">
      <Container maxWidth="xl">
        <Box>
          <div className="whyHeading">
            <h3>{sectionData[0]}</h3>
          </div>
          <Grid container spacing={2}>
            {whyChooseCardData.map((item, index) => (
              <Grid
                key={index}
                item
                xs={12}
                md={4}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "stretch",
                }}
              >
                <Box className="whyChooseCard">
                  <Typography
                    variant="h6"
                    component="h6"
                    gutterBottom
                    sx={{ fontWeight: 700 }}
                  >
                    {item.heading}
                  </Typography>
                  {item.points.map((point, pointIndex) => (
                    <Typography
                      key={pointIndex}
                      variant="body2"
                      gutterBottom
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        marginBottom: "12px",
                      }}
                    >
                      <ArrowRightIcon fontSize="small" />
                      {point}
                    </Typography>
                  ))}
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </section>
  );
};

export default WhyChooseUs;
