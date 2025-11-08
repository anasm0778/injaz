"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Container, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
import { serverUrl } from "@/utils/helper";
import NavFooter from "@/utils/Na_Fo";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: number;
  city: string;
  area: string;
  zipcode: string;
  locality: string;
  address: string;
}

const schema = yup.object().shape({
  firstName: yup.string().required("firstName Name is required"),
  lastName: yup.string().required("lastName Name is required"),
  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email format"
    ),
  password: yup
    .string()
    .min(8)
    .max(32)
    .matches(
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*-]).{8,}$/,
      "Password must contain at least one uppercase letter, one number, and one special character (!@#$%^&*)"
    )
    .required(),
  phoneNumber: yup
    .number()
    .typeError("That doesn't look like a phone number")
    .positive("A phone number can't start with a minus")
    .integer("A phone number can't include a decimal point")
    .min(1000000000, "A phone number must be at least 10 digits")
    .required("A phone number is required"),
  city: yup.string().required("city Name is required"),
  area: yup.string().required("area Name is required"),
  zipcode: yup.string().required("zipcode Name is required"),
  locality: yup.string().required("locality Name is required"),
  address: yup.string().required("address Name is required"),
});
const serverAPI = "https://logicrent.ae/api";
const localAPI = "http://localhost:4000";

const SignUp: React.FC = () => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState,
    getValues,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const router = useRouter();

  const onSubmit = (e: any) => {
    // e.preventDefault();
    const values = getValues();
    let payload = { userName: "", ...values };

    payload.userName = values.firstName + " " + values.lastName;
    //  ;
    axios
      .post(serverUrl + "/user/signUp", {
        ...payload,
      })
      .then(() => {
        reset();
        router.push("/pages/login");
      })
      .catch((err) => {
        console.log(err);
        const errorMessage = err.response?.data?.message || err.message || "Signup failed. Please try again.";
        Swal.fire({
          icon: "error",
          title: "Sorry..",
          text: errorMessage,
        });
      });
  };

  return (
    <>
    <NavFooter />
    <div style={{margin:"2rem 0rem"}} className="enquiry_form">
      <Container maxWidth="xs">
        <Typography sx={{ textAlign: "center" }} variant="h4" gutterBottom>
          Register
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="firstName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="First Name"
                variant="outlined"
                fullWidth
                margin="normal"
                size="small"
                {...register("firstName", { required: true })}
                error={formState.errors?.firstName ? true : false}
                helperText={formState.errors?.firstName?.message}
              />
            )}
          />
          <Controller
            name="lastName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Last Name"
                variant="outlined"
                fullWidth
                size="small"
                margin="normal"
                {...register("lastName", { required: true })}
                error={formState.errors?.lastName ? true : false}
                helperText={formState.errors?.lastName?.message}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                variant="outlined"
                size="small"
                fullWidth
                margin="normal"
                {...register("email", {
                  required: "true",
                })}
                error={formState.errors?.email ? true : false}
                helperText={formState.errors?.email?.message}
              />
            )}
          />
          <Controller
            name="phoneNumber"
            control={control}
            // defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Phone Number"
                variant="outlined"
                size="small"
                fullWidth
                margin="normal"
                {...register("phoneNumber", {
                  required: "true",
                })}
                error={formState.errors?.phoneNumber ? true : false}
                helperText={formState.errors?.phoneNumber?.message}
              />
            )}
          />
          <Controller
            name="address"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Address"
                variant="outlined"
                size="small"
                fullWidth
                margin="normal"
                {...register("address", {
                  required: "true",
                })}
                error={formState.errors?.address ? true : false}
                helperText={formState.errors?.address?.message}
              />
            )}
          />
          <Controller
            name="locality"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Locality"
                variant="outlined"
                size="small"
                fullWidth
                margin="normal"
                {...register("locality", {
                  required: "true",
                })}
                error={formState.errors?.locality ? true : false}
                helperText={formState.errors?.locality?.message}
              />
            )}
          />
          <Controller
            name="area"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Area"
                variant="outlined"
                size="small"
                fullWidth
                margin="normal"
                {...register("area", {
                  required: "true",
                })}
                error={formState.errors?.area ? true : false}
                helperText={formState.errors?.area?.message}
              />
            )}
          />
          <Controller
            name="zipcode"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Zipcode"
                variant="outlined"
                size="small"
                fullWidth
                margin="normal"
                {...register("zipcode", {
                  required: "true",
                })}
                error={formState.errors?.zipcode ? true : false}
                helperText={formState.errors?.zipcode?.message}
              />
            )}
          />
          <Controller
            name="city"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="City"
                variant="outlined"
                size="small"
                fullWidth
                margin="normal"
                {...register("city", {
                  required: "true",
                })}
                error={formState.errors?.city ? true : false}
                helperText={formState.errors?.city?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                type="password"
                label="Password"
                variant="outlined"
                fullWidth
                size="small"
                margin="normal"
                {...register("password", { required: true })}
                error={formState.errors?.password ? true : false}
                helperText={formState.errors?.password?.message}
              />
            )}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            // onClick={() => router.push("/adminpage/signin_signup/signin")}
          >
            Sign Up
          </Button>
          <Button
            sx={{ marginTop: "10px" }}
            variant="contained"
            color="success"
            fullWidth
            onClick={() => router.push("/pages/login")}
          >
            Already have an Account ?
          </Button>
        </form>
      </Container>
    </div>
    </>
  );
};

export default SignUp;
