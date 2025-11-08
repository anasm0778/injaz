"use client";
import React, { useEffect, useState } from "react";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import "../accordion/accordion.css";
import { Container, Typography, styled } from "@mui/material";
import axios from "axios";
import Loader from "@/app/Loader";
import { serverUrl } from "@/utils/helper";
import Link from "next/link";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: 'none',
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={
      <ArrowForwardIosSharpIcon
        sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
        className="modernAccordionIcon"
      />
    }
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: "transparent",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function CustomizedAccordions() {
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const [loader, setLoader] = useState(true);

  const handleChange = (panel: string) => (
    event: React.SyntheticEvent,
    newExpanded: boolean
  ) => {
    setExpanded(newExpanded ? panel : false);
  };

  const [faqData, setFaqData] = useState([]);

  useEffect(() => {
    const getAllFaqs = async () => {
      try {
        const res = await axios.get(serverUrl + "/user/getAllFAQS");
        setFaqData(res.data.data);
        setLoader(false);
      } catch (err) {
        console.log(err);
      }
    };

    getAllFaqs();
  }, []);

  return (
    <section id="accordion" className="accordion">
      <Container maxWidth="xl">
        <div className="faq_head">
          <h3>
            Frequently Asked{" "}
            <Link
              href="/pages/newFaq/"
              style={{ color: "#01437d", textDecoration: "none" }}
            >
              Questions
            </Link>
          </h3>
        </div>
        {!loader ? (
          <section>
            {faqData.map((item: any, index) => (
              <Accordion
                key={index}
                expanded={expanded === `panel${index}`}
                onChange={handleChange(`panel${index}`)}
                className="modernAccordion"
              >
                <AccordionSummary
                  aria-controls={`panel${index}d-content`}
                  id={`panel${index}d-header`}
                  className="modernAccordionSummary"
                >
                  <Typography className="acc_head">{item.Question}</Typography>
                </AccordionSummary>
                <AccordionDetails className="modernAccordionDetails">
                  <Typography sx={{ 
                    fontSize: '18px', 
                    fontFamily: "'Poppins', 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                    lineHeight: 1.6,
                    color: '#4a5568'
                  }}>{item.Answer}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </section>
        ) : (
          <>
            <br />
            <br />
            <Loader />
            <br />
            <br />
          </>
        )}
      </Container>
    </section>
  );
}
