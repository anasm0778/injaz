"use client";
import React from "react";
import { useState } from "react";
import EnquiryForm from "../enquiry-form/EnquiryForm";
import { useRouter } from "next/navigation";
import Navlinks from "../navlinks/NavLinks";
import axios from "axios";
import { serverUrl } from "@/utils/helper";
import { useTranslation } from "react-i18next";
import Image from "next/image";

// ** mui Imports **
import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Toolbar,
  Typography,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from "@mui/icons-material/Category";
import CustomCollapsibleListItem from "./CustomCollapsibleListItem";
interface Props {
  data: any;
}

function Navbar(props: Props) {
  const { t } = useTranslation();
  const { data } = props;
  const [eopen, setEopen] = React.useState(false);
  const [brandopen, setbrandopen] = React.useState(false);
  const [catOpen, setCatOpen] = React.useState(false);
  const [subsOpen, setSubsOpen] = React.useState(false);
  const [location, setLocation] = useState([]);
  const [drop, setdrop] = useState([]);
  const [cat, setCat] = useState([]);
  const router = useRouter();

  React.useEffect(() => {
    axios
      .get(serverUrl + "/user/getAllcarLoaction")
      .then((res) => {
        setLocation(res.data.data);
      })
      .catch((err) => {
        console.log(err, "error");
      });

    axios
      .get(serverUrl + "/user/getAllBrands")
      .then((res) => {
        setdrop(res.data.data);
      })
      .catch((err) => {
        console.log(err, "error");
      });

    axios
      .get(serverUrl + "/user/getAllCategoryes")
      .then((res) => {
        setCat(res.data.data);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }, []);


  const eopenClick = () => {
    setEopen(!eopen);
  };
  const brandopenClick = () => {
    setbrandopen(!brandopen);
  };
  const catOpenClick = () => {
    setCatOpen(!catOpen);
  };
  const subsOpenClick = () => {
    setSubsOpen(!subsOpen);
  };

  const subscriptionData = [
    {
      name: "daily",
    },
    {
      name: "weekly",
    },
    {
      name: "monthly",
    },
  ];

  const customCollapsibleListItemArray = [
    {
      id: 1,
      toggleClick: eopenClick,
      Icon: LocationOnIcon,
      text: "LOCATION",
      open: eopen,
      data: location,
      setOpen: setEopen,
      queryParam: "location",
    },
    {
      id: 2,
      toggleClick: brandopenClick,
      Icon: DashboardIcon,
      text: "BRAND",
      open: brandopen,
      data: drop,
      setOpen: setbrandopen,
      queryParam: "brand",
    },
    {
      id: 3,
      toggleClick: catOpenClick,
      Icon: CategoryIcon,
      text: "CATEGORY",
      open: catOpen,
      data: cat,
      setOpen: setCatOpen,
      queryParam: "category",
    },
    {
      id: 4,
      toggleClick: subsOpenClick,
      Icon: CategoryIcon,
      text: "SUBSCRIPTION",
      open: subsOpen,
      data: subscriptionData,
      setOpen: setSubsOpen,
      queryParam: "",
    },
  ];


  return (
    <>
      <Box
        id="mainNavbar"
        sx={{
          display: "flex",
          backgroundColor: "#01437d",
        }}
      >
        <CssBaseline />
        <AppBar component="nav" sx={{ backgroundColor: "#01437d" }}>
          <Toolbar>
            <Typography
              component="div"
              sx={{
                flexGrow: 1,
                display: { xs: "none", sm: "block" },
                cursor: "pointer",
              }}
              onClick={() => router.push("/")}
            >
              <Image
                src="/injaz white colour logo.png"
                alt="appbar-logo"
                height={56}
                width={180}
                loading="lazy"
              />
            </Typography>
            <Navlinks data={data} />
            <Box
              sx={{
                padding: { xs: "0px", sm: "16px" },
                width: { xs: "100%", sm: "auto" },
                textAlign: { xs: "right" },
                display: "flex",
              }}
            >
              <Button
                onClick={() => router.push("/pages/login")}
                sx={{
                  "&:hover": {
                    backgroundColor: "black",
                    color: "white",
                    padding: "5px 20px !important",
                  },
                  color: "black",
                  fontWeight: "bold",
                  textTransform: "capitalize",
                  marginRight: "10px",
                  fontSize: "1rem",
                  padding: "4px 20px",
                  borderRadius: "25px",
                  backgroundColor: "white",
                }}
                variant="text"
              >
                {t("landingPage:navbar.login")}
              </Button>
              <EnquiryForm />
            </Box>
          </Toolbar>
        </AppBar>
        <Box component="main">
          <Toolbar />
        </Box>
      </Box>
    </>
  );
}

export default Navbar;
