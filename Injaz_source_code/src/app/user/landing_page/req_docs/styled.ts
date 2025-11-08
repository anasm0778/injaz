"use client";
import { Box, Container, styled } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";

export const GridContainer = styled(Container)(({ theme }) => ({
    marginTop: "50px",
    marginBottom: "50px",
  }));
  export const ImageBox = styled(Box)(({ theme }) => ({
    textAlign: "center",
    marginTop: "1rem",
  }));
  export const MainCircleIcon = styled(CircleIcon)(({ theme }) => ({
    color: "black",
    fontSize: "0.5rem",
    marginRight: "5px",
  }));