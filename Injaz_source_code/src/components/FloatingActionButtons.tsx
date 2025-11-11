"use client";
import React, { useState, useEffect } from "react";
import { Box, Fab, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PhoneIcon from "@mui/icons-material/Phone";
import axios from "axios";
import { serverUrl } from "@/utils/helper";

interface FloatingActionButtonsProps {
  phoneData?: any;
}

const FloatingActionButtons: React.FC<FloatingActionButtonsProps> = ({ phoneData }) => {
  const [phoneNumbers, setPhoneNumbers] = useState<any[]>([]);
  const [whatsappNumber, setWhatsappNumber] = useState<string>("");
  const [phoneAnchorEl, setPhoneAnchorEl] = useState<null | HTMLElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get(serverUrl + "/admin/getAllsettings");
        const settings = response.data.data;
        
        if (settings && settings.length > 0) {
          // Get phone numbers (can be multiple)
          const phones = settings.map((setting: any) => ({
            id: setting._id,
            phoneNumber: setting.phoneNumber,
            email: setting.email
          }));
          setPhoneNumbers(phones);
          
          // Get WhatsApp number (should be single - use first phone number or dedicated WhatsApp number)
          const whatsappSetting = settings.find((setting: any) => setting.whatsappNumber) || settings[0];
          setWhatsappNumber(whatsappSetting?.whatsappNumber || whatsappSetting?.phoneNumber || "");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching settings:", error);
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handlePhoneMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setPhoneAnchorEl(event.currentTarget);
  };

  const handlePhoneMenuClose = () => {
    setPhoneAnchorEl(null);
  };

  const handlePhoneClick = (phoneNumber: string) => {
    window.open(`tel:${phoneNumber}`, "_blank");
    handlePhoneMenuClose();
  };

  const handleWhatsappClick = () => {
    const message = encodeURIComponent(
      "Hi, \nI'm contacting you through injazrent.ae. \nI'd like to rent the car on Daily, Weekly and Monthly packages. \nIs it available?"
    );
    
    // Remove spaces and special characters from phone number for WhatsApp URL
    const formattedPhoneNumber = whatsappNumber?.replace(/\s+/g, '').replace(/[^\d+]/g, '') || '+971509960498';
    
    if (window.gtag) {
      window.gtag("event", "whatsapp_click", {
        event_category: "User Interaction",
        event_label: "WhatsApp Contact",
        value: phoneData?._id,
      });
    }
    
    window.open(`https://wa.me/${formattedPhoneNumber}?text=${message}`, "_blank");
  };

  if (loading) return null;

  return (
    <>
      {/* Phone Button - Bottom Left */}
      <Box
        sx={{
          position: "fixed",
          bottom: "20px",
          left: "20px",
          zIndex: 1000,
        }}
      >
        <Tooltip title="Call Us" placement="top">
          <Fab
            color="primary"
            aria-label="phone"
            onClick={handlePhoneMenuOpen}
            sx={{
              backgroundColor: "#01437d",
              "&:hover": {
                backgroundColor: "#012a4a",
                transform: "scale(1.1)",
              },
              transition: "all 0.3s ease",
              boxShadow: "0 4px 12px rgba(1, 67, 125, 0.3)",
            }}
          >
            <PhoneIcon sx={{ color: "white" }} />
          </Fab>
        </Tooltip>
        
        {/* Phone Numbers Menu */}
        <Menu
          anchorEl={phoneAnchorEl}
          open={Boolean(phoneAnchorEl)}
          onClose={handlePhoneMenuClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          {phoneNumbers.map((phone, index) => (
            <MenuItem
              key={phone.id}
              onClick={() => handlePhoneClick(phone.phoneNumber)}
              sx={{
                minWidth: "200px",
                padding: "12px 16px",
              }}
            >
              <PhoneIcon sx={{ marginRight: "8px", color: "#01437d" }} />
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {phone.phoneNumber}
                </Typography>
                {phone.email && (
                  <Typography variant="caption" color="text.secondary">
                    {phone.email}
                  </Typography>
                )}
              </Box>
            </MenuItem>
          ))}
        </Menu>
      </Box>

      {/* WhatsApp Button - Bottom Right */}
      <Box
        sx={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 1000,
        }}
      >
        <Tooltip title="WhatsApp Us" placement="top">
          <Fab
            aria-label="whatsapp"
            onClick={handleWhatsappClick}
            sx={{
              backgroundColor: "#25D366",
              "&:hover": {
                backgroundColor: "#128C7E",
                transform: "scale(1.1)",
              },
              transition: "all 0.3s ease",
              boxShadow: "0 4px 12px rgba(37, 211, 102, 0.3)",
            }}
          >
            <WhatsAppIcon sx={{ color: "white" }} />
          </Fab>
        </Tooltip>
      </Box>
    </>
  );
};

export default FloatingActionButtons;
