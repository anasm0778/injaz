import React from "react";
import { FormControlLabel, Checkbox } from "@mui/material";

interface ReusableCheckBoxProps {
  name: string;
  label: string;
  checked: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ReusableCheckBox: React.FC<ReusableCheckBoxProps> = ({
  name,
  label,
  checked,
  handleChange,
}) => (
  <FormControlLabel
    control={
      <Checkbox
        name={name}
        checked={checked}
        onChange={handleChange}
      />
    }
    label={label}
  />
);

export default ReusableCheckBox;