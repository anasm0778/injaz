import { Container, Grid } from "@mui/material";
import React from "react";

const YellowSecMem = () => {
  return (
    <section className="platSecMem">
      <div className="goldSecHead">
        <h1>Yellow Membership</h1>
      </div>
      <div className="goldSecMain">
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <div className="platLeft">
                <img src="/goldImg.png" alt="platinumImg" />

                <p>
                  How to be eligible for{" "}
                  <span className="spanWord">Yellow</span> membership:
                </p>
                <p>
                  As soon as the customer complete first contract, the customer
                  will be eligible for the yellow membership if customer meets
                  the Terms and Conditions.
                </p>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <div className="platRight">
                <p>
                  Additional <span className="spanWord">(20 KM/DAY)</span>.
                </p>
                <p>
                  <span className="spanWord">(10%)</span> discount on contract
                  value including rental charges (Daily, weekly, monthly or
                  yearly), excess KM and car shipping cost for one way bookings
                  from one city to another.
                </p>
                <p>
                  Additional <span className="spanWord">(1)</span> hour(s) to
                  car drop off time.
                </p>
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
    </section>
  );
};

export default YellowSecMem;
