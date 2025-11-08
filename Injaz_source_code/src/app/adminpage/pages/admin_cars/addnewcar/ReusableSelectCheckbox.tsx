import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  Checkbox,
  ListItemText,
} from "@mui/material";

interface MultiSelectProps {
  label: string;
  options: any[];
  selectedValues: any[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  MenuProps?: any;
  data: any;
}

const ReusableSelectCheckbox: React.FC<MultiSelectProps> = ({
  label,
  options,
  selectedValues,
  onChange,
  MenuProps,
  data,
}) => {
  return (
    <FormControl sx={{ minWidth: "100%" }} size="small">
      <InputLabel>{label}</InputLabel>
      <Select
        size="small"
        multiple
        value={selectedValues}
        input={<OutlinedInput label={label} />}
        MenuProps={MenuProps}
      >
        {options.map((option) => (
          <MenuItem key={option?._id} value={option}>
            <Checkbox
              value={data?.indexOf(option?.Name || option?.Title) > -1}
              name={option.Name || option.Title}
              checked={data?.indexOf(option?.Name || option?.Title) > -1}
              onChange={onChange}
            />
            <ListItemText primary={option?.Name || option?.Title} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ReusableSelectCheckbox;
