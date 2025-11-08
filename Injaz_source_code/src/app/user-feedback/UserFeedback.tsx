"use client";
import { Button, Container, TextField, Typography, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import NavFooter from "@/utils/Na_Fo";
// import "../user/landing_page/footer/footer.css"

const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  carName: yup.string().required("Car Name is required"),
  carRegistration: yup.string().required("Car Registration No. is required"),
  phoneNumber: yup.string().required("Phone Number is required"),
  driverName: yup.string().required("Driver's Name is required"),
  pickupLocation: yup.string().required("Pickup Location is required"),
  dropLocation: yup.string().required("Drop Location is required"),
  currentLocation: yup.string().required("Current Location is required"),
  issue: yup.string().required("Issue is required"),
  assistance: yup.string().required("Your message is required"),
});

const UserFeedback = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      carName: "",
      carRegistration: "",
      phoneNumber: "",
      driverName: "",
      pickupLocation: "",
      dropLocation: "",
      currentLocation: "",
      issue: "",
      assistance: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission logic here
      console.log(values);
    },
  });
  return (
    <>
    <NavFooter/>
    <section className="user_feedback" style={{ marginTop: "30px" }}>
      <Container maxWidth="lg">
        <Typography sx={{ textAlign: "center" }} variant="h4" gutterBottom>
          My Helpdesk
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid
            container
            spacing={2}
            sx={{
              marginTop: "10px",
              padding: "15px",
              border: "2px solid #d3dee3",
              borderRadius: "5px",
            }}
          >
            <Grid item sm={12} xs={3} md={3} lg={3}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                margin="normal"
                size="small"
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
            <Grid item sm={12} xs={3} md={3} lg={3}>
              <TextField
                label="Car Name"
                variant="outlined"
                fullWidth
                margin="normal"
                size="small"
                id="carName"
                name="carName"
                value={formik.values.carName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.carName && Boolean(formik.errors.carName)}
                helperText={formik.touched.carName && formik.errors.carName}
              />
            </Grid>
            <Grid item sm={12} xs={3} md={3} lg={3}>
              <TextField
                label="Car Registration no."
                variant="outlined"
                fullWidth
                margin="normal"
                size="small"
                id="carRegistration"
                name="carRegistration"
                value={formik.values.carRegistration}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.carRegistration && Boolean(formik.errors.carRegistration)}
                helperText={formik.touched.carRegistration && formik.errors.carRegistration}
              />
            </Grid>
            <Grid item sm={12} xs={3} md={3} lg={3}>
              <TextField
                label="Phone Number"
                variant="outlined"
                size="small"
                fullWidth
                margin="normal"
                id="phoneNumber"
                name="phoneNumber"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
              />
            </Grid>
            <Grid item sm={12} xs={3} md={3} lg={3}>
              <TextField
                label="Driver's Name"
                variant="outlined"
                fullWidth
                size="small"
                margin="normal"
                id="driverName"
                name="driverName"
                value={formik.values.driverName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.driverName && Boolean(formik.errors.driverName)}
                helperText={formik.touched.driverName && formik.errors.driverName}
              />
            </Grid>
            <Grid item sm={12} xs={3} md={3} lg={3}>
              <TextField
                label="Pickup Location"
                variant="outlined"
                size="small"
                fullWidth
                margin="normal"
                id="pickupLocation"
                name="pickupLocation"
                value={formik.values.pickupLocation}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.pickupLocation && Boolean(formik.errors.pickupLocation)}
                helperText={formik.touched.pickupLocation && formik.errors.pickupLocation}
              />
            </Grid>

            <Grid item sm={12} xs={3} md={3} lg={3}>
              <TextField
                label="Drop Location"
                variant="outlined"
                size="small"
                fullWidth
                margin="normal"
                id="dropLocation"
                name="dropLocation"
                value={formik.values.dropLocation}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.dropLocation && Boolean(formik.errors.dropLocation)}
                helperText={formik.touched.dropLocation && formik.errors.dropLocation}
              />
            </Grid>
            <Grid item sm={12} xs={3} md={3} lg={3}>
              <TextField
                label="Current Location"
                variant="outlined"
                size="small"
                fullWidth
                margin="normal"
                id="currentLocation"
                name="currentLocation"
                value={formik.values.currentLocation}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.currentLocation && Boolean(formik.errors.currentLocation)}
                helperText={formik.touched.currentLocation && formik.errors.currentLocation}
              />
            </Grid>
            <Grid item sm={12} xs={3} md={3} lg={3}>
              <TextField
                label="Issue"
                variant="outlined"
                size="small"
                fullWidth
                margin="normal"
                id="issue"
                name="issue"
                value={formik.values.issue}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.issue && Boolean(formik.errors.issue)}
                helperText={formik.touched.issue && formik.errors.issue}
              />
            </Grid>
            <Grid item sm={12} xs={12} md={12} lg={12}>
              <TextField
                label="Any assistance please let us know"
                variant="outlined"
                size="small"
                multiline
                rows={4}
                fullWidth
                margin="normal"
                id="assistance"
                name="assistance"
                value={formik.values.assistance}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.assistance && Boolean(formik.errors.assistance)}
                helperText={formik.touched.assistance && formik.errors.assistance}
              />
            </Grid>
            <Grid item sm={12} xs={2} md={2} lg={2}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Submit
              </Button>
            </Grid>
          </Grid>

          {/* <TextField
            label="Zipcode"
            variant="outlined"
            size="small"
            fullWidth
            margin="normal"
          /> */}

          {/* <TextField
            type="password"
            label="Password"
            variant="outlined"
            fullWidth
            size="small"
            margin="normal"
          /> */}
        </form>
      </Container>
    </section>
    </>
    
  );
};

export default UserFeedback;
