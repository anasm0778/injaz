"use client";
import {Box,Button,Container,FormControl,FormHelperText,Grid,InputLabel,MenuItem,Select,SelectChangeEvent,TextField,} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import "../AdminFaq.css";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
const FaqFormTest = () => {
  const searchParams = useSearchParams();
  const question = searchParams.get("question");
  const answer = searchParams.get("answer");
  const status = searchParams.get("status");
  const [error, setErrors] = useState<IErrors>({ question: false, select: false, answer: false });
  const [textName, setTextName] = useState<string>("");
  const [select, setSelect] = useState<string>("");
  const [faqans, setFaqans] =useState<string>("");

  useEffect(() => {
    if (question) {
      setTextName(question);
      setFaqans(answer || '');
      setSelect(status || '');
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

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ReqDocsFormData>();

  const onSubmit: any = (e:any) => {
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
    const payload: { question: string, status:string, answer:string } = {question: textName, status: select, answer: faqans};
    payload.question = textName;
    payload.status = select;
    payload.answer = faqans
    console.log(payload, "payload");
   router.push("/adminpage/pages/admin_faqs")
  };

  return (
    <div className="addnew_cate">
      <Box>
        <form onSubmit={(e:any) => handleSubmit(onSubmit(e))}>
          <Container className="catecontbox">
            <div className="newcate_head">
              <h1>Add New Location</h1>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <FormControl sx={{ minWidth: "100%" }}>
                    <TextField
                      id="name"
                      label="Name"
                      variant="outlined"
                      size="small"
                      sx={{ height: "50 px" }}
                      {...register("question", { required: true })}
                      // error={error.name}
                      // helperText={error.name && "This name field is required"}
                      onChange={(e:any) => handleTextChange(e)}
                      required
                      value={textName}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <FormControl sx={{ minWidth: "100%" }}>
                    <TextField
                      id="answer"
                      label="Answer"
                      variant="outlined"
                      size="small"
                      sx={{ height: "50 px" }}
                      {...register("answer", { required: true })}
                      // error={error.name}
                      // helperText={error.name && "This name field is required"}
                      onChange={(e:any) => handleAnswerCanage(e)}
                      required
                      value={faqans}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <FormControl sx={{ minWidth: "100%" }} size="small">
                    <InputLabel id="demo-select-small-label">Status</InputLabel>
                    <Controller
                      name="status"
                      control={control}
                      defaultValue=""
                      rules={{ required: "This status field is required" }}
                      render={({ field }) => (
                        <Select
                          labelId="status-label"
                          id="status"
                          label="Status"
                          // value={status??""}
                          {...field}
                          value={select}
                          onChange={(e) => handleSelectChange(e)}
                          required
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
                {question ? "Update" : "Submit"}
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => router.push("/adminpage/pages/admin_location")}
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

export default FaqFormTest;
