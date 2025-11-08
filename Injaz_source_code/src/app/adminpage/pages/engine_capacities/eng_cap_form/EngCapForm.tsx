"use client";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import "../EngineCapacity.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { serverUrl } from "@/utils/helper";

interface EngCapFormData {
  capacity: string;
  status: string;
}

interface IErrors {
  capacity: boolean;
  select: boolean;
}
const serverAPI = "https://logicrent.ae/api";
const localAPI = "http://localhost:4000";

const EngCapForm = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("verify");
  const capacity = searchParams.get("capacity");
  const status = searchParams.get("status");
  const [error, setErrors] = useState<IErrors>({
    capacity: false,
    select: false,
  });
  const [textName, setTextName] = useState<string>("");
  const [select, setSelect] = useState<string>("");

  useEffect(() => {
    if (id) {
      axios
        .get(serverUrl + `/user/getCarEngineCapacities/${id}`)
        .then((res) => {
          const { Capacity, Status, CreatedDate } = res.data.data;
          setdata({
            _id: id,
            Capacity: Capacity,
            Status: Status,
            CreatedDate: CreatedDate,
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

  const {
    register,
    control,
    formState: { errors },
  } = useForm<EngCapFormData>();

  const onSubmit: any = (e: any) => {
    e.preventDefault();
    //
    if (!textName) {
      setErrors({ ...error, capacity: true });
    }
    if (!select) {
      setErrors({ ...error, select: true });
    }
    const payload: { capacity: string; status: string } = {
      capacity: textName,
      status: select,
    };
    payload.capacity = textName;
    payload.status = select;
    console.log(payload, "payload");
    router.push("/pages/adminEngineCapacity");
  };

  const [data, setdata] = useState({
    _id: "",
    Capacity: "",
    Status: "Active",
    CreatedDate: "1/2/2023",
  });
  const handle = (e: any) => {
    const newdata: any = { ...data };
    newdata[e.target.name] = e.target.value;
    setdata(newdata);
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (id) {
      axios
        .put(serverUrl + "/user/updateCarEngineCapacities", {
          _id: id,
          Capacity: data.Capacity,
          Status: "Active",
          CreatedDate: data.CreatedDate,
        })
        .then((res) => {
          Swal.fire(
            "Updated!",
            "The car capacity has been updated.",
            "success"
          );

          setdata({
            _id: "",
            Capacity: "",
            Status: "Active",
            CreatedDate: "",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .post(serverUrl + "/user/createcarEngineCapacities", {
          Capacity: data.Capacity,
          Status: "Active",
          CreatedDate: data.CreatedDate,
        })
        .then(() => {
          Swal.fire("Added!", "The car capacity has been added.", "success");
          setdata({
            _id: "",
            Capacity: "",
            Status: "Active",
            CreatedDate: "",
          });
        })
        .catch((err) => {
          console.log("errr", err);
        });
    }
    router.push("/pages/adminEngineCapacity");
  };
  return (
    <div className="addnew_cate">
      <Box>
        <form onSubmit={(e) => handleSubmit(e)}>
          <Container className="catecontbox">
            <div className="newcate_head">
              <h1>Add New Engine Capacity</h1>

              <Grid container spacing={4}>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <FormControl sx={{ minWidth: "100%" }}>
                    <TextField
                      id="outlined-basic"
                      label="Capacity"
                      variant="outlined"
                      required
                      size="small"
                      sx={{ height: "50px" }}
                      name="Capacity"
                      value={data.Capacity}
                      onChange={(e) => handle(e)}
                      error={!!errors.capacity}
                      helperText={
                        errors.capacity && "This name field is required"
                      }
                    />
                  </FormControl>
                </Grid>
                
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
                onClick={() => router.push("/pages/adminEngineCapacity")}
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

export default EngCapForm;
