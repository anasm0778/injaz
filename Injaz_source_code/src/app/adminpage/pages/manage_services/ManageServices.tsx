"use client";
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
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
import { useRouter } from "next/navigation";
import { Button, CardMedia, Container } from "@mui/material";
// import "./ManageServ.css";
import SerTableTest from "./SerTableTest.";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import "../admin_cars/AdminCars.css";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import NewInquiryComponent from "@/utils/newInquiryComponent";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import AdminPageLogic from "../..";
import ContactMailOutlinedIcon from "@mui/icons-material/ContactMailOutlined";
import AdminNavbar from "../../AdminNavbar";

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

export default function ManageServices() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [topen, setTopen] = React.useState(false);
  const [eopen, setEopen] = React.useState(false);
  const [web, setWeb] = React.useState(false);

  const webOpenClick = () => {
    setWeb(!web);
  };

  const router = useRouter();

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

  return (
    <AdminPageLogic>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AdminNavbar />
        <Container maxWidth="xl">
          <Main open={open} sx={{ padding: "0px" }}>
            <DrawerHeader />
            <div className="cartexhead">
              <div className="carheadtext">
                <h1>Manage Services</h1>
              </div>
              <div className="carheadbtn">
                <Button
                  variant="contained"
                  size="small"
                  color="primary"
                  onClick={() => router.back()}
                  sx={{ marginRight: "10px", textTransform: "capitalize" }}
                  startIcon={<KeyboardBackspaceIcon />}
                >
                  back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{ textTransform: "capitalize" }}
                  onClick={() =>
                    router.push(
                      "/pages/adminAddNewService"
                    )
                  }
                >
                  Add New
                </Button>
              </div>
            </div>
            <SerTableTest />
          </Main>
        </Container>
      </Box>
    </AdminPageLogic>
  );
}
