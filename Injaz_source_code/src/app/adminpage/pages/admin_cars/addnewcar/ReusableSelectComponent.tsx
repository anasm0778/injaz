import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

interface ReusableSelectComponentProps {
  label: string;
  name: string;
  value: string;
  onChange: any;
  options: string[];
  MenuProps:any;
}

const ReusableSelectComponent: React.FC<ReusableSelectComponentProps> = ({
  label,
  name,
  value,
  onChange,
  options,
  MenuProps
}) => (
  <>
    <FormControl sx={{ minWidth: "100%" }} size="small">
      <InputLabel>{label}</InputLabel>
      <Select label={label} name={name} value={value} onChange={onChange} MenuProps={MenuProps}>
        {options.map((option, index) => (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </>
);

export default ReusableSelectComponent;
