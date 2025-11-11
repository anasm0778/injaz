"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

const EnquiryCountComponent = ({ filterType }:any) => {
  const [inquiries, setInquiries] = useState([]);
  const [enquiryCount, setEnquiryCount] = useState(0);

  const colorMapping: any = {
    all: "blue",
    new: "orange",
    accepted: "green",
    rejected: "red"
  };

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const response = await axios.get(
          "https://injazrent.ae/api/user/getInquirys"
        );
        const fetchedInquiries = response.data.data;
        setInquiries(fetchedInquiries);

        let filteredInquiries;
        switch (filterType) {
          case "new":
            filteredInquiries = fetchedInquiries.filter((inquiry:any) => inquiry.status === "New");
            break;
          case "accepted":
            filteredInquiries = fetchedInquiries.filter((inquiry:any) => inquiry.status === "accepeted");
            break;
          case "rejected":
            filteredInquiries = fetchedInquiries.filter((inquiry:any) => inquiry.status === "rejected");
            break;
          default:
            filteredInquiries = fetchedInquiries;
        }
        setEnquiryCount(filteredInquiries.length);
      } catch (error) {
        console.error("Error fetching inquiries:", error);
      }
    };

    fetchInquiries();
  }, [filterType]);

  return (
    <>
      <span style={{ marginRight: "5px", padding: "0px 3px", borderRadius: "50%", color: colorMapping[filterType], fontWeight:600 }}>
        {enquiryCount}
      </span>
    </>
  );
};

export default EnquiryCountComponent;
