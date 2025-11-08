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
import { useForm, Controller } from "react-hook-form";
import "../AdminFaq.css";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { serverUrl } from "@/utils/helper";

interface ReqDocsFormData {
  question: string;
  answer: string;
  status: string;
}

interface IErrors {
  question: boolean;
  answer: boolean;
  select: boolean;

}

const serverAPI='https://logicrent.ae/api'
const localAPI ='http://localhost:4000'


const Admin_faq_form = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("verify");
  const question = searchParams.get("question");
  const answer = searchParams.get("answer");
  const status = searchParams.get("status");
  const [error, setErrors] = useState<IErrors>({
    question: false,
    select: false,
    answer: false,
  });
  const [textName, setTextName] = useState<string>("");
  const [select, setSelect] = useState<string>("");
  const [faqans, setFaqans] = useState<string>("");

  useEffect(() => {
    if (id) {
      axios
        .get(serverUrl+`/user/getFAQ/${id}`)
        .then((res) => {
           ;
          const {
            Question,
            Answer,
            Status,
            CreatedDate,
            UpdatedDate,
          } = res.data.data;
          setdata({
            _id: id,
            Question: Question,
            Answer: Answer,
            Status: Status,
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

  const handleQuestionChange = (event: SelectChangeEvent<string>) => {
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

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ReqDocsFormData>();

  const onSubmit: any = (e: any) => {
    e.preventDefault();
    //  
    if (!textName) {
      setErrors({ ...error, question: true });
    }
    if (!select) {
      setErrors({ ...error, select: true });
    }
    if (!faqans) {
      setErrors({ ...error, answer: true });
    }
    const payload: { question: string; status: string; answer: string } = {
      question: textName,
      status: select,
      answer: faqans,
    };
    payload.question = textName;
    payload.status = select;
    payload.answer = faqans;
    console.log(payload, "payload");
    router.push("/pages/adminAdminFaqs");
  };
  const [data, setdata] = useState({
    _id: "",
    Question: "",
    Answer: "",
    Status: "Active",
    CreatedDate: "1/2/2023",
    UpdatedDate: "1/2/2024",
  });

  const handle = (e: any) => {
    const newdata: any = { ...data };
    newdata[e.target.name] = e.target.value;
    setdata(newdata);
  };

  const HandleSubmits = (e: any) => {
    e.preventDefault();
    if (id) {
      axios
        .put(serverUrl+"/user/updateFAQ", {
          _id: id,
          Question: data.Question,
          Answer: data.Answer,
          Status: "Active",
          CreatedDate: data.CreatedDate,
          UpdatedDate: data.UpdatedDate,
        })
        .then((res) => {
          Swal.fire("Updated!", "The FAQ has been updated.", "success");
           ;
          setdata({
            _id: "",
            Question: "",
            Answer: "",
            CreatedDate: "",
            UpdatedDate: "",
            Status: "Active",
          });
        })
        .catch((err) => {
          console.log(err);
           ;
        });
    } else {
      axios
        .post(serverUrl+"/user/createFAQS", {
          Question: data.Question,
          Answer: data.Answer,
          Status: "Active",
          CreatedDate: data.CreatedDate,
          UpdatedDate: data.UpdatedDate,
        })
        .then(() => {
          Swal.fire("Added!", "The FAQS has been added.", "success");
          setdata({
            _id: "",
            Question: "",
            Answer: "",
            CreatedDate: "",
            UpdatedDate: "",
            Status: "Active",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    router.push("/pages/adminAdminFaqs");
  };

  return (
    <div className="addnew_cate">
      <Box>
        <form onSubmit={(e) => HandleSubmits(e)}>
          <Container className="catecontbox">
            <div className="newcate_head">
              <h1>Add New FAQ</h1>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                {/* <Suspense fallback={<>Loading...</>} */}
                  
                  <FormControl sx={{ minWidth: "100%" }}>
                    <TextField
                      id="outlined-basic"
                      label="Question"
                      variant="outlined"
                      size="small"
                      sx={{ height: "50px" }}
                      name="Question"
                      value={data.Question}
                      onChange={(e) => handle(e)}
                      error={!!errors.question}
                      helperText={
                        errors.question && "This name field is required"
                      }
                    />
                  </FormControl>
                  {/* </Suspense> */}

                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <TextField
                    id="outlined-multiline-static"
                    label="Answer"
                    multiline
                    rows={4}
                    sx={{ width: "100%" }}
                    value={data.Answer}
                    name="Answer"
                    onChange={(e) => handle(e)}
                    error={!!errors.answer}
                    helperText={errors.answer && "field is required"}
                  />
                </Grid>
                {/* <Grid item xs={12} sm={6} md={6} lg={6}>
                  <FormControl sx={{ minWidth: "100%" }} size="small">
                    <InputLabel id="demo-select-small-label">Status</InputLabel>
                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      label="Status"
                      name="Status"
                      value={data.Status}
                      onChange={(e) => handle(e)}
                      required
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
                onClick={() => router.push("/pages/adminAdminFaqs")}
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

export default Admin_faq_form;
