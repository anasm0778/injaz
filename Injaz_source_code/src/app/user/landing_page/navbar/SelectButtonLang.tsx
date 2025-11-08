import React, { useEffect, useState } from "react";
import {
  FormControl,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import i18n from "@/app/interpolarization";

const languages = [
  { label: "English", value: "/auto/en" },
  { label: "Polish", value: "/auto/pl" },
  { label: "Portuguese", value: "/auto/pt" },
  { label: "Chinese", value: "/auto/zh-CN" },
  { label: "German", value: "/auto/de" },
  { label: "Japanese", value: "/auto/ja" },
  { label: "Spanish", value: "/auto/es" },
  { label: "French", value: "/auto/fr" },
  { label: "Italian", value: "/auto/it" },
  { label: "Russian", value: "/auto/ru" },
  { label: "Turkish", value: "/auto/tr" },
];

const languagesCode: { [key: string]: string } = {
  "/auto/en": "English",
  "/auto/pl": "Polish",
  "/auto/pt": "Portuguese",
  "/auto/zh-CN": "Chinese",
  "/auto/de": "German",
  "/auto/ja": "Japanese",
  "/auto/es": "Spanish",
  "/auto/fr": "French",
  "/auto/it": "Italian",
  "/auto/ru": "Russian",
  "/auto/tr": "Turkish",
};

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

const GoogleTranslate: React.FC = () => {
  const cookieValue = localStorage.getItem("Language");
  const [selected, setSelected] = useState("English");
  useEffect(() => {
    setSelected(cookieValue ? languagesCode[cookieValue] : "English");
    if (cookieValue) {
      i18n.changeLanguage(cookieValue.substr(6));
      localStorage.setItem("Language", cookieValue.substr(6));
    } else {
      i18n.changeLanguage("en");
      localStorage.setItem("Language", "en");
    }
  }, []);
  const langChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    console.log(cookieValue, "kkkkkkkkkkkkkk");
    setSelected(languagesCode[value]);
    localStorage.setItem("Language", value.substr(6));
    i18n.changeLanguage(value.substr(6));
    debugger;
  };

  return (
    <>
      <FormControl sx={{ minWidth: 120 }} size="small" translate="no">
        <Select
          displayEmpty
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={selected}
          onChange={langChange}
          input={<OutlinedInput sx={{ color: "#fff" }} />}
          renderValue={(selected) => {
            return selected as string;
          }}
          sx={{ background: (theme) => theme.palette.background.default }}
        >
          {languages.map((ld: any, i) => (
            <MenuItem
              sx={{ color: (theme) => theme.palette.text.primary }}
              key={`${ld.label}`}
              value={`${ld.value}`}
              translate="no"
            >
              {ld.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default GoogleTranslate;
