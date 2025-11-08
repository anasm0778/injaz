import React from "react";
import { Box, Container, Typography, Grid, Divider } from "@mui/material";
import NavFooter from "@/utils/Na_Fo";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const styles: any = {
  box: {
    marginTop: "2rem",
    marginBottom: "2rem",
  },
  heading: {
    color: "#01437d",
    fontSize: "2.5rem",
    fontWeight: 600,
    fontFamily: "sans-serif",
    marginBottom: "1rem",
    textAlign: "center",
  },
  subHeading: {
    color: "#01437d",
    fontSize: "1.8rem",
    fontWeight: 600,
    fontFamily: "sans-serif",
    marginTop: "2rem",
    marginBottom: "1rem",
  },
  description: {
    fontSize: "1.1rem",
    fontWeight: 400,
    fontFamily: "sans-serif",
    textAlign: "justify",
    lineHeight: "1.8rem",
    color: "#333",
    marginBottom: "2rem",
  },
  serviceTitle: {
    fontSize: "1.5rem",
    fontWeight: 600,
    fontFamily: "sans-serif",
    color: "#01437d",
    marginTop: "2rem",
    marginBottom: "0.5rem",
  },
  serviceDescription: {
    fontSize: "1rem",
    fontWeight: 400,
    fontFamily: "sans-serif",
    textAlign: "justify",
    lineHeight: "1.7rem",
    color: "#555",
    marginBottom: "1.5rem",
  },
  divider: {
    margin: "2rem 0",
    borderColor: "#e0e0e0",
  },
  whyChooseBox: {
    backgroundColor: "#f8f9fa",
    padding: "2rem",
    borderRadius: "8px",
    marginTop: "2rem",
  },
  whyChooseItem: {
    display: "flex",
    alignItems: "flex-start",
    marginBottom: "1rem",
  },
  bulletIcon: {
    color: "#01437d",
    marginRight: "1rem",
    marginTop: "0.2rem",
  },
  whyChooseText: {
    fontSize: "1rem",
    fontWeight: 400,
    fontFamily: "sans-serif",
    color: "#333",
  },
  supportSection: {
    backgroundColor: "#f0f8ff",
    padding: "2rem",
    borderRadius: "8px",
    marginTop: "2rem",
  },
};

const Services = () => {
  const services = [
    {
      title: "1. Daily & Weekly Car Rentals",
      description:
        "Perfect for visitors, business trips, or short-term needs. Choose from a wide range of sedans, SUVs, and luxury cars — all well-maintained and ready to drive. Enjoy flexible pickup and drop-off options, including at airports and hotels across Dubai and Abu Dhabi.",
    },
    {
      title: "2. Monthly & Long-Term Rentals",
      description:
        "Looking for convenience without the commitment of ownership? Our long-term and monthly rental packages are designed for professionals, families, and businesses who need reliable vehicles for extended periods — with maintenance and support included.",
    },
    {
      title: "3. Corporate & B2B Rentals",
      description:
        "We provide tailored rental solutions for companies and organizations across the UAE. From employee transport to executive cars, our B2B packages include flexible contracts, dedicated account management, and priority service for your business needs.",
    },
    {
      title: "4. Airport Pickup & Drop-off",
      description:
        "Travel stress-free with our 24/7 airport delivery and pickup service. Whether you're arriving at Dubai International Airport (DXB) or Abu Dhabi International Airport (AUH), your car will be ready when you land — clean, fueled, and waiting for you.",
    },
    {
      title: "5. Doorstep Delivery & Collection",
      description:
        "Save time with our doorstep delivery and collection service anywhere in Dubai or Sharjah. Book online or by phone, and our team will deliver your selected car directly to your location — at no extra cost for most areas.",
    },
    {
      title: "6. Luxury Car Rentals",
      description:
        "Make every trip special with our range of premium and luxury vehicles. From high-end sedans to powerful SUVs, we offer top brands that combine comfort, style, and performance — perfect for VIP clients, events, and business occasions.",
    },
    {
      title: "7. Chauffeur & Driver Services (Optional)",
      description:
        "Need a professional driver? We offer chauffeur-driven rentals for clients who prefer a stress-free, comfortable travel experience. Ideal for corporate guests, special occasions, or airport transfers.",
    },
    {
      title: "8. Maintenance & Support",
      description:
        "Our fleet is regularly inspected and serviced to meet the highest safety and comfort standards. In case of emergencies, our 24/7 support team is always ready to assist you anywhere in the UAE.",
    },
  ];

  const whyChooseItems = [
    "Best Prices in the Market",
    "Guaranteed, Well-Maintained Cars",
    "24/7 Customer Support",
    "Flexible Rental Packages",
    "Free Airport & Doorstep Delivery",
    "Serving Dubai, Sharjah & Abu Dhabi",
    "Trusted by Individuals & Corporates Since 2019",
  ];

  return (
    <NavFooter footer={true}>
      <Container maxWidth="lg">
        <Box sx={styles.box}>
          <Typography variant="h1" sx={styles.heading}>
            🚗 Our Services
          </Typography>

          <Typography sx={styles.description}>
            At Injaz Rent a Car, we make car rental simple, affordable, and
            reliable for both individuals and corporate clients. Whether you need
            a vehicle for a day, a week, or a year, our flexible plans and
            professional service ensure you get the best experience at the best
            price.
          </Typography>

          <Divider sx={styles.divider} />

          {services.map((service, index) => (
            <Box key={index}>
              <Typography sx={styles.serviceTitle}>{service.title}</Typography>
              <Typography sx={styles.serviceDescription}>
                {service.description}
              </Typography>
              {index < services.length - 1 && <Divider sx={styles.divider} />}
            </Box>
          ))}

          <Box sx={styles.supportSection}>
            <Typography sx={styles.subHeading}>
              Support for Rent a Car Startups
            </Typography>
            <Typography sx={styles.description}>
              Starting a car rental business in the UAE? Injaz Rent a Car is
              here to help. Since 2019, we've been providing tailored support
              for new and growing rental companies — helping them launch, manage,
              and expand successfully.
            </Typography>
            <Typography sx={styles.description}>
              We offer affordable fleet leasing, assistance with RTA licensing and
              compliance, and expert operational consulting to ensure smooth
              day-to-day management. Our team also helps startups establish a
              strong digital presence, including website development, SEO, and
              Google Ads campaigns.
            </Typography>
            <Typography sx={styles.description}>
              With our B2B connections across Dubai, Sharjah, and Abu Dhabi,
              you'll also gain access to trusted suppliers, corporate clients,
              and booking platforms.
            </Typography>
            <Typography sx={styles.description}>
              At Injaz Rent a Car, we believe in growing together — empowering
              every partner to succeed in the competitive car rental market.
            </Typography>
          </Box>

          <Box sx={styles.whyChooseBox}>
            <Typography sx={styles.subHeading}>
              🌟 Why Choose Injaz Rent a Car?
            </Typography>
            <Grid container spacing={2}>
              {whyChooseItems.map((item, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Box sx={styles.whyChooseItem}>
                    <CheckCircleIcon sx={styles.bulletIcon} />
                    <Typography sx={styles.whyChooseText}>{item}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Container>
    </NavFooter>
  );
};

export default Services;

