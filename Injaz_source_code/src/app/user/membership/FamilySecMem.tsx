"use client";
import { Container, Grid } from "@mui/material";
import React from "react";
import { familySectionData } from "./data";

const FamilySecMem = () => {
  return (
    <section className="familySecMain">
      <Container maxWidth="lg">
        <div className="famSecMainhead">
          <h1>INJAZ Family Membership</h1>
          <Grid container spacing={2}>
            {familySectionData.map((item, index) => (
              <Grid key={index} item xs={12} sm={12} md={12} lg={12}>
                <div className="famLeftPara">
                  <p>{item}</p>
                </div>
              </Grid>
            ))}
          </Grid>
        </div>
      </Container>
    </section>
  );
};

export default FamilySecMem;
