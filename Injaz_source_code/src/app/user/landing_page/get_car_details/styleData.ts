import {
  AppBar,
  Box,
  Button,
  styled,
  Tab,
  TextField,
  Typography,
} from "@mui/material";

export const BookingTypo = styled(Typography)(({ theme }) => ({
  textTransform: "capitalize",
  borderRadius: "10px 10px 0px 0px",
  textAlign: "left",
  paddingLeft: "1rem",
  color: "white",
  backgroundColor: "#01437D",
  display:"flex",
  justifyContent: "space-between",
  alignItems: "center"
}));
export const TitleTypo = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: "0.8rem",
  margin: "0px",
}));
export const TitleTypo2 = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: "0.6rem",
  margin: "0px",
}));
export const HightlightTypo = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  fontSize: "1.2rem",
  margin: "0px",
}));
export const BookingTypo1 = styled(Typography)(({ theme }) => ({
  color: "white",
  borderBottom: "2px solid white",
  marginBottom: "1rem",
}));
export const DailyWeeklyTypo1 = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: "1rem",
  margin: "0px",
  color: "#01437D",
}));
export const MonthlyTypo1 = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: "1rem",
  margin: "0px",
  color: "#01437D",
}));
export const MonthlyTypo2 = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: "0.7rem",
  margin: "0px",
  color: "#01437D",
}));
export const InsuranceTypo1 = styled(Typography)(({ theme }) => ({
  color: "white",
  marginTop: "0.5rem",
}));
export const PriceBrakeTypo1 = styled(Typography)(({ theme }) => ({
  color: "white",
  marginTop: "0.5rem",
  borderBottom: "2px solid white",
}));
export const PriceBrakeTypo2 = styled(Typography)(({ theme }) => ({
  color: "white",
}));
export const CarChargeTypo1 = styled(Typography)(({ theme }) => ({
  color: "white",
  marginTop: "0.5rem",
  borderBottom: "2px solid white",
}));
export const DailyWeeklyBox1 = styled(Box)(({ theme }: any) => ({
  borderRadius: "5px",
  textAlign: "center",
  padding: "5px 0px",
}));
export const CarDetailsBoxCss = styled(Box)(({ theme }) => ({
  padding: "1rem",
}));
export const MainBoxBooking = styled(Box)(({ theme }) => ({
  backgroundColor: "#01437D",
  height: "100%",
  borderRadius: "10px",
  padding: "0.4rem 0.8rem",
}));
export const CarDetailscontentBox = styled(Box)(({ theme }) => ({
  border: "1px solid #01437D",
  borderRadius: "5px",
  padding: "5px 10px",
}));
export const CarChargeBox1 = styled(Box)(({ theme }) => ({
  borderBottom: "2px solid white",
  margin: "1rem 0rem",
}));
export const AppBarMainBox = styled(Box)(({ theme }) => ({
  bgcolor: "background.paper",
  width: "100%",
  borderRadius: "10px",
}));
export const HighlightBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  borderBottom: "2px solid #8080803b",
  marginBottom: "1rem",
}));
export const PriceBrakeBox1 = styled(Box)(({ theme }) => ({
  borderBottom: "2px solid white",
  margin: "1rem 0rem",
}));
export const PriceBrakeBox2 = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));
export const FieldsBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));
export const BookButtonBox1 = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "1.5rem 0rem",
}));
export const TabBoxMain = styled(Box)(({ theme }) => ({
  padding: "24px",
}));
export const BookButtonMain = styled(Button)(({ theme }) => ({
  backgroundColor: "white",
  fontWeight: "bold",
  textTransform: "capitalize",
  color: "#01437D",
  "&:hover": {
    backgroundColor: "white", // Change background on hover
    color: "#01437D", // Change text color on hover
  },
}));
export const AppBarMain = styled(AppBar)(({ theme }) => ({
  backgroundColor: "#01437D",
  borderRadius: "10px 10px 0px 0px",
}));
export const AppBarTabs = styled(Tab)(({ theme }) => ({
  fontSize: "1rem",
  textTransform: "capitalize",
}));
export const ReusableTextField = styled(TextField)(({ theme }) => ({
  backgroundColor: "white",
  borderRadius: "5px",
}));
