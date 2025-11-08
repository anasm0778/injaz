import { Card, Container, Grid } from "@mui/material";
import React from "react";
import "../how-it-works/HowItWorks.css";
import { cardData } from "./data";
import Image from "next/image";
import Link from "next/link";

const HowItWorks = () => {
  return (
    <section className="howItWorks">
      <Container maxWidth="xl">
        <div className="howWorkHead">
          <h3>
            How It{" "}
            <Link
              href=""
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#01437d", textDecoration: "none" }}
            >
              Works
            </Link>
          </h3>
        </div>
        <div className="howWorkSubHead">
          <h4>Make it happens in 4 easy steps! Best Of Luck</h4>
        </div>
      </Container>
      <div className="howWorksImg">
        <Container maxWidth="xl">
          <Grid container spacing={4}>
            {cardData.map((item, index) => (
              <Grid key={index} item xs={12} sm={6} md={3} lg={3}>
                <div className="howItWorksCard">
                  <div className="stepNumber">{index + 1}</div>
                  <div className="iconContainer">
                    <Image
                      src={item.src}
                      alt={item.heading}
                      height={100}
                      width={100}
                      loading="lazy"
                    />
                  </div>
                  <div className="selectCar">
                    <h3>{item.heading}</h3>
                  </div>
                </div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    </section>
  );
};

export default HowItWorks;
