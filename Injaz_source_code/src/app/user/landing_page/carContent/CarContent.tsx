"use client";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import InfoIcon from "@mui/icons-material/Info";
import "../car-offers/caroffers.css";
import { useRouter } from "next/navigation";
import Loader from "@/app/Loader";
import BookNow from "../car-offers/BookNow";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CloseIcon from "@mui/icons-material/Close";
import CustomizedTooltips from "@/utils/reusableTooltip";

interface CarContentType {
  data: any;
  phoneData: any;
}

const CarContent: React.FC<CarContentType> = ({ data = [], phoneData }) => {
  const [loader, setLoader] = useState(true);
  const [filteredData, setFilteredData] = useState(data);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [selectedPeriod, setSelectedPeriod] = useState<string>('daily');
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedTransmission, setSelectedTransmission] = useState<string>('');
  const [selectedSeater, setSelectedSeater] = useState<string>('');
  const [carNameSearch, setCarNameSearch] = useState<string>('');
  const router = useRouter();

  // Function to calculate max price based on selected period
  const calculateMaxPrice = (period: string) => {
    if (!data || data.length === 0) return 1000;
    
    const prices: number[] = [];
    data.forEach((car: any) => {
      let price = 0;
      switch (period) {
        case 'daily':
          price = Number(car.discountedPriceDaily) || 0;
          break;
        case 'weekly':
          price = Number(car.discountedPriceWeekly) || 0;
          break;
        case 'monthly':
          price = Number(car.discountedPriceMonthly) || 0;
          break;
      }
      if (price > 0) prices.push(price);
    });
    
    return prices.length > 0 ? Math.max(...prices) : 1000;
  };

  useEffect(() => {
    if (data && data.length > 0) {
      setLoader(false);
      setFilteredData(data);
      // Initialize max price on first load
      const calculatedMaxPrice = calculateMaxPrice(selectedPeriod);
      setMaxPrice(calculatedMaxPrice);
    }
  }, [data]);

  // Update max price when period changes
  useEffect(() => {
    if (data && data.length > 0) {
      const calculatedMaxPrice = calculateMaxPrice(selectedPeriod);
      setMaxPrice(calculatedMaxPrice);
    }
  }, [selectedPeriod, data]);

  // Search function to filter cars based on all criteria
  const handleSearch = () => {
    if (data && data.length > 0) {
      const filtered = data.filter((car: any) => {
        // Price filter
        let price = 0;
        switch (selectedPeriod) {
          case 'daily':
            price = car.discountedPriceDaily || 0;
            break;
          case 'weekly':
            price = car.discountedPriceWeekly || 0;
            break;
          case 'monthly':
            price = car.discountedPriceMonthly || 0;
            break;
          default:
            price = car.discountedPriceDaily || 0;
        }
        
        const priceMatch = price >= minPrice && price <= maxPrice;
        
        // Brand filter
        const brandMatch = !selectedBrand || car.brand?.toLowerCase().includes(selectedBrand.toLowerCase());
        
        // Category filter
        const categoryMatch = !selectedCategory || car.category?.toLowerCase().includes(selectedCategory.toLowerCase());
        
        // Transmission filter
        const transmissionMatch = !selectedTransmission || car.transmission?.toLowerCase().includes(selectedTransmission.toLowerCase());
        
        // Seater filter
        const seaterMatch = !selectedSeater || car.seater?.toLowerCase().includes(selectedSeater.toLowerCase());
        
        // Car name search filter
        const carNameMatch = !carNameSearch || 
          `${car.brand} ${car.model} ${car.year}`.toLowerCase().includes(carNameSearch.toLowerCase()) ||
          car.brand?.toLowerCase().includes(carNameSearch.toLowerCase()) ||
          car.model?.toLowerCase().includes(carNameSearch.toLowerCase());
        
        return priceMatch && brandMatch && categoryMatch && transmissionMatch && seaterMatch && carNameMatch;
      });
      setFilteredData(filtered);
    }
  };

  // Clear filters function
  const handleClearFilters = () => {
    setMinPrice(0);
    // Calculate max price dynamically based on selected period
    const calculatedMaxPrice = calculateMaxPrice(selectedPeriod);
    setMaxPrice(calculatedMaxPrice);
    setSelectedPeriod('daily');
    setSelectedBrand('');
    setSelectedCategory('');
    setSelectedTransmission('');
    setSelectedSeater('');
    setCarNameSearch('');
    setFilteredData(data);
  };

  // Helper functions to get unique values for dropdowns
  const getUniqueBrands = () => {
    const brands: string[] = [];
    data.forEach((car: any) => {
      if (car.brand && !brands.includes(car.brand)) {
        brands.push(car.brand);
      }
    });
    return brands.sort();
  };

  const getUniqueCategories = () => {
    const categories: string[] = [];
    data.forEach((car: any) => {
      if (car.category && !categories.includes(car.category)) {
        categories.push(car.category);
      }
    });
    return categories.sort();
  };

  const getUniqueTransmissions = () => {
    const transmissions: string[] = [];
    data.forEach((car: any) => {
      if (car.transmission && !transmissions.includes(car.transmission)) {
        transmissions.push(car.transmission);
      }
    });
    return transmissions.sort();
  };

  const getUniqueSeaters = () => {
    const seaters: string[] = [];
    data.forEach((car: any) => {
      if (car.seater && !seaters.includes(car.seater)) {
        seaters.push(car.seater);
      }
    });
    return seaters.sort();
  };

  const handleWhatsappClick = (carDetails: any) => {
    const {
      brand,
      model,
      year,
      package: packageDetails,
      discountedPriceDaily,
      _id,
    } = carDetails;
    const baseUrl = "https://injazrent.ae/pages/getCarDetails?verify=";
    const url = `${baseUrl}${_id}`;
    const whatsappMessage = `Hi, \nI'm contacting you through Injazrent.ae. \nI'd like to rent the discounted ${brand} ${model} ${year} \n${url} \nfor ${discountedPriceDaily} D ${packageDetails}. \nIs it available?`;
    // Remove spaces and special characters from phone number for WhatsApp URL
    const formattedPhoneNumber = phoneData?.phoneNumber?.replace(/\s+/g, '').replace(/[^\d+]/g, '') || '+971509961569';
    const whatsappLink = `https://wa.me/${formattedPhoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    if (window.gtag) {
      window.gtag("event", "whatsapp_click", {
        event_category: "User Interaction",
        event_label: "WhatsApp Contact",
        value: phoneData?._id,
      });
    }
    window.open(whatsappLink);
  };

  return (
    <div className="car_offers">
      <Container maxWidth="lg">
        {/* Enhanced Filter Section */}
        {!loader && (
          <Box
            sx={{
              backgroundColor: "white",
              borderRadius: 3,
              padding: 3,
              marginBottom: 4,
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              border: "1px solid #e0e0e0",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 600,
                color: "#01437D",
                marginBottom: 2,
                textAlign: "center",
                fontSize: "1.5rem"
              }}
            >
              Find Your Perfect Car Rental Dubai - No Deposit Required
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 400,
                color: "#666",
                marginBottom: 3,
                textAlign: "center",
                fontSize: "1rem"
              }}
            >
              Search from our wide selection of affordable car rentals in Dubai, Abu Dhabi & UAE
            </Typography>
            
            {/* First Row - Car Name Search */}
            <Grid container spacing={2} sx={{ marginBottom: 2 }}>
              <Grid item xs={12}>
                <TextField
                  label="Search Car Rental Dubai - Brand, Model, or Type"
                  value={carNameSearch}
                  onChange={(e) => setCarNameSearch(e.target.value)}
                  variant="outlined"
                  size="small"
                  fullWidth
                  placeholder="e.g., Toyota Camry Dubai, BMW X5 rental, Honda Civic monthly rental..."
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      backgroundColor: "#f8f9fa",
                      '&:hover fieldset': {
                        borderColor: "#01437D",
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: "#01437D",
                      },
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: "#01437D",
                    },
                  }}
                />
              </Grid>
            </Grid>

            {/* Second Row - Brand and Category */}
            <Grid container spacing={2} sx={{ marginBottom: 2 }}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined" size="small">
                  <InputLabel sx={{ color: "#01437D" }}>Brand</InputLabel>
                  <Select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    label="Brand"
                    sx={{
                      borderRadius: 2,
                      backgroundColor: "#f8f9fa",
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: "#01437D",
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: "#01437D",
                      },
                      '& .MuiSelect-icon': {
                        color: "#01437D",
                      },
                    }}
                  >
                    <MenuItem value="">All Brands</MenuItem>
                    {getUniqueBrands().map((brand: string) => (
                      <MenuItem key={brand} value={brand}>
                        {brand}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined" size="small">
                  <InputLabel sx={{ color: "#01437D" }}>Category</InputLabel>
                  <Select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    label="Category"
                    sx={{
                      borderRadius: 2,
                      backgroundColor: "#f8f9fa",
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: "#01437D",
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: "#01437D",
                      },
                      '& .MuiSelect-icon': {
                        color: "#01437D",
                      },
                    }}
                  >
                    <MenuItem value="">All Categories</MenuItem>
                    {getUniqueCategories().map((category: string) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            {/* Third Row - Transmission and Seater */}
            <Grid container spacing={2} sx={{ marginBottom: 2 }}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined" size="small">
                  <InputLabel sx={{ color: "#01437D" }}>Transmission</InputLabel>
                  <Select
                    value={selectedTransmission}
                    onChange={(e) => setSelectedTransmission(e.target.value)}
                    label="Transmission"
                    sx={{
                      borderRadius: 2,
                      backgroundColor: "#f8f9fa",
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: "#01437D",
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: "#01437D",
                      },
                      '& .MuiSelect-icon': {
                        color: "#01437D",
                      },
                    }}
                  >
                    <MenuItem value="">All Transmissions</MenuItem>
                    {getUniqueTransmissions().map((transmission: string) => (
                      <MenuItem key={transmission} value={transmission}>
                        {transmission}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined" size="small">
                  <InputLabel sx={{ color: "#01437D" }}>Seater</InputLabel>
                  <Select
                    value={selectedSeater}
                    onChange={(e) => setSelectedSeater(e.target.value)}
                    label="Seater"
                    sx={{
                      borderRadius: 2,
                      backgroundColor: "#f8f9fa",
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: "#01437D",
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: "#01437D",
                      },
                      '& .MuiSelect-icon': {
                        color: "#01437D",
                      },
                    }}
                  >
                    <MenuItem value="">All Seaters</MenuItem>
                    {getUniqueSeaters().map((seater: string) => (
                      <MenuItem key={seater} value={seater}>
                        {seater}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            {/* Fourth Row - Price Filters */}
            <Grid container spacing={2} sx={{ marginBottom: 2 }}>
              <Grid item xs={12} sm={3}>
                <FormControl fullWidth variant="outlined" size="small">
                  <InputLabel sx={{ color: "#01437D" }}>Price Period</InputLabel>
                  <Select
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    label="Price Period"
                    sx={{
                      borderRadius: 2,
                      backgroundColor: "#f8f9fa",
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: "#01437D",
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: "#01437D",
                      },
                      '& .MuiSelect-icon': {
                        color: "#01437D",
                      },
                    }}
                  >
                    <MenuItem value="daily">Daily</MenuItem>
                    <MenuItem value="weekly">Weekly</MenuItem>
                    <MenuItem value="monthly">Monthly</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Min Price (D)"
                  type="text"
                  value={minPrice === 0 ? '' : minPrice.toString()}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Handle empty input
                    if (value === '' || value === null || value === undefined) {
                      setMinPrice(0);
                      return;
                    }
                    
                    // Remove leading zeros by converting to number and back to string
                    // This ensures "033" becomes "33" immediately
                    const trimmedValue = value.replace(/^0+/, '') || '0';
                    const numValue = parseInt(trimmedValue, 10);
                    
                    // Only update if it's a valid number and non-negative
                    if (!isNaN(numValue) && numValue >= 0) {
                      setMinPrice(numValue);
                    }
                  }}
                  onBlur={(e) => {
                    // Ensure we don't have leading zeros on blur
                    const value = e.target.value;
                    if (value && value !== '') {
                      const numValue = parseInt(value.replace(/^0+/, '') || '0', 10);
                      if (!isNaN(numValue) && numValue >= 0) {
                        setMinPrice(numValue);
                      }
                    } else {
                      setMinPrice(0);
                    }
                  }}
                  variant="outlined"
                  size="small"
                  fullWidth
                  inputProps={{
                    inputMode: 'numeric',
                    pattern: '[0-9]*',
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      backgroundColor: "#f8f9fa",
                      '&:hover fieldset': {
                        borderColor: "#01437D",
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: "#01437D",
                      },
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: "#01437D",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label={`Max Price (D) - Max: ${calculateMaxPrice(selectedPeriod)}`}
                  type="number"
                  value={maxPrice}
                  onChange={(e) => {
                    const value = e.target.value;
                    const numValue = Number(value);
                    const maxAllowed = calculateMaxPrice(selectedPeriod);
                    
                    // Only update if it's a valid number and within bounds
                    if (!isNaN(numValue) && numValue >= 0 && numValue <= maxAllowed) {
                      setMaxPrice(numValue);
                    } else if (numValue > maxAllowed) {
                      // If user enters value greater than max, set to max
                      setMaxPrice(maxAllowed);
                    }
                  }}
                  variant="outlined"
                  size="small"
                  fullWidth
                  inputProps={{
                    min: 0,
                    max: calculateMaxPrice(selectedPeriod),
                    step: 1,
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      backgroundColor: "#f8f9fa",
                      '&:hover fieldset': {
                        borderColor: "#01437D",
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: "#01437D",
                      },
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: "#01437D",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="contained"
                    onClick={handleSearch}
                    sx={{
                      flex: 1,
                      backgroundColor: "#01437D",
                      borderRadius: 2,
                      padding: "10px 20px",
                      fontWeight: 600,
                      textTransform: "none",
                      fontSize: "16px",
                      boxShadow: "0 4px 12px rgba(1, 67, 125, 0.3)",
                      '&:hover': {
                        backgroundColor: "#012a4a",
                        boxShadow: "0 6px 16px rgba(1, 67, 125, 0.4)",
                        transform: "translateY(-2px)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    Search
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={handleClearFilters}
                    sx={{
                      flex: 1,
                      borderColor: "#01437D",
                      color: "#01437D",
                      borderRadius: 2,
                      padding: "10px 20px",
                      fontWeight: 600,
                      textTransform: "none",
                      fontSize: "16px",
                      borderWidth: 2,
                      '&:hover': {
                        borderWidth: 2,
                        backgroundColor: "rgba(1, 67, 125, 0.04)",
                      },
                    }}
                  >
                    Clear
                  </Button>
                </Box>
              </Grid>
            </Grid>

            {/* Results Count */}
            <Box sx={{ textAlign: "center", marginTop: 2 }}>
              <Chip
                label={`${filteredData.length} affordable car rentals available in Dubai & UAE`}
                sx={{
                  backgroundColor: "#01437D",
                  color: "white",
                  fontWeight: 600,
                  fontSize: "14px",
                }}
              />
            </Box>
          </Box>
        )}

        {!loader ? (
          <Grid container spacing={6} sx={{ justifyContent: "center" }}>
            {filteredData.map((car: any) => (
              <Grid
                item
                xs={12}
                md={4}
                sm={4}
                lg={4}
                xl={4}
                key={car._id}
                className="carBoxShadow"
              >
                <Card sx={{ boxShadow: 3 }} className="carBorder">
                  <CardActionArea>
                    <CardContent
                      className="cardContent"
                      onClick={() => {
                        router.push(`/pages/getCarDetails?verify=${car._id}`);
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="200"
                        image={car.externalImage?.[0] || car.image}
                        alt={`${car.brand} ${car.model} ${car.year} - Rent ${car.brand} ${car.model} Dubai - Affordable Car Rental No Deposit - ${car.category} Car Rental UAE`}
                        title={`Rent ${car.brand} ${car.model} ${car.year} in Dubai - Best ${car.category} Car Rental Rates`}
                      />
                      {car.customOfferText && (
                        <Box
                          sx={{
                            position: "absolute",
                            top: 12,
                            right: 12,
                            background: car.customOfferColor === 'yellow' 
                              ? 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)'
                              : car.customOfferColor === 'red'
                              ? 'linear-gradient(135deg, #FF4444 0%, #CC0000 100%)'
                              : car.customOfferColor === 'green'
                              ? 'linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)'
                              : car.customOfferColor === 'blue'
                              ? 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)'
                              : car.customOfferColor === 'orange'
                              ? 'linear-gradient(135deg, #FF9800 0%, #F57C00 100%)'
                              : car.customOfferColor === 'purple'
                              ? 'linear-gradient(135deg, #9C27B0 0%, #7B1FA2 100%)'
                              : 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                            color: "white",
                            padding: "6px 12px",
                            borderRadius: "20px",
                            fontSize: "11px",
                            fontWeight: "700",
                            zIndex: 2,
                            maxWidth: "130px",
                            textAlign: "center",
                            boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                            border: "2px solid rgba(255,255,255,0.3)",
                            textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                            letterSpacing: "0.5px",
                            lineHeight: "1.2",
                            transform: "rotate(-2deg)",
                            animation: "pulse 2s infinite",
                            "@keyframes pulse": {
                              "0%": { transform: "rotate(-2deg) scale(1)" },
                              "50%": { transform: "rotate(-2deg) scale(1.05)" },
                              "100%": { transform: "rotate(-2deg) scale(1)" },
                            },
                          }}
                        >
                          {car.customOfferText}
                        </Box>
                      )}
                      <Typography
                        className="cardNameYear"
                        gutterBottom
                        variant="h6"
                        component="div"
                      >
                        {car.brand} {car.model} ({car.year})
                      </Typography>
                      <div className="car_prices">
                        <div className="car_prices_child_combined">
                          <span className="actual_price">D {car.actualPriceDaily}</span>
                          <span className="discounted_price">D {car.discountedPriceDaily}</span>
                          <span className="price_period">/ Day</span>
                        </div>
                        <div className="car_prices_child_combined">
                          <span className="actual_price">D {car.actualPriceWeekly}</span>
                          <span className="discounted_price">D {car.discountedPriceWeekly}</span>
                          <span className="price_period">/ Week</span>
                        </div>
                        <div className="car_prices_child_combined">
                          <span className="actual_price">D {car.actualPriceMonthly}</span>
                          <span className="discounted_price">D {car.discountedPriceMonthly}</span>
                          <span className="price_period">/ Month</span>
                        </div>
                      </div>
                      <div className="car_KM">
                        <div className="car_KM_child">
                          {car.freeDailyKM} KM / Day
                        </div>
                        <div className="car_KM_child">
                          {car.freeWeeklyKM} KM / Week
                        </div>
                        <div className="car_KM_child">
                          {car.freeMonthlyKM} KM / Month
                        </div>
                      </div>
                      <div className="car_interior">
                        <div className="car_subint">
                          <img
                            src="/vehicles.png"
                            width={20}
                            height={20}
                            alt={`${car.category} car rental Dubai - ${car.brand} ${car.model}`}
                          />
                          <h5>{car.category}</h5>
                        </div>
                        <div className="car_subint">
                          <img
                            src="/car-seat.png"
                            width={20}
                            height={20}
                            alt={`${car.seater.split(" ")[0]} seater car rental Dubai`}
                          />
                          <h5 title="seater">{car.seater.split(" ")[0]}</h5>
                        </div>
                        <div className="car_subint">
                          <img
                            src="/car-engine.png"
                            width={20}
                            height={20}
                            alt={`${car.engineCapacity} engine car rental Dubai`}
                          />
                          <h5>{car.engineCapacity}</h5>
                        </div>
                        <div className="car_subint">
                          <img
                            src="/manual-transmission.png"
                            width={20}
                            height={20}
                            alt={`${car.transmission} transmission car rental Dubai`}
                          />
                          <h5>{car.transmission}</h5>
                        </div>
                      </div>
                      <div className="car_insurance">
                        <div className="car_insurance_child">
                          <div style={{ fontSize: '9px', color: '#666', marginBottom: '2px' }}>Insurance for Day</div>
                          <div style={{ fontWeight: 'bold', fontSize: '11px' }}>D {car.cdwDaily || 0}</div>
                        </div>
                        <div className="car_insurance_child">
                          <div style={{ fontSize: '9px', color: '#666', marginBottom: '2px' }}>Insurance for Week</div>
                          <div style={{ fontWeight: 'bold', fontSize: '11px' }}>D {car.cdwWeekly || 0}</div>
                        </div>
                        <div className="car_insurance_child">
                          <div style={{ fontSize: '9px', color: '#666', marginBottom: '2px' }}>Insurance for Month</div>
                          <div style={{ fontWeight: 'bold', fontSize: '11px' }}>D {car.cdwMonthly || 0}</div>
                        </div>
                      </div>
                    </CardContent>

                    <div className="car_info_sec6">
                      <div className="carDDI">
                        <div className="int_icon">
                          <CheckIcon
                            sx={{
                              color: "green",
                              marginRight: "5px",
                            }}
                          />
                          <p className="carInfoPara">Minimum 2 days rental</p>
                        </div>
                        <CustomizedTooltips title="A security deposit is required exclusively via credit card. The deposit will be refunded within 21 days following your return date.">
                          <div className="int_icon">
                            <InfoIcon
                              sx={{
                                color: "orange",
                                marginRight: "5px",
                              }}
                            />
                            <p className="carInfoPara">
                              {car.securityDeposit === 0 || car.securityDeposit === "0" 
                                ? "No deposit required" 
                                : `Deposit: D ${car.securityDeposit}`}
                            </p>
                          </div>
                        </CustomizedTooltips>
                      </div>
                      <div className="book_btn">
                        <Button
                          variant="contained"
                          startIcon={<WhatsAppIcon className="wts-icon" />}
                          size="small"
                          className="whts-btn"
                          onClick={() => handleWhatsappClick(car)}
                        >
                          Whatsapp
                        </Button>
                        <Button>
                          <BookNow details={car} />
                        </Button>
                      </div>
                    </div>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          // </Suspense>
          <>
            <br />
            <br />
            <Loader />
            <br />
            <br />
          </>
        )}
      </Container>
    </div>
  );
};

export default CarContent;
