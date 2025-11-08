import { Box, Button, Drawer, Typography, styled } from "@mui/material";
import Image from "next/image";
const drawerWidth = 140;

// =========Styled============
export const DrawerBox = styled(Box)(({ theme }) => ({
    textAlign: "center",
  }));
  export const MainNavBox = styled(Box)(({ theme }) => ({
    display: "flex",
    backgroundColor: "white",
  }));
  export const NavButton = styled(Button)(({ theme }) => ({
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
  }));
  export const DrawerTypography: any = styled(Typography)(({ theme }) => ({
    flexGrow: 1,
    backgroundColor: "#01437d",
    cursor: "pointer",
  }));
  
  export const NavLogoImage = styled(Image)(({ theme }) => ({
    width: "100%",
    height: "auto",
    paddingTop: "10px",
  }));

  export const StyledDrawer = styled(Drawer)(({ theme }) => ({
    display: 'none',
    [theme.breakpoints.down('xs')]: {
      display: 'block',
    },
    '& .MuiDrawer-paper': {
      boxSizing: 'border-box',
      width: drawerWidth,
    },
  }));