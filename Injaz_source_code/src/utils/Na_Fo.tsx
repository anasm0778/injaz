"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { serverUrl } from "./helper";
import Navbar from "@/app/user/landing_page/navbar/Navbar";
import Footer from "@/app/user/landing_page/footer/Footer";
import FloatingActionButtons from "@/components/FloatingActionButtons";

const NavFooter = (props: any) => {
  const [phoneemail, setPhoneEmail] = useState({});

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get(serverUrl + "/admin/getAllsettings");
        setPhoneEmail(res.data.data[0]);
        console.log(res.data.data[0], "phoneEmail");
      } catch (err) {
        console.log(err, "...error");
      }
    };
    fetchSettings();
  }, []);

  return (
    <>
      <Navbar data={phoneemail} />
      {props.children}
      {props.footer && <Footer data={phoneemail} />}
      <FloatingActionButtons phoneData={phoneemail} />
    </>
  );
};

export default NavFooter;
