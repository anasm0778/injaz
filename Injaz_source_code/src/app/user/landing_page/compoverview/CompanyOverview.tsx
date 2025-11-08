"use client";
import React from "react";
import "../compoverview/compoverview.css";
import { Container, Grid } from "@mui/material";
import Image from "next/image";
import mainImage from "../../../../../public/company-overview-img-1.jpg";
import Link from "next/link";
const CompanyOverview = () => {
  return (
    <section id="company_overview" className="company_overview">
      <Container maxWidth="lg">
        <div className="faq_head">
          <h1>
            Find the Best Car Rental Company in Dubai & Abu Dhabi - No Deposit Required
          </h1>
          <h2>
            Affordable Car Rental Dubai | Cheapest Monthly Car Rental | Luxury Car Rental Dubai Cheap
          </h2>
        </div>
        <Grid container sx={{ alignItems: "center" }} spacing={4}>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <div className="overview_text" style={{ padding: "0px 10px" }}>
              <p style={{ marginBottom: "1rem" }}>
                <strong>INJAZ Rent A Car</strong> is the leading <strong>affordable car rental Dubai</strong> provider, 
                offering <strong>car rental no deposit</strong> services across UAE. We specialize in 
                <strong> cheapest monthly car rental Dubai</strong>, <strong>luxury car rental Dubai cheap</strong>, 
                and <strong>rent car Dubai without deposit</strong> solutions. Whether you need 
                <strong> daily car rental</strong>, <strong>weekly car rental</strong>, or 
                <strong> monthly car rental Dubai</strong>, we provide the best rates with no security deposit required.
              </p>
              <p style={{ marginBottom: "1rem" }}>
                Our comprehensive car rental services cover all major locations including 
                <strong> car rental Dubai Marina</strong>, <strong>rent a car International City</strong>, 
                <strong> car rental Dubai Airport Terminal 1 & 2</strong>, <strong>rent a car Abu Dhabi Airport</strong>, 
                <strong> rent a car Business Bay</strong>, <strong>rent a car Downtown Dubai</strong>, 
                <strong> rent a car JVC</strong>, <strong>rent a car JLT</strong>, and many more areas across Dubai and Abu Dhabi.
              </p>
              <p style={{ marginBottom: "1rem" }}>
                Perfect for individuals seeking{" "}
                <Link
                  href="/pages/carWithLocation/?daily=daily"
                  style={{ color: "#01437d", textDecoration: "none" }}
                >
                  <strong>short-term car rental</strong>
                </Link>{" "}
                or businesses requiring{" "}
                <Link
                  href="/pages/carWithLocation/?monthly=monthly"
                  style={{ color: "#01437d", textDecoration: "none" }}
                >
                  <strong>long-term car rental Dubai</strong>
                </Link>{" "}
                solutions. We offer <strong>range rover rental Dubai</strong>, 
                <strong> rent Mercedes Dubai</strong>, <strong>rent Toyota Dubai</strong>, 
                <strong> rent Nissan Patrol Dubai</strong>, and other premium vehicles at competitive rates.
              </p>
              <p style={{ marginBottom: "0.5rem" }}>
                <strong>Why Choose Injaz Rent A Car?</strong><br/>
                ✓ <strong>No Deposit Required</strong> - Rent car Dubai without deposit<br/>
                ✓ <strong>Lowest Car Rental Rates</strong> - Best car rental prices in UAE<br/>
                ✓ <strong>24/7 Customer Support</strong> - Available round the clock<br/>
                ✓ <strong>Doorstep Delivery</strong> - Car rental with delivery service<br/>
                ✓ <strong>Flexible Payment Options</strong> - Cash, card, and bank transfer accepted
              </p>
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={6}
            sx={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
            }}
          >
            <div className="image_container">
              <Image
                src={mainImage}
                alt="Injaz Rent A Car Dubai - Best Car Rental Company UAE - Affordable Car Rental No Deposit - Monthly Car Rental Dubai"
                loading="lazy"
                width={400}
                height={200}
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '16px'
                }}
              />
            </div>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default CompanyOverview;
