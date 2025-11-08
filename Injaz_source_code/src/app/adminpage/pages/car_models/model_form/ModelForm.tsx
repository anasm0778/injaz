"use client";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import { useForm, Controller } from "react-hook-form";
import "../ModelsDataTable.css";
import axios from "axios";
import Swal from "sweetalert2";
import { serverUrl } from "@/utils/helper";

interface ModelFormData {
  name: string;
  brand: string;
  status: string;
  createdDate: string;
  updatedDate: string;
}

interface IErrors {
  model: boolean;
  brand: boolean;
  select: boolean;
}
const serverAPI='https://logicrent.ae/api'
const localAPI ='http://localhost:4000'

const ModelForm = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("verify");
  //console.log(JSON.parse(row),"jjjjjjjjjjjjjjjjjjjjjjjjjj")
  const model = searchParams.get("model");
  const brand = searchParams.get("brand");
  const status = searchParams.get("status");
  const [error, setErrors] = useState<IErrors>({
    model: false,
    select: false,
    brand: false,
  });
  const [textName, setTextName] = useState<string>("");
  const [select, setSelect] = useState<string>("");
  const [faqans, setFaqans] = useState<string>("");
  const [drop, setdrop] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const handleBrandChange = (e: any) => {
    setSelectedBrand(e.target.value);
  };

  useEffect(() => {
    axios
      .get(serverUrl+"/user/getAllBrands")
      .then((res) => {
        setdrop(res.data.data);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  });
  useEffect(() => {
    if (id) {
      axios
        .get(serverUrl+`/user/getCarModel/${id}`)
        .then((res) => {
           ;
          const {
            Name,
            Brand,
            Status,
            CreatedDate,
            UpdatedDate,
            slug,
          } = res.data.data;
          setdata({
            _id: id,
            Name: Name,
            Brand: Brand,
            Status: Status,
            slug: slug,
            CreatedDate: CreatedDate,
            UpdatedDate: UpdatedDate,
          });
        })
        .catch((err) => {
          console.log(err);
        });
      //serverUrl+'/user/getCarModel/64f9c31050e6d77e2c177787'
    }
  }, []);

  const handleTextChange = (event: SelectChangeEvent<string>) => {
    setTextName(event.target.value);
  };
  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    //  ;
    setSelect(event.target.value);
  };
  const handleAnswerCanage = (event: SelectChangeEvent<string>) => {
    //  ;
    setFaqans(event.target.value);
  };

  const router = useRouter();

  const [data, setdata] = useState({
    _id: "",
    Name: "",
    Brand: "",
    Status: "Active",
    slug: "test",
    CreatedDate: "11/09/2023",
    UpdatedDate: "11/09/2023",
  });

  const {
    register,
    control,
    formState: { errors },
  } = useForm<ModelFormData>();

  const onSubmit: any = (e: any) => {
    e.preventDefault();
    //  
    if (!textName) {
      setErrors({ ...error, model: true });
    }
    if (!select) {
      setErrors({ ...error, select: true });
    }
    if (!faqans) {
      setErrors({ ...error, brand: true });
    }
    const payload: { model: string; status: string; brand: string } = {
      model: textName,
      status: select,
      brand: faqans,
    };
    payload.model = textName;
    payload.status = select;
    payload.brand = faqans;
    console.log(payload, "payload");
    router.push("/adminpage/pages/car_models");
  };

  const handle = (e: any) => {
    const newData: any = { ...data };
    newData[e.target.name] = e.target.value;
    setdata(newData);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (id) {
      axios
        .put(serverUrl+"/user/updateCarModel", {
          _id: id,
          Name: data.Name,
          Brand: data.Brand,
          Status: "Active",
          slug: data.slug,
          CreatedDate: data.CreatedDate,
          UpdatedDate: data.UpdatedDate,
        })
        .then((res) => {
          Swal.fire("Updated!", "The car model has been updated.", "success");
           ;
          setdata({
            _id: "",
            Name: "",
            Brand: "",
            Status: "Active",
            slug: "test",
            CreatedDate: "11/09/2023",
            UpdatedDate: "11/09/2023",
          });
        })
        .catch((err) => {
          console.log(err);
           ;
        });
    } else {
      axios
        .post(serverUrl+"/user/addCarModel", {
          Name: data.Name,
          Brand: data.Brand,
          Status: "Active",
          slug: "test",
          CreatedDate: "11/09/2023",
          UpdatedDate: "11/09/2023",
        })
        .then((res) => {
          Swal.fire("Added!", "The car model has been added.", "success");
          setdata({
            _id: "",
            Name: "",
            Brand: "",
            Status: "Active",
            slug: "test",
            CreatedDate: "11/09/2023",
            UpdatedDate: "11/09/2023",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    router.push("/pages/adminModel");
  };
  return (
    <div className="addnew_cate">
      <Box>
        <form onSubmit={(e) => handleSubmit(e)}>
          <Container className="catecontbox">
            <div className="newcate_head">
              <h1>Add New Model</h1>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={4} md={4} lg={4}>
                  <FormControl sx={{ minWidth: "100%" }}>
                    <TextField
                      id="outlined-basic"
                      label="Name"
                      name="Name"
                      variant="outlined"
                      size="small"
                      sx={{ height: "50px" }}
                      value={data.Name}
                      onChange={(e) => handle(e)}
                      error={!!errors.name}
                      helperText={errors.name && "This name field is required"}
                      // onChange={(e: any) => handleTextChange(e)}
                      required
                      // value={textName}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4}>
                  <FormControl sx={{ minWidth: "100%" }} size="small">
                    <InputLabel id="demo-select-small-label">Brand</InputLabel>
                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      name="Brand"
                      label="Slug"
                      value={data.Brand}
                      onChange={(e) => handle(e)}
                    >
                      {drop.length > 0 && // Check if data is not empty
                        drop.map((item: any) => (
                          <MenuItem key={item._id} value={item.name}>
                            {item.name}
                          </MenuItem>
                        ))}
                    </Select>

                    <FormHelperText error>
                      {errors.brand?.message}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                {/* <Grid item xs={12} sm={4} md={4} lg={4}>
                  <FormControl sx={{ minWidth: "100%" }} size="small">
                    <InputLabel id="demo-select-small-label">Status</InputLabel>
                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      label="Status"
                      name="Status"
                      value={data.Status}
                      onChange={(e) => handle(e)}
                    >
                      <MenuItem value={"active"}>Active</MenuItem>
                      <MenuItem value={"inactive"}>Inactive</MenuItem>
                    </Select>

                    <FormHelperText error>
                      {errors.status?.message}
                    </FormHelperText>
                  </FormControl>
                </Grid> */}
              </Grid>
            </div>
            <div className="magcatbtn">
              <Button
                variant="contained"
                type="submit"
                className="catsubmitbtn"
                color="primary"
              >
                {id ? "Update" : "Submit"}
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => router.push("/pages/adminModel")}
              >
                Cancel
              </Button>
            </div>
          </Container>
        </form>
      </Box>
    </div>
  );
};

export default ModelForm;
