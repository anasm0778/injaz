"use client";
import React from "react";
import { Box, Container, styled, Typography } from "@mui/material";
import Image from "next/image";

const MainBox = styled(Box)(({ theme }) => ({
  margin: "1.5rem 0",
}));
const MainHeading = styled(Typography)(({ theme }) => ({
  color: "#01437D",
  fontSize: "2.5rem",
  fontWeight: 600,
}));
const SubHeading = styled(Typography)(({ theme }) => ({
  color: "#01437D",
  fontSize: "1.5rem",
  fontWeight: 600,
}));

const ImpNoteBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "baseline",
}));
const ImpNoteTypo = styled(Typography)(({ theme }) => ({
  fontSize: "1.3rem",
  marginLeft: "0.5rem",
}));

interface ReusableReusableRecDocsInterface {
  reqDocs: any;
}

const ReusableRecDocs: React.FC<ReusableReusableRecDocsInterface> = ({
  reqDocs,
}) => {
  return (
    <>
      <MainBox>
        <Container maxWidth="xl">
          <MainHeading variant="h4" color="initial" gutterBottom>
            {reqDocs.heading}
          </MainHeading>
          <SubHeading variant="h6" color="initial" gutterBottom>
            {reqDocs.subHeading}
          </SubHeading>
          {reqDocs.impNotes.map((item: any, index: any) => (
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

export default ReusableRecDocs;
