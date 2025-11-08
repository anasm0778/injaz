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
import EmailIcon from "@mui/icons-material/Email";

import {
  Button,
  CardMedia,
  Container,
  DialogContent,
  Grid,
  InputAdornment,
  TextField,
} from "@mui/material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import "../../admin_location/AdminLocation.css";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import PhoneIcon from "@mui/icons-material/Phone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import axios from "axios";
import { serverUrl } from "@/utils/helper";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import NewInquiryComponent from "@/utils/newInquiryComponent";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import AdminPageLogic from "@/app/adminpage";
import ContactMailOutlinedIcon from "@mui/icons-material/ContactMailOutlined";
import AdminNavbar from "@/app/adminpage/AdminNavbar";

// interface FormData {
//   phoneNumber: string;
//   email: string;
// }

// const schema = yup.object().shape({
//   phoneNumber: yup.string().required("Phone Number is required"),
//   email: yup.string().required("email is required"),
// });

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

export default function PhoneAndEmail() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [topen, setTopen] = React.useState(false);
  const [eopen, setEopen] = React.useState(false);
  const [web, setWeb] = React.useState(false);
  const [phoneNumber, setphoneNumber] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [whatsappNumber, setWhatsappNumber] = React.useState("");
  const [data, setData] = React.useState([]);
  const [editId, setEditId] = React.useState(null);

  const handleEdit = (id: any, phoneNumber: any, email: any, whatsappNumber: any = "") => {
    setEditId(id);
    setphoneNumber(phoneNumber);
    setEmail(email);
    setWhatsappNumber(whatsappNumber);
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setphoneNumber("");
    setEmail("");
    setWhatsappNumber("");
  };

  const handleCreate = async () => {
    try {
      const response = await axios.post(
        serverUrl + "/admin/createsettings",
        {
          phoneNumber,
          email,
          whatsappNumber,
        }
      );
      console.log("Response:", response.data);
      // Handle success, maybe show a success message

      // Fetch updated data for the table
      const updatedResponse = await axios.get(
        serverUrl + "/admin/getAllsettings"
      );
      setData(updatedResponse.data.data);

      // Clear form fields
      setphoneNumber("");
      setEmail("");
      setWhatsappNumber("");
    } catch (error) {
      console.error("Error:", error);
      // Handle error, show error message
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `${serverUrl}/admin/updateSettings/${editId}`,
        {
          phoneNumber,
          email,
          whatsappNumber,
        }
      );
      console.log("Update Response:", response.data);
      // Handle success, maybe show a success message

      // Fetch updated data for the table
      const updatedResponse = await axios.get(
        serverUrl + "/admin/getAllsettings"
      );
      setData(updatedResponse.data.data);

      // Clear form fields
      setEditId(null);
      setphoneNumber("");
      setEmail("");
    } catch (error) {
      console.error("Error:", error);
      // Handle error, show error message
    }
  };

  const handleDelete = async (id: any) => {
    try {
      await axios.delete(`${serverUrl}/admin/deleteSettings/${id}`);
      // Handle success, maybe show a success message

      // Fetch updated data for the table
      const updatedResponse = await axios.get(
        serverUrl + "/admin/getAllsettings"
      );
      setData(updatedResponse.data.data);
    } catch (error) {
      console.error("Error:", error);
      // Handle error, show error message
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (editId !== null) {
      handleUpdate();
    } else {
      handleCreate();
    }
  };

  React.useEffect(() => {
    axios
      .get(serverUrl + "/admin/getAllsettings")
      .then((res) => {
        setData(res.data.data);
        console.log(res.data.data, "phoneEmail");
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }, []);

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

  // const {
  //   control,
  //   register,
  //   handleSubmit,
  //   reset,
  //   formState,
  //   getValues,
  // } = useForm<FormData>({
  //   resolver: yupResolver(schema),
  // });

  return (
    <AdminPageLogic>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AdminNavbar />
        <Main open={open}>
          <DrawerHeader />
          <section className="phEmail">
            <Container maxWidth="xl">
              <div className="phemailhead">
                <h2>Add Phone And Email</h2>
              </div>
              <div className="phemlfield">
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                      <DialogContent>
                        <TextField
                          placeholder="Phone"
                          id="phone"
                          type="text"
                          required
                          fullWidth
                          variant="outlined"
                          size="small"
                          value={phoneNumber}
                          onChange={(e) => setphoneNumber(e.target.value)}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <PhoneIcon sx={{ color: "#0c3b69" }} />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </DialogContent>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                      <DialogContent>
                        <TextField
                          placeholder="Email"
                          id="email"
                          type="text"
                          fullWidth
                          variant="outlined"
                          size="small"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <EmailIcon sx={{ color: "#0c3b69" }} />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </DialogContent>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                      <DialogContent>
                        <TextField
                          placeholder="WhatsApp Number"
                          id="whatsapp"
                          type="text"
                          fullWidth
                          variant="outlined"
                          size="small"
                          value={whatsappNumber}
                          onChange={(e) => setWhatsappNumber(e.target.value)}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <WhatsAppIcon sx={{ color: "#25D366" }} />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </DialogContent>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                      <div className="phemailBtn">
                        <Button
                          type="submit"
                          variant="contained"
                          size="small"
                          color="primary"
                          sx={{ marginRight: "15px" }}
                        >
                          {editId !== null ? "Save" : "Create"}
                        </Button>
                        {editId !== null && (
                          <Button
                            variant="contained"
                            size="small"
                            color="error"
                            onClick={handleCancelEdit}
                          >
                            Cancel
                          </Button>
                        )}
                      </div>
                    </Grid>
                  </Grid>
                </form>
              </div>
              <div className="table-container">
                <table>
                  <thead>
                    <tr className="tableTR">
                      <th className="tableTH">Email</th>
                      <th className="tableTH">Phone</th>
                      <th className="tableTH">WhatsApp</th>
                      <th className="tableTH">Action</th>
                      <th className="tableTH">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item: any) => (
                      <tr className="tableTR-2" key={item._id}>
                        <td className="tableTD">{item.email}</td>
                        <td className="tableTD">{item.phoneNumber}</td>
                        <td className="tableTD">{item.whatsappNumber || "N/A"}</td>
                        <td className="tableTD">
                          <Button
                            variant="contained"
                            size="small"
                            color="success"
                            onClick={() =>
                              handleEdit(item._id, item.phoneNumber, item.email, item.whatsappNumber)
                            }
                          >
                            Edit
                          </Button>
                        </td>
                        <td className="tableTD">
                          <Button
                            variant="contained"
                            size="small"
                            color="error"
                            onClick={() => handleDelete(item._id)}
                          >
                            delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="showphEmail">
                {/* <div className="phemailhead">
                <h2>Phone And Email</h2>
              </div> */}
                {/* {data.map((item: any) => (
                <div className="editphemail" key={item._id}>
                  <h3>Phone: {item.phoneNumber}</h3>
                  <h3>Email: {item.email}</h3>
                  <Button variant="contained" size="small" color="primary">
                    Edit
                  </Button>
                </div>
              ))} */}
                {/* <Grid container spacing={3}>
                <Grid item xs={12} sm={5} md={5} lg={5} xl={5}>
                  <DialogContent>
                    <h3>+919874563210</h3>
                  </DialogContent>
                </Grid>
                <Grid item xs={12} sm={5} md={5} lg={5} xl={5}>
                  <DialogContent>
                    <h3>info@logicrent.ae</h3>
                  </DialogContent>
                </Grid>
                <Grid item xs={12} sm={2} md={2} lg={2} xl={2}>
                  <DialogContent>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      sx={{ padding: "" }}
                    >
                      Edit
                    </Button>
                  </DialogContent>
                </Grid>
              </Grid> */}
              </div>
            </Container>
          </section>
        </Main>
      </Box>
    </AdminPageLogic>
  );
}
