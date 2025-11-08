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
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import "../CarBrand.css";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { serverUrl } from "@/utils/helper";

interface BrandFormData {
  name: string;
  slug: string;
  status: string;
  createdDate: string;
  updatedDate: string;
}

interface IErrors {
  name: boolean;
  select: boolean;
}
const serverAPI = "https://logicrent.ae/api";
const localAPI = "http://localhost:4000";

const BrandForm = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("verify");
  const name = searchParams.get("name");
  const status = searchParams.get("status");
  const [error, setErrors] = useState<IErrors>({ name: false, select: false });
  const [textName, setTextName] = useState<string>("");
  const [select, setSelect] = useState<string>("");

  useEffect(() => {
    if (id) {
      axios
        .get(serverUrl + `/user/getBrand/${id}`)
        .then((res) => {
          const {
            name,
            status,
            createdDate,
            updatedDate,
            slag,
          } = res.data.data;
          setdata({
            _id: id,
            name: name,
            status: status,
            slag: slag,
            createdDate: createdDate,
            updatedDate: updatedDate,
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

  const router = useRouter();

  const [data, setdata] = useState({
    _id: "",
    name: "",
    status: "Active",
    slag: "testing",
    createdDate: "1/2/2020",
    updatedDate: "2/2/2023",
  });
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<BrandFormData>();

  const onSubmit: any = (e: any) => {
    e.preventDefault();
    if (!textName) {
      setErrors({ ...error, name: true });
    }
    if (!select) {
      setErrors({ ...error, select: true });
    }
    const payload: { brand: string; status: string } = {
      brand: textName,
      status: select,
    };
    payload.brand = textName;
    payload.status = select;
    console.log(payload, "payload");
    router.push("/pages/adminBrand");
  };

  const handle = (e: any) => {
    console.log("welcomeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
    const newData: any = { ...data };
    newData[e.target.name] = e.target.value;
    setdata(newData);
    console.log(newData, "newDAatattttttttttttttt");
  };

  const Submit = (e: any) => {
    e.preventDefault();
    if (id) {
      axios
        .put(serverUrl + "/user/updateBrand", {
          _id: id,
          name: data.name,
          status: "Active",
          slag: data.slag,
          createdDate: data.createdDate,
          updatedDate: data.updatedDate,
        })
        .then((res) => {
          Swal.fire("Updated!", "The car Brand has been updated.", "success");

          setdata({
            _id: "",
            name: "",
            status: "Active",
            slag: "testing",
            createdDate: "1/2/2020",
            updatedDate: "2/2/2023",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .post(serverUrl + "/user/createBrand", {
          name: data.name,
          status: "Active",
          slag: data.slag,
          createdDate: data.createdDate,
          updatedDate: data.updatedDate,
        })
        .then((res) => {
          console.log(res.data);
          Swal.fire("Added!", "The car Brand has been added.", "success");
          setdata({
            _id: "",
            name: "",
            status: "Active",
            slag: "testing",
            createdDate: "1/2/2020",
            updatedDate: "2/2/2023",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    router.push("/pages/adminBrand");
  };
  return (
    <div className="addnew_cate">
      <Box>
        <form onSubmit={(e) => Submit(e)}>
          <Container className="catecontbox">
            <div className="newcate_head">
              <h1>Add New Brand</h1>

              <Grid container spacing={4}>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <FormControl sx={{ minWidth: "100%" }}>
                    <TextField
                      id="outlined-basic"
                      name="name"
                      label="Name"
                      variant="outlined"
                      size="small"
                      sx={{ height: "50px" }}
                      onChange={(e) => handle(e)}
                      value={data.name}
                      // error={!!errors.name}
                      // helperText={errors.name && "This name field is required"}
                    />
                  </FormControl>
                </Grid>
                {/* <Grid item xs={12} sm={6} md={6} lg={6}>
                  <FormControl sx={{ minWidth: "100%" }} size="small">
                    <InputLabel id="demo-select-small-label">Status</InputLabel>
                    <Controller
                      name="status"
                      control={control}
                      defaultValue=""
                      rules={{ required: "This status field is required" }}
                      render={({ field }) => (
                        <Select
                          labelId="demo-select-small-label"
                          id="demo-select-small"
                          label="Status"
                          name="status"
                          value={data.status} // Bind the value to data.status
                          onChange={(e)=>handle(e)} // Handle the change event
                  
                        >
                          <MenuItem value={"active"}>Active</MenuItem>
                          <MenuItem value={"inactive"}>Inactive</MenuItem>
                        </Select>
                      )}
                    />
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
                onClick={()=>router.push("/pages/adminBrand")}
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

export default BrandForm;
