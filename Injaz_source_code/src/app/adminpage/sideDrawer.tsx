"use client";
import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { useRouter } from "next/navigation";
import {
  Box,
  Collapse,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import SettingsIcon from "@mui/icons-material/Settings";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

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

const SideDrawer = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [topen, setTopen] = useState(false);
  const [eopen, setEopen] = useState(false);
  const [web, setWeb] = useState(false);

  const webOpenClick = () => {
    setWeb(!web);
  };
  const handleClick = () => {
    setTopen(!topen);
  };

  const eopenClick = () => {
    setEopen(!eopen);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const router = useRouter();
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
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
                //   onClick={() => router.push("/adminpage")}
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
            width: drawerWidth,
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
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={() => router.push("/adminpage")}
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
              onClick={() => router.push("/adminpage/pages/admin_cars")}
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
                    onClick={() =>
                      router.push("/adminpage/pages/manage_catego")
                    }
                  >
                    <ArrowRightAltIcon />
                    <ListItemText primary="Categories" />
                  </ListItemButton>
                  <ListItemButton
                    sx={{ pl: 8 }}
                    onClick={() => router.push("/adminpage/pages/car_brands")}
                  >
                    <ArrowRightAltIcon />
                    <ListItemText primary="Brands" />
                  </ListItemButton>
                  <ListItemButton
                    sx={{ pl: 8 }}
                    onClick={() => router.push("/adminpage/pages/car_models")}
                  >
                    <ArrowRightAltIcon />
                    <ListItemText primary="Models" />
                  </ListItemButton>
                  <ListItemButton
                    sx={{ pl: 8 }}
                    onClick={() => router.push("/adminpage/pages/car_features")}
                  >
                    <ArrowRightAltIcon />
                    <ListItemText primary="Features" />
                  </ListItemButton>
                  <ListItemButton
                    sx={{ pl: 8 }}
                    onClick={() =>
                      router.push("/adminpage/pages/manage_services")
                    }
                  >
                    <ArrowRightAltIcon />
                    <ListItemText primary="Services" />
                  </ListItemButton>
                  <ListItemButton
                    sx={{ pl: 8 }}
                    onClick={() =>
                      router.push("/adminpage/pages/engine_capacities")
                    }
                  >
                    <ArrowRightAltIcon />
                    <ListItemText primary="Engine" />
                  </ListItemButton>
                  <ListItemButton
                    sx={{ pl: 8 }}
                    onClick={() =>
                      router.push("/adminpage/pages/required_docs")
                    }
                  >
                    <ArrowRightAltIcon />
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
                    onClick={() =>
                      router.push("/adminpage/pages/car_enquiries")
                    }
                  >
                    <ListItemText primary="Car Enquiries" />
                  </ListItemButton>
                  <ListItemButton
                    sx={{ pl: 8 }}
                    onClick={() =>
                      router.push("/adminpage/pages/contact_enquiries")
                    }
                  >
                    <ListItemText primary="Contact Enquiries" />
                  </ListItemButton>
                </List>
              </Collapse>
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
                      router.push(
                        "/adminpage/pages/adminSettings/phoneAndEmail"
                      )
                    }
                  >
                    <ArrowRightAltIcon />
                    <ListItemText primary="Phone & Email" />
                  </ListItemButton>
                  <ListItemButton
                    sx={{ pl: 8 }}
                    onClick={() =>
                      router.push("/adminpage/pages/adminSettings/bannerImages")
                    }
                  >
                    <ArrowRightAltIcon />
                    <ListItemText primary="Banners" />
                  </ListItemButton>
                </List>
              </Collapse>
            </ListItem>
            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={() => router.push("/adminpage/pages/admin_location")}
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
              onClick={() => router.push("/adminpage/pages/admin_faqs")}
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
              position: "relative",
              bottom: "-11rem",
              padding: "5px 0px",
              backgroundColor: "#1976d2",
              justifyContent: "center",
            }}
            onClick={() => router.push("/")}
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
        <Main open={open}></Main>
      </Box>
    </>
  );
};

export default SideDrawer;
