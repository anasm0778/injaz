import React from "react";
import { FormControl, Grid, TextField } from "@mui/material";

interface PriceFieldProps {
  label: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ReusableTextField: React.FC<PriceFieldProps> = ({
  label,
  name,
  value,
  onChange,
}) => {
  return (
    <>
      <FormControl sx={{ minWidth: "100%" }}>
        <TextField
          id={`${name}-field`}
          label={label}
          variant="outlined"
          size="small"
          sx={{ height: "50px" }}
          name={name}
          value={value}
          onChange={onChange}
        />
      </FormControl>
    </>
  );
};

export default ReusableTextField;
