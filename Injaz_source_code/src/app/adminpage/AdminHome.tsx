"use client";
import * as React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { useRouter } from "next/navigation";
import {
  Card,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import "../adminpage/adminhome.css";
import { serverUrl } from "@/utils/helper";
import AdminNavbar from "./AdminNavbar";

interface ApiResponse {
  data?: {
    totalBrands?: number;
    totalCars?: number;
    totalCategoryes?: number;
    totalEnquiryes?: number;
    totalContactInquires?: number;
    totalLocation?: number;
  };
}

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function AdminHome() {
  const [open, setOpen] = useState(true);
  const [datas, setdatas] = useState<ApiResponse>({});
  const router = useRouter();

  useEffect(() => {
    axios
      .get(serverUrl + "/user/dashBoard")
      .then((res) => {
        setdatas(res.data);
        console.log(datas);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [serverUrl]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AdminNavbar />
      <Main open={open}>
        <DrawerHeader />
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} sm={4} md={4} lg={4}>
              <Card>
                <Grid
                  container
                  spacing={3}
                  sx={{ alignItems: "center", cursor: "pointer" }}
                  onClick={() => router.push("/pages/adminCar")}
                >
                  <Grid item xs={4} sm={4} md={4} lg={4}>
                    <CardMedia
                      component="img"
                      image="/car-icon-png-25.png"
                      alt="Live from space album cover"
                      sx={{
                        backgroundColor: "#00800091",
                        width: 110,
                        padding: "10px",
                      }}
                    />
                  </Grid>
                  <Grid item xs={8} sm={8} md={8} lg={8}>
                    <Typography
                      sx={{
                        fontSize: 25,
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      {datas.data?.totalCars || 0}
                    </Typography>
                    <Typography
                      sx={{ fontSize: 15, textAlign: "center", color: "gray" }}
                    >
                      Total Cars
                    </Typography>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4}>
              <Card>
                <Grid
                  container
                  spacing={3}
                  sx={{ alignItems: "center", cursor: "pointer" }}
                  onClick={() => router.push("/pages/adminCategory")}
                >
                  <Grid item xs={4} sm={4} md={4} lg={4}>
                    <CardMedia
                      component="img"
                      image="/745197.png"
                      alt="Live from space album cover"
                      sx={{
                        backgroundColor: "#ff0000a1",
                        width: 110,
                        padding: "10px",
                      }}
                    />
                  </Grid>
                  <Grid item xs={8} sm={8} md={8} lg={8}>
                    <Typography
                      sx={{
                        fontSize: 25,
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      {datas.data?.totalCategoryes || 0}
                    </Typography>
                    <Typography
                      sx={{ fontSize: 15, textAlign: "center", color: "gray" }}
                    >
                      Total Categories
                    </Typography>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4}>
              <Card>
                <Grid
                  container
                  spacing={3}
                  sx={{ alignItems: "center", cursor: "pointer" }}
                  onClick={() => router.push("/pages/adminBrand")}
                >
                  <Grid item xs={4} sm={4} md={4} lg={4}>
                    <CardMedia
                      component="img"
                      image="/745197.png"
                      alt="Live from space album cover"
                      sx={{
                        backgroundColor: "yellow",
                        width: 110,
                        padding: "10px",
                      }}
                    />
                  </Grid>
                  <Grid item xs={8} sm={8} md={8} lg={8}>
                    <Typography
                      sx={{
                        fontSize: 25,
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      {datas.data?.totalBrands || 0}
                    </Typography>
                    <Typography
                      sx={{ fontSize: 15, textAlign: "center", color: "gray" }}
                    >
                      Total Brands
                    </Typography>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4}>
              <Card>
                <Grid
                  container
                  spacing={3}
                  sx={{ alignItems: "center", cursor: "pointer" }}
                  onClick={() => router.push("/pages/carEnquiries")}
                >
                  <Grid item xs={4} sm={4} md={4} lg={4}>
                    <CardMedia
                      component="img"
                      image="/envelope-icon-14.png"
                      alt="Live from space album cover"
                      sx={{
                        backgroundColor: "#0000ff73",
                        width: 110,
                        padding: "10px",
                      }}
                    />
                  </Grid>
                  <Grid item xs={8} sm={8} md={8} lg={8}>
                    <Typography
                      sx={{
                        fontSize: 25,
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      {datas.data?.totalEnquiryes || 0}
                    </Typography>
                    <Typography
                      sx={{ fontSize: 15, textAlign: "center", color: "gray" }}
                    >
                      Total Enquiries
                    </Typography>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4}>
              <Card>
                <Grid
                  container
                  spacing={3}
                  sx={{ alignItems: "center", cursor: "pointer" }}
                  onClick={() =>
                    router.push("/pages/contactEnquiries")
                  }
                >
                  <Grid item xs={4} sm={4} md={4} lg={4}>
                    <CardMedia
                      component="img"
                      image="/earth.png"
                      alt="Live from space album cover"
                      sx={{
                        backgroundColor: "#0000ff73",
                        width: 110,
                        padding: "10px",
                      }}
                    />
                  </Grid>
                  <Grid item xs={8} sm={8} md={8} lg={8}>
                    <Typography
                      sx={{
                        fontSize: 25,
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      {datas.data?.totalContactInquires || 0}
                    </Typography>
                    <Typography
                      sx={{ fontSize: 15, textAlign: "center", color: "gray" }}
                    >
                      Total Contact Enquiries
                    </Typography>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4}>
              <Card>
                <Grid
                  container
                  spacing={3}
                  sx={{ alignItems: "center", cursor: "pointer" }}
                  onClick={() => router.push("/pages/adminLocation")}
                >
                  <Grid item xs={4} sm={4} md={4} lg={4}>
                    <CardMedia
                      component="img"
                      image="/pin.png"
                      alt="Live from space album cover"
                      sx={{
                        backgroundColor: "yellow",
                        width: 110,
                        padding: "10px",
                      }}
                    />
                  </Grid>
                  <Grid item xs={8} sm={8} md={8} lg={8}>
                    <Typography
                      sx={{
                        fontSize: 25,
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      {datas.data?.totalLocation || 0}
                    </Typography>
                    <Typography
                      sx={{ fontSize: 15, textAlign: "center", color: "gray" }}
                    >
                      Total Locations
                    </Typography>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Main>
    </Box>
  );
}
