"use client";
import * as React from "react";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import SettingsIcon from "@mui/icons-material/Settings";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import { useRouter } from "next/navigation";
import {
  Button,
  Card,
  Container,
  Grid,
  CardMedia,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  ListSubheader,
  styled,
  useTheme,
  Box,
  CssBaseline,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import "../../admin_location/AdminLocation.css";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import PublishIcon from "@mui/icons-material/Publish";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import NewInquiryComponent from "@/utils/newInquiryComponent";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import AdminPageLogic from "@/app/adminpage";
import ContactMailOutlinedIcon from "@mui/icons-material/ContactMailOutlined";
import AdminNavbar from "@/app/adminpage/AdminNavbar";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

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

export default function BannerImages() {
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

  const [selectedFiles, setSelectedFiles] = React.useState<File[]>([]);
  const [imageURLs, setImageURLs] = React.useState<string[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileList = Array.from(files) as File[];
      setSelectedFiles(fileList);
      const urls = fileList.map((file) => URL.createObjectURL(file));
      setImageURLs(urls);
    }
  };

  const removeImage = (index: number) => {
    const updatedFiles = selectedFiles.filter((file, i) => i !== index);
    const updatedURLs = imageURLs.filter((url, i) => i !== index);
    setSelectedFiles(updatedFiles);
    setImageURLs(updatedURLs);
  };

  return (
    <AdminPageLogic>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AdminNavbar />
        <Main open={open}>
          <DrawerHeader />
          <section className="bannerImages">
            <Container maxWidth="xl">
              <div className="phemailhead">
                <h2>Banner Images</h2>
              </div>
              <div className="banImgfield">
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                  sx={{ width: "100%", margin: "15px 0px" }}
                >
                  Upload Banners
                  <VisuallyHiddenInput
                    type="file"
                    onChange={handleFileChange}
                    multiple
                  />
                </Button>
                {imageURLs.length > 0 && (
                  <>
                    <div className="showimages">
                      <div className="showimagehead">
                        <h3>Selected Banners:</h3>
                      </div>
                      <div className="showimagemain">
                        <Grid container spacing={3}>
                          {imageURLs.map((url, index) => (
                            <Grid
                              item
                              xs={6}
                              sm={3}
                              md={3}
                              lg={3}
                              xl={3}
                              key={index}
                            >
                              <Card
                                sx={{
                                  maxWidth: 345,
                                  backgroundColor: "#add8e66b",
                                }}
                              >
                                <CardMedia
                                  component="img"
                                  height="140"
                                  image={url}
                                  alt={`Selected Banner ${index + 1}`}
                                  sx={{ objectFit: "contain" }}
                                />
                              </Card>
                              <Button
                                variant="contained"
                                sx={{ width: "100%" }}
                                size="small"
                                color="error"
                                onClick={() => removeImage(index)}
                              >
                                Remove
                              </Button>
                            </Grid>
                          ))}
                        </Grid>
                      </div>
                    </div>
                    <div className="banSubBtn">
                      <Button
                        startIcon={<PublishIcon />}
                        fullWidth
                        sx={{ margin: "15px 0px" }}
                        variant="contained"
                        onClick={() => {
                          alert("This is the old banner system. Please use 'Landing Page Banners' in Web Settings for the working banner management system.");
                          router.push("/pages/adminLandingPageBanners");
                        }}
                      >
                        Submit
                      </Button>
                    </div>
                  </>
                )}
              </div>
              <div className="apiImages">
                <div className="apiImgHead">
                  <h3>Our Banners</h3>
                </div>
                <ImageList sx={{ width: "500", height: 450 }} cols={4}>
                  <ImageListItem key="Subheader" cols={4}>
                    <ListSubheader component="div">From Database</ListSubheader>
                  </ImageListItem>
                  {itemData.map((item) => (
                    <ImageListItem key={item.img}>
                      <img
                        srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                        src={`${item.img}?w=248&fit=crop&auto=format`}
                        alt={item.title}
                        loading="lazy"
                      />
                      <ImageListItemBar
                        title={item.title}
                        subtitle={item.author}
                        sx={{ backgroundColor: "#cea5a578" }}
                        actionIcon={
                          <IconButton
                            sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                            aria-label={`info about ${item.title}`}
                          >
                            <DeleteIcon color="error" />
                          </IconButton>
                        }
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </div>
            </Container>
          </section>
        </Main>
      </Box>
    </AdminPageLogic>
  );
}

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
    author: "@bkristastucchio",
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
    author: "@rollelflex_graphy726",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
    author: "@helloimnik",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
    author: "@nolanissac",
    cols: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
    author: "@hjrc33",
    cols: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
    author: "@arwinneil",
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
    author: "@tjdragotta",
  },
  {
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
    author: "@katie_wasserman",
  },
  // {
  //   img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
  //   title: "Mushrooms",
  //   author: "@silverdalex",
  //   rows: 2,
  //   cols: 2,
  // },
  // {
  //   img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
  //   title: "Tomato basil",
  //   author: "@shelleypauls",
  // },
  // {
  //   img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
  //   title: "Sea star",
  //   author: "@peterlaster",
  // },
  // {
  //   img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
  //   title: "Bike",
  //   author: "@southside_customs",
  //   cols: 2,
  // },
];
