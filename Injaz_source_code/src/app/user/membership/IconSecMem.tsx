import { Container, Grid } from "@mui/material";
import React from "react";
import { imageSectionData } from "./data";
import Image from "next/image";

const IconSecMem = () => {
  return (
    <section className="iconSecMem">
      <Container maxWidth="lg">
        <div className="iconSecMemMain">
          <Container>
            <Grid container spacing={2}>
              {imageSectionData.map((item, index) => (
                <Grid key={index} item xs={12} sm={6} md={4} lg={4}>
                  <div className="iconMain">
                    <Image
                      src={item.src}
                      alt={item.text}
                      height={167}
                      width={167}
                    />
                    <h5>{item.text}</h5>
                  </div>
                </Grid>
              ))}
            </Grid>
          </Container>
        </div>
      </Container>
    </section>
  );
};

export default IconSecMem;
