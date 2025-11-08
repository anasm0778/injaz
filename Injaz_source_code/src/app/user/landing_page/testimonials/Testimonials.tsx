import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
// import "./testimonials.css";
import "../testimonials/testimonials.css";
import { cardData } from "./data";
import Image from "next/image";

const Testimonials = () => {
  return (
    <section className="testimonials">
      <Container maxWidth="xl">
        <div className="testimonials_head">
          <h3>Testimonials</h3>
        </div>
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            {cardData.map((item, index) => (
              <Grid key={index} item xs={12} sm={3} md={3} lg={3}>
                <Card sx={{ maxWidth: 345, height: 405 }}>
                  <CardMedia
                    component="img"
                    alt="green iguana"
                    height="200"
                    image={item.src}
                  />
                  <CardContent>
                    <Typography
                      sx={{ textAlign: "center" }}
                      gutterBottom
                      variant="h5"
                      component="div"
                    >
                      {item.name}
                    </Typography>
                    <Typography
                      className="testimonial_text"
                      variant="body2"
                      color="text.secondary"
                    >
                      &quot;{item.text}&quot;
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Container>
    </section>
  );
};

export default Testimonials;
