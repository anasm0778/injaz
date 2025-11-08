"use client";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Container, Typography } from "@mui/material";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const SignupForm: React.FC = () => {
  const [values, setValues] = useState<FormValues>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormValues>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors: FormValues = { firstName: "", lastName: "", email: "", password: "" };
    let valid = true;

    if (!values.firstName.trim()) {
      newErrors.firstName = "First name is required";
      valid = false;
    }

    if (!values.lastName.trim()) {
      newErrors.lastName = "Last name is required";
      valid = false;
    }

    if (!values.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      newErrors.email = "Email is invalid";
      valid = false;
    }
    if (!values.password.trim()) {
      newErrors.password = "password is required";
      valid = false;
    } else if (!/\S+@\S+/.test(values.password)) {
        newErrors.password = "Password is invalid";
        valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Perform your form submission logic here
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom>
          Sign Up
        </Typography>
        <TextField
          label="First Name"
          name="firstName"
          value={values.firstName}
          onChange={handleInputChange}
          error={Boolean(errors.firstName)}
          helperText={errors.firstName}
          fullWidth
          margin="normal"
          size="small"
        />
        <TextField
          label="Last Name"
          name="lastName"
          value={values.lastName}
          onChange={handleInputChange}
          error={Boolean(errors.lastName)}
          helperText={errors.lastName}
          fullWidth
          margin="normal"
          size="small"
        />
        <TextField
          label="Email"
          name="email"
          value={values.email}
          onChange={handleInputChange}
          error={Boolean(errors.email)}
          helperText={errors.email}
          fullWidth
          margin="normal"
          size="small"
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={values.password}
          onChange={handleInputChange}
          error={Boolean(errors.password)}
          helperText={errors.password}
          fullWidth
          margin="normal"
          size="small"
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Container>
    </form>
  );
};

export default SignupForm;
