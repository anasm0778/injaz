import React from "react";
import "../req_docs/reqdocs.css";
import { Box, Container, Grid } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Image from "next/image";
import UAEImg from "../../../../../public/uae card.webp";
import touristImg from "../../../../../public/uae card 1.webp";
import Link from "next/link";

const ReqDocs = () => {
  return (
    <>
      <section className="required_documents">
        <Container maxWidth="xl">
          <div className="req_heading">
            <h3>
              <Link
                href="https://www.moec.gov.ae/en/-/renting-a-car"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#01437d", textDecoration: "none" }}
              >
                Documents Required
              </Link>{" "}
              for Car Rental in the UAE
            </h3>
          </div>
          <div className="req_para">
            <p>
              For travelers{" "}
              <Link
                href="https://u.ae/en/information-and-services/visiting-and-exploring-the-uae/what-to-do-in-the-uae/explore-the-uae-by-emirate-"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#01437d", textDecoration: "none" }}
              >
                exploring the UAE
              </Link>
              , you will discover that its major attractions are scattered
              across vast distances. From iconic shopping havens like the Mall
              of the Emirates to revered landmarks such as the{" "}
              <Link
                href="https://www.szgmc.gov.ae/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#01437d", textDecoration: "none" }}
              >
                Sheikh Zayed Grand Mosque
              </Link>{" "}
              in Abu Dhabi, and luxurious accommodations nestled in Abu Dhabi &
              Dubai, a car offers the ultimate freedom of mobility. To rent a
              car across the emirates, ensure you have the following valid
              documents at hand:
            </p>
          </div>
          <Container
            maxWidth="xl"
            sx={{ marginTop: "50px", marginBottom: "50px" }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} sm={6} lg={6}>
                <div className="uae_res">
                  <h6>For UAE Residents</h6>
                  <Grid
                    container
                    spacing={2}
                    sx={{
                      alignItems: "center",
                      height: { xs: "22rem", md: "20rem" },
                    }}
                  >
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                      <Box sx={{ textAlign: "center", marginTop: "1rem" }}>
                        <Image
                          src={UAEImg}
                          alt="carTwo.gif"
                          loading="lazy"
                          sizes="100vw"
                          style={{
                            width: "200px",
                            height: "150px",
                          }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                      <div className="int_icon_two">
                        <CheckCircleIcon
                          sx={{
                            color: "#10b981",
                            fontSize: "1.2rem",
                            marginRight: "12px",
                          }}
                        />
                        <p className="int_text_para">UAE Driving License</p>
                      </div>
                      <div className="int_icon_two">
                        <CheckCircleIcon
                          sx={{
                            color: "#10b981",
                            fontSize: "1.2rem",
                            marginRight: "12px",
                          }}
                        />
                        <p className="int_text_para">
                          Emirates ID (Residential Visa may be acceptable)
                        </p>
                      </div>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
              <Grid item xs={12} md={6} sm={6} lg={6}>
                <div className="uae_res">
                  <h6>For Tourists visiting the UAE</h6>
                  <Grid
                    container
                    spacing={2}
                    sx={{
                      alignItems: "center",
                      height: { xs: "auto", md: "auto" },
                      minHeight: { xs: "22rem", md: "20rem" },
                    }}
                  >
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                      <Box sx={{ textAlign: "center", marginTop: "1rem" }}>
                        <Image
                          src={touristImg}
                          alt="carTwo.gif"
                          loading="lazy"
                          sizes="100vw"
                          style={{
                            width: "200px",
                            height: "150px",
                          }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                      <div className="int_icon_two">
                        <CheckCircleIcon
                          sx={{
                            color: "#10b981",
                            fontSize: "1.2rem",
                            marginRight: "12px",
                          }}
                        />
                        <p className="int_text_para">Passport</p>
                      </div>
                      <div className="int_icon_two">
                        <CheckCircleIcon
                          sx={{
                            color: "#10b981",
                            fontSize: "1.2rem",
                            marginRight: "12px",
                          }}
                        />
                        <p className="int_text_para">Visit Visa</p>
                      </div>
                      <div className="int_icon_two">
                        <CheckCircleIcon
                          sx={{
                            color: "#10b981",
                            fontSize: "1.2rem",
                            marginRight: "12px",
                          }}
                        />
                        <p className="int_text_para">
                          Home Driving license / International Driving license
                        </p>
                      </div>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
            </Grid>
          </Container>
        </Container>
      </section>
    </>
  );
};

export default ReqDocs;
