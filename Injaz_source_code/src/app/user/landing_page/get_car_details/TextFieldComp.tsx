import React from "react";
import { ReusableTextField } from "./styleData";

interface TextFieldCompProps {
  value: any;
  onChange: any;
  errors: any;
  placeholder: any;
  type: any;
  variant:any;
}

const TextFieldComp = (props: TextFieldCompProps) => {
  const { value, onChange, errors, placeholder, type, variant } = props;
  return (
    <>
      <ReusableTextField
        fullWidth
        size="small"
        placeholder={placeholder}
        variant={variant}
        type={type}
        value={value}
        onChange={onChange}
        error={errors}
      />
    </>
  );
};

export default TextFieldComp;
