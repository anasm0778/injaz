"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Button,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from "sweetalert2";
import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { serverUrl } from "@/utils/helper";
import NavFooter from "@/utils/Na_Fo";

type FormData = {
  email: string;
  password: string;
};

const schema = yup.object().shape({
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
    // .matches(
    //   /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*-]).{8,}$/,
    //   "Password must contain at least one uppercase letter, one number, and one special character (!@#$%^&*)"
    // )
    .required(),
});
const serverAPI = "https://logicrent.ae/api";
const localAPI = "http://localhost:4000";

const SignIn: React.FC = () => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const router = useRouter();

  const onSubmit = (e: any) => {
    // e.preventDefault();
    const values = getValues();

    console.log("vales", values);
    localStorage.setItem("vales", JSON.stringify(values));
    axios
      .post(serverUrl + "/user/login", {
        ...values,
      })
      .then((res) => {
        const token = res.data.token;
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        debugger;
        // Swal.fire("You have Logged In!")
        console.log(res.data, "values");
        if (values.email == "injazcarsrental@gmail.com") {
          localStorage.setItem("isAdmin", "true");
          router.push("/pages/adminPage");
        } else {
          router.push("/");
        }
        reset();
      })
      .catch((err) => {
        console.log(err, "gfyhgh");
        // Swal.fire(err.response.data.message)
        const errorMessage = err.response?.data?.message || err.message || "Login failed. Please try again.";
        Swal.fire({
          icon: "error",
          title: "Sorry..",
          text: errorMessage,
        });
      });
  };
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  return (
    <>
      <NavFooter />
      <div className="enquiry_form">
        <Container sx={{ paddingTop: "8%" }} maxWidth="xs">
          <Typography sx={{ textAlign: "center" }} variant="h4" gutterBottom>
            Sign In
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
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
                    pattern: /^\S+@\S+.\S+$/i,
                  })}
                  error={!!errors.email}
                  helperText={errors.email && "Enter a valid email"}
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
                  type={showPassword ? "text" : "password"}
                  label="Password"
                  variant="outlined"
                  fullWidth
                  size="small"
                  margin="normal"
                  {...register("password", { required: true })}
                  error={!!errors.password}
                  helperText={errors.password && "Enter valid password"}
                  InputProps={{
                    // <-- This is where the toggle button is added.
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Sign In
            </Button>
            <Button
              sx={{ marginTop: "10px" }}
              variant="contained"
              color="success"
              fullWidth
              onClick={() => router.push("/pages/signup")}
            >
              Create a new Account
            </Button>
          </form>
        </Container>
      </div>
    </>
  );
};

export default SignIn;
