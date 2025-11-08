"use client";
import React from "react";
import { Box, Container, styled, Typography } from "@mui/material";
import Image from "next/image";

const MainBox = styled(Box)(({ theme }) => ({
  margin: "1.5rem 0",
}));
const ImpNoteBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "baseline",
}));
const MainHeading = styled(Typography)(({ theme }) => ({
  color: "#01437D",
  fontSize: "2.5rem",
  fontWeight: 600,
}));
const BulletpointsTypo = styled(Typography)(({ theme }) => ({
  fontSize: "1.3rem",
}));
const ImpNoteTypo = styled(Typography)(({ theme }) => ({
  fontSize: "1.3rem",
  marginLeft: "0.5rem",
}));

interface ReusableTermsAndConditionsInterface {
  termsAndConditions: any;
}

const ReusableTandC: React.FC<ReusableTermsAndConditionsInterface> = ({
  termsAndConditions,
}) => {
  return (
    <>
      <MainBox>
        <Container maxWidth="xl">
          <MainHeading variant="h4" color="initial" gutterBottom>
            {termsAndConditions.heading}
          </MainHeading>
          {termsAndConditions.bulletPoints.map((item: any, index: any) => (
            <BulletpointsTypo
              key={index}
              variant="body1"
              color="initial"
              gutterBottom
            >
              <span style={{ color: "#01437D", fontWeight: 600 }}>
                {item.point}
              </span>{" "}
              {item.text}
            </BulletpointsTypo>
          ))}
          {termsAndConditions.impNotes.map((item: any, index: any) => (
            <ImpNoteBox key={index}>
              <Image
                src="/bullet point 1.png"
                alt="arrowimage"
                height={15}
                width={15}
              />
              <ImpNoteTypo variant="body1" color="initial" gutterBottom>
                {item}
              </ImpNoteTypo>
            </ImpNoteBox>
          ))}
        </Container>
      </MainBox>
    </>
  );
};

export default ReusableTandC;
