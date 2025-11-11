"use client";
import {
  Box,
  Button,
  CardMedia,
  Collapse,
  Container,
  Grid,
  IconButton,
  Tabs,
  TextField,
  Tooltip,
  Typography,
  useTheme,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "../../../adminpage/pages/createdCars/CreatedCars.css";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { serverUrl } from "@/utils/helper";
import NavFooter from "@/utils/Na_Fo";
import Image from "next/image";
import { getValidImageUrl } from "@/utils/helper";
import SwipeableViews from "react-swipeable-views";
import DriverEligibility from "@/components/DriverEligibility";
import {
  AppBarMain,
  AppBarMainBox,
  AppBarTabs,
  BookButtonBox1,
  BookButtonMain,
  BookingTypo,
  BookingTypo1,
  CarChargeBox1,
  CarChargeTypo1,
  CarDetailsBoxCss,
  CarDetailscontentBox,
  DailyWeeklyBox1,
  DailyWeeklyTypo1,
  FieldsBox,
  HighlightBox,
  HightlightTypo,
  InsuranceTypo1,
  MainBoxBooking,
  MonthlyTypo1,
  MonthlyTypo2,
  PriceBrakeBox1,
  PriceBrakeBox2,
  PriceBrakeTypo1,
  PriceBrakeTypo2,
  TabBoxMain,
  TitleTypo,
  TitleTypo2,
} from "./styleData";
import TextFieldComp from "./TextFieldComp";
import Swal from "sweetalert2";
import ExpandMoreIcon from "@mui/icons-material/Add";
import ExpandLessIcon from "@mui/icons-material/Remove";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <TabBoxMain>
          <Box>{children}</Box>
        </TabBoxMain>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

interface getCarData {
  _id: string;
  brand: string;
  model: string;
  category: string;
  year: string;
  image: string;
  location: string[];
  vehicleType: string;
  cheapestCar: string;
  status: string;
  services: string[];
  description: string;
  actualPriceDaily: string;
  discountedPriceDaily: string;
  actualPriceWeekly: string;
  discountedPriceWeekly: string;
  actualPriceMonthly: string;
  discountedPriceMonthly: any;
  transmission: string;
  engineCapacity: string;
  laggageBootCapacity: string;
  securityDeposit: string;
  cashType: string[];
  paiInsuranceDaily: string;
  paiInsuranceWeekly: string;
  paiInsuranceMonthly: any;
  paymentType: string[];
  seater: string;
  requirementsForUAEResidents: string[];
  requirementsForTourists: string[];
  externalImage: string[];
  babySeatChargeDaily: string;
  babySeatChargeWeekly: string;
  babySeatChargeMonthly: string;
  freeDailyKM: string;
  freeWeeklyKM: string;
  freeMonthlyKM: string;
  cdwDaily: string;
  cdwWeekly: string;
  cdwMonthly: string;
  keyFeatures: any;
  deliveryChargeDaily: string;
  deliveryChargeWeekly: string;
  deliveryChargeMonthly: string;
  additionalMileageCharge: string;
  excessClaimCharge: string;
  salikTollCharge: string;
  airportPickupCharge: string;
  airportDeliveryCharge: string;
  carProvider: string;
  branchLocation: string;
  isOfferApplied: string;
  offerType: string;
  oneMonthPriceOf2500Km: any;
  oneMonthPriceOf5000Km: any;
  threeMonthPriceOf2500Km: any;
  threeMonthPriceOf5000Km: any;
  fuel: string;
  maxPower: string;
  torque: string;
  sixMonthPriceOf2500Km: any;
  sixMonthPriceOf5000Km: any;
  eightMonthPriceOf2500Km: any;
  nineMonthPriceOf2500Km: any;
  nineMonthPriceOf5000Km: any;
}

const CreatedCar = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("verify");
  const router = useRouter();

  const [data, setData] = useState<getCarData>({
    _id: "",
    brand: "",
    model: "",
    category: "",
    year: "",
    image: "",
    location: [],
    vehicleType: "",
    cheapestCar: "",
    status: "",
    services: [],
    description: "",
    actualPriceDaily: "",
    discountedPriceDaily: "",
    actualPriceWeekly: "",
    discountedPriceWeekly: "",
    actualPriceMonthly: "",
    discountedPriceMonthly: 0,
    transmission: "",
    engineCapacity: "",
    laggageBootCapacity: "",
    securityDeposit: "",
    cashType: [],
    paiInsuranceDaily: "",
    paiInsuranceWeekly: "",
    paiInsuranceMonthly: 0,
    paymentType: [],
    seater: "",
    requirementsForUAEResidents: [],
    requirementsForTourists: [],
    externalImage: [],
    babySeatChargeDaily: "",
    babySeatChargeWeekly: "",
    babySeatChargeMonthly: "",
    freeDailyKM: "",
    freeWeeklyKM: "",
    freeMonthlyKM: "",
    cdwDaily: "",
    cdwWeekly: "",
    cdwMonthly: "",
    keyFeatures: [],
    deliveryChargeDaily: "",
    deliveryChargeWeekly: "",
    deliveryChargeMonthly: "",
    additionalMileageCharge: "",
    excessClaimCharge: "",
    salikTollCharge: "",
    airportPickupCharge: "",
    airportDeliveryCharge: "",
    carProvider: "",
    branchLocation: "",
    isOfferApplied: "",
    offerType: "",
    oneMonthPriceOf2500Km: 0,
    oneMonthPriceOf5000Km: 0,
    threeMonthPriceOf2500Km: 0,
    threeMonthPriceOf5000Km: 0,
    sixMonthPriceOf2500Km: 0,
    sixMonthPriceOf5000Km: 0,
    eightMonthPriceOf2500Km: 0,
    fuel: "",
    maxPower: "",
    torque: "",
    nineMonthPriceOf2500Km: 0,
    nineMonthPriceOf5000Km: 0,
  });

  // Country codes mapping for display with flags
  const countryCodesMap: { [key: string]: { code: string; flag: string; name: string } } = {
    "+971": { code: "+971", flag: "🇦🇪", name: "UAE" },
    "+91": { code: "+91", flag: "🇮🇳", name: "India" },
    "+1": { code: "+1", flag: "🇺🇸", name: "USA" },
    "+44": { code: "+44", flag: "🇬🇧", name: "UK" },
    "+966": { code: "+966", flag: "🇸🇦", name: "Saudi Arabia" },
    "+92": { code: "+92", flag: "🇵🇰", name: "Pakistan" },
    "+880": { code: "+880", flag: "🇧🇩", name: "Bangladesh" },
    "+973": { code: "+973", flag: "🇧🇭", name: "Bahrain" },
    "+974": { code: "+974", flag: "🇶🇦", name: "Qatar" },
    "+968": { code: "+968", flag: "🇴🇲", name: "Oman" },
    "+965": { code: "+965", flag: "🇰🇼", name: "Kuwait" },
    "+20": { code: "+20", flag: "🇪🇬", name: "Egypt" },
    "+234": { code: "+234", flag: "🇳🇬", name: "Nigeria" },
    "+27": { code: "+27", flag: "🇿🇦", name: "South Africa" },
    "+33": { code: "+33", flag: "🇫🇷", name: "France" },
    "+49": { code: "+49", flag: "🇩🇪", name: "Germany" },
    "+61": { code: "+61", flag: "🇦🇺", name: "Australia" },
    "+86": { code: "+86", flag: "🇨🇳", name: "China" },
    "+81": { code: "+81", flag: "🇯🇵", name: "Japan" },
    "+82": { code: "+82", flag: "🇰🇷", name: "South Korea" },
    "+65": { code: "+65", flag: "🇸🇬", name: "Singapore" },
    "+60": { code: "+60", flag: "🇲🇾", name: "Malaysia" },
    "+66": { code: "+66", flag: "🇹🇭", name: "Thailand" },
    "+62": { code: "+62", flag: "🇮🇩", name: "Indonesia" },
    "+63": { code: "+63", flag: "🇵🇭", name: "Philippines" },
  };

  const [selectedPrice, setSelectedPrice] = useState(0); // state for selected price
  const [selectedInsuarance, setSelectedInsuarance] = useState(0); // state for selected insuarance
  const [insuranceBoxColor, setInsuranceBoxColor] = useState(""); // state for insuarance box color
  const [monthlyBoxColor, setMonthlyBoxColor] = useState(""); // state for insuarance box color
  const [mileage, setMileage] = useState(0); // state for selected milage
  const [selectedCount, setSelectedCount] = useState(1); // state for selected count
  const [selectedMileage, setSelectedMileage] = useState(
    typeof window !== "undefined" ? sessionStorage.getItem("subscription") ?? "" : ""
  ); // state for selected mileage box color
  const [dailyWeekly, setDailyWeekly] = useState(
    typeof window !== "undefined" ? sessionStorage.getItem("subscription") ?? "" : ""
  ); // state for daily weekly box
  const [userfullName, setUserFullName] = useState("");
  const [countryCode, setCountryCode] = useState("+971"); // Default to UAE
  const [userphoneNumber, setUserPhoneNumber] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userCity, setUserCity] = useState("");
  const [userStartDate, setUserStartDate] = useState("");
  const [userCarDeliveryTime, setUserCarDeliveryTime] = useState("");
  const [userEndDate, setUserEndDate] = useState("");
  const [userDropTime, setUserDropTime] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [daysWeeks, setDaysWeeks] = useState("");
  const [selectedDaysPrice, setSelectedDaysPrice] = useState(0);
  const [bookingDaysWeeks, setBookingDaysWeeks] = useState(
    "Please select above"
  );
  const [insuDailyWeekly, setInsuDailyWeekly] = useState(0);
  const [bookingMonth, setBookingMonth] = useState("Please select above");

  const handleBoxClick = (price: any, count: any, monthText: any) => {
    // Check if mileage is selected before allowing monthly duration selection
    if (!selectedMileage) {
      setError("Please select a mileage option (2500 KM or 5000 KM) before choosing a monthly duration.");
      return;
    }
    
    setError(""); // Clear any previous errors
    setSelectedPrice(price); // update selected price
    setSelectedCount(count);
    setMonthlyBoxColor(monthText);
    setSelectedDaysPrice(0);
    setBookingDaysWeeks("");
    setBookingMonth(monthText);
    
    // Recalculate insurance cost if Full Cover is already selected
    let insuranceCost = 0;
    if (insuranceBoxColor === "Full Cover") {
      insuranceCost = parseFloat(data?.cdwMonthly ?? 0) * count;
      setSelectedInsuarance(insuranceCost);
      setInsuDailyWeekly(insuranceCost);
    } else {
      // Reset insurance if no option is selected
      setSelectedInsuarance(0);
      setInsuDailyWeekly(0);
    }
    
    // Debug logging for monthly duration change
    console.log("Monthly Duration Change Debug:", {
      monthText,
      count,
      insuranceBoxColor,
      insuranceCost,
      cdwMonthly: data?.cdwMonthly,
    });
  };
  const handleInsauranceBoxClick = (price: any, monthText: any) => {
    setInsuranceBoxColor(monthText);
    
    // Calculate insurance cost based on booking type and duration
    let insuranceCost = 0;
    if (monthText === "Full Cover") {
      if (dailyWeekly === "monthly") {
        // For monthly bookings, multiply by the number of months selected
        insuranceCost = parseFloat(data?.cdwMonthly ?? 0) * selectedCount;
      } else if (dailyWeekly === "dailyAndWeekly") {
        if (daysWeeks === "days") {
          insuranceCost = parseFloat(data?.cdwDaily ?? 0) * selectedCount;
        } else if (daysWeeks === "weeks") {
          insuranceCost = parseFloat(data?.cdwWeekly ?? 0) * selectedCount;
        }
      }
    }
    
    // Set both insurance variables to the calculated total cost
    setSelectedInsuarance(insuranceCost); // This is used in monthly price breakdown
    setInsuDailyWeekly(insuranceCost);   // This is used in daily/weekly price breakdown
    
    // Debug logging for insurance calculation
    console.log("Insurance Click Debug:", {
      monthText,
      dailyWeekly,
      daysWeeks,
      selectedCount,
      insuranceCost,
      cdwDaily: data?.cdwDaily,
      cdwWeekly: data?.cdwWeekly,
      cdwMonthly: data?.cdwMonthly,
      perMonthRate: parseFloat(data?.cdwMonthly ?? 0),
      totalForMonths: parseFloat(data?.cdwMonthly ?? 0) * selectedCount,
    });
  };
  const handleSelectedDaysBoxClick = (
    price: any,
    itemText: any,
    count: any
  ) => {
    // Check if insurance is selected before allowing day selection
    if (!insuranceBoxColor) {
      setError("Please select an insurance option (Standard Cover or Full Cover) before choosing the number of days.");
      return;
    }
    
    setError(""); // Clear any previous errors
    setSelectedDaysPrice(price);
    setBookingDaysWeeks(itemText);
    setSelectedCount(count);
    setMonthlyBoxColor("");
    
    // Recalculate insurance cost if Full Cover is selected
    let insuranceCost = 0;
    if (insuranceBoxColor === "Full Cover") {
      if (daysWeeks === "days") {
        insuranceCost = parseFloat(data?.cdwDaily ?? 0) * count;
      } else if (daysWeeks === "weeks") {
        insuranceCost = parseFloat(data?.cdwWeekly ?? 0) * count;
      }
    }
    
    setInsuDailyWeekly(insuranceCost);
    
    // Debug logging for days/weeks selection
    console.log("Days/Weeks Selection Debug:", {
      itemText,
      count,
      daysWeeks,
      insuranceBoxColor,
      insuranceCost,
      cdwDaily: data?.cdwDaily,
      cdwWeekly: data?.cdwWeekly,
    });
  };

  const handleMileageBoxClick = (mileage: any) => {
    // const mileageCost = mileage === "5000 KM" ? 300 * selectedCount : 0;
    const mileageCost = mileage === "5000 KM Mileage" ? 300 : 0;
    setMileage(mileageCost); // update additional mileage cost
    setSelectedMileage(mileage);
    setMonthlyBoxColor("");
    setSelectedPrice(0);
    setInsuranceBoxColor("");
    setSelectedInsuarance(0);
    setBookingMonth("Please Select Above");
    setError(""); // Clear any previous errors
  };

  const handleDailyWeekly = (text: any) => {
    setDailyWeekly(text);
    setSelectedPrice(0);
    setSelectedCount(1);
    setSelectedInsuarance(0);
    setInsuranceBoxColor("");
    setMonthlyBoxColor("");
    setMileage(0);
    setSelectedMileage("");
    setDaysWeeks("");
    setBookingDaysWeeks("Please select above");
    setBookingMonth("Please select above");
    setInsuDailyWeekly(0);
    setSelectedDaysPrice(0);
  };
  const handleDaysWeeks = (text: any) => {
    setDaysWeeks(text);
    setSelectedDaysPrice(0);
    setBookingDaysWeeks("Please select above");
    setSelectedInsuarance(0);
    setInsuranceBoxColor("");
    setMonthlyBoxColor("");
    setSelectedCount(1);
    setInsuDailyWeekly(0);
    
    // Debug logging for days/weeks switch
    console.log("Days/Weeks Switch Debug:", {
      text,
      previousInsuranceBoxColor: insuranceBoxColor,
      previousInsuDailyWeekly: insuDailyWeekly,
    });
  };

  useEffect(() => {
    if (id) {
      axios
        .get(serverUrl + `/user/getCar/${id}`)
        .then((res) => {
          //  ;
          setData(res.data.data);
          console.log(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const [phoneemail, setPhoneEmail] = useState({});
  useEffect(() => {
    axios
      .get(serverUrl + "/admin/getAllsettings")
      .then((res) => {
        setPhoneEmail(res.data.data[0]);
        console.log(res.data.data[0], "phoneEmail");
      })
      .catch((err) => {
        console.log(err, "...error");
      });
  }, []);

  const phoneData: any = phoneemail;

  const carDetailsBox = [
    { image: "/Seat.png", title: "Capacity", text: data?.seater },
    {
      image: "/Cruise control.png",
      title: "Transmission",
      text: "Cruise control",
    },
    { image: "/Abs.png", title: "Braking System", text: "ABS Brakes" },
    { image: "/Airbag.png", title: "Safety", text: "Dual Front Airbags" },
  ];

  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  const highlights = [
    { text: "Engine", value: `${data?.engineCapacity}L Engine` },
    { text: "Transmission", value: data?.transmission },
    { text: "Fuel", value: data?.fuel ? data?.fuel : "Petrol" },
    { text: "Seats", value: data?.seater },
  ];
  const technicalDetails = [
    { text: "Max Power", value: data?.maxPower ? data?.maxPower : "100 HP" },
    { text: "Torque", value: data?.torque ? data?.torque : "14 NM" },
    { text: "Laggage Boot Capacity", value: data.laggageBootCapacity },
    { text: "Category", value: data?.category },
  ];

  const monthlyBooking = [
    {
      monthText: "9 Months",
      savingAmount: "100",
      price:
        selectedMileage === "5000 KM Mileage"
          ? parseFloat(data?.nineMonthPriceOf5000Km || 0)
          : parseFloat(data?.nineMonthPriceOf2500Km || 0),
      count: 9,
    },
    {
      monthText: "6 Months",
      savingAmount: "80",
      price:
        selectedMileage === "5000 KM Mileage"
          ? parseFloat(data?.sixMonthPriceOf5000Km || 0)
          : parseFloat(data?.sixMonthPriceOf2500Km || 0),
      count: 6,
    },
    {
      monthText: "3 Months",
      savingAmount: "60",
      price:
        selectedMileage === "5000 KM Mileage"
          ? parseFloat(data?.threeMonthPriceOf5000Km || 0)
          : parseFloat(data?.threeMonthPriceOf2500Km || 0),
      count: 3,
    },
    {
      monthText: "1 Month",
      savingAmount: "40",
      price:
        selectedMileage === "5000 KM Mileage"
          ? parseFloat(data?.oneMonthPriceOf5000Km || 0)
          : parseFloat(data?.oneMonthPriceOf2500Km || 0),
      count: 1,
    },
  ];

  const insuranceBox = [
    {
      monthText: "Standard Cover",
      savingAmount: "No additional cost",
      price: 0,
    },
    {
      monthText: "Full Cover",
      savingAmount: `+ D ${
        dailyWeekly === "monthly"
          ? parseFloat(data?.cdwMonthly || 0)
          : dailyWeekly === "dailyAndWeekly"
          ? parseFloat(data?.cdwDaily || 0)
          : ""
      }${dailyWeekly === "monthly" ? "/Month" : dailyWeekly === "dailyAndWeekly" ? "/Day" : ""}`,
      price: dailyWeekly === "monthly"
        ? parseFloat(data?.cdwMonthly || 0) // This is the per-month rate
        : dailyWeekly === "dailyAndWeekly"
        ? parseFloat(data?.cdwDaily || 0) // This is the per-day rate
        : 0,
    },
  ];

  // Debug logging to help troubleshoot price calculations
  console.log("Monthly Booking Prices Debug:", {
    selectedMileage,
    monthlyBookingPrices: monthlyBooking.map(item => ({
      month: item.monthText,
      price: item.price,
      is5000KM: selectedMileage === "5000 KM Mileage"
    })),
    carData: {
      nineMonthPriceOf2500Km: data?.nineMonthPriceOf2500Km,
      nineMonthPriceOf5000Km: data?.nineMonthPriceOf5000Km,
      sixMonthPriceOf2500Km: data?.sixMonthPriceOf2500Km,
      sixMonthPriceOf5000Km: data?.sixMonthPriceOf5000Km,
      threeMonthPriceOf2500Km: data?.threeMonthPriceOf2500Km,
      threeMonthPriceOf5000Km: data?.threeMonthPriceOf5000Km,
      oneMonthPriceOf2500Km: data?.oneMonthPriceOf2500Km,
      oneMonthPriceOf5000Km: data?.oneMonthPriceOf5000Km,
    }
  });

  // Debug logging for insurance
  console.log("Insurance Debug:", {
    dailyWeekly,
    daysWeeks,
    selectedInsuarance,
    insuranceBoxColor,
    insuDailyWeekly,
    insuranceBoxPrices: insuranceBox.map(item => ({
      monthText: item.monthText,
      price: item.price,
      savingAmount: item.savingAmount
    })),
    carInsuranceData: {
      cdwDaily: data?.cdwDaily,
      cdwWeekly: data?.cdwWeekly,
      cdwMonthly: data?.cdwMonthly,
    }
  });
  const monthlyMilageBox = [
    { monthText: "2500 KM Mileage", savingAmount: "No additional cost" },
    {
      monthText: "5000 KM Mileage",
      savingAmount: `Additional cost applicable`,
    },
  ];
  const dailyWeeklyAndMonthlyBox = [
    { bookFor: "Daily & Weekly", text: "dailyAndWeekly" },
    { bookFor: "Monthly", text: `monthly` },
  ];

  const daysWeeksBox = [
    { bookFor: "Days", text: "days" },
    { bookFor: "Weeks", text: `weeks` },
  ];

  const daysBooking = [
    {
      dayText: "1 Day",
      price: parseFloat(data?.discountedPriceDaily),
      count: 1,
    },
    {
      dayText: "2 Days",
      price: parseFloat(data?.discountedPriceDaily) * 2,
      count: 2,
    },
    {
      dayText: "3 Days",
      price: parseFloat(data?.discountedPriceDaily) * 3,
      count: 3,
    },
    {
      dayText: "4 Days",
      price: parseFloat(data?.discountedPriceDaily) * 4,
      count: 4,
    },
    {
      dayText: "5 Days",
      price: parseFloat(data?.discountedPriceDaily) * 5,
      count: 5,
    },
    {
      dayText: "6 Days",
      price: parseFloat(data?.discountedPriceDaily) * 6,
      count: 6,
    },
  ];
  const weeksBooking = [
    {
      dayText: "1 Week",
      price: parseFloat(data?.discountedPriceWeekly),
      count: 1,
    },
    {
      dayText: "2 Weeks",
      price: parseFloat(data?.discountedPriceWeekly) * 2,
      count: 2,
    },
    {
      dayText: "3 Weeks",
      price: parseFloat(data?.discountedPriceWeekly) * 3,
      count: 3,
    },
  ];

  const totalCarInsauAmt = selectedPrice + selectedInsuarance;

  const vatFivePercent = (totalCarInsauAmt * 5) / 100;

  const totalAmountmonthly = totalCarInsauAmt + vatFivePercent;

  const vatFivePercentDailyWeekly = selectedDaysPrice + insuDailyWeekly;

  const vatAmountDailyWeekly = (vatFivePercentDailyWeekly * 5) / 100;

  const totalAmountDailyWeekly =
    vatFivePercentDailyWeekly + vatAmountDailyWeekly;

  // Calculate estimated rent based on package
  const calculatePriceBreakdown = (packageType: string, carData: any, insuranceType: string = "") => {
    try {
      if (!carData) return null;
      
      const dailyPrice = parseFloat(carData.discountedPriceDaily || carData.actualPriceDaily || 0);
      const weeklyPrice = parseFloat(carData.discountedPriceWeekly || carData.actualPriceWeekly || 0);
      const monthlyPrice = parseFloat(carData.discountedPriceMonthly || carData.actualPriceMonthly || 0);
      
      // Only apply insurance if "Full Cover" is selected
      const dailyInsurance = insuranceType === "Full Cover" ? parseFloat(carData.cdwDaily || 0) : 0;
      const weeklyInsurance = insuranceType === "Full Cover" ? parseFloat(carData.cdwWeekly || 0) : 0;
      const monthlyInsurance = insuranceType === "Full Cover" ? parseFloat(carData.cdwMonthly || 0) : 0;
      
      const dailyKm = carData.freeDailyKM || "250";
      const weeklyKm = carData.freeWeeklyKM || "1750";
      const monthlyKm = carData.freeMonthlyKM || "7500";
      
      let bookingDays = 0;
      let freeKm = dailyKm;
      let rentalCharges = 0;
      let insuranceCharges = 0;
      
      if (packageType?.toLowerCase().includes('month')) {
        const months = parseInt(packageType.match(/\d+/)?.[0] || '1');
        bookingDays = months * 30;
        freeKm = monthlyKm;
        rentalCharges = monthlyPrice * months;
        insuranceCharges = monthlyInsurance * months;
      } else if (packageType?.toLowerCase().includes('week')) {
        const weeks = parseInt(packageType.match(/\d+/)?.[0] || '1');
        bookingDays = weeks * 7;
        freeKm = weeklyKm;
        rentalCharges = weeklyPrice * weeks;
        insuranceCharges = weeklyInsurance * weeks;
      } else if (packageType?.toLowerCase().includes('day')) {
        const days = parseInt(packageType.match(/\d+/)?.[0] || '1');
        bookingDays = days;
        freeKm = dailyKm;
        rentalCharges = dailyPrice * days;
        insuranceCharges = dailyInsurance * days;
      }
      
      const vatCharges = (rentalCharges + insuranceCharges) * 0.05;
      const totalAmount = rentalCharges + insuranceCharges + vatCharges;
      
      return {
        bookingDays,
        freeKm,
        rentalCharges: rentalCharges.toFixed(2),
        insuranceCharges: insuranceCharges.toFixed(2),
        vatCharges: vatCharges.toFixed(2),
        totalAmount: totalAmount.toFixed(2)
      };
    } catch (error) {
      return null;
    }
  };

  const handleMonthlyWhatsappClick = async (
    carDetails: any,
    userphoneNumber: any,
    userfullName: any,
    userEmail: any,
    userCity: any,
    userStartDate: any,
    userCarDeliveryTime: any,
    userEndDate: any,
    userDropTime: any
  ) => {
    if (
      !userfullName ||
      !userphoneNumber ||
      !userEmail ||
      !userCity ||
      !userStartDate ||
      !userCarDeliveryTime ||
      !userEndDate ||
      !userDropTime
    ) {
      setError("Please enter all fields.");
      return;
    }
    setError("");
    const { brand, model, year, _id } = carDetails;
    // const baseUrl =
    //   "https://injazrent.ae/user/landing_page/get_car_details?verify=";
    // const url = `${baseUrl}${_id}`;
    // const whatsappMessage = `Hi, \nI’m ${userfullName} contacting you through Injazrent.ae. \nI’d like to rent the INJAZ Car. \nFull Name :- ${userfullName}. \nPhone No :- ${userphoneNumber}. \nEmail :-${userEmail}. \nCity :- ${userCity}. \nStart Date :- ${userStartDate}. \nCar Delivery Time :- ${userCarDeliveryTime}. \nCar :- ${brand} ${model} ${year}. \nBooking ${bookingMonth
    //   .replace(/\d+/, "")
    //   .trim()} :- ${bookingMonth}. \nCar Rental Charges in D :- ${
    //   selectedPrice > 0 ? selectedPrice : 0
    // }. \nInsuarance Charges in D :- ${
    //   selectedInsuarance > 0 ? selectedInsuarance : 0
    // }. \nMileage Charges in D :- ${mileage}. \nVAT Charges (5%) in D :- ${vatFivePercent}. \nTotal Amount :- ${totalAmountmonthly}. \n${url}. \nIs it available?`;
    // const whatsappLink = `https://wa.me/${
    //   phoneData?.phoneNumber ? phoneData?.phoneNumber : "+971529487046"
    // }?text=${encodeURIComponent(whatsappMessage)}`;

    try {
      setLoading(true); // Start loading

      const response: any = await axios.post(
        serverUrl + "/user/createInquiry",
        {
          carName: brand + " " + model + " " + year,
          startDate: userStartDate,
          endDate: userEndDate,
          pickUpLoc: userCity,
          dropLocation: userCity,
          phoneNumber: `${countryCode}${userphoneNumber}`,
          message: userCity,
          name: userfullName,
          email: userEmail,
          packages: bookingMonth,
          pickupTime: userCarDeliveryTime,
          dropTime: userDropTime,
        }
      );
      setLoading(false); // End loading
      console.log("Booking response:", response.data); // Debug log
      const priceBreakdown = calculatePriceBreakdown(bookingMonth, data, insuranceBoxColor);
      Swal.fire({
        icon: "success",
        title: "✅ Booking inquiry Successfully Created",
        html: `
          <div style="text-align: left; padding: 20px; font-family: 'Segoe UI', Arial, sans-serif;">
            <p style="font-size: 17px; margin-bottom: 25px; text-align: center; color: #2c3e50; font-weight: 500;">Thank you for choosing <strong style="color: #28a745;">Injaz Rent A Car</strong>!</p>
            
            <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 25px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); border-left: 5px solid #28a745;">
              <h3 style="margin-top: 0; color: #2c3e50; font-size: 19px; margin-bottom: 15px; font-weight: 600;">Inquiry Details:</h3>
              <div style="background: white; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                <p style="margin: 0; font-size: 18px; color: #28a745; font-weight: bold;">Booking Reference: #${response?.data?.result?.bookingId}</p>
              </div>
              
              <p style="margin: 12px 0; font-size: 15px; color: #495057;"><strong>🚗 Car Type:</strong> <span style="color: #2c3e50;">${response?.data?.result?.carName || brand + " " + model}</span></p>
              
              <p style="margin: 12px 0; font-size: 15px; color: #495057;"><strong>📅 Pickup Date & Time:</strong> <span style="color: #2c3e50;">${response?.data?.result?.startDate || userStartDate} - ${response?.data?.result?.pickupTime || userCarDeliveryTime}</span></p>
              
              <p style="margin: 12px 0; font-size: 15px; color: #495057;"><strong>📍 Pickup Location:</strong> <span style="color: #2c3e50;">${response?.data?.result?.pickUpLoc || userCity}</span></p>
              
              <p style="margin: 12px 0; font-size: 15px; color: #495057;"><strong>📅 Drop-off Date & Time:</strong> <span style="color: #2c3e50;">${response?.data?.result?.endDate || userEndDate} - ${response?.data?.result?.dropTime || userDropTime}</span></p>
              
              <p style="margin: 12px 0; font-size: 15px; color: #495057;"><strong>📍 Drop-off Location:</strong> <span style="color: #2c3e50;">${response?.data?.result?.dropLocation || userCity}</span></p>
              
              <hr style="margin: 20px 0; border: none; border-top: 2px solid #dee2e6;" />
              
              ${priceBreakdown ? `
                <div style="background: linear-gradient(135deg, #01437D 0%, #025fa0 100%); padding: 20px; border-radius: 10px; margin: 20px 0; color: white;">
                  <h4 style="margin: 0 0 15px 0; font-size: 18px; font-weight: 600; text-align: center; border-bottom: 2px solid rgba(255,255,255,0.3); padding-bottom: 10px;">Car Charges & Other Details</h4>
                  
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr style="border-bottom: 1px solid rgba(255,255,255,0.2);">
                      <td style="padding: 10px 0; font-size: 15px;">Booking Days</td>
                      <td style="padding: 10px 0; text-align: right; font-weight: 600; font-size: 15px;">${priceBreakdown.bookingDays} Days</td>
                    </tr>
                    <tr style="border-bottom: 1px solid rgba(255,255,255,0.2);">
                      <td style="padding: 10px 0; font-size: 15px;">Car Free KM</td>
                      <td style="padding: 10px 0; text-align: right; font-weight: 600; font-size: 15px;">${priceBreakdown.freeKm}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid rgba(255,255,255,0.2);">
                      <td style="padding: 10px 0; font-size: 15px;">Car Rental Charges in D</td>
                      <td style="padding: 10px 0; text-align: right; font-weight: 600; font-size: 15px;">D ${priceBreakdown.rentalCharges}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid rgba(255,255,255,0.2);">
                      <td style="padding: 10px 0; font-size: 15px;">Car Insurance Charges in D</td>
                      <td style="padding: 10px 0; text-align: right; font-weight: 600; font-size: 15px;">D ${priceBreakdown.insuranceCharges}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid rgba(255,255,255,0.2);">
                      <td style="padding: 10px 0; font-size: 15px;">VAT Charges (5%) in D</td>
                      <td style="padding: 10px 0; text-align: right; font-weight: 600; font-size: 15px;">D ${priceBreakdown.vatCharges}</td>
                    </tr>
                    <tr style="border-top: 2px solid rgba(255,255,255,0.4);">
                      <td style="padding: 15px 0 5px 0; font-size: 17px; font-weight: 700;">Total Amount</td>
                      <td style="padding: 15px 0 5px 0; text-align: right; font-weight: 700; font-size: 19px; color: #ffd700;">D ${priceBreakdown.totalAmount}</td>
                    </tr>
                  </table>
                </div>
              ` : ''}
              
              <p style="margin: 10px 0; font-size: 15px; color: #495057;"><strong>📧 Email:</strong> <span style="color: #2c3e50;">${response?.data?.result?.email}</span></p>
              
              <p style="margin: 10px 0; font-size: 15px; color: #495057;"><strong>📞 Phone Number:</strong> <span style="color: #2c3e50;">${response?.data?.result?.phoneNumber}</span></p>
            </div>
            
            <div style="background: linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%); border-left: 5px solid #ff9800; padding: 20px; border-radius: 10px; margin-top: 25px; box-shadow: 0 2px 6px rgba(255,152,0,0.2);">
              <p style="margin: 0 0 12px 0; font-size: 16px; color: #e65100; font-weight: 700; display: flex; align-items: center; gap: 8px;">
                <span style="font-size: 20px;">ℹ️</span> Important Notice
              </p>
              <p style="margin: 0 0 8px 0; font-size: 14px; color: #f57c00; line-height: 1.6; font-weight: 600;">
                📋 This is only a <strong>booking inquiry</strong>, not a confirmed booking.
              </p>
              <p style="margin: 0; font-size: 14px; color: #f57c00; line-height: 1.6;">
                💡 Prices may change based on the rental period and additional services requested.
              </p>
            </div>
            
            <p style="font-size: 14px; margin-top: 20px; color: #6c757d; text-align: center; font-style: italic; line-height: 1.5;">
              Our team will review your inquiry and contact you shortly with the final price and confirmation details.
            </p>
          </div>
        `,
        confirmButtonText: "OK",
        confirmButtonColor: "#28a745",
        width: "700px",
      });
      router.push("/");
    } catch (err) {
      setLoading(false); // End loading
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error submitting data. Please try again later.",
      });
    }
    // console.log(whatsappMessage);
    debugger;
  };
  const handleDailyAndWeeklyWhatsappClick = async (
    carDetails: any,
    userphoneNumber: any,
    userfullName: any,
    userEmail: any,
    userCity: any,
    userStartDate: any,
    userCarDeliveryTime: any,
    userEndDate: any,
    userDropTime: any
  ) => {
    if (
      !userfullName ||
      !userphoneNumber ||
      !userEmail ||
      !userCity ||
      !userStartDate ||
      !userCarDeliveryTime ||
      !userEndDate ||
      !userDropTime
    ) {
      setError("Please enter all fields.");
      return;
    }
    setError("");
    const { brand, model, year, _id } = carDetails;
    // const baseUrl =
    //   "https://injazrent.ae/user/landing_page/get_car_details?verify=";
    // const url = `${baseUrl}${_id}`;
    // const whatsappMessage = `Hi, \nI’m ${userfullName} contacting you through Injazrent.ae. \nI’d like to rent the INJAZ Car. \nFull Name :- ${userfullName}. \nPhone No :- ${userphoneNumber}. \nEmail :-${userEmail}. \nCity :- ${userCity}. \nStart Date :- ${userStartDate}. \nCar Delivery Time :- ${userCarDeliveryTime}. \nCar :- ${brand} ${model} ${year}. \nBooking ${bookingDaysWeeks
    //   .replace(/\d+/, "")
    //   .trim()} :- ${bookingDaysWeeks}. \nCar Free KM :- ${
    //   daysWeeks === "days"
    //     ? parseFloat(data?.freeDailyKM) * selectedCount
    //     : "0" && daysWeeks === "weeks"
    //     ? parseFloat(data?.freeWeeklyKM) * selectedCount
    //     : "0"
    // }. \nCar Rental Charges in D :- ${selectedDaysPrice}. \nCar Insurance Charges in D :- ${insuDailyWeekly}. \nVAT Charges (5%) in D :- ${vatAmountDailyWeekly}. \nTotal Amount :- ${totalAmountDailyWeekly}. \n${url} \nIs it available?`;
    // const whatsappLink = `https://wa.me/${
    //   phoneData?.phoneNumber ? phoneData?.phoneNumber : "+971529487046"
    // }?text=${encodeURIComponent(whatsappMessage)}`;

    try {
      setLoading(true); // Start loading

      const response: any = await axios.post(
        serverUrl + "/user/createInquiry",
        {
          carName: brand + " " + model + " " + year,
          startDate: userStartDate,
          endDate: userEndDate,
          pickUpLoc: userCity,
          dropLocation: userCity,
          phoneNumber: `${countryCode}${userphoneNumber}`,
          message: userCity,
          name: userfullName,
          email: userEmail,
          packages: bookingDaysWeeks,
          pickupTime: userCarDeliveryTime,
          dropTime: userDropTime,
        }
      );
      setLoading(false); // End loading
      console.log("Booking response:", response.data); // Debug log
      const priceBreakdown = calculatePriceBreakdown(bookingDaysWeeks, data, insuranceBoxColor);
      Swal.fire({
        icon: "success",
        title: "✅ Booking inquiry Successfully Created",
        html: `
          <div style="text-align: left; padding: 20px; font-family: 'Segoe UI', Arial, sans-serif;">
            <p style="font-size: 17px; margin-bottom: 25px; text-align: center; color: #2c3e50; font-weight: 500;">Thank you for choosing <strong style="color: #28a745;">Injaz Rent A Car</strong>!</p>
            
            <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 25px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); border-left: 5px solid #28a745;">
              <h3 style="margin-top: 0; color: #2c3e50; font-size: 19px; margin-bottom: 15px; font-weight: 600;">Inquiry Details:</h3>
              <div style="background: white; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                <p style="margin: 0; font-size: 18px; color: #28a745; font-weight: bold;">Booking Reference: #${response?.data?.result?.bookingId}</p>
              </div>
              
              <p style="margin: 12px 0; font-size: 15px; color: #495057;"><strong>🚗 Car Type:</strong> <span style="color: #2c3e50;">${response?.data?.result?.carName || brand + " " + model}</span></p>
              
              <p style="margin: 12px 0; font-size: 15px; color: #495057;"><strong>📅 Pickup Date & Time:</strong> <span style="color: #2c3e50;">${response?.data?.result?.startDate || userStartDate} - ${response?.data?.result?.pickupTime || userCarDeliveryTime}</span></p>
              
              <p style="margin: 12px 0; font-size: 15px; color: #495057;"><strong>📍 Pickup Location:</strong> <span style="color: #2c3e50;">${response?.data?.result?.pickUpLoc || userCity}</span></p>
              
              <p style="margin: 12px 0; font-size: 15px; color: #495057;"><strong>📅 Drop-off Date & Time:</strong> <span style="color: #2c3e50;">${response?.data?.result?.endDate || userEndDate} - ${response?.data?.result?.dropTime || userDropTime}</span></p>
              
              <p style="margin: 12px 0; font-size: 15px; color: #495057;"><strong>📍 Drop-off Location:</strong> <span style="color: #2c3e50;">${response?.data?.result?.dropLocation || userCity}</span></p>
              
              <hr style="margin: 20px 0; border: none; border-top: 2px solid #dee2e6;" />
              
              ${priceBreakdown ? `
                <div style="background: linear-gradient(135deg, #01437D 0%, #025fa0 100%); padding: 20px; border-radius: 10px; margin: 20px 0; color: white;">
                  <h4 style="margin: 0 0 15px 0; font-size: 18px; font-weight: 600; text-align: center; border-bottom: 2px solid rgba(255,255,255,0.3); padding-bottom: 10px;">Car Charges & Other Details</h4>
                  
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr style="border-bottom: 1px solid rgba(255,255,255,0.2);">
                      <td style="padding: 10px 0; font-size: 15px;">Booking Days</td>
                      <td style="padding: 10px 0; text-align: right; font-weight: 600; font-size: 15px;">${priceBreakdown.bookingDays} Days</td>
                    </tr>
                    <tr style="border-bottom: 1px solid rgba(255,255,255,0.2);">
                      <td style="padding: 10px 0; font-size: 15px;">Car Free KM</td>
                      <td style="padding: 10px 0; text-align: right; font-weight: 600; font-size: 15px;">${priceBreakdown.freeKm}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid rgba(255,255,255,0.2);">
                      <td style="padding: 10px 0; font-size: 15px;">Car Rental Charges in D</td>
                      <td style="padding: 10px 0; text-align: right; font-weight: 600; font-size: 15px;">D ${priceBreakdown.rentalCharges}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid rgba(255,255,255,0.2);">
                      <td style="padding: 10px 0; font-size: 15px;">Car Insurance Charges in D</td>
                      <td style="padding: 10px 0; text-align: right; font-weight: 600; font-size: 15px;">D ${priceBreakdown.insuranceCharges}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid rgba(255,255,255,0.2);">
                      <td style="padding: 10px 0; font-size: 15px;">VAT Charges (5%) in D</td>
                      <td style="padding: 10px 0; text-align: right; font-weight: 600; font-size: 15px;">D ${priceBreakdown.vatCharges}</td>
                    </tr>
                    <tr style="border-top: 2px solid rgba(255,255,255,0.4);">
                      <td style="padding: 15px 0 5px 0; font-size: 17px; font-weight: 700;">Total Amount</td>
                      <td style="padding: 15px 0 5px 0; text-align: right; font-weight: 700; font-size: 19px; color: #ffd700;">D ${priceBreakdown.totalAmount}</td>
                    </tr>
                  </table>
                </div>
              ` : ''}
              
              <p style="margin: 10px 0; font-size: 15px; color: #495057;"><strong>📧 Email:</strong> <span style="color: #2c3e50;">${response?.data?.result?.email}</span></p>
              
              <p style="margin: 10px 0; font-size: 15px; color: #495057;"><strong>📞 Phone Number:</strong> <span style="color: #2c3e50;">${response?.data?.result?.phoneNumber}</span></p>
            </div>
            
            <div style="background: linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%); border-left: 5px solid #ff9800; padding: 20px; border-radius: 10px; margin-top: 25px; box-shadow: 0 2px 6px rgba(255,152,0,0.2);">
              <p style="margin: 0 0 12px 0; font-size: 16px; color: #e65100; font-weight: 700; display: flex; align-items: center; gap: 8px;">
                <span style="font-size: 20px;">ℹ️</span> Important Notice
              </p>
              <p style="margin: 0 0 8px 0; font-size: 14px; color: #f57c00; line-height: 1.6; font-weight: 600;">
                📋 This is only a <strong>booking inquiry</strong>, not a confirmed booking.
              </p>
              <p style="margin: 0; font-size: 14px; color: #f57c00; line-height: 1.6;">
                💡 Prices may change based on the rental period and additional services requested.
              </p>
            </div>
            
            <p style="font-size: 14px; margin-top: 20px; color: #6c757d; text-align: center; font-style: italic; line-height: 1.5;">
              Our team will review your inquiry and contact you shortly with the final price and confirmation details.
            </p>
          </div>
        `,
        confirmButtonText: "OK",
        confirmButtonColor: "#28a745",
        width: "700px",
      });
      router.push("/");
    } catch (err) {
      setLoading(false); // End loading
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error submitting data. Please try again later.",
      });
    }
  };

  const textFieldData = [
    {
      value: userfullName,
      onChange: (e: any) => setUserFullName(e.target.value),
      errors: !userfullName && error !== "",
      placeholder: "Full Name",
      type: "text",
      variant: "outlined",
    },
    {
      value: userphoneNumber,
      onChange: (e: any) => setUserPhoneNumber(e.target.value),
      errors: !userphoneNumber && error !== "",
      placeholder: "Phone Number",
      type: "text",
      variant: "outlined",
    },
    {
      value: userEmail,
      onChange: (e: any) => setUserEmail(e.target.value),
      errors: !userEmail && error !== "",
      placeholder: "Email",
      type: "text",
      variant: "outlined",
    },
    {
      value: userCity,
      onChange: (e: any) => setUserCity(e.target.value),
      errors: !userCity && error !== "",
      placeholder: "City",
      type: "text",
      variant: "outlined",
    },
    {
      value: userStartDate,
      onChange: (e: any) => setUserStartDate(e.target.value),
      errors: !userStartDate && error !== "",
      placeholder: "dd-mm-yyyy",
      type: "date",
      variant: "outlined",
    },
    {
      value: userCarDeliveryTime,
      onChange: (e: any) => setUserCarDeliveryTime(e.target.value),
      errors: !userCarDeliveryTime && error !== "",
      placeholder: "--:--",
      type: "time",
      variant: "outlined",
    },
    {
      value: userEndDate,
      onChange: (e: any) => setUserEndDate(e.target.value),
      errors: !userEndDate && error !== "",
      placeholder: "dd-mm-yyyy",
      type: "date",
      variant: "outlined",
    },
    {
      value: userDropTime,
      onChange: (e: any) => setUserDropTime(e.target.value),
      errors: !userDropTime && error !== "",
      placeholder: "--:--",
      type: "time",
      variant: "outlined",
    },
  ];

  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded((prev) => !prev);
  };

  const fullInsuranceText =
    "What is full insurance? Full Insurance covers everything without an excess charge - even if you are deemed at fault, as long as corresponding police report is submitted.";

  return (
    <>
      <NavFooter />
      {/* Beautiful Back to Home Button - Sticky above car content */}
      <Box
        sx={{
          position: "sticky",
          top: 20,
          zIndex: 1000,
          marginBottom: 3,
          paddingLeft: 2,
          paddingTop: 2,
        }}
      >
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => router.push("/")}
          sx={{
            backgroundColor: "#01437D",
            color: "white",
            borderRadius: "25px",
            padding: "12px 28px",
            fontSize: "16px",
            fontWeight: 600,
            textTransform: "none",
            boxShadow: "0 6px 20px rgba(1, 67, 125, 0.4)",
            transition: "all 0.3s ease",
            minWidth: "160px",
            "&:hover": {
              backgroundColor: "#012a4a",
              transform: "translateY(-3px)",
              boxShadow: "0 8px 25px rgba(1, 67, 125, 0.5)",
            },
          }}
        >
          Back to Home
        </Button>
      </Box>
      <section className="createdCars">
        <Container maxWidth="xl">
          <Grid container spacing={1}>
            <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
              <div className="createdCarsTop">
                <div className="imageHead">
                  <BookingTypo variant="h6">
                    {data?.brand} {data?.model} {data?.year}
                  </BookingTypo>
                </div>
                <div className="createdImg">
                  <CardMedia
                    component="img"
                    height={350}
                    sx={{ objectFit: "contain" }}
                    image={data?.externalImage[0]}
                    alt="carImage"
                  />
                </div>
              </div>
              <div className="createdCarsTop" style={{ borderRadius: "10px" }}>
                <div
                  style={{
                    marginTop: "1rem",
                    // display: "flex",
                    // justifyContent: "space-between",
                    // alignItems: "center",
                  }}
                  className="imageHead"
                >
                  <BookingTypo variant="h6">
                    Car Details{" "}
                    <IconButton onClick={toggleExpand}>
                      {expanded ? (
                        <ExpandLessIcon sx={{ color: "white" }} />
                      ) : (
                        <ExpandMoreIcon sx={{ color: "white" }} />
                      )}
                    </IconButton>
                  </BookingTypo>
                </div>
                {/* Collapsible content */}
                <Collapse in={expanded}>
                  <CarDetailsBoxCss>
                    <Grid container spacing={1}>
                      {carDetailsBox.map((item) => (
                        <Grid key={item.title} item xs={6} sm={2}>
                          <CarDetailscontentBox>
                            <Image
                              src={getValidImageUrl(item.image, "/placeholder-icon.png")}
                              alt={item.title}
                              width={25}
                              height={25}
                            />
                            <TitleTypo variant="subtitle1">
                              {item.title}
                            </TitleTypo>
                            <TitleTypo2 variant="subtitle1">
                              {item.text}
                            </TitleTypo2>
                          </CarDetailscontentBox>
                        </Grid>
                      ))}
                    </Grid>
                  </CarDetailsBoxCss>
                </Collapse>
                <section className="tabSecMem">
                  <AppBarMainBox>
                    <AppBarMain position="static">
                      <Tabs
                        value={value}
                        onChange={handleChange}
                        TabIndicatorProps={{
                          style: {
                            backgroundColor: "white", // Custom color
                          },
                        }}
                        textColor="inherit"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                      >
                        <AppBarTabs label="Pricing" {...a11yProps(0)} />
                        <AppBarTabs label="Specification and Features" {...a11yProps(1)} />
                        <AppBarTabs
                          label="Rental Terms"
                          {...a11yProps(2)}
                        />
                      </Tabs>
                    </AppBarMain>
                    <Box>
                      <TabPanel value={value} index={0} dir={theme.direction}>
                        <Box sx={{ padding: "20px" }}>
                          <Typography
                            sx={{
                              fontWeight: 600,
                              fontSize: "1.5rem",
                              marginBottom: "20px",
                              color: "#01437D",
                            }}
                            variant="h5"
                          >
                            PRICING
                          </Typography>
                          
                          <Box sx={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
                            {/* Daily Pricing */}
                            <Box
                              sx={{
                                flex: "1",
                                minWidth: "200px",
                                padding: "20px",
                                borderRadius: "10px",
                                border: "2px solid #e0e0e0",
                                backgroundColor: "#ffffff",
                                textAlign: "center",
                                cursor: "pointer",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                  border: "2px solid #01437D",
                                  backgroundColor: "#f8f9fa",
                                  transform: "translateY(-2px)",
                                  boxShadow: "0 4px 12px rgba(1, 67, 125, 0.15)",
                                },
                              }}
                            >
                              <Typography
                                sx={{
                                  textDecoration: "line-through",
                                  color: "#666",
                                  fontSize: "1rem",
                                  marginBottom: "5px",
                                }}
                              >
                                D {data?.actualPriceDaily || "341"}
                              </Typography>
                              <Typography
                                sx={{
                                  fontSize: "1.8rem",
                                  fontWeight: 600,
                                  color: "#ff6b35",
                                  marginBottom: "5px",
                                }}
                              >
                                D {data?.discountedPriceDaily ? 
                                  (parseInt(data.discountedPriceDaily) > 10000 ? 
                                    Math.round(parseInt(data.discountedPriceDaily) / 1000) : 
                                    data.discountedPriceDaily) : 
                                  "199"}
                              </Typography>
                              <Typography
                                sx={{
                                  fontSize: "0.9rem",
                                  color: "#666",
                                }}
                              >
                                / day
                              </Typography>
                            </Box>

                            {/* Weekly Pricing */}
                            <Box
                              sx={{
                                flex: "1",
                                minWidth: "200px",
                                padding: "20px",
                                borderRadius: "10px",
                                border: "2px solid #e0e0e0",
                                backgroundColor: "#ffffff",
                                textAlign: "center",
                                cursor: "pointer",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                  border: "2px solid #01437D",
                                  backgroundColor: "#f8f9fa",
                                  transform: "translateY(-2px)",
                                  boxShadow: "0 4px 12px rgba(1, 67, 125, 0.15)",
                                },
                              }}
                            >
                              <Typography
                                sx={{
                                  textDecoration: "line-through",
                                  color: "#666",
                                  fontSize: "1rem",
                                  marginBottom: "5px",
                                }}
                              >
                                D {data?.actualPriceWeekly || "2100"}
                              </Typography>
                              <Typography
                                sx={{
                                  fontSize: "1.8rem",
                                  fontWeight: 600,
                                  color: "#ff6b35",
                                  marginBottom: "5px",
                                }}
                              >
                                D {data?.discountedPriceWeekly ? 
                                  (parseInt(data.discountedPriceWeekly) > 10000 ? 
                                    Math.round(parseInt(data.discountedPriceWeekly) / 1000) : 
                                    data.discountedPriceWeekly) : 
                                  "1250"}
                              </Typography>
                              <Typography
                                sx={{
                                  fontSize: "0.9rem",
                                  color: "#666",
                                }}
                              >
                                / week
                              </Typography>
                            </Box>

                            {/* Monthly Pricing */}
                            <Box
                              sx={{
                                flex: "1",
                                minWidth: "200px",
                                padding: "20px",
                                borderRadius: "10px",
                                border: "2px solid #e0e0e0",
                                backgroundColor: "#ffffff",
                                textAlign: "center",
                                cursor: "pointer",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                  border: "2px solid #01437D",
                                  backgroundColor: "#f8f9fa",
                                  transform: "translateY(-2px)",
                                  boxShadow: "0 4px 12px rgba(1, 67, 125, 0.15)",
                                },
                              }}
                            >
                              <Typography
                                sx={{
                                  textDecoration: "line-through",
                                  color: "#666",
                                  fontSize: "1rem",
                                  marginBottom: "5px",
                                }}
                              >
                                D {data?.actualPriceMonthly || "5000"}
                              </Typography>
                              <Typography
                                sx={{
                                  fontSize: "1.8rem",
                                  fontWeight: 600,
                                  color: "#ff6b35",
                                  marginBottom: "5px",
                                }}
                              >
                                D {data?.discountedPriceMonthly ? 
                                  (parseInt(data.discountedPriceMonthly) > 10000 ? 
                                    Math.round(parseInt(data.discountedPriceMonthly) / 1000) : 
                                    data.discountedPriceMonthly) : 
                                  "3850"}
                              </Typography>
                              <Typography
                                sx={{
                                  fontSize: "0.9rem",
                                  color: "#666",
                                }}
                              >
                                / month
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </TabPanel>
                      <TabPanel value={value} index={1} dir={theme.direction}>
                        <Box sx={{ padding: "20px" }}>
                          <Typography
                            sx={{
                              fontWeight: 600,
                              fontSize: "1.5rem",
                              marginBottom: "20px",
                              color: "#01437D",
                            }}
                            variant="h5"
                          >
                            SPECIFICATION AND FEATURES
                          </Typography>
                          
                          {/* Specifications Section */}
                          <Box sx={{ marginBottom: "30px" }}>
                            <Typography
                              sx={{
                                fontWeight: 600,
                                fontSize: "1.2rem",
                                marginBottom: "15px",
                                color: "#333",
                              }}
                              variant="h6"
                            >
                              Specifications
                            </Typography>
                            
                            <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                              <Box sx={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #e0e0e0" }}>
                                <Typography sx={{ fontWeight: 500, color: "#666" }}>Brand:</Typography>
                                <Typography sx={{ fontWeight: 600, color: "#333" }}>{data?.brand || "N/A"}</Typography>
                              </Box>
                              
                              <Box sx={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #e0e0e0" }}>
                                <Typography sx={{ fontWeight: 500, color: "#666" }}>Model:</Typography>
                                <Typography sx={{ fontWeight: 600, color: "#333" }}>{data?.model || "N/A"}</Typography>
                              </Box>
                              
                              <Box sx={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #e0e0e0" }}>
                                <Typography sx={{ fontWeight: 500, color: "#666" }}>Category:</Typography>
                                <Typography sx={{ fontWeight: 600, color: "#333" }}>{data?.category || "N/A"}</Typography>
                              </Box>
                              
                              <Box sx={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #e0e0e0" }}>
                                <Typography sx={{ fontWeight: 500, color: "#666" }}>Vehicle Type:</Typography>
                                <Typography sx={{ fontWeight: 600, color: "#333" }}>{data?.vehicleType || "N/A"}</Typography>
                              </Box>
                              
                              <Box sx={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #e0e0e0" }}>
                                <Typography sx={{ fontWeight: 500, color: "#666" }}>Year:</Typography>
                                <Typography sx={{ fontWeight: 600, color: "#333" }}>{data?.year || "N/A"}</Typography>
                              </Box>
                              
                              <Box sx={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #e0e0e0" }}>
                                <Typography sx={{ fontWeight: 500, color: "#666" }}>Engine Size:</Typography>
                                <Typography sx={{ fontWeight: 600, color: "#333" }}>{data?.engineCapacity || "N/A"}</Typography>
                              </Box>
                              
                              <Box sx={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #e0e0e0" }}>
                                <Typography sx={{ fontWeight: 500, color: "#666" }}>Transmission:</Typography>
                                <Typography sx={{ fontWeight: 600, color: "#333" }}>{data?.transmission || "N/A"}</Typography>
                              </Box>
                              
                              <Box sx={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #e0e0e0" }}>
                                <Typography sx={{ fontWeight: 500, color: "#666" }}>Fuel Type:</Typography>
                                <Typography sx={{ fontWeight: 600, color: "#333" }}>{data?.fuel || "N/A"}</Typography>
                              </Box>
                              
                              <Box sx={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #e0e0e0" }}>
                                <Typography sx={{ fontWeight: 500, color: "#666" }}>Seats No:</Typography>
                                <Typography sx={{ fontWeight: 600, color: "#333" }}>{data?.seater || "N/A"}</Typography>
                              </Box>
                              
                              <Box sx={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #e0e0e0" }}>
                                <Typography sx={{ fontWeight: 500, color: "#666" }}>Max Power:</Typography>
                                <Typography sx={{ fontWeight: 600, color: "#333" }}>{data?.maxPower || "N/A"}</Typography>
                              </Box>
                              
                              <Box sx={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #e0e0e0" }}>
                                <Typography sx={{ fontWeight: 500, color: "#666" }}>Torque:</Typography>
                                <Typography sx={{ fontWeight: 600, color: "#333" }}>{data?.torque || "N/A"}</Typography>
                              </Box>
                              
                              <Box sx={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #e0e0e0" }}>
                                <Typography sx={{ fontWeight: 500, color: "#666" }}>Luggage Boot Capacity:</Typography>
                                <Typography sx={{ fontWeight: 600, color: "#333" }}>{data?.laggageBootCapacity || "N/A"}</Typography>
                              </Box>
                            </Box>
                          </Box>
                          
                          {/* Features Section */}
                          <Box>
                            <Typography
                              sx={{
                                fontWeight: 600,
                                fontSize: "1.2rem",
                                marginBottom: "15px",
                                color: "#333",
                              }}
                              variant="h6"
                            >
                              Features
                            </Typography>
                            
                            <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                              {data?.keyFeatures && Array.isArray(data.keyFeatures) && data.keyFeatures.length > 0 ? (
                                data.keyFeatures.filter(feature => feature && feature.trim() !== "").map((feature: string, index: number) => (
                                  <Box key={index} sx={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #e0e0e0" }}>
                                    <Typography sx={{ fontWeight: 500, color: "#666" }}>{feature}:</Typography>
                                    <Typography sx={{ fontWeight: 600, color: "#333" }}>✓</Typography>
                                  </Box>
                                ))
                              ) : (
                                <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                  <Box sx={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #e0e0e0" }}>
                                    <Typography sx={{ fontWeight: 500, color: "#666" }}>Bluetooth:</Typography>
                                    <Typography sx={{ fontWeight: 600, color: "#333" }}>✓</Typography>
                                  </Box>
                                  <Box sx={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #e0e0e0" }}>
                                    <Typography sx={{ fontWeight: 500, color: "#666" }}>Aux:</Typography>
                                    <Typography sx={{ fontWeight: 600, color: "#333" }}>✓</Typography>
                                  </Box>
                                  <Box sx={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #e0e0e0" }}>
                                    <Typography sx={{ fontWeight: 500, color: "#666" }}>Air Bags:</Typography>
                                    <Typography sx={{ fontWeight: 600, color: "#333" }}>✓</Typography>
                                  </Box>
                                </Box>
                              )}
                            </Box>
                          </Box>
                        </Box>
                      </TabPanel>
                      <TabPanel value={value} index={2} dir={theme.direction}>
                        <Box sx={{ padding: "20px" }}>
                          {/* Driver Eligibility & Insurance Component */}
                          <DriverEligibility
                            carCategory={data?.category}
                            securityDeposit={data?.securityDeposit}
                            noSecurityDeposit={data?.noSecurityDeposit}
                            cdwDaily={data?.cdwDaily}
                            cdwWeekly={data?.cdwWeekly}
                            cdwMonthly={data?.cdwMonthly}
                          />

                          {/* Additional Rental Terms */}
                          <Typography
                            sx={{
                              fontWeight: 600,
                              fontSize: "1.5rem",
                              marginBottom: "20px",
                              color: "#01437D",
                            }}
                            variant="h5"
                          >
                            ADDITIONAL TERMS
                          </Typography>

                          <Box sx={{ marginBottom: "20px" }}>
                            <Typography
                              sx={{
                                fontWeight: 600,
                                fontSize: "1.1rem",
                                marginBottom: "10px",
                                color: "#333",
                              }}
                            >
                              Free Mileage
                            </Typography>
                            <Typography sx={{ fontSize: "1rem", color: "#666", marginBottom: "5px" }}>
                              Daily: {data?.freeDailyKM || "200"} KM
                            </Typography>
                            <Typography sx={{ fontSize: "1rem", color: "#666", marginBottom: "5px" }}>
                              Weekly: {data?.freeWeeklyKM || "1400"} KM
                            </Typography>
                            <Typography sx={{ fontSize: "1rem", color: "#666", marginBottom: "15px" }}>
                              Monthly: {data?.freeMonthlyKM || "6000"} KM
                            </Typography>
                          </Box>

                          <Box sx={{ marginBottom: "20px" }}>
                            <Typography
                              sx={{
                                fontWeight: 600,
                                fontSize: "1.1rem",
                                marginBottom: "10px",
                                color: "#333",
                              }}
                            >
                              Additional Charges
                            </Typography>
                            <Typography sx={{ fontSize: "1rem", color: "#666", marginBottom: "5px" }}>
                              Extra Mileage: D {data?.additionalMileageCharge || "1"} per KM
                            </Typography>
                            <Typography sx={{ fontSize: "1rem", color: "#666", marginBottom: "5px" }}>
                              Salik Toll: D {data?.salikTollCharge || "5"} per toll
                            </Typography>
                            <Typography sx={{ fontSize: "1rem", color: "#666", marginBottom: "5px" }}>
                              Delivery Charge: D {data?.deliveryChargeDaily || "50"} per day
                            </Typography>
                            <Typography sx={{ fontSize: "1rem", color: "#666", marginBottom: "15px" }}>
                              Airport Pickup: D {data?.airportPickupCharge || "100"}
                            </Typography>
                          </Box>
                        </Box>
                      </TabPanel>
                    </Box>
                  </AppBarMainBox>
                </section>
              </div>
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
              <MainBoxBooking>
                <BookingTypo1 variant="h6">Booking Length</BookingTypo1>
                <Grid container spacing={1}>
                  {dailyWeeklyAndMonthlyBox.map((item, index) => (
                    <Grid item xs={6} sm={6} key={index}>
                      <DailyWeeklyBox1
                        onClick={() => handleDailyWeekly(item.text)} // update total on box click
                        sx={{
                          backgroundColor:
                            dailyWeekly === item.text ? "orange" : "white",
                        }}
                      >
                        <DailyWeeklyTypo1 variant="subtitle1">
                          {item.bookFor}
                        </DailyWeeklyTypo1>
                      </DailyWeeklyBox1>
                    </Grid>
                  ))}
                  {dailyWeekly === "dailyAndWeekly" && (
                    <>
                      {daysWeeksBox.map((item, index) => (
                        <Grid item xs={6} sm={6} key={index}>
                          <DailyWeeklyBox1
                            onClick={() => handleDaysWeeks(item.text)} // update state of daysWeeks
                            sx={{
                              marginTop: "0.5rem",
                              backgroundColor:
                                daysWeeks === item.text ? "orange" : "white",
                            }}
                          >
                            <DailyWeeklyTypo1 variant="subtitle1">
                              {item.bookFor}
                            </DailyWeeklyTypo1>
                          </DailyWeeklyBox1>
                        </Grid>
                      ))}
                    </>
                  )}
                  {daysWeeks === "days" && (
                    <>
                      {!insuranceBoxColor && (
                        <Grid item xs={12}>
                          <Typography
                            variant="body2"
                            sx={{
                              color: "#ff6b35",
                              fontWeight: 600,
                              textAlign: "center",
                              marginBottom: "10px",
                              backgroundColor: "#fff3e0",
                              padding: "8px",
                              borderRadius: "4px",
                              border: "1px solid #ff6b35",
                            }}
                          >
                            ⚠️ Please select an insurance option above before choosing the number of days
                          </Typography>
                        </Grid>
                      )}
                      {daysBooking.map((item, index) => (
                        <Grid item xs={4} sm={4} key={index}>
                          <DailyWeeklyBox1
                            onClick={() =>
                              handleSelectedDaysBoxClick(
                                item.price,
                                item.dayText,
                                item.count
                              )
                            }
                            sx={{
                              backgroundColor:
                                selectedDaysPrice === item.price
                                  ? "orange"
                                  : "white",
                              opacity: !insuranceBoxColor ? 0.5 : 1,
                              cursor: !insuranceBoxColor ? "not-allowed" : "pointer",
                              pointerEvents: !insuranceBoxColor ? "none" : "auto",
                            }}
                          >
                            <MonthlyTypo1 variant="subtitle1">
                              {item.dayText}
                            </MonthlyTypo1>
                          </DailyWeeklyBox1>
                        </Grid>
                      ))}
                    </>
                  )}
                  {daysWeeks === "weeks" && (
                    <>
                      {!insuranceBoxColor && (
                        <Grid item xs={12}>
                          <Typography
                            variant="body2"
                            sx={{
                              color: "#ff6b35",
                              fontWeight: 600,
                              textAlign: "center",
                              marginBottom: "10px",
                              backgroundColor: "#fff3e0",
                              padding: "8px",
                              borderRadius: "4px",
                              border: "1px solid #ff6b35",
                            }}
                          >
                            ⚠️ Please select an insurance option above before choosing the number of weeks
                          </Typography>
                        </Grid>
                      )}
                      {weeksBooking.map((item, index) => (
                        <Grid item xs={4} sm={4} key={index}>
                          <DailyWeeklyBox1
                            onClick={() =>
                              handleSelectedDaysBoxClick(
                                item.price,
                                item.dayText,
                                item.count
                              )
                            }
                            sx={{
                              backgroundColor:
                                selectedDaysPrice === item.price
                                  ? "orange"
                                  : "white",
                              opacity: !insuranceBoxColor ? 0.5 : 1,
                              cursor: !insuranceBoxColor ? "not-allowed" : "pointer",
                              pointerEvents: !insuranceBoxColor ? "none" : "auto",
                            }}
                          >
                            <MonthlyTypo1 variant="subtitle1">
                              {item.dayText}
                            </MonthlyTypo1>
                          </DailyWeeklyBox1>
                        </Grid>
                      ))}
                    </>
                  )}
                  {dailyWeekly === "monthly" && (
                    <>
                      {/* <InsuranceTypo1 variant="h6">
                      Monthly mileage allowance
                    </InsuranceTypo1> */}
                      {/* <Grid container spacing={1}> */}
                      {monthlyMilageBox.map((item, index) => (
                        <Grid item xs={6} sm={6} key={index}>
                          <DailyWeeklyBox1
                            onClick={() =>
                              handleMileageBoxClick(item.monthText)
                            }
                            sx={{
                              backgroundColor:
                                selectedMileage === item.monthText
                                  ? "orange"
                                  : "white",
                            }}
                          >
                            <MonthlyTypo1 variant="subtitle1">
                              {item.monthText}
                            </MonthlyTypo1>
                            <MonthlyTypo2 variant="subtitle2">
                              {item.savingAmount}
                            </MonthlyTypo2>
                          </DailyWeeklyBox1>
                        </Grid>
                      ))}
                      {/* </Grid> */}
                    </>
                  )}
                  {dailyWeekly === "monthly" && (
                    <>
                      {!selectedMileage && (
                        <Grid item xs={12}>
                          <Typography
                            variant="body2"
                            sx={{
                              color: "#ff6b35",
                              fontWeight: 600,
                              textAlign: "center",
                              marginBottom: "10px",
                              backgroundColor: "#fff3e0",
                              padding: "8px",
                              borderRadius: "4px",
                              border: "1px solid #ff6b35",
                            }}
                          >
                            ⚠️ Please select a mileage option above before choosing a monthly duration
                          </Typography>
                        </Grid>
                      )}
                      {monthlyBooking.map((item, index) => (
                        <Grid item xs={6} sm={6} key={index}>
                          <DailyWeeklyBox1
                            onClick={() =>
                              handleBoxClick(
                                // selectedMileage==="5000 KM"?item.price5000: item.price2500,
                                item.price,
                                item.count,
                                item.monthText
                              )
                            }
                            sx={{
                              backgroundColor:
                                monthlyBoxColor === item.monthText
                                  ? "orange"
                                  : "white",
                              opacity: !selectedMileage ? 0.5 : 1,
                              cursor: !selectedMileage ? "not-allowed" : "pointer",
                              pointerEvents: !selectedMileage ? "none" : "auto",
                            }}
                          >
                            <MonthlyTypo1 variant="subtitle1">
                              {item.monthText}
                            </MonthlyTypo1>
                            <MonthlyTypo2 variant="subtitle2">
                              Save D {item.savingAmount}
                            </MonthlyTypo2>
                          </DailyWeeklyBox1>
                        </Grid>
                      ))}
                    </>
                  )}
                </Grid>
                <>
                  <InsuranceTypo1 variant="h6">Insurance</InsuranceTypo1>
                  {dailyWeekly === "dailyAndWeekly" && !insuranceBoxColor && (
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#ff6b35",
                        fontWeight: 600,
                        textAlign: "center",
                        marginBottom: "10px",
                        backgroundColor: "#fff3e0",
                        padding: "8px",
                        borderRadius: "4px",
                        border: "1px solid #ff6b35",
                      }}
                    >
                      ⚠️ Please select an insurance option (Standard Cover is free, Full Cover has additional cost)
                    </Typography>
                  )}
                  <Grid container spacing={1}>
                    {insuranceBox.map((item, index) => (
                      <Grid item xs={6} sm={6} key={index}>
                        <DailyWeeklyBox1
                          onClick={() =>
                            handleInsauranceBoxClick(item.price, item.monthText)
                          } // update total on box click
                          sx={{
                            backgroundColor:
                              insuranceBoxColor === item.monthText
                                ? "orange"
                                : "white",
                          }}
                        >
                          <>
                            <Tooltip
                              title={
                                item.monthText === "Full Cover"
                                  ? fullInsuranceText
                                  : ""
                              }
                            >
                              <MonthlyTypo1 variant="subtitle1">
                                {item.monthText}
                              </MonthlyTypo1>
                            </Tooltip>
                            <MonthlyTypo2 variant="subtitle2">
                              {item.savingAmount}
                            </MonthlyTypo2>
                          </>
                        </DailyWeeklyBox1>
                      </Grid>
                    ))}
                  </Grid>
                </>
                {/* {dailyWeekly === "monthly" && (
                  <>
                    <InsuranceTypo1 variant="h6">
                      Monthly mileage allowance
                    </InsuranceTypo1>
                    <Grid container spacing={1}>
                      {monthlyMilageBox.map((item, index) => (
                        <Grid item xs={6} sm={6} key={index}>
                          <DailyWeeklyBox1
                            onClick={() =>
                              handleMileageBoxClick(item.monthText)
                            }
                            sx={{
                              backgroundColor:
                                selectedMileage === item.monthText
                                  ? "orange"
                                  : "white",
                            }}
                          >
                            <MonthlyTypo1 variant="subtitle1">
                              {item.monthText}
                            </MonthlyTypo1>
                            <MonthlyTypo2 variant="subtitle2">
                              {item.savingAmount}
                            </MonthlyTypo2>
                          </DailyWeeklyBox1>
                        </Grid>
                      ))}
                    </Grid>
                  </>
                )} */}
                {dailyWeekly === "monthly" && (
                  <>
                    <PriceBrakeTypo1 variant="h6">
                      Price Break Down
                    </PriceBrakeTypo1>
                    <PriceBrakeBox1>
                      <PriceBrakeBox2>
                        <PriceBrakeTypo2 variant="subtitle2">
                          Booking {bookingMonth.replace(/\d+/, "").trim()}
                        </PriceBrakeTypo2>
                        <PriceBrakeTypo2 variant="subtitle2">
                          {bookingMonth}
                        </PriceBrakeTypo2>
                      </PriceBrakeBox2>
                      <PriceBrakeBox2>
                        <PriceBrakeTypo2 variant="subtitle2">
                          Monthly Fee in D
                        </PriceBrakeTypo2>
                        <PriceBrakeTypo2 variant="subtitle2">
                          {selectedPrice > 0 ? `D ${selectedPrice}` : "D 0"}
                        </PriceBrakeTypo2>
                      </PriceBrakeBox2>
                      <PriceBrakeBox2>
                        <PriceBrakeTypo2 variant="subtitle2">
                          Insuarance Charges in D
                        </PriceBrakeTypo2>
                        <PriceBrakeTypo2 variant="subtitle2">
                          {selectedInsuarance > 0 ? `D ${selectedInsuarance}` : "D 0"}
                        </PriceBrakeTypo2>
                      </PriceBrakeBox2>
                      {/* <PriceBrakeBox2>
                        <PriceBrakeTypo2 variant="subtitle2">
                          Mileage Charges in D
                        </PriceBrakeTypo2>
                        <PriceBrakeTypo2 variant="subtitle2">
                          {mileage}
                        </PriceBrakeTypo2>
                      </PriceBrakeBox2> */}
                      {/* <PriceBrakeBox2>
                        <PriceBrakeTypo2 variant="subtitle2">
                          Discount in D
                        </PriceBrakeTypo2>
                        <PriceBrakeTypo2 variant="subtitle2">
                          -60
                        </PriceBrakeTypo2>
                      </PriceBrakeBox2> */}
                      <PriceBrakeBox2>
                        <PriceBrakeTypo2 variant="subtitle2">
                          VAT Charges (5%) in D
                        </PriceBrakeTypo2>
                        <PriceBrakeTypo2 variant="subtitle2">
                          D {vatFivePercent}
                        </PriceBrakeTypo2>
                      </PriceBrakeBox2>
                    </PriceBrakeBox1>
                  </>
                )}
                {dailyWeekly === "dailyAndWeekly" && (
                  <>
                    <CarChargeTypo1 variant="h6">
                      Car Charges & Other Details
                    </CarChargeTypo1>
                    <CarChargeBox1>
                      <PriceBrakeBox2>
                        <PriceBrakeTypo2 variant="subtitle2">
                          Booking {bookingDaysWeeks.replace(/\d+/, "").trim()}
                        </PriceBrakeTypo2>
                        <PriceBrakeTypo2 variant="subtitle2">
                          {bookingDaysWeeks}
                        </PriceBrakeTypo2>
                      </PriceBrakeBox2>
                      <PriceBrakeBox2>
                        <PriceBrakeTypo2 variant="subtitle2">
                          Car Free KM
                        </PriceBrakeTypo2>
                        <PriceBrakeTypo2 variant="subtitle2">
                          {daysWeeks === "days"
                            ? parseFloat(data?.freeDailyKM) * selectedCount
                            : daysWeeks === "weeks"
                            ? parseFloat(data?.freeWeeklyKM) * selectedCount
                            : 0}
                        </PriceBrakeTypo2>
                      </PriceBrakeBox2>
                      <PriceBrakeBox2>
                        <PriceBrakeTypo2 variant="subtitle2">
                          Car Rental Charges in D
                        </PriceBrakeTypo2>
                        <PriceBrakeTypo2 variant="subtitle2">
                          D {selectedDaysPrice}
                        </PriceBrakeTypo2>
                      </PriceBrakeBox2>
                      <PriceBrakeBox2>
                        <PriceBrakeTypo2 variant="subtitle2">
                          Car Insurance Charges in D
                        </PriceBrakeTypo2>
                        <PriceBrakeTypo2 variant="subtitle2">
                          D {insuDailyWeekly}
                        </PriceBrakeTypo2>
                      </PriceBrakeBox2>
                      <PriceBrakeBox2>
                        <PriceBrakeTypo2 variant="subtitle2">
                          VAT Charges (5%) in D
                        </PriceBrakeTypo2>
                        <PriceBrakeTypo2 variant="subtitle2">
                          D {vatAmountDailyWeekly}
                        </PriceBrakeTypo2>
                      </PriceBrakeBox2>
                    </CarChargeBox1>
                  </>
                )}
                {dailyWeekly === "dailyAndWeekly" && (
                  <PriceBrakeBox2>
                    <PriceBrakeTypo2 variant="subtitle2">
                      Total Amount
                    </PriceBrakeTypo2>
                    <PriceBrakeTypo2 variant="subtitle2">
                      D {totalAmountDailyWeekly}
                    </PriceBrakeTypo2>
                  </PriceBrakeBox2>
                )}
                {dailyWeekly === "monthly" && (
                  <PriceBrakeBox2>
                    <PriceBrakeTypo2 variant="subtitle2">
                      Total Amount
                    </PriceBrakeTypo2>
                    <PriceBrakeTypo2 variant="subtitle2">
                      D {totalAmountmonthly}
                    </PriceBrakeTypo2>
                  </PriceBrakeBox2>
                )}
                <Box sx={{ marginTop: "1rem" }}>
                  <Grid container spacing={1}>
                    {textFieldData.map((item, index) => {
                      // Render separate country code and phone number fields
                      if (item.placeholder === "Phone Number") {
                        return (
                          <Grid item xs={6} sm={6} key={`phone-${index}`}>
                            <Grid container spacing={0}>
                              {/* Country Code Selector */}
                              <Grid item xs={6} sm={6}>
                                <FormControl fullWidth size="small" variant="outlined" key={`country-code-${countryCode}`}>
                                  <Select
                                    value={countryCode}
                                    onChange={(e) => {
                                      const value = e.target.value as string;
                                      setCountryCode(value);
                                      console.log("Country code selected:", value); // Debug log
                                    }}
                                    renderValue={(selected) => {
                                      // Find the matching MenuItem label with flag
                                      const countryInfo = countryCodesMap[selected as string];
                                      if (countryInfo) {
                                        return (
                                          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, minWidth: 0 }}>
                                            <span style={{ fontSize: "18px", flexShrink: 0 }}>{countryInfo.flag}</span>
                                            <span style={{ whiteSpace: "nowrap", overflow: "visible", textOverflow: "clip" }}>{countryInfo.code}</span>
                                          </Box>
                                        );
                                      }
                                      return <span>{selected}</span>;
                                    }}
                                    MenuProps={{
                                      PaperProps: {
                                        style: {
                                          maxHeight: 300,
                                        },
                                      },
                                    }}
                                    sx={{
                                      backgroundColor: "#f8f9fa",
                                      borderRadius: "8px 0 0 8px",
                                      fontSize: "14px",
                                      fontWeight: 500,
                                      color: "#01437D",
                                      width: "100%",
                                      minWidth: "120px",
                                      height: "40px",
                                      '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: "#e0e0e0",
                                        borderRight: "none",
                                      },
                                      '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: "#01437D",
                                        borderRight: "none",
                                      },
                                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: "#01437D",
                                        borderRight: "none",
                                      },
                                      '& .MuiSelect-select': {
                                        padding: "8px 50px 8px 14px !important",
                                        display: "flex",
                                        alignItems: "center",
                                        color: "#01437D !important",
                                        opacity: "1 !important",
                                        paddingRight: "50px !important",
                                        overflow: "visible !important",
                                        textOverflow: "clip",
                                        whiteSpace: "nowrap",
                                        minWidth: 0,
                                        height: "40px",
                                        boxSizing: "border-box",
                                      },
                                      '& .MuiSelect-icon': {
                                        color: "#01437D",
                                        right: "12px !important",
                                        position: "absolute",
                                      },
                                      '& .MuiOutlinedInput-root': {
                                        paddingRight: "0px !important",
                                        borderRadius: "8px 0 0 8px",
                                        height: "40px",
                                        backgroundColor: "#f8f9fa",
                                      },
                                    }}
                                  >
                                    <MenuItem value="+971">
                                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <span style={{ fontSize: "18px" }}>🇦🇪</span>
                                        <span>+971 (UAE)</span>
                                      </Box>
                                    </MenuItem>
                                    <MenuItem value="+91">
                                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <span style={{ fontSize: "18px" }}>🇮🇳</span>
                                        <span>+91 (India)</span>
                                      </Box>
                                    </MenuItem>
                                    <MenuItem value="+1">
                                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <span style={{ fontSize: "18px" }}>🇺🇸</span>
                                        <span>+1 (USA)</span>
                                      </Box>
                                    </MenuItem>
                                    <MenuItem value="+44">
                                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <span style={{ fontSize: "18px" }}>🇬🇧</span>
                                        <span>+44 (UK)</span>
                                      </Box>
                                    </MenuItem>
                                    <MenuItem value="+966">
                                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <span style={{ fontSize: "18px" }}>🇸🇦</span>
                                        <span>+966 (Saudi Arabia)</span>
                                      </Box>
                                    </MenuItem>
                                    <MenuItem value="+92">
                                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <span style={{ fontSize: "18px" }}>🇵🇰</span>
                                        <span>+92 (Pakistan)</span>
                                      </Box>
                                    </MenuItem>
                                    <MenuItem value="+880">
                                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <span style={{ fontSize: "18px" }}>🇧🇩</span>
                                        <span>+880 (Bangladesh)</span>
                                      </Box>
                                    </MenuItem>
                                    <MenuItem value="+973">
                                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <span style={{ fontSize: "18px" }}>🇧🇭</span>
                                        <span>+973 (Bahrain)</span>
                                      </Box>
                                    </MenuItem>
                                    <MenuItem value="+974">
                                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <span style={{ fontSize: "18px" }}>🇶🇦</span>
                                        <span>+974 (Qatar)</span>
                                      </Box>
                                    </MenuItem>
                                    <MenuItem value="+968">
                                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <span style={{ fontSize: "18px" }}>🇴🇲</span>
                                        <span>+968 (Oman)</span>
                                      </Box>
                                    </MenuItem>
                                    <MenuItem value="+965">
                                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <span style={{ fontSize: "18px" }}>🇰🇼</span>
                                        <span>+965 (Kuwait)</span>
                                      </Box>
                                    </MenuItem>
                                    <MenuItem value="+20">
                                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <span style={{ fontSize: "18px" }}>🇪🇬</span>
                                        <span>+20 (Egypt)</span>
                                      </Box>
                                    </MenuItem>
                                    <MenuItem value="+234">
                                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <span style={{ fontSize: "18px" }}>🇳🇬</span>
                                        <span>+234 (Nigeria)</span>
                                      </Box>
                                    </MenuItem>
                                    <MenuItem value="+27">
                                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <span style={{ fontSize: "18px" }}>🇿🇦</span>
                                        <span>+27 (South Africa)</span>
                                      </Box>
                                    </MenuItem>
                                    <MenuItem value="+33">
                                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <span style={{ fontSize: "18px" }}>🇫🇷</span>
                                        <span>+33 (France)</span>
                                      </Box>
                                    </MenuItem>
                                    <MenuItem value="+49">
                                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <span style={{ fontSize: "18px" }}>🇩🇪</span>
                                        <span>+49 (Germany)</span>
                                      </Box>
                                    </MenuItem>
                                    <MenuItem value="+61">
                                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <span style={{ fontSize: "18px" }}>🇦🇺</span>
                                        <span>+61 (Australia)</span>
                                      </Box>
                                    </MenuItem>
                                    <MenuItem value="+86">
                                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <span style={{ fontSize: "18px" }}>🇨🇳</span>
                                        <span>+86 (China)</span>
                                      </Box>
                                    </MenuItem>
                                    <MenuItem value="+81">
                                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <span style={{ fontSize: "18px" }}>🇯🇵</span>
                                        <span>+81 (Japan)</span>
                                      </Box>
                                    </MenuItem>
                                    <MenuItem value="+82">
                                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <span style={{ fontSize: "18px" }}>🇰🇷</span>
                                        <span>+82 (South Korea)</span>
                                      </Box>
                                    </MenuItem>
                                    <MenuItem value="+65">
                                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <span style={{ fontSize: "18px" }}>🇸🇬</span>
                                        <span>+65 (Singapore)</span>
                                      </Box>
                                    </MenuItem>
                                    <MenuItem value="+60">
                                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <span style={{ fontSize: "18px" }}>🇲🇾</span>
                                        <span>+60 (Malaysia)</span>
                                      </Box>
                                    </MenuItem>
                                    <MenuItem value="+66">
                                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <span style={{ fontSize: "18px" }}>🇹🇭</span>
                                        <span>+66 (Thailand)</span>
                                      </Box>
                                    </MenuItem>
                                    <MenuItem value="+62">
                                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <span style={{ fontSize: "18px" }}>🇮🇩</span>
                                        <span>+62 (Indonesia)</span>
                                      </Box>
                                    </MenuItem>
                                    <MenuItem value="+63">
                                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <span style={{ fontSize: "18px" }}>🇵🇭</span>
                                        <span>+63 (Philippines)</span>
                                      </Box>
                                    </MenuItem>
                                  </Select>
                                </FormControl>
                              </Grid>
                              {/* Phone Number Input */}
                              <Grid item xs={6} sm={6}>
                                <Box
                                  sx={{
                                    '& .MuiOutlinedInput-root': {
                                      borderRadius: "0 8px 8px 0",
                                      backgroundColor: "#f8f9fa",
                                      height: "40px",
                                      '& fieldset': {
                                        borderLeft: "none",
                                        borderColor: "#e0e0e0",
                                      },
                                      '&:hover fieldset': {
                                        borderLeft: "none",
                                        borderColor: "#01437D",
                                      },
                                      '&.Mui-focused fieldset': {
                                        borderLeft: "none",
                                        borderColor: "#01437D",
                                      },
                                    },
                                    '& .MuiInputBase-input': {
                                      height: "40px",
                                      boxSizing: "border-box",
                                    },
                                  }}
                                >
                                  <TextFieldComp
                                    placeholder="Phone Number"
                                    value={userphoneNumber}
                                    onChange={(e: any) => setUserPhoneNumber(e.target.value)}
                                    errors={!userphoneNumber && error !== ""}
                                    type="text"
                                    variant="outlined"
                                  />
                                </Box>
                              </Grid>
                            </Grid>
                          </Grid>
                        );
                      }
                      return (
                        <Grid item xs={6} sm={6} key={index}>
                          <TextFieldComp
                            placeholder={item.placeholder}
                            value={item.value}
                            onChange={item.onChange}
                            errors={item.errors}
                            type={item.type}
                            variant={item.variant}
                          />
                        </Grid>
                      );
                    })}
                  </Grid>
                </Box>
                {error && (
                  <Typography
                    color="error"
                    variant="body2"
                    sx={{ marginTop: "0.5rem", textAlign: "center" }}
                  >
                    {error}
                  </Typography>
                )}
                <BookButtonBox1>
                  {dailyWeekly === "dailyAndWeekly" && (
                    <BookButtonMain
                      size="large"
                      variant="contained"
                      disabled={!insuranceBoxColor || !selectedDaysPrice}
                      onClick={() =>
                        handleDailyAndWeeklyWhatsappClick(
                          data,
                          userphoneNumber,
                          userfullName,
                          userEmail,
                          userCity,
                          userStartDate,
                          userCarDeliveryTime,
                          userEndDate,
                          userDropTime
                        )
                      }
                    >
                      Book Now
                    </BookButtonMain>
                  )}
                  {dailyWeekly === "monthly" && (
                    <BookButtonMain
                      size="large"
                      variant="contained"
                      disabled={!selectedMileage || !selectedPrice}
                      onClick={() =>
                        handleMonthlyWhatsappClick(
                          data,
                          userphoneNumber,
                          userfullName,
                          userEmail,
                          userCity,
                          userStartDate,
                          userCarDeliveryTime,
                          userEndDate,
                          userDropTime
                        )
                      }
                    >
                      Book Now
                    </BookButtonMain>
                  )}
                </BookButtonBox1>
              </MainBoxBooking>
            </Grid>
          </Grid>
        </Container>
      </section>
    </>
  );
};

export default CreatedCar;
