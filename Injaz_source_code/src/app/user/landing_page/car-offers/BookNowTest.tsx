"use client"
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Swal from 'sweetalert2';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { serverUrl } from '@/utils/helper';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  carName: Yup.string().required('Car Name is required'),
  phoneNumber: Yup.string().required('Phone number is required').matches(/^[0-9]{10}$/, 'Invalid phone number'),
  email: Yup.string().required('Email is required').email('Invalid email address'),
  // Add validation for other fields here
});
const serverAPI='https://logicrent.ae/api'
const localAPI ='http://localhost:4000'

const BookNowTest = () => {
  const [open, setOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      carName: '',
      phoneNumber: '',
      email: '',
      // Add initial values for other fields here
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      axios
        .post(serverUrl+'/user/createInquiry', values)
        .then((res) => {
          Swal.fire('Sent!', 'Your Booking has been Sent.', 'success');
          formik.resetForm();
          handleClose(); // Close the dialog after successful submission
        })
        .catch((error) => {
          // Handle API error here
        });
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" color="error" onClick={handleClickOpen} className="booknow_btn">
        book Now
      </Button>
      <Dialog className="dialog_css" open={open} onClose={handleClose}>
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle>Booking</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              required
              label="Name"
              fullWidth
              variant="standard"
              size="small"
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon sx={{ color: '#0c3b69' }} />
                  </InputAdornment>
                ),
              }}
            />
          </DialogContent>
          {/* Add other form fields as needed */}
          <DialogActions>
            <Button variant="contained" size="small" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" size="small">
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default BookNowTest;