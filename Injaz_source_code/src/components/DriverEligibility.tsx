import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Divider,
  Alert,
  AlertTitle,
} from '@mui/material';
import {
  Person as PersonIcon,
  CreditCard as CreditCardIcon,
  Security as SecurityIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Info as InfoIcon,
} from '@mui/icons-material';

interface DriverEligibilityProps {
  carCategory?: string;
  securityDeposit?: string;
  noSecurityDeposit?: boolean;
  cdwDaily?: string;
  cdwWeekly?: string;
  cdwMonthly?: string;
}

const DriverEligibility: React.FC<DriverEligibilityProps> = ({
  carCategory = "ECONOMY",
  securityDeposit = "1000",
  noSecurityDeposit = false,
  cdwDaily = "25",
  cdwWeekly = "140",
  cdwMonthly = "250",
}) => {
  const getExcessAmount = (category: string) => {
    switch (category.toUpperCase()) {
      case 'ECONOMY':
        return 'D 1,500 + 10% of repair cost';
      case 'SUV':
        return 'D 2,000 + 10% of repair cost';
      case 'LUXURY':
        return 'D 3,000 + 10% of repair cost';
      default:
        return 'D 1,500 + 10% of repair cost';
    }
  };

  return (
    <Box sx={{ marginBottom: "30px" }}>
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: "1.5rem",
          marginBottom: "20px",
          color: "#01437D",
        }}
        variant="h5"
      >
        DRIVER ELIGIBILITY & INSURANCE
      </Typography>

      {/* Driver Requirements */}
      <Card sx={{ marginBottom: "20px", border: "2px solid #01437D" }}>
        <CardContent>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: "1.2rem",
              marginBottom: "15px",
              color: "#01437D",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
            variant="h6"
          >
            <PersonIcon />
            Driver Requirements
          </Typography>
          
          <List>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon sx={{ color: "#28a745" }} />
              </ListItemIcon>
              <ListItemText
                primary="Age Requirements"
                secondary={
                  <Box>
                    <Typography component="span" sx={{ fontWeight: 500 }}>
                      Minimum: 25 years old
                    </Typography>
                    <br />
                    <Typography component="span" sx={{ fontWeight: 500 }}>
                      Maximum: 75 years old (if physically fit)
                    </Typography>
                  </Box>
                }
              />
            </ListItem>
            
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon sx={{ color: "#28a745" }} />
              </ListItemIcon>
              <ListItemText
                primary="Driving License Requirements"
                secondary={
                  <Box>
                    <Typography component="span" sx={{ fontWeight: 500 }}>
                      UAE Residents: UAE Driving License (mandatory)
                    </Typography>
                    <br />
                    <Typography component="span" sx={{ fontWeight: 500 }}>
                      GCC Residents: GCC License accepted
                    </Typography>
                    <br />
                    <Typography component="span" sx={{ fontWeight: 500 }}>
                      Visitors: National licenses from UK, USA, France, Japan, etc.
                    </Typography>
                  </Box>
                }
              />
            </ListItem>
            
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon sx={{ color: "#28a745" }} />
              </ListItemIcon>
              <ListItemText
                primary="Full Insurance Eligibility"
                secondary={
                  <Box>
                    <Typography component="span" sx={{ fontWeight: 500 }}>
                      UAE License: ≥ 1 year old
                    </Typography>
                    <br />
                    <Typography component="span" sx={{ fontWeight: 500 }}>
                      Home Country License: ≥ 3 years old
                    </Typography>
                  </Box>
                }
              />
            </ListItem>
          </List>
        </CardContent>
      </Card>

      {/* Insurance Options */}
      <Card sx={{ marginBottom: "20px", border: "2px solid #e0e0e0" }}>
        <CardContent>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: "1.2rem",
              marginBottom: "15px",
              color: "#01437D",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
            variant="h6"
          >
            <SecurityIcon />
            Insurance Options
          </Typography>
          
          {/* Standard Insurance */}
          <Box sx={{ marginBottom: "20px" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
              <Chip label="STANDARD" color="primary" size="small" />
              <Typography sx={{ fontWeight: 500 }}>Included (No additional cost)</Typography>
            </Box>
            <Typography sx={{ fontSize: "0.9rem", color: "#666", marginLeft: "20px" }}>
              Excess amount: <strong>{getExcessAmount(carCategory)}</strong>
            </Typography>
          </Box>
          
          <Divider sx={{ margin: "15px 0" }} />
          
          {/* Full Insurance (CDW) */}
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
              <Chip label="CDW" color="secondary" size="small" />
              <Typography sx={{ fontWeight: 500 }}>Full Insurance (Collision Damage Waiver)</Typography>
            </Box>
            <Box sx={{ marginLeft: "20px" }}>
              <Typography sx={{ fontSize: "0.9rem", color: "#666", marginBottom: "5px" }}>
                Daily: <strong>D {cdwDaily}</strong>
              </Typography>
              <Typography sx={{ fontSize: "0.9rem", color: "#666", marginBottom: "5px" }}>
                Weekly: <strong>D {cdwWeekly}</strong>
              </Typography>
              <Typography sx={{ fontSize: "0.9rem", color: "#666" }}>
                Monthly: <strong>D {cdwMonthly}</strong>
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Accident Protocol */}
      <Alert severity="warning" sx={{ marginBottom: "20px" }}>
        <AlertTitle sx={{ fontWeight: 600 }}>
          <WarningIcon sx={{ marginRight: "10px" }} />
          Accident Protocol
        </AlertTitle>
        <Typography sx={{ fontWeight: 500, marginBottom: "10px" }}>
          IMPORTANT: Police must be called before moving the vehicle
        </Typography>
        <Typography sx={{ fontSize: "0.9rem", marginBottom: "5px" }}>
          • Obtain police report and repair slip immediately
        </Typography>
        <Typography sx={{ fontSize: "0.9rem", fontWeight: 500, color: "#d32f2f" }}>
          • If not obtained, hirer is responsible for ALL damages
        </Typography>
      </Alert>

      {/* Deposits & Payment */}
      <Card sx={{ border: "2px solid #e0e0e0" }}>
        <CardContent>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: "1.2rem",
              marginBottom: "15px",
              color: "#01437D",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
            variant="h6"
          >
            <CreditCardIcon />
            Deposits & Payment
          </Typography>
          
          <Box sx={{ marginBottom: "15px" }}>
            <Typography sx={{ fontWeight: 500, marginBottom: "5px" }}>
              Security Deposit:
            </Typography>
            {noSecurityDeposit ? (
              <Chip 
                label="No Deposit Required" 
                color="success" 
                sx={{ fontWeight: 600 }}
              />
            ) : (
              <Typography sx={{ fontSize: "0.9rem", color: "#666", marginLeft: "20px" }}>
                Credit Card: <strong>D {securityDeposit}</strong> (Refundable upon return)
              </Typography>
            )}
          </Box>
          
          <Box>
            <Typography sx={{ fontWeight: 500, marginBottom: "5px" }}>
              Payment Methods Accepted:
            </Typography>
            <Box sx={{ display: "flex", gap: "10px", flexWrap: "wrap", marginLeft: "20px" }}>
              <Chip label="Debit Card" size="small" />
              <Chip label="Credit Card" size="small" />
              <Chip label="Online Payment" size="small" color="primary" />
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DriverEligibility;
