import React from "react";
import { Box, Container, Typography } from "@mui/material";
import NavFooter from "@/utils/Na_Fo";
import { data, wordsToHighlight } from "./data";
import { styles } from "./styles";

// Words to style dynamically
const styleWords = (text: any, wordsToStyle: any) => {
  const regex = new RegExp(`(${wordsToStyle.join("|")})`, "gi"); // Create a regex to match all words
  return text.replace(
    regex,
    (matched: any) =>
      `<span style="font-weight: bold; color: #01437d;">${matched}</span>`
  );
};

const TermsAndCondition = () => {
  return (
    <>
      <NavFooter footer={true}>
        <Container maxWidth="lg">
          <Box sx={styles.box}>
            <Typography variant="h4" sx={styles.typography}>
              Terms & Conditions
            </Typography>
            {data.map((item, index) => (
              <Box key={index} sx={styles.box2}>
                <Typography variant="h5" sx={styles.typography3}>
                  {item.heading}
                </Typography>
                {item.text.map((paragraph, pIndex) => (
                  <Typography
                    dangerouslySetInnerHTML={{
                      __html: styleWords(paragraph, wordsToHighlight),
                    }}
                    variant="body1"
                    sx={styles.typography2}
                    key={pIndex}
                  />
                ))}
              </Box>
            ))}
          </Box>
        </Container>
      </NavFooter>
    </>
  );
};

export default TermsAndCondition;
