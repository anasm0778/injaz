"use client";
import React from "react";
import AdminPageLogic from "@/app/adminpage";
import AdminNavbar from "@/app/adminpage/AdminNavbar";
import AddNewCar from "./AddNewCar";
import {
  Box,
  CssBaseline,
  AppBarProps as MuiAppBarProps,
  styled,
} from "@mui/material";

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

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function AddCarform() {
  const [open, setOpen] = React.useState(true);

  return (
    <AdminPageLogic>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AdminNavbar />
        <Main open={open} sx={{ backgroundColor: "#f1f3f4" }}>
          <DrawerHeader />
          <AddNewCar />
        </Main>
      </Box>
    </AdminPageLogic>
  );
}
