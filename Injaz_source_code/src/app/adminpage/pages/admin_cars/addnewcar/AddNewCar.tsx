"use client";
import React, { Suspense, useEffect, useState } from "react";
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
  TextField,
} from "@mui/material";
import "../AdminCars.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useSearchParams } from "next/navigation";
import { serverUrl } from "@/utils/helper";
import { dataSetter } from "@/utils/dataSetter";
import objectToFormData from "@/utils/objToFormData";
import ReusableTextField from "./ReusableTextField";
import ReusableCheckBox from "./ReusableCheckBox";
import ReusableSelectComponent from "./ReusableSelectComponent";
import ReusableSelectCheckbox from "./ReusableSelectCheckbox";

const styles: any = {
  menuList: {
    maxHeight: 200,
    overflowY: "auto",
  },
};

// ==================interior color checkbox====================
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const interiorVariants = [
  {
    _id: 1,
    Name: "beige",
  },
  {
    _id: 2,
    Name: "gray",
  },
  {
    _id: 3,
    Name: "orange",
  },
  {
    _id: 4,
    Name: "black",
  },
  {
    _id: 5,
    Name: "brown",
  },
  {
    _id: 6,
    Name: "blue",
  },
];
const exteriorVariants = [
  {
    _id: 1,
    Name: "black",
  },
  {
    _id: 2,
    Name: "white",
  },
  {
    _id: 3,
    Name: "red",
  },
  {
    _id: 4,
    Name: "gray",
  },
  {
    _id: 5,
    Name: "brown",
  },
  {
    _id: 6,
    Name: "orange",
  },
  {
    _id: 7,
    Name: "silver",
  },
  {
    _id: 8,
    Name: "blue",
  },
  {
    _id: 9,
    Name: "sky blue",
  },
  {
    _id: 10,
    Name: "gold",
  },
];

const subscriptionPackageArray = [
  { _id: 1, Name: "Daily" },
  { _id: 2, Name: "Weekly" },
  { _id: 3, Name: "Monthly" },
];

interface carFormData {
  _id: string;
  brand: string;
  Brand: string;
  model: string;
  category: string;
  year: string;
  location: string[];
  vehicleType: string;
  status: string;
  interiorColor: string[];
  exteriorColor: string[];
  internalImage: string;
  image: string[];
  externalImage: [];
  actualPriceDaily: string;
  discountedPriceDaily: string;
  actualPriceWeekly: string;
  discountedPriceWeekly: string;
  actualPriceMonthly: string;
  discountedPriceMonthly: string;
  transmission: string;
  engineCapacity: string;
  laggageBootCapacity: string;
  securityDeposit: string;
  cashType: string[];
  paiInsuranceMonthly: string;
  paymentType: string;
  seater: string;
  freeDailyKM: string;
  freeWeeklyKM: string;
  freeMonthlyKM: string;
  cdwDaily: string;
  cdwWeekly: string;
  cdwMonthly: string;
  additionalMileageCharge: string;
  excessClaimCharge: string;
  salikTollCharge: string;
  keyFeatures: string[];
  unlimitedKMDaily: string;
  unlimitedKMWeekly: string;
  unlimitedKMMonthly: string;
  babySeatChargeDaily: string;
  deliveryChargeDaily: string;
  babySeatChargeWeekly: string;
  deliveryChargeWeekly: string;
  babySeatChargeMonthly: string;
  deliveryChargeMonthly: string;
  additionalDriverChargeDaily: string;
  additionalDriverChargeWeekly: string;
  additionalDriverChargeMonthly: string;
  subsPackage: string[];
  airportPickupCharge: string;
  airportDeliveryCharge: string;
  carProvider: string;
  branchLocation: string;
  teachersOffer: string;
  isOfferApplied: string;
  offerType: string;
  customOfferText: string;
  customOfferColor: string;
  oneMonthPriceOf2500Km: string;
  threeMonthPriceOf2500Km: string;
  sixMonthPriceOf2500Km: string;
  nineMonthPriceOf2500Km: string;
  oneMonthPriceOf5000Km: string;
  threeMonthPriceOf5000Km: string;
  sixMonthPriceOf5000Km: string;
  nineMonthPriceOf5000Km: string;
  fuel: string;
}

const AddNewCar = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("verify");
  const router = useRouter();
  const [brand, setBrand] = useState([]);
  const [modelDrop, setModelDrop] = useState([]);
  const [modelDropByBrand, setModelDropByBrand] = useState([]);
  const [catDrop, setCatDrop] = useState([]);
  const [locDrop, setLocDrop] = useState([]);
  const [capDrop, setCapDrop] = useState([]);
  const [featCheck, setFeatureCheck] = useState([]);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [selectedOptionWeekly, setSelectedOptionWeekly] = useState<string>("");
  const [selectedOptionMonthly, setSelectedOptionMonthly] = useState<string>(
    ""
  );

  const [data, setdata] = useState({
    _id: "",
    brand: "",
    model: "",
    category: "",
    year: "",
    location: [""],
    vehicleType: "",
    status: "",
    interiorColor: [""],
    exteriorColor: [""],
    image: [],
    externalImage: [],
    actualPriceDaily: "",
    discountedPriceDaily: "",
    actualPriceWeekly: "",
    discountedPriceWeekly: "",
    actualPriceMonthly: "",
    discountedPriceMonthly: "",
    transmission: "",
    engineCapacity: "",
    laggageBootCapacity: "",
    securityDeposit: "",
    noSecurityDeposit: false,
    cashType: [""],
    paiInsuranceMonthly: "",
    paymentType: [""],
    seater: "",
    freeDailyKM: "",
    freeWeeklyKM: "",
    freeMonthlyKM: "",
    cdwDaily: "",
    cdwWeekly: "",
    cdwMonthly: "",
    additionalMileageCharge: "",
    excessClaimCharge: "",
    salikTollCharge: "",
    keyFeatures: [""],
    unlimitedKMDaily: "",
    unlimitedKMWeekly: "",
    babySeatChargeDaily: "",
    unlimitedKMMonthly: "",
    deliveryChargeDaily: "",
    babySeatChargeWeekly: "",
    deliveryChargeWeekly: "",
    babySeatChargeMonthly: "",
    deliveryChargeMonthly: "",
    additionalDriverChargeDaily: "",
    additionalDriverChargeWeekly: "",
    additionalDriverChargeMonthly: "",
    subsPackage: [""],
    airportPickupCharge: "",
    airportDeliveryCharge: "",
    carProvider: "",
    branchLocation: "",
    isOfferApplied: "",
    offerType: "",
    customOfferText: "",
    customOfferColor: "yellow",
    oneMonthPriceOf2500Km: "",
    threeMonthPriceOf2500Km: "",
    sixMonthPriceOf2500Km: "",
    nineMonthPriceOf2500Km: "",
    oneMonthPriceOf5000Km: "",
    threeMonthPriceOf5000Km: "",
    sixMonthPriceOf5000Km: "",
    nineMonthPriceOf5000Km: "",
    fuel: "",
  });

  useEffect(() => {
    if (id) {
      axios
        .get(serverUrl + `/user/getCar/${id}`)
        .then((res) => {
          const carData = res.data.data;
          setdata({...data,...carData});
        })
        .catch((err) => {
          console.log(err);
        });
    }
    axios
      .get(serverUrl + "/user/getAllBrands")
      .then((res) => {
        setBrand(res.data.data);
      })
      .catch((err) => {
        console.log(err, "error");
      });
    axios
      .get(serverUrl + "/user/getAllCarModel")
      .then((res) => {
        setModelDrop(res.data.data);
      })
      .catch((err) => {
        console.log(err, "error");
      });
    axios
      .get(serverUrl + "/user/getAllCategoryes")
      .then((res) => {
        setCatDrop(res.data.data);
      })
      .catch((err) => {
        console.log(err, "error");
      });

    axios
      .get(serverUrl + "/user/getAllcarLoaction")
      .then((res) => {
        setLocDrop(res.data.data);
      })
      .catch((err) => {
        console.log(err, "error");
      });

    axios
      .get(serverUrl + "/user/getAllcarEngineCapacities")
      .then((res) => {
        setCapDrop(res.data.data);
      })
      .catch((err) => {
        console.log(err, "error");
      });

    axios
      .get(serverUrl + "/user/getAllCarFeatures")
      .then((res) => {
        setFeatureCheck(res.data.data);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }, []);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<carFormData>();

  useEffect(() => {
    const a = data.brand;

    const b = modelDrop;
    if (a) {
      const dropData = b.filter(
        (item: any) => item.Brand.toLowerCase() === a.toLowerCase()
      );
      setModelDropByBrand(dropData);
    }
  }, [data.brand]);

  const handle = (e: any) => {
    const newData: any = { ...data };
    newData[e.target.name] = e.target.value;
    setdata(newData);
    setSelectedOption(e.target.value as string);
  };
  const handleWeeklyKM = (e: any) => {
    const newData: any = { ...data };
    newData[e.target.name] = e.target.value;
    setdata(newData);
    setSelectedOptionWeekly(e.target.value as string);
  };
  const handleMonthlyKM = (e: any) => {
    const newData: any = { ...data };
    newData[e.target.name] = e.target.value;
    setdata(newData);
    setSelectedOptionMonthly(e.target.value as string);
  };

  const Submit = (e: any) => {
    e.preventDefault();

    // Validate that actual prices are greater than or equal to discounted prices
    const dailyActual = parseFloat(data.actualPriceDaily) || 0;
    const dailyDiscounted = parseFloat(data.discountedPriceDaily) || 0;
    const weeklyActual = parseFloat(data.actualPriceWeekly) || 0;
    const weeklyDiscounted = parseFloat(data.discountedPriceWeekly) || 0;
    const monthlyActual = parseFloat(data.actualPriceMonthly) || 0;
    const monthlyDiscounted = parseFloat(data.discountedPriceMonthly) || 0;

    if (dailyActual < dailyDiscounted) {
      Swal.fire("Error!", "Daily actual price must be greater than or equal to discounted price.", "error");
      return;
    }
    if (weeklyActual < weeklyDiscounted) {
      Swal.fire("Error!", "Weekly actual price must be greater than or equal to discounted price.", "error");
      return;
    }
    if (monthlyActual < monthlyDiscounted) {
      Swal.fire("Error!", "Monthly actual price must be greater than or equal to discounted price.", "error");
      return;
    }

    if (id) {
      const payload = { ...dataSetter(data) };
      delete payload._id;

      const formData = objectToFormData(payload);
      console.log("🚀 ~ Submit ~ formData:", formData);
      const jsonPayload = JSON.stringify(payload);
      console.log("🚀 ~ Submit ~ jsonPayload:", jsonPayload);

      axios
        .patch(serverUrl + "/user/updateCar/" + id, payload)
        .then((res) => {
          Swal.fire("Updated!", "The car has been updated.", "success");
          setdata(dataSetter());
        })
        .catch((err) => {
          console.log(err);
          Swal.fire(
            "Error!",
            "An error occurred while updating the car.",
            "error"
          );
        });
    } else {
      // For creating a new car, ensure _id is not included in the payload
      const payload = { ...dataSetter(data) };
      delete payload._id;

      const formData = objectToFormData(payload);

      axios
        .post(serverUrl + "/user/createNewCar", formData)
        .then((res) => {
          Swal.fire("Added!", "The car has been added.", "success");
          setdata(dataSetter());
        })
        .catch((err) => {
          console.log(err);
          Swal.fire(
            "Error!",
            "An error occurred while adding the car.",
            "error"
          );
        });
    }
    router.push("/pages/adminCar");
  };

  const handleCheckNew: any = (e: any) => {
    const dataCheck = data;
    const name = e.target.name;
    const value = e.target.checked;
    if (value) {
      const interiorColor = data.interiorColor;
      interiorColor.push(name);
      setdata({ ...dataCheck, interiorColor: interiorColor });
    } else {
      const interiorColor = data.interiorColor;
      const result = interiorColor.filter((item) => item !== name);
      setdata({ ...dataCheck, interiorColor: result });
    }
  };

  const handleCheckExteriorColor: any = (e: any) => {
    const dataCheckExteriorColor = data;
    const name = e.target.name;
    const value = e.target.checked;
    if (value) {
      const exteriorColor = data.exteriorColor;
      exteriorColor.push(name);
      setdata({ ...dataCheckExteriorColor, exteriorColor: exteriorColor });
    } else {
      const exteriorColor = data.exteriorColor;
      const result = exteriorColor.filter((item) => item !== name);
      setdata({ ...dataCheckExteriorColor, exteriorColor: result });
    }
  };
  const handleSubscriptionPackage: any = (e: any) => {
    const dataSubscriptionPackage = data;
    const name = e.target.name;
    const value = e.target.checked;
    if (value) {
      const subsPackage = data.subsPackage;
      subsPackage.push(name);
      setdata({ ...dataSubscriptionPackage, subsPackage: subsPackage });
    } else {
      const subsPackage = data.subsPackage;
      const result = subsPackage.filter((item) => item !== name);
      setdata({ ...dataSubscriptionPackage, subsPackage: result });
    }
  };
  const handleLocation: any = (e: any) => {
    const dataLocation = data;
    const name = e.target.name;
    const value = e.target.checked;
    if (value) {
      const location = data.location;
      location.push(name);
      setdata({ ...dataLocation, location: location });
    } else {
      const location = data.location;
      const result = location.filter((item) => item !== name);
      setdata({ ...dataLocation, location: result });
    }
  };
  const handleKeyFeatures: any = (e: any) => {
    const dataKeyFeatures = data;
    const name = e.target.name;
    const value = e.target.checked;
    if (value) {
      const keyFeatures = data.keyFeatures;
      keyFeatures.push(name);
      setdata({ ...dataKeyFeatures, keyFeatures: keyFeatures });
    } else {
      const keyFeatures = data.keyFeatures;
      const result = keyFeatures.filter((item) => item !== name);
      setdata({ ...dataKeyFeatures, keyFeatures: result });
    }
  };
  const handleExperiment: any = (e: any, dataDotField:any) => {
    const dataKeyFeatures = data;
    const name = e.target.name;
    const value = e.target.checked;
    if (value) {
      const keyFeatures = dataDotField;
      keyFeatures.push(name);
      setdata({ ...dataKeyFeatures, keyFeatures: keyFeatures });
    } else {
      const keyFeatures = dataDotField;
      const result = keyFeatures.filter((item:any) => item !== name);
      setdata({ ...dataKeyFeatures, keyFeatures: result });
    }
  };

  const [variantName, setVariantName] = React.useState([]);
  const [locationValue, setLocationValue] = React.useState([]);
  const [subscriptionPackage, setSubscriptionPackage] = React.useState([]);
  const [keyFeatureValue, setKeyFeatureValue] = React.useState([]);

  const handleK = (e: any) => {
    const data2 = data;
    const name = e.target.name;
    const value = e.target.checked;
    if (value) {
      const cashType = data.cashType;
      cashType.push(name);
      setdata({ ...data2, cashType: cashType });
    } else {
      const cashType = data.cashType;
      const result = cashType.filter((item) => item !== name);
      setdata({ ...data2, cashType: result });
    }
  };

  const handleM = (e: any) => {
    const data4 = data;
    const name = e.target.name;
    const value = e.target.checked;
    if (value) {
      const paymentType = data.paymentType;
      paymentType.push(name);
      setdata({ ...data4, paymentType: paymentType });
    } else {
      const paymentType = data.paymentType;
      const result = paymentType.filter((item) => item !== name);
      setdata({ ...data4, paymentType: result });
    }
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    const files = e.target.files;
    const formData: any = new FormData();

    if (files) {
      const image1 = formData.append("image", files[0]);
      setdata({ ...data, image: formData.get("image") });
      if (id) {
        formData.append("id", id);
        axios
          .patch(serverUrl + "/user/updateCarImage/" + id, formData)
          .then((res) => {
            Swal.fire("Updated!", "Image has been updated.", "success");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  const dailyPriceFields = [
    {
      label: "Actual Price (Daily)",
      name: "actualPriceDaily",
      value: data.actualPriceDaily,
    },
    {
      label: "Discounted Price (Daily)",
      name: "discountedPriceDaily",
      value: data.discountedPriceDaily,
    },
    {
      label: "CDW Daily",
      name: "cdwDaily",
      value: data.cdwDaily,
    },
    {
      label: "Baby Seat Charge Daily",
      name: "babySeatChargeDaily",
      value: data.babySeatChargeDaily,
    },
    {
      label: "Delivery Charge Daily",
      name: "deliveryChargeDaily",
      value: data.deliveryChargeDaily,
    },
    {
      label: "Additional Driver Charge Daily",
      name: "additionalDriverChargeDaily",
      value: data.additionalDriverChargeDaily,
    },
  ];
  const weeklyPriceFields = [
    {
      label: "Actual Price (Weekly)",
      name: "actualPriceWeekly",
      value: data.actualPriceWeekly,
    },
    {
      label: "Discounted Price (Weekly)",
      name: "discountedPriceWeekly",
      value: data.discountedPriceWeekly,
    },
    {
      label: "CDW Weekly",
      name: "cdwWeekly",
      value: data.cdwWeekly,
    },
    {
      label: "Baby Seat Charge Weekly",
      name: "babySeatChargeWeekly",
      value: data.babySeatChargeWeekly,
    },
    {
      label: "Delivery Charge Weekly",
      name: "deliveryChargeWeekly",
      value: data.deliveryChargeWeekly,
    },
    {
      label: "Additional Driver Charge Weekly",
      name: "additionalDriverChargeWeekly",
      value: data.additionalDriverChargeWeekly,
    },
  ];
  const monthlyPriceFields = [
    {
      label: "Actual Price (Monthly)",
      name: "actualPriceMonthly",
      value: data.actualPriceMonthly,
    },
    {
      label: "Discounted Price (Monthly)",
      name: "discountedPriceMonthly",
      value: data.discountedPriceMonthly,
    },
    {
      label: "1 Month Price of 2500 KM",
      name: "oneMonthPriceOf2500Km",
      value: data.oneMonthPriceOf2500Km,
    },
    {
      label: "1 Month Price of 5000 KM",
      name: "oneMonthPriceOf5000Km",
      value: data.oneMonthPriceOf5000Km,
    },
    {
      label: "3 Month Price of 2500 KM",
      name: "threeMonthPriceOf2500Km",
      value: data.threeMonthPriceOf2500Km,
    },
    {
      label: "3 Month Price of 5000 KM",
      name: "threeMonthPriceOf5000Km",
      value: data.threeMonthPriceOf5000Km,
    },
    {
      label: "6 Month Price of 2500 KM",
      name: "sixMonthPriceOf2500Km",
      value: data.sixMonthPriceOf2500Km,
    },
    {
      label: "6 Month Price of 5000 KM",
      name: "sixMonthPriceOf5000Km",
      value: data.sixMonthPriceOf5000Km,
    },
    {
      label: "9 Month Price of 2500 KM",
      name: "nineMonthPriceOf2500Km",
      value: data.nineMonthPriceOf2500Km,
    },
    {
      label: "9 Month Price of 5000 KM",
      name: "nineMonthPriceOf5000Km",
      value: data.nineMonthPriceOf5000Km,
    },
    {
      label: "CDW Monthly",
      name: "cdwMonthly",
      value: data.cdwMonthly,
    },
    {
      label: "PAI Insurance (Monthly)",
      name: "paiInsuranceMonthly",
      value: data.paiInsuranceMonthly,
    },
    {
      label: "Baby Seat Charge Monthly",
      name: "babySeatChargeMonthly",
      value: data.babySeatChargeMonthly,
    },
    {
      label: "Delivery Charge Monthly",
      name: "deliveryChargeMonthly",
      value: data.deliveryChargeMonthly,
    },
    {
      label: "Additional Driver Charge Monthly",
      name: "additionalDriverChargeMonthly",
      value: data.additionalDriverChargeMonthly,
    },
  ];

  const paymentTypes = ["Credit Card", "Debit Card", "UPI", "Cash"];
  const rentalTermsChecks = ["Credit Card", "Cash"];

  const otherCharges = [
    {
      label: "Additional Mileage Charge",
      name: "additionalMileageCharge",
      value: data.additionalMileageCharge,
    },
    {
      label: "Excess Claim Charge",
      name: "excessClaimCharge",
      value: data.excessClaimCharge,
    },
    {
      label: "Salik/Toll Charge",
      name: "salikTollCharge",
      value: data.salikTollCharge,
    },
    {
      label: "Airport Pickup Charge",
      name: "airportPickupCharge",
      value: data.airportPickupCharge,
    },
    {
      label: "Airport Delivery Charge",
      name: "airportDeliveryCharge",
      value: data.airportDeliveryCharge,
    },
  ];

  const keyFeaturesFields = [
    {
      label: "Laggage (Boot Capacity)",
      name: "laggageBootCapacity",
      value: data.laggageBootCapacity,
    },
    {
      label: "Fuel",
      name: "fuel",
      value: data.fuel,
    },
  ];

  const selectInputsConfig = [
    {
      label: "Seater",
      name: "seater",
      value: data.seater,
      options: ["2 Seater", "5 Seater", "6 Seater", "7 Seater"],
    },
    {
      label: "Transmission",
      name: "transmission",
      value: data.transmission,
      options: ["Automatic", "Manual"],
    },
  ];
  const selectInputsTopSection = [
    {
      label: "Year",
      name: "year",
      value: data.year,
      options: [
        "2018",
        "2019",
        "2020",
        "2020",
        "2021",
        "2022",
        "2023",
        "2024",
        "2025",
        "2026",
        "2027",
        "2028",
        "2029",
        "2030",
      ],
    },
    {
      label: "Vehicle Type",
      name: "vehicleType",
      value: data.vehicleType,
      options: [
        "Hatchback",
        "Sedan",
        "Compact",
        "Compact Executive",
        "Crossover",
        "Small SUV",
        "Large SUV",
        "Economy",
        "Luxury",
        "SUV",
      ],
    },
    {
      label: "Status",
      name: "status",
      value: data.status,
      options: ["Active", "Inactive"],
    },
    {
      label: "Branch Location",
      name: "branchLocation",
      value: data.branchLocation,
      options: ["Dubai", "Abu Dhabi"],
    },
  ];

  const multiSelectCheckboxFields = [
    {
      label: "Location",
      options: locDrop,
      selectedValues: locationValue,
      onChange: handleLocation,
      data: data.location,
    },
    {
      label: "Interior Color",
      options: interiorVariants,
      selectedValues: variantName,
      onChange: handleCheckNew,
      data: data.interiorColor,
    },
    {
      label: "Interior Color",
      options: exteriorVariants,
      selectedValues: variantName,
      onChange: handleCheckExteriorColor,
      data: data.exteriorColor,
    },
    {
      label: "Subscription Package",
      options: subscriptionPackageArray,
      selectedValues: subscriptionPackage,
      onChange: handleSubscriptionPackage,
      data: data.subsPackage,
    },
  ];

  return (
    <div className="addcar_form">
      <Box>
        <form onSubmit={(e) => Submit(e)}>
          <Container className="formcontbox">
            <div className="pageheading">
              <Suspense fallback={<> Loading...</>}>
                <h1>{id ? "Update Car" : "Add a new car"}</h1>
              </Suspense>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={3} md={3} lg={3}>
                  <FormControl sx={{ minWidth: "100%" }} size="small">
                    <InputLabel id="demo-select-small-label">Brand</InputLabel>
                    <Controller
                      name="brand"
                      control={control}
                      defaultValue=""
                      rules={{ required: "field is required" }}
                      render={({ field }) => (
                        <Select
                          labelId="demo-select-small-label"
                          id="demo-select-small"
                          label="Brand"
                          {...field}
                          name="brand"
                          value={data.brand}
                          onChange={(e) => handle(e)}
                          MenuProps={{
                            PaperProps: {
                              style: styles.menuList,
                            },
                          }}
                        >
                          {brand.map((item: any) => (
                            <MenuItem key={item.name} value={item.name}>
                              {item.name}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    />
                    <FormHelperText error>
                      {errors.brand?.message}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={3} md={3} lg={3}>
                  <FormControl sx={{ minWidth: "100%" }} size="small">
                    <InputLabel id="demo-select-small-label">Model</InputLabel>
                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      label="Model"
                      name="model"
                      value={data.model}
                      onChange={(e) => handle(e)}
                      MenuProps={{
                        PaperProps: {
                          style: styles.menuList,
                        },
                      }}
                    >
                      {modelDropByBrand.map((item: any) => (
                        <MenuItem key={item.Name} value={item.Name}>
                          {item.Name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={3} md={3} lg={3}>
                  <FormControl sx={{ minWidth: "100%" }} size="small">
                    <InputLabel id="demo-select-small-label">
                      Category
                    </InputLabel>
                    <Controller
                      name="category"
                      control={control}
                      defaultValue=""
                      rules={{ required: "field is required" }}
                      render={({ field }) => (
                        <Select
                          labelId="demo-select-small-label"
                          id="demo-select-small"
                          label="Category"
                          {...field}
                          name="category"
                          value={data.category}
                          onChange={(e) => handle(e)}
                          MenuProps={{
                            PaperProps: {
                              style: styles.menuList,
                            },
                          }}
                        >
                          {catDrop.map((item: any) => (
                            <MenuItem key={item.name} value={item.name}>
                              {item.name}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    />
                    <FormHelperText error>
                      {errors.brand?.message}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                {selectInputsTopSection.map((config, index) => (
                  <Grid item xs={12} sm={3} key={index}>
                    <ReusableSelectComponent
                      label={config.label}
                      name={config.name}
                      value={config.value}
                      onChange={(e: any) => handle(e)}
                      options={config.options}
                      MenuProps={MenuProps}
                    />
                  </Grid>
                ))}
                <Grid item xs={12} sm={3} md={3} lg={3}>
                  <FormControl sx={{ minWidth: "100%" }}>
                    <Button variant="outlined" component="label">
                      Image
                      <input
                        name="image"
                        // multiple
                        type="file"
                        accept="image/*" // Limit accepted files to images
                        onChange={(e) => handleImageChange(e, "")}
                        hidden
                      />
                    </Button>
                  </FormControl>
                </Grid>
                {multiSelectCheckboxFields.map((item, index) => (
                  <Grid item xs={12} sm={3} md={3} lg={3} key={index}>
                    <ReusableSelectCheckbox
                      label={item.label}
                      options={item.options}
                      selectedValues={item.selectedValues}
                      onChange={item.onChange}
                      data={item.data}
                      MenuProps={MenuProps}
                    />
                  </Grid>
                ))}
                <Grid item xs={12} sm={3} md={3} lg={3}>
                  <FormControl sx={{ minWidth: "100%" }}>
                    <TextField
                      id="outlined-basic"
                      label="Car Provider"
                      variant="outlined"
                      size="small"
                      sx={{ height: "50px" }}
                      name="carProvider"
                      value={data.carProvider}
                      onChange={(e) => handle(e)}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </div>
            <div className="car_pricing">
              <h4>Pricing</h4>
              <>
                <div className="daily_prices">
                  <Grid container spacing={2}>
                    {dailyPriceFields.map((fields) => (
                      <Grid item xs={12} sm={3} key={fields.name}>
                        <ReusableTextField
                          name={fields.name}
                          value={fields.value}
                          onChange={(e) => handle(e)}
                          label={fields.label}
                        />
                      </Grid>
                    ))}
                    <Grid item xs={12} sm={3} md={3} lg={3}>
                      <FormControl sx={{ minWidth: "100%" }} size="small">
                        <InputLabel id="demo-select-small-label">
                          Unlimited KM Daily
                        </InputLabel>
                        <Controller
                          name="unlimitedKMDaily"
                          control={control}
                          defaultValue=""
                          rules={{ required: "field is required" }}
                          render={({ field }) => (
                            <Select
                              labelId="demo-select-small-label"
                              id="demo-select-small"
                              label="Unlimited KM Daily"
                              {...field}
                              name="unlimitedKMDaily"
                              value={data.unlimitedKMDaily}
                              onChange={(e) => handle(e)}
                            >
                              <MenuItem value="Yes">Yes</MenuItem>
                              <MenuItem value="No">No</MenuItem>
                            </Select>
                          )}
                        />
                        <FormHelperText error>
                          {errors.unlimitedKMDaily?.message}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={3} md={3} lg={3}>
                      <FormControl sx={{ minWidth: "100%" }}>
                        <TextField
                          id="outlined-basic"
                          disabled={selectedOption === "Yes"}
                          label="Free Daily KM"
                          variant="outlined"
                          size="small"
                          sx={{ height: "50px" }}
                          {...register("freeDailyKM", {
                            required: true,
                          })}
                          error={!!errors.freeDailyKM}
                          helperText={errors.freeDailyKM && "field is required"}
                          name="freeDailyKM"
                          value={data.freeDailyKM}
                          onChange={(e) => handle(e)}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </div>
                <div className="weekly_prices">
                  <Grid container spacing={2}>
                    {weeklyPriceFields.map((fields) => (
                      <Grid item xs={12} sm={3} key={fields.name}>
                        <ReusableTextField
                          name={fields.name}
                          value={fields.value}
                          onChange={(e) => handle(e)}
                          label={fields.label}
                        />
                      </Grid>
                    ))}
                    <Grid item xs={12} sm={3} md={3} lg={3}>
                      <FormControl sx={{ minWidth: "100%" }} size="small">
                        <InputLabel id="demo-select-small-label">
                          Unlimited KM Weekly
                        </InputLabel>
                        <Controller
                          name="unlimitedKMWeekly"
                          control={control}
                          defaultValue=""
                          rules={{ required: "field is required" }}
                          render={({ field }) => (
                            <Select
                              labelId="demo-select-small-label"
                              id="demo-select-small"
                              label="Unlimited KM Weekly"
                              {...field}
                              name="unlimitedKMWeekly"
                              value={data.unlimitedKMWeekly}
                              onChange={(e) => handleWeeklyKM(e)}
                            >
                              <MenuItem value="Yes">Yes</MenuItem>
                              <MenuItem value="No">No</MenuItem>
                            </Select>
                          )}
                        />
                        <FormHelperText error>
                          {errors.unlimitedKMWeekly?.message}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={3} md={3} lg={3}>
                      <FormControl sx={{ minWidth: "100%" }}>
                        <TextField
                          id="outlined-basic"
                          disabled={selectedOptionWeekly === "Yes"}
                          label="Free Weekly KM"
                          variant="outlined"
                          size="small"
                          sx={{ height: "50px" }}
                          {...register("freeWeeklyKM", {
                            required: true,
                          })}
                          error={!!errors.freeWeeklyKM}
                          helperText={
                            errors.freeWeeklyKM && "field is required"
                          }
                          name="freeWeeklyKM"
                          value={data.freeWeeklyKM}
                          onChange={(e) => handleWeeklyKM(e)}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </div>
              </>
              <div className="monthly_prices">
                <Grid container spacing={2}>
                  {monthlyPriceFields.map((fields) => (
                    <Grid item xs={12} sm={3} key={fields.name}>
                      <ReusableTextField
                        name={fields.name}
                        value={fields.value}
                        onChange={(e) => handle(e)}
                        label={fields.label}
                      />
                    </Grid>
                  ))}
                  <Grid item xs={12} sm={3} md={3} lg={3}>
                    <FormControl sx={{ minWidth: "100%" }} size="small">
                      <InputLabel id="demo-select-small-label">
                        Unlimited KM Monthly
                      </InputLabel>
                      <Controller
                        name="unlimitedKMMonthly"
                        control={control}
                        defaultValue=""
                        rules={{ required: "field is required" }}
                        render={({ field }) => (
                          <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            label="Unlimited KM Monthly"
                            {...field}
                            name="unlimitedKMMonthly"
                            value={data.unlimitedKMMonthly}
                            onChange={(e) => handleMonthlyKM(e)}
                          >
                            <MenuItem value="Yes">Yes</MenuItem>
                            <MenuItem value="No">No</MenuItem>
                          </Select>
                        )}
                      />
                      <FormHelperText error>
                        {errors.unlimitedKMMonthly?.message}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={3} md={3} lg={3}>
                    <FormControl sx={{ minWidth: "100%" }}>
                      <TextField
                        id="outlined-basic"
                        label="Free Monthly KM"
                        disabled={selectedOptionMonthly === "Yes"}
                        variant="outlined"
                        size="small"
                        sx={{ height: "50px" }}
                        {...register("freeMonthlyKM", {
                          required: true,
                        })}
                        error={!!errors.freeMonthlyKM}
                        helperText={errors.freeMonthlyKM && "field is required"}
                        name="freeMonthlyKM"
                        value={data.freeMonthlyKM}
                        onChange={(e) => handleMonthlyKM(e)}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </div>
            </div>
            <div className="rental_terms">
              <h4>Rental Terms</h4>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={3} md={3} lg={3}>
                  <ReusableTextField
                    name="securityDeposit"
                    value={data.securityDeposit}
                    onChange={(e) => handle(e)}
                    label="Security Deposit"
                    disabled={data.noSecurityDeposit}
                  />
                </Grid>
                <Grid item xs={12} sm={3} md={3} lg={3}>
                  <ReusableCheckBox
                    name="noSecurityDeposit"
                    label="No Security Deposit Required"
                    checked={data.noSecurityDeposit}
                    handleChange={(e) => {
                      const checked = e.target.checked;
                      setdata({
                        ...data,
                        noSecurityDeposit: checked,
                        securityDeposit: checked ? "0" : data.securityDeposit
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={3} md={3} lg={3}>
                  {rentalTermsChecks.map((type) => (
                    <ReusableCheckBox
                      key={type}
                      name={type}
                      label={type}
                      checked={data.cashType.includes(type)}
                      handleChange={(e) => handleK(e)}
                    />
                  ))}
                </Grid>
              </Grid>
            </div>
            <div className="car_details">
              <h4>Other Charges</h4>
              <Grid container spacing={2}>
                {otherCharges.map((fields) => (
                  <Grid item xs={12} sm={3} key={fields.name}>
                    <ReusableTextField
                      name={fields.name}
                      value={fields.value}
                      onChange={(e) => handle(e)}
                      label={fields.label}
                    />
                  </Grid>
                ))}
              </Grid>
            </div>
            <div className="payment_type">
              <h4>Payment Type</h4>
              <Grid container spacing={2}>
                {paymentTypes.map((type) => (
                  <Grid item xs={6} sm={3} md={3} lg={3} key={type}>
                    <ReusableCheckBox
                      name={type}
                      label={type}
                      checked={data.paymentType.includes(type)}
                      handleChange={(e) => handleM(e)}
                    />
                  </Grid>
                ))}
              </Grid>
            </div>
            <div className="other_features">
              <h4>Key Features</h4>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={4} md={4} lg={4}>
                  <ReusableSelectCheckbox
                    label="key Features"
                    options={featCheck}
                    selectedValues={keyFeatureValue}
                    onChange={handleKeyFeatures}
                    data={data.keyFeatures}
                    MenuProps={MenuProps}
                  />
                </Grid>
                <Grid item xs={12} sm={2} md={2} lg={2}>
                  <FormControl sx={{ minWidth: "100%" }} size="small">
                    <InputLabel>Engine</InputLabel>
                    <Select
                      label="Engine"
                      name="engineCapacity"
                      value={data.engineCapacity}
                      onChange={(e) => handle(e)}
                      MenuProps={{
                        PaperProps: {
                          style: styles.menuList,
                        },
                      }}
                    >
                      {capDrop.map((item: any) => (
                        <MenuItem key={item.Capacity} value={item.Capacity}>
                          {item.Capacity}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                {selectInputsConfig.map((config, index) => (
                  <Grid item xs={12} sm={2} key={index}>
                    <ReusableSelectComponent
                      label={config.label}
                      name={config.name}
                      value={config.value}
                      onChange={(e: any) => handle(e)}
                      options={config.options}
                      MenuProps={MenuProps}
                    />
                  </Grid>
                ))}
                {keyFeaturesFields.map((fields) => (
                  <Grid item xs={12} sm={2} key={fields.name}>
                    <ReusableTextField
                      name={fields.name}
                      value={fields.value}
                      onChange={(e) => handle(e)}
                      label={fields.label}
                    />
                  </Grid>
                ))}
              </Grid>
            </div>
            <div className="offer_section">
              <h4>Custom Offer Settings</h4>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <ReusableTextField
                    name="customOfferText"
                    value={data.customOfferText}
                    onChange={(e) => handle(e)}
                    label="Offer Text (e.g., Teacher offer 20%, Weekend deal 15%)"
                    placeholder="Leave empty to hide offer"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <FormControl sx={{ minWidth: "100%" }} size="small">
                    <InputLabel id="offer-color-label">Offer Color</InputLabel>
                    <Controller
                      name="customOfferColor"
                      control={control}
                      defaultValue="yellow"
                      render={({ field }) => (
                        <Select
                          labelId="offer-color-label"
                          id="offer-color-select"
                          label="Offer Color"
                          {...field}
                          name="customOfferColor"
                          value={data.customOfferColor}
                          onChange={(e) => handle(e)}
                        >
                          <MenuItem value="yellow">Yellow</MenuItem>
                          <MenuItem value="red">Red</MenuItem>
                          <MenuItem value="green">Green</MenuItem>
                          <MenuItem value="blue">Blue</MenuItem>
                          <MenuItem value="orange">Orange</MenuItem>
                          <MenuItem value="purple">Purple</MenuItem>
                        </Select>
                      )}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </div>
            <div className="carformbtn">
              <Button
                type="submit"
                variant="contained"
                className="submitbtn"
                color="primary"
              >
                {id ? "Update" : "Submit"}
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => router.push("/pages/adminCar")}
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

export default AddNewCar;
