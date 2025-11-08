import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import NavFooter from "@/utils/Na_Fo";
import { styles } from "./styles";
import { data, googleMapKey } from "./data";

const ContactUs = () => {
  return (
    <NavFooter footer={true}>
      <Box>
        <Box sx={styles.box}>
          <Box>
            <Typography variant="h6" sx={styles.typography}>
              Contact Us
            </Typography>
            <Typography variant="h3" sx={styles.typography2}>
              Get in touch with us
            </Typography>
          </Box>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            <iframe
              width="100%"
              height="100%"
              src={googleMapKey}
              allowFullScreen
              style={{ margin: "5rem, 0rem" }}
            ></iframe>
          </Grid>
          <Grid item xs={12} sm={4}>
            {data.map((item, index) => (
              <Box key={index} sx={styles.box2}>
                <Box sx={styles.box3}>
                  <Box sx={styles.box4}>
                    {index === 0 || index === 1 ? (
                      <LocationOnIcon sx={styles.icon} />
                    ) : index === 2 ? (
                      <AlternateEmailIcon sx={styles.icon} />
                    ) : null}
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" sx={styles.typography3}>
                      {item.address1}
                    </Typography>
                    <Typography variant="subtitle2" sx={styles.typography4}>
                      {item.address2}
                    </Typography>
                    <Typography variant="subtitle2" sx={styles.typography4}>
                      {item.address3}
                    </Typography>
                    <Typography variant="subtitle1" sx={styles.typography3}>
                      {item.address4}
                    </Typography>
                    {item.address5 && (
                      <Typography variant="subtitle1" sx={styles.typography3}>
                        {item.address5}
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Box>
            ))}
          </Grid>
        </Grid>
      </Box>
    </NavFooter>
  );
};

export default ContactUs;
