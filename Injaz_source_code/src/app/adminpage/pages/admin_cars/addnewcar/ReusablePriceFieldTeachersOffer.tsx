import React from "react";
import { FormControl, Grid, TextField } from "@mui/material";
import {  UseFormRegister } from "react-hook-form";

interface PriceFieldProps {
  label: string;
  name: string;
  disabled: boolean;
  register: UseFormRegister<any>;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ReusablePriceFieldTeachersOffer: React.FC<PriceFieldProps> = ({
  label,
  name,
  disabled,
  register,
  value,
  onChange,
}) => {
  return (
    <>
      <Grid item xs={12} sm={3} md={3} lg={3}>
        <FormControl sx={{ minWidth: "100%" }}>
          <TextField
            id={`${name}-field`}
            disabled={disabled}
            label={label}
            variant="outlined"
            size="small"
            sx={{ height: "50px" }}
            {...register(name, { required: true })}
            name={name}
            value={value}
            onChange={onChange}
          />
        </FormControl>
      </Grid>
    </>
  );
};

export default ReusablePriceFieldTeachersOffer;
