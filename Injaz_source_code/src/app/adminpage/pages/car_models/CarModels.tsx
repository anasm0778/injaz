"use client";
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { useRouter } from "next/navigation";
import { Button,  Container } from "@mui/material";
import ModelTableTest from "./ModelTableTest";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import "../admin_cars/AdminCars.css";
import AdminPageLogic from "../..";
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

export default function CarModels() {
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
                <h1>Car Models</h1>
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
                    router.push("/pages/adminAddNewModel")
                  }
                >
                  Add New
                </Button>
              </div>
            </div>
            <ModelTableTest />
          </Main>
        </Container>
      </Box>
    </AdminPageLogic>
  );
}
