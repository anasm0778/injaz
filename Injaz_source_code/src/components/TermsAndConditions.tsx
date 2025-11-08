import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert,
  AlertTitle,
  Divider,
} from '@mui/material';
import {
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Info as InfoIcon,
  Security as SecurityIcon,
  CreditCard as CreditCardIcon,
} from '@mui/icons-material';

interface TermsAndConditionsProps {
  carCategory?: string;
  securityDeposit?: string;
  noSecurityDeposit?: boolean;
  cdwDaily?: string;
  cdwWeekly?: string;
  cdwMonthly?: string;
  onAccept?: (accepted: boolean) => void;
  showCheckbox?: boolean;
}

const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({
  carCategory = "ECONOMY",
  securityDeposit = "1000",
  noSecurityDeposit = false,
  cdwDaily = "25",
  cdwWeekly = "140",
  cdwMonthly = "250",
  onAccept,
  showCheckbox = true,
}) => {
  const [accepted, setAccepted] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

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

  const handleAccept = (value: boolean) => {
    setAccepted(value);
    if (onAccept) {
      onAccept(value);
    }
  };

  const TermsContent = () => (
    <Box>
      {/* Driver Eligibility */}
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
            <CheckCircleIcon />
            Driver Eligibility Requirements
          </Typography>
          
          <List dense>
            <ListItem>
              <ListItemText
                primary="Age Requirements"
                secondary="Minimum 25 years old, Maximum 75 years old (if physically fit)"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Driving License"
                secondary="UAE License (residents), GCC License (GCC residents), National License (visitors from approved countries)"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Full Insurance Eligibility"
                secondary="UAE License: ≥1 year old, Home Country License: ≥3 years old"
              />
            </ListItem>
          </List>
        </CardContent>
      </Card>

      {/* Insurance Terms */}
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
            Insurance Terms & Conditions
          </Typography>
          
          <Box sx={{ marginBottom: "15px" }}>
            <Typography sx={{ fontWeight: 500, marginBottom: "5px" }}>
              Standard Insurance (Included):
            </Typography>
            <Typography sx={{ fontSize: "0.9rem", color: "#666", marginLeft: "20px" }}>
              Excess amount: <strong>{getExcessAmount(carCategory)}</strong>
            </Typography>
          </Box>
          
          <Divider sx={{ margin: "10px 0" }} />
          
          <Box>
            <Typography sx={{ fontWeight: 500, marginBottom: "5px" }}>
              Full Insurance (CDW) - Optional:
            </Typography>
            <Typography sx={{ fontSize: "0.9rem", color: "#666", marginLeft: "20px" }}>
              Daily: D {cdwDaily} | Weekly: D {cdwWeekly} | Monthly: D {cdwMonthly}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Accident Protocol */}
      <Alert severity="error" sx={{ marginBottom: "20px" }}>
        <AlertTitle sx={{ fontWeight: 600 }}>
          <WarningIcon sx={{ marginRight: "10px" }} />
          CRITICAL: Accident Protocol
        </AlertTitle>
        <Typography sx={{ fontWeight: 500, marginBottom: "10px" }}>
          MANDATORY: Police must be called before moving the vehicle
        </Typography>
        <Typography sx={{ fontSize: "0.9rem", marginBottom: "5px" }}>
          • Obtain police report and repair slip immediately
        </Typography>
        <Typography sx={{ fontSize: "0.9rem", fontWeight: 500, color: "#d32f2f" }}>
          • If not obtained, hirer is responsible for ALL damages
        </Typography>
      </Alert>

      {/* Payment Terms */}
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
            <CreditCardIcon />
            Payment Terms
          </Typography>
          
          <Box sx={{ marginBottom: "15px" }}>
            <Typography sx={{ fontWeight: 500, marginBottom: "5px" }}>
              Security Deposit:
            </Typography>
            {noSecurityDeposit ? (
              <Typography sx={{ fontSize: "0.9rem", color: "#28a745", fontWeight: 600, marginLeft: "20px" }}>
                No Deposit Required
              </Typography>
            ) : (
              <Typography sx={{ fontSize: "0.9rem", color: "#666", marginLeft: "20px" }}>
                Credit Card: D {securityDeposit} (Refundable upon return)
              </Typography>
            )}
          </Box>
          
          <Box>
            <Typography sx={{ fontWeight: 500, marginBottom: "5px" }}>
              Payment Methods:
            </Typography>
            <Typography sx={{ fontSize: "0.9rem", color: "#666", marginLeft: "20px" }}>
              Debit Card, Credit Card, Online Payment
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* General Terms */}
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
            <InfoIcon />
            General Terms & Conditions
          </Typography>
          
          <List dense>
            <ListItem>
              <ListItemText
                primary="Vehicle Condition"
                secondary="Vehicle must be returned in the same condition as received"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Fuel Policy"
                secondary="Return vehicle with same fuel level as received"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Late Return"
                secondary="Additional charges apply for late returns beyond agreed time"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Prohibited Use"
                secondary="No smoking, no pets, no off-road driving, no commercial use"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Cancellation Policy"
                secondary="Free cancellation up to 24 hours before pickup"
              />
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </Box>
  );

  if (showCheckbox) {
    return (
      <Box>
        <FormControlLabel
          control={
            <Checkbox
              checked={accepted}
              onChange={(e) => handleAccept(e.target.checked)}
              color="primary"
            />
          }
          label={
            <Typography sx={{ fontSize: "0.9rem" }}>
              I have read and agree to the{' '}
              <Button
                variant="text"
                size="small"
                onClick={() => setOpenDialog(true)}
                sx={{ textTransform: "none", padding: 0, minWidth: "auto" }}
              >
                Terms & Conditions
              </Button>
            </Typography>
          }
        />
        
        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>Terms & Conditions</DialogTitle>
          <DialogContent>
            <TermsContent />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Close</Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  }

  return <TermsContent />;
};

export default TermsAndConditions;
