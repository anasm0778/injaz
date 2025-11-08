"use client";
import React, { useEffect, useState } from "react";
import TopSecMem from "./TopSecMem";
import IconSecMem from "./IconSecMem";
import FamilySecMem from "./FamilySecMem";
import PlatiSecMem from "./PlatiSecMem";
import GoldSecMem from "./GoldSecMem";
import SilverSecMem from "./SilverSecMem";
import YellowSecMem from "./YellowSecMem";
import "./membership.css";
import FullWidthTabs from "./TabSecMem";
import NavFooter from "@/utils/Na_Fo";

const Membership = () => {
  return (
    <>
      <NavFooter />
      <TopSecMem />
      <IconSecMem />
      <FamilySecMem />
      <FullWidthTabs />
      <PlatiSecMem />
      <GoldSecMem />
      <SilverSecMem />
      <YellowSecMem />
    </>
  );
};

export default Membership;
