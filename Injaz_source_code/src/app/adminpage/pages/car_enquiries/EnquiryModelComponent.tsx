import {
  Box,
  Button,
  Divider,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import * as React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from "axios";
import { serverUrl } from "@/utils/helper";
import { useRouter } from "next/navigation";
import DeleteEnquiry from "./DeleteEnquiry";
import ShareIcon from "@mui/icons-material/Share";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid lightgray",
  boxShadow: 24,
  p: 2,
};

const EnquiryModelComponent = ({
  details,
  open,
  setOpen,
}: {
  details: any;
  open: boolean;
  setOpen: (x: boolean) => void;
}) => {
  const [showTextField, setShowTextField] = React.useState(false);
  const [showRejectedTextField, setShowRejectedTextField] = React.useState(
    false
  );
  const [storedData, setStoredData] = React.useState<{ email?: string }>({});
  const [phoneemail, setPhoneEmail] = React.useState<{ phoneNumber?: string }>(
    {}
  );

  React.useEffect(() => {
    axios.get(serverUrl + "/admin/getAllsettings").then((res) => {
      setPhoneEmail(res.data.data[0]);
      console.log(res.data.data[0], "phoneEmail");
    });
  }, []);

  const fetchStoredData = () => {
    const storedDataString = localStorage.getItem("vales");
    if (storedDataString) {
      const parsedData = JSON.parse(storedDataString);
      setStoredData(parsedData);
    }
  };

  React.useEffect(() => {
    fetchStoredData();
  }, []);

  const router = useRouter();
  console.log(details, "detailsddddd");
  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setShowRejectedTextField(false);
    setShowTextField(false);
  };

  const HandleReload = () => {
    window.location.reload();
  };

  const handleAccepted = () => {
    setShowTextField(true); // Show TextField when "Accepted" button is clicked
    setShowRejectedTextField(false);
  };

  const handleRejected = () => {
    setShowRejectedTextField(true);
    setShowTextField(false); // Hide Accepted TextField if visible
  };

  //created booking date formated function
  function extractDate(timestamp: string): string {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}-${month}-${year}`;
  }

  const GridItem = ({ label, value }: any) => (
    <>
      <Grid item xs={6} sm={6}>
        <Typography sx={{ fontWeight: 500, color: "black" }} variant="body1">
          {label}
        </Typography>
      </Grid>
      <Grid item xs={6} sm={6}>
        <Typography sx={{ fontWeight: 500, color: "black" }} variant="body1">
          {value}
        </Typography>
      </Grid>
    </>
  );

  const detailsArray = [
    { label: "Enquiry ID", value: details._id },
    { label: "Booking ID", value: details.bookingId },
    { label: "Customer Name", value: details.name },
    { label: "Booking Date", value: extractDate(details.bookingCreated) },
    {
      label: "Car",
      value: details.carName
        ? details.carName
        : details.brand + " " + details.model,
    },
    { label: "Pickup Date", value: details.startDate },
    { label: "Drop Date", value: details.endDate },
    { label: "Pickup Location", value: details.pickUpLoc },
    { label: "Drop Location", value: details.dropLocation },
    { label: "Phone Number", value: details.phoneNumber },
    { label: "Email", value: details.email },
    { label: "Message", value: details.message },
    { label: "Status", value: details.status },
    { label: "Accepted/Rejected By", value: details.statusChangedBy },
    { label: "Reason of Rejection", value: details.statusMessage },
  ];

  //Define a function to handle the update when a row is clicked
  // const handleNewEnquiry = async (event: any) => {
  //   event.preventDefault()
  //   event.stopPropagation(); // Prevent the click event from propagating to the parent elements

  //   try {
  //     const updateData = {
  //       bookingId: details.bookingId,
  //       carName: details.carName,
  //       startDate: details.startDate,
  //       endDate: details.endDate,
  //       pickUpLoc: details.pickUpLoc,
  //       dropLocation: details.dropLocation,
  //       isNewCar: false,
  //       phoneNumber: details.phoneNumber,
  //       area: details.area,
  //       message: details.message,
  //       deliveryMode: details.deliveryMode,
  //       city: details.city,
  //       name: details.name,
  //       email: details.email,
  //       packages: details.packages,
  //       brand: details.brand,
  //       model: details.model,
  //       status: "New",
  //       statusChangedBy: storedData.email,
  //       statusMessage: "New Enquiry"
  //     };

  //     debugger;
  //     const response = await axios.patch(
  //       `${serverUrl}/user/updateInquiry/${details._id}`,
  //       updateData
  //     );

  //     console.log("Enquiry updated successfully:", response.data);
  //     if (response.data.status === 200) {
  //       // window.location.reload();
  //       handleClose();
  //       router.push("/adminpage/pages/car_enquiries/enquiryStatus/newEnquiry");
  //     }
  //   } catch (error) {
  //     console.error("Error updating enquiry:", error);
  //   }
  // };
  const handleAcceptedEnquiry = async (event: any) => {
    event.preventDefault()
    event.stopPropagation(); // Prevent the click event from propagating to the parent elements

    try {
      const updateData = {
        bookingId: details.bookingId,
        carName: details.carName,
        startDate: details.startDate,
        endDate: details.endDate,
        pickUpLoc: details.pickUpLoc,
        dropLocation: details.dropLocation,
        isNewCar: false,
        phoneNumber: details.phoneNumber,
        area: details.area,
        message: details.message,
        deliveryMode: details.deliveryMode,
        city: details.city,
        name: details.name,
        email: details.email,
        packages: details.packages,
        brand: details.brand,
        model: details.model,
        status: "accepeted",
        statusChangedBy: storedData.email,
        statusMessage: "Enquiry has been accepted"
      };

      debugger;
      const response = await axios.patch(
        `${serverUrl}/user/updateInquiry/${details._id}`,
        updateData
      );

      console.log("Enquiry accepted successfully:", response.data);
      if (response.data.status === 200) {
        // window.location.reload();
        handleClose();
        router.push(
          "/pages/adminAcceptedEnquiries"
        );
      }
    } catch (error) {
      console.error("Error updating enquiry:", error);
    }
  };
  const handleRejectEnquiry = async (event: any) => {
    event.preventDefault()
    event.stopPropagation(); // Prevent the click event from propagating to the parent elements

    try {
      const rejectionReason = event.target.elements.rejectionReason.value;
      const updateData = {
        bookingId: details.bookingId,
        carName: details.carName,
        startDate: details.startDate,
        endDate: details.endDate,
        pickUpLoc: details.pickUpLoc,
        dropLocation: details.dropLocation,
        isNewCar: true,
        phoneNumber: details.phoneNumber,
        area: details.area,
        message: details.message,
        deliveryMode: details.deliveryMode,
        city: details.city,
        name: details.name,
        email: details.email,
        packages: details.packages,
        brand: details.brand,
        model: details.model,
        status: "rejected",
        statusChangedBy: storedData.email,
        statusMessage: rejectionReason,
      };

      debugger;
      const response = await axios.patch(
        `${serverUrl}/user/updateInquiry/${details._id}`,
        updateData
      );
      

      console.log("Enquiry rejected successfully:", response.data);
      if (response.data.status === 200) {
        // window.location.reload();
        router.push(
          "/pages/adminRejectedEnquiries"
        );
        console.log(response.data);
        handleClose();
      }
    } catch (error) {
      console.error("Error updating enquiry:", error);
    }
  };

  const handleWhatsappClick = () => {
    const whatsappMessage = `Hi,\nStaff this enquiry shared from Injazrent.ae Website.\nPlease Pay Attention!\n\nBooking Date : ${extractDate(
      details.bookingCreated
    )}\nEnquiry ID : ${details._id} \nBooking ID : ${
      details.bookingId
    } \nCustomer Name : ${details.name} \nCar : ${
      details.carName ? details.carName : details.brand + " " + details.model
    }\nPickup Date : ${details.startDate}\nDrop Date : ${
      details.endDate
    }\nPickup Location : ${details.pickUpLoc}\nDrop Location : ${
      details.dropLocation
    }\nPhone Number : ${details.phoneNumber}\nEmail : ${
      details.email
    }\nMessage : ${details.message}\nStatus : ${
      details.status
    }\nStatus Changed By : ${details.statusChangedBy}\nStatus Message : ${
      details.statusMessage
    }`;
    const whatsappLink = `https://wa.me/${
      phoneemail?.phoneNumber
    }?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappLink);
  };

  return (
    <>
      {/* <VisibilityIcon color="success" onClick={handleOpen} /> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            sx={{
              textAlign: "center",
              fontWeight: 600,
              fontFamily: "sans-serif",
              marginBottom: "5px",
            }}
            variant="h6"
          >
            {/* {storedData.email} */}
            Enquiry Details
          </Typography>
          <Divider />
          <Grid container spacing={1} sx={{ padding: "5px 0px" }}>
            {detailsArray.map(
              (item, index) =>
                item.value && (
                  <GridItem key={index} label={item.label} value={item.value} />
                )
            )}
          </Grid>
          <Divider />
          <Box
            sx={{
              padding: "0rem 0rem",
              justifyContent: "space-around",
              display: "flex",
              margin: "10px 0px",
            }}
          >
            {/* <Box>
              <Button
                onClick={handleNewEnquiry}
                variant="contained"
                color="primary"
                size="small"
              >
                New
              </Button>
            </Box> */}
            <Box>
              <Button
                onClick={handleAcceptedEnquiry}
                // onClick={handleAccepted}
                variant="contained"
                color="success"
                size="small"
              >
                Accepted
              </Button>
            </Box>
            <Box>
              <Button
                // onClick={HandleReload}
                onClick={handleRejected}
                variant="contained"
                color="error"
                size="small"
              >
                Rejected
              </Button>
            </Box>
            <Box>
              <ShareIcon onClick={handleWhatsappClick} color="primary" />
            </Box>
            <Box>
              <Button
                size="small"
                onClick={handleClose}
                variant="contained"
                color="error"
              >
                Close
              </Button>
            </Box>
          </Box>
          <Box sx={{ marginTop: "10px" }}>
            {showTextField && ( // Render TextField conditionally
              <>
                <Divider sx={{ marginBottom: "10px" }} />
                <Grid container spacing={2} sx={{ alignItems: "center" }}>
                  <Grid item xs={9} sm={9} md={9} lg={9} xl={9}>
                    <TextField
                      label="Accepted by"
                      variant="outlined"
                      fullWidth
                      size="small"
                      focused
                      color="success"
                    />
                  </Grid>
                  <Grid
                    item
                    xs={3}
                    sm={3}
                    md={3}
                    lg={3}
                    xl={3}
                    sx={{ textAlign: "right" }}
                  >
                    <Button variant="contained" size="small" color="primary">
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </>
            )}
            {showRejectedTextField && (
              <>
                <Divider sx={{ marginBottom: "10px" }} />

                <form onSubmit={handleRejectEnquiry}>
                  <Grid container spacing={2} sx={{ alignItems: "center" }}>
                    <Grid item xs={9} sm={9} md={9} lg={9} xl={9}>
                      <TextField
                        name="rejectionReason"
                        label="Reason of Rejection"
                        variant="outlined"
                        fullWidth
                        size="small"
                        focused
                        color="error"
                      />
                    </Grid>
                    <Grid
                      item
                      xs={3}
                      sm={3}
                      md={3}
                      lg={3}
                      xl={3}
                      sx={{ textAlign: "right" }}
                    >
                      <Button
                        type="submit"
                        variant="contained"
                        size="small"
                        color="primary"
                      >
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </>
            )}
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default EnquiryModelComponent;
