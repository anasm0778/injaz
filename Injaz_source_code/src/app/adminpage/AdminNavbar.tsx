"use client";
import * as React from "react";
import { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import SettingsIcon from "@mui/icons-material/Settings";
import RemoveIcon from "@mui/icons-material/Remove";
import Collapse from "@mui/material/Collapse";
import AddIcon from "@mui/icons-material/Add";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ContactMailOutlinedIcon from "@mui/icons-material/ContactMailOutlined";
import { useRouter } from "next/navigation";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import "../adminpage/adminhome.css";
import { serverUrl } from "@/utils/helper";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import NewInquiryComponent from "@/utils/newInquiryComponent";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import AcceptedInquiryComponent from "@/utils/AcceptedInquiryComponent";
import RejectedInquiryComponent from "@/utils/RejectedInquiryComponent";
import AllInquiryComponent from "@/utils/AllInquiryComponent";
import EnquiryCountComponent from "@/utils/EnquiryCountComponent";
// import EnquiryCountComponent from "@/utils/EnquiryCountComponent";
import ManageHistoryOutlinedIcon from "@mui/icons-material/ManageHistoryOutlined";
import DirectionsCarFilledOutlinedIcon from "@mui/icons-material/DirectionsCarFilledOutlined";
import LocalCarWashOutlinedIcon from "@mui/icons-material/LocalCarWashOutlined";
import MiscellaneousServicesOutlinedIcon from "@mui/icons-material/MiscellaneousServicesOutlined";
import IntegrationInstructionsOutlinedIcon from "@mui/icons-material/IntegrationInstructionsOutlined";
import MinorCrashOutlinedIcon from "@mui/icons-material/MinorCrashOutlined";
import ArticleIcon from "@mui/icons-material/Article";
import ViewCarouselOutlinedIcon from "@mui/icons-material/ViewCarouselOutlined";
import TtyIcon from "@mui/icons-material/Tty";

const drawerWidth = 240;
const serverAPI = "https://injazrent.ae/api";
const localAPI = "http://localhost:4000";

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

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
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

const AdminNavbar = () => {
  const theme = useTheme();
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const [topen, setTopen] = useState(false);
  const [eopen, setEopen] = useState(false);
  const [web, setWeb] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
    setTopen(!topen);
  };
  const eopenClick = () => {
    setEopen(!eopen);
  };

  const webOpenClick = () => {
    setWeb(!web);
  };
  return (
    <>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ cursor: "pointer" }}
              // onClick={() => router.push("/adminpage")}
            >
              {/* Admin Dashboard */}
            </Typography>
            <div style={{ display: "flex" }}>
              <Typography
                variant="subtitle1"
                noWrap
                component="div"
                sx={{ cursor: "pointer" }}
                onClick={() => router.push("/")}
              >
                Home
              </Typography>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: open ? drawerWidth : "0px",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader sx={{ backgroundColor: "#1976d2" }}>
          <CardMedia
            component="img"
            sx={{ width: "80%", cursor: "pointer" }}
            image="/injaz white colour logo.png"
            title="logo"
          />
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon sx={{color:"white"}}/>
            ) : (
              <ChevronRightIcon sx={{color:"white"}}/>
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List sx={{ marginBottom: "2rem" }}>
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => router.push("/pages/adminPage")}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                fontSize: "12px",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <DashboardCustomizeIcon />
              </ListItemIcon>
              <ListItemText
                primary="Dashboard"
                sx={{ opacity: open ? 1 : 0, fontSize: "5px" }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => router.push("/pages/adminCar")}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                fontSize: "12px",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <TimeToLeaveIcon />
              </ListItemIcon>
              <ListItemText
                primary="Cars"
                sx={{ opacity: open ? 1 : 0, fontSize: "5px" }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton onClick={handleClick}>
              <ListItemIcon sx={{ minWidth: "52px" }}>
                <SettingsIcon sx={{ marginLeft: "4px" }} />
              </ListItemIcon>
              <ListItemText primary="Car Settings" />
              {topen ? (
                <RemoveIcon sx={{ fontSize: "13px" }} />
              ) : (
                <AddIcon sx={{ fontSize: "13px" }} />
              )}
            </ListItemButton>
            <Collapse in={topen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  sx={{ pl: 8, fontSize: "5px" }}
                  onClick={() => router.push("/pages/adminCategory")}
                >
                  <ManageHistoryOutlinedIcon
                    fontSize="small"
                    sx={{ marginRight: "5px" }}
                  />
                  <ListItemText primary="Categories" />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 8 }}
                  onClick={() => router.push("/pages/adminBrand")}
                >
                  <DirectionsCarFilledOutlinedIcon
                    fontSize="small"
                    sx={{ marginRight: "5px" }}
                  />
                  <ListItemText primary="Brands" />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 8 }}
                  onClick={() => router.push("/pages/adminModel")}
                >
                  <LocalCarWashOutlinedIcon
                    fontSize="small"
                    sx={{ marginRight: "5px" }}
                  />
                  <ListItemText primary="Models" />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 8 }}
                  onClick={() => router.push("/pages/adminFeature")}
                >
                  <MinorCrashOutlinedIcon
                    fontSize="small"
                    sx={{ marginRight: "5px" }}
                  />
                  <ListItemText primary="Features" />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 8 }}
                  onClick={() =>
                    router.push("/pages/adminService")
                  }
                >
                  <MiscellaneousServicesOutlinedIcon
                    fontSize="small"
                    sx={{ marginRight: "5px" }}
                  />
                  <ListItemText primary="Services" />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 8 }}
                  onClick={() =>
                    router.push("/pages/adminEngineCapacity")
                  }
                >
                  <IntegrationInstructionsOutlinedIcon
                    fontSize="small"
                    sx={{ marginRight: "5px" }}
                  />
                  <ListItemText primary="Engine" />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 8 }}
                  onClick={() => router.push("/pages/adminRequiredDocument")}
                >
                  <ArticleIcon fontSize="small" sx={{ marginRight: "5px" }} />

                  <ListItemText primary="Documents" />
                </ListItemButton>
              </List>
            </Collapse>
          </ListItem>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton onClick={eopenClick}>
              <ListItemIcon sx={{ minWidth: "52px" }}>
                <MailOutlineIcon sx={{ marginLeft: "4px" }} />
              </ListItemIcon>
              <ListItemText primary="Enquiries" />
              {/* <AllInquiryComponent /> */}
              <EnquiryCountComponent filterType="new" />
              {eopen ? (
                <RemoveIcon sx={{ fontSize: "13px" }} />
              ) : (
                <AddIcon sx={{ fontSize: "13px" }} />
              )}
            </ListItemButton>
            <Collapse in={eopen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  sx={{ pl: 8 }}
                  onClick={() => router.push("/pages/adminCarEnquiries")}
                >
                  <ArrowRightAltIcon />
                  <ListItemText primary="All" />
                  {/* <AllInquiryComponent /> */}
                  <EnquiryCountComponent filterType="all" />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 8 }}
                  onClick={() =>
                    router.push(
                      "/pages/adminNewEnquiries"
                    )
                  }
                >
                  <ArrowRightAltIcon />
                  <ListItemText primary="New" />
                  {/* <NewInquiryComponent /> */}
                  <EnquiryCountComponent filterType="new" />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 8 }}
                  onClick={() =>
                    router.push(
                      "/pages/adminAcceptedEnquiries"
                    )
                  }
                >
                  <ArrowRightAltIcon />
                  <ListItemText primary="Accepted" />
                  {/* <AcceptedInquiryComponent /> */}
                  <EnquiryCountComponent filterType="accepted" />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 8 }}
                  onClick={() =>
                    router.push(
                      "/pages/adminRejectedEnquiries"
                    )
                  }
                >
                  <ArrowRightAltIcon />
                  <ListItemText primary="Rejected" />
                  {/* <RejectedInquiryComponent /> */}
                  <EnquiryCountComponent filterType="rejected" />
                </ListItemButton>
              </List>
            </Collapse>
          </ListItem>
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => router.push("/pages/adminContactEnquiries")}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <ContactMailOutlinedIcon />
              </ListItemIcon>
              <ListItemText
                primary="Contact Enquiries"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton onClick={webOpenClick}>
              <ListItemIcon sx={{ minWidth: "52px" }}>
                <ManageAccountsIcon sx={{ marginLeft: "4px" }} />
              </ListItemIcon>
              <ListItemText primary="Web Settings" />
              {web ? (
                <RemoveIcon sx={{ fontSize: "13px" }} />
              ) : (
                <AddIcon sx={{ fontSize: "13px" }} />
              )}
            </ListItemButton>
            <Collapse in={web} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  sx={{ pl: 8 }}
                  onClick={() =>
                    router.push("/pages/adminPhoneAndEmail")
                  }
                >
                  <TtyIcon fontSize="small" sx={{ marginRight: "5px" }} />
                  <ListItemText primary="Phone & Email" />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 8 }}
                  onClick={() =>
                    router.push("/pages/adminBannerImages")
                  }
                >
                  <ViewCarouselOutlinedIcon
                    fontSize="small"
                    sx={{ marginRight: "5px" }}
                  />
                  <ListItemText primary="General Banners" />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 8 }}
                  onClick={() =>
                    router.push("/pages/adminLandingPageBanners")
                  }
                >
                  <ViewCarouselOutlinedIcon
                    fontSize="small"
                    sx={{ marginRight: "5px" }}
                  />
                  <ListItemText primary="Landing Page Banners" />
                </ListItemButton>
              </List>
            </Collapse>
          </ListItem>
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => router.push("/pages/adminAdminLocation")}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <LocationOnIcon />
              </ListItemIcon>
              <ListItemText
                primary="Locations"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => router.push("/pages/adminAdminFaqs")}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <LiveHelpIcon />
              </ListItemIcon>
              <ListItemText primary="FAQs" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>
        <Box
          sx={{
            color: "white",
            ...(open && { textAlign: "right", width: "100%" }),
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            position: "fixed",
            width: "240px",
            bottom: "0px",
            padding: "5px 0px",
            backgroundColor: "#1976d2",
            justifyContent: "center",
          }}
          onClick={() => {
            localStorage.removeItem("isAdmin");
            router.push("/pages/login");
          }}
        >
          <Box sx={{ fontSize: "20px", fontWeight: 500 }}>Logout</Box>
          <Box>
            <LogoutIcon
              fontSize="medium"
              sx={{ paddingTop: "5px", paddingLeft: "5px" }}
            />
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default AdminNavbar;
