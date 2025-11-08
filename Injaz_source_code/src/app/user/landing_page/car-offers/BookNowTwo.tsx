import React from "react";
import { useForm, Controller, useFormState } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import {
  TextField,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  InputAdornment,
  DialogActions,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import DateRangeIcon from "@mui/icons-material/DateRange";
import MessageIcon from "@mui/icons-material/Message";
import "../enquiry-form/enquiryForm.css";
import Swal from "sweetalert2";
import { serverUrl } from "@/utils/helper";

interface FormData {
  carName: string;
   phoneNumber: string;
   email: string;
   startDate: Date;
   endDate: Date;
   area: string;
  name: string;
   message: string;
   city: string;
   pickUpLoc: string;
   dropLocation: string;
}

const schema = yup.object().shape({
  carName: yup.string().required("Car Name is required"),
   phoneNumber: yup.string().required("Phone Number is required"),
   email: yup.string().required("email is required"),
   startDate: yup.date().required("startDate is required"),
   endDate: yup.date().required("endDate is required").min(
    yup.ref('startDate'),
    "end date can't be before start date"
  ),
   area: yup.string().required("area is required"),
  name: yup.string().required("name is required"),
   message: yup.string().required("message is required"),
   city: yup.string().required("city is required"),
   pickUpLoc: yup.string().required("pickUpLoc is required"),
   dropLocation: yup.string().required("dropLocation is required"),
  // ... other validations
});
const serverAPI='https://logicrent.ae/api'
const localAPI ='http://localhost:4000'

const BookNowTwo: React.FC = () => {
  const {
    control,
    register,
    
    //formState.errors,
    handleSubmit,
    formState,
    getValues
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

 

  const onSubmiti = async () => {
    const data  =getValues()
    //  
    try {
        const response = await axios.post(
          serverUrl+"/user/createInquiry",{
          ...data
        }
        );
  
        // Handle success response
        console.log(response.data);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Data submitted successfully!",
        });
  
        // Close the dialog or handle any other UI state changes here
        handleClose();
      } catch (error) {
        // Handle error response
        console.error("Error submitting data:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error submitting data. Please try again later.",
        });
      }
  };

  return (
    <>
      <Button
        variant="contained"
        color="error"
        onClick={handleClickOpen}
        className="booknow_btn"
      >
        book Now
      </Button>
      <Dialog className="dialog_css" open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit(onSubmiti)}>
          <DialogTitle>Booking</DialogTitle>
          <DialogContent>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  autoFocus
                  placeholder="Name"
                  id="name"
                 
                  type="text"
                  fullWidth
                  variant="standard"
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon sx={{ color: "#0c3b69" }} />
                      </InputAdornment>
                    ),
                  }}
                  error={formState.errors?.name ? true : false}
                  helperText={formState.errors?.name?.message}
                  {...register("name", { required: true })}
                />
              )}
            />
          </DialogContent>
           <DialogContent>
            <Controller
              name="carName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  autoFocus
                  placeholder="Car Name"
                  id="carName"
                  type="text"
                  fullWidth
                  variant="standard"
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <TimeToLeaveIcon sx={{ color: "#0c3b69" }} />
                      </InputAdornment>
                    ),
                  }}
                  error={formState.errors?.carName ? true : false}
                  helperText={formState.errors?.carName?.message}
                  {...register("carName", { required: true })}
                />
              )}
            />
          </DialogContent>
          <DialogContent>
            <Controller
              name="phoneNumber"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  autoFocus
                  placeholder="Phone"
                  id="phone"
                  type="text"
                  fullWidth
                  variant="standard"
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon sx={{ color: "#0c3b69" }} />
                      </InputAdornment>
                    ),
                  }}
                  error={formState.errors?.phoneNumber ? true : false}
                  helperText={formState.errors?.phoneNumber?.message}
                  {...register("phoneNumber", { required: true })}
                />
              )}
            />
          </DialogContent>
          <DialogContent>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  autoFocus
                  placeholder="Email"
                  id="email"
                  type="text"
                  fullWidth
                  variant="standard"
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon sx={{ color: "#0c3b69" }} />
                      </InputAdornment>
                    ),
                  }}
                  error={formState.errors?.email ? true : false}
                  helperText={formState.errors?.email?.message}
                  {...register("email", { required: true })}
                />
              )}
            />
          </DialogContent>
          <DialogContent>
            <Controller
              name="pickUpLoc"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  autoFocus
                  placeholder="Pick up Location"
                  id="pickUpLoc"
                  type="text"
                  fullWidth
                  variant="standard"
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon sx={{ color: "#0c3b69" }} />
                      </InputAdornment>
                    ),
                  }}
                  error={formState.errors?.pickUpLoc ? true : false}
                  helperText={formState.errors?.pickUpLoc?.message}
                  {...register("pickUpLoc", { required: true })}
                />
              )}
            />
          </DialogContent>
          <DialogContent>
            <Controller
              name="dropLocation"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  autoFocus
                  placeholder="Drop Location"
                  id="dropLocation"
                  type="text"
                  fullWidth
                  variant="standard"
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon sx={{ color: "#0c3b69" }} />
                      </InputAdornment>
                    ),
                  }}
                  error={formState.errors?.dropLocation ? true : false}
                  helperText={formState.errors?.dropLocation?.message}
                  {...register("dropLocation", { required: true })}
                />
              )}
            />
          </DialogContent> 
          <DialogContent>
            <Controller
              name="startDate"
              control={control}
            //   defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  autoFocus
                  label="Pick Up Date"
                  placeholder="Pick Up"
                  id="pick-up"
                  type="date"
                  fullWidth
                  variant="standard"
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <DateRangeIcon sx={{ color: "#0c3b69" }} />
                      </InputAdornment>
                    ),
                  }}
                  error={formState.errors?.startDate ? true : false}
                  helperText={formState.errors?.startDate?.message}
                  {...register("startDate", { required: true })}
                />
              )}
            />
          </DialogContent>
          <DialogContent>
            <Controller
              name="endDate"
              control={control}
            //   defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  autoFocus
                  label="Pick Off Date"
                  placeholder="Pick Off"
                  id="pick-off"
                  type="date"
                  fullWidth
                  variant="standard"
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <DateRangeIcon sx={{ color: "#0c3b69" }} />
                      </InputAdornment>
                    ),
                  }}
                  error={formState.errors?.endDate ? true : false}
                  helperText={formState.errors?.endDate?.message}
                  {...register("endDate", { required: true })}
                />
              )}
            />
          </DialogContent>
          <DialogContent>
            <Controller
              name="message"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  autoFocus
                  placeholder="Message"
                  id="message"
                  type="text"
                  fullWidth
                  variant="standard"
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MessageIcon sx={{ color: "#0c3b69" }} />
                      </InputAdornment>
                    ),
                  }}
                  error={formState.errors?.message ? true : false}
                  helperText={formState.errors?.message?.message}
                  {...register("message", { required: true })}
                />
              )}
            />
          </DialogContent>
          <DialogContent>
            <Controller
              name="city"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  autoFocus
                  placeholder="City"
                  id="city"
                  type="text"
                  fullWidth
                  variant="standard"
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOnIcon sx={{ color: "#0c3b69" }} />
                      </InputAdornment>
                    ),
                  }}
                  error={formState.errors?.city ? true : false}
                  helperText={formState.errors?.city?.message}
                  {...register("city", { required: true })}
                />
              )}
            />
          </DialogContent> 
          <DialogContent>
            <Controller
              name="area"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  autoFocus
                  placeholder="Area"
                  id="area"
                  type="text"
                  fullWidth
                  variant="standard"
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOnIcon sx={{ color: "#0c3b69" }} />
                      </InputAdornment>
                    ),
                  }}
                  error={formState.errors?.area ? true : false}
                  helperText={formState.errors?.area?.message}
                  {...register("area", { required: true })}
                />
              )}
            />
          </DialogContent> 
          <DialogActions>
            <Button variant="contained" size="small" onClick={handleClose}>
              Cancel
            </Button>
            <button type="submit">
            {/* <Button
              type="submit"
              // onClick={handleClose}
              variant="contained"
              size="small"
            > */}
              Submit
            </button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default BookNowTwo;
