import React from "react";
import { Box, Container, Typography } from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import NavFooter from "@/utils/Na_Fo";
import { collection, disclosureInfo, idInfo, onlinePrivacy } from "./data";
import { styles } from "./styles";

const PrivacyPolicy = () => {
  return (
    <NavFooter footer={true}>
      <Box sx={styles.box}>
        <Container maxWidth="lg">
          {onlinePrivacy.map((item, index) => (
            <Box sx={styles.box2} key={index}>
              <Typography sx={styles.typography} variant="h4">
                {item.heading}
              </Typography>
              <Typography sx={styles.typography2} variant="subtitle1">
                {item.para}
              </Typography>
            </Box>
          ))}
          {collection.map((item, index) => (
            <Box sx={styles.box2} key={index}>
              <Typography sx={styles.typography} variant="h4">
                {item.heading}
              </Typography>
              <Typography sx={styles.typography2} variant="subtitle1">
                {item.para}
              </Typography>
              {item.points.map((item, index) => (
                <Typography
                  key={index}
                  sx={styles.typography3}
                  variant="subtitle1"
                >
                  <ArrowRightAltIcon sx={styles.icon} /> {item}
                </Typography>
              ))}
              <Typography sx={styles.typography2} variant="subtitle1">
                {item.para2}
              </Typography>
            </Box>
          ))}
          {idInfo.map((item, index) => (
            <Box sx={styles.box2} key={index}>
              <Typography sx={styles.typography} variant="h4">
                {item.heading}
              </Typography>
              <Typography sx={styles.typography2} variant="subtitle1">
                {item.para}
              </Typography>
              <Typography sx={styles.typography2} variant="subtitle1">
                {item.title1}
              </Typography>
              {item.points1.map((item, index) => (
                <Typography
                  key={index}
                  sx={styles.typography3}
                  variant="subtitle1"
                >
                  <ArrowRightAltIcon sx={styles.icon} /> {item}
                </Typography>
              ))}
              <Typography sx={styles.typography2} variant="subtitle1">
                {item.title2}
              </Typography>
              {item.points2.map((item, index) => (
                <Typography
                  sx={styles.typography3}
                  key={index}
                  variant="subtitle1"
                >
                  <ArrowRightAltIcon sx={styles.icon} /> {item}
                </Typography>
              ))}

              <Typography sx={styles.typography2} variant="subtitle1">
                {item.para2}
              </Typography>
            </Box>
          ))}
          {disclosureInfo.map((item, index) => (
            <Box sx={styles.box2} key={index}>
              <Typography sx={styles.typography} variant="h4">
                {item.title}
              </Typography>
              {item.details.map((item, index) => (
                <Typography
                  key={index}
                  sx={styles.typography2}
                  variant="subtitle1"
                >
                  {index + 1}. {item}
                </Typography>
              ))}
            </Box>
          ))}
        </Container>
      </Box>
    </NavFooter>
  );
};

export default PrivacyPolicy;
