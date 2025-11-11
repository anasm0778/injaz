import React from "react";
import {
  Box,
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import NavFooter from "@/utils/Na_Fo";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import { box1, box2, box3, box4, box5, box6, box7, box8 } from "./data";

const NewFaq = () => {
  return (
    <Box>
      <NavFooter footer={true}>
        <Container maxWidth="md">
          <Box sx={{ margin: "1rem 0rem" }}>
            {box1.map((item, index) => (
              <Box sx={{ marginBottom: "1rem" }} key={index}>
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{
                    textAlign: "center",
                    fontWeight: "600",
                    color: "#01437d",
                  }}
                >
                  {item.head}
                </Typography>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{ textAlign: "justify", fontSize: "16px" }}
                >
                  {item.subHead}
                </Typography>
              </Box>
            ))}
            {box2.map((item, index) => (
              <Box sx={{ marginBottom: "1rem" }} key={index}>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{
                    textAlign: "left",
                    fontWeight: "600",
                    fontSize: "16px",
                    color: "#01437d",
                  }}
                >
                  {item.head}
                </Typography>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{ textAlign: "justify", fontSize: "16px" }}
                >
                  {item.subHead}
                </Typography>
                <List>
                  {item.list.map((item, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={
                          <>
                            <RadioButtonCheckedIcon
                              sx={{ fontSize: "10px", marginRight: "10px" }}
                            />
                            {item}
                          </>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{ textAlign: "justify", fontSize: "16px" }}
                >
                  {item.subHead2}
                </Typography>
              </Box>
            ))}
            {box3.map((item, index) => (
              <Box sx={{ marginBottom: "1rem" }} key={index}>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{
                    textAlign: "left",
                    fontWeight: "600",
                    fontSize: "16px",
                    color: "#01437d",
                  }}
                >
                  {item.head}
                </Typography>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{ textAlign: "justify", fontSize: "16px" }}
                >
                  {item.subHead}
                </Typography>
              </Box>
            ))}
            {box4.map((item, index) => (
              <Box sx={{ marginBottom: "1rem" }} key={index}>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{
                    textAlign: "left",
                    fontWeight: "600",
                    fontSize: "16px",
                    color: "#01437d",
                  }}
                >
                  {item.head}
                </Typography>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{ textAlign: "justify", fontSize: "16px" }}
                >
                  {item.subHead}
                </Typography>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{ textAlign: "justify", fontSize: "16px" }}
                >
                  {item.listOneHead}
                </Typography>
                <List>
                  {item.listOne.map((item, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={
                          <>
                            <RadioButtonCheckedIcon
                              sx={{ fontSize: "10px", marginRight: "10px" }}
                            />
                            {item}
                          </>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{ textAlign: "justify", fontSize: "16px" }}
                >
                  {item.listTwoHead}
                </Typography>
                <List>
                  {item.listTwo.map((item, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={
                          <>
                            <RadioButtonCheckedIcon
                              sx={{ fontSize: "10px", marginRight: "10px" }}
                            />
                            {item}
                          </>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{ textAlign: "justify", fontSize: "16px" }}
                >
                  {item.subHeadTwo}
                </Typography>
              </Box>
            ))}
            {box5.map((item, index) => (
              <Box sx={{ marginBottom: "1rem" }} key={index}>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{
                    textAlign: "left",
                    fontWeight: "600",
                    fontSize: "16px",
                    color: "#01437d",
                  }}
                >
                  {item.head}
                </Typography>
                <List>
                  {item.list.map((item, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={
                          <>
                            <RadioButtonCheckedIcon
                              sx={{ fontSize: "10px", marginRight: "10px" }}
                            />
                            {item.s1}{" "}
                            <Box component="span" sx={{ fontWeight: "bold" }}>
                              {item.s2}
                            </Box>{" "}
                            {item.s3}
                          </>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            ))}
            {box6.map((item, index) => (
              <Box sx={{ marginBottom: "1rem" }} key={index}>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{
                    textAlign: "left",
                    fontWeight: "600",
                    fontSize: "16px",
                    color: "#01437d",
                  }}
                >
                  {item.head}
                </Typography>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{ textAlign: "justify", fontSize: "16px" }}
                >
                  {item.subHead}
                </Typography>
              </Box>
            ))}
            {box7.map((item, index) => (
              <Box sx={{ marginBottom: "1rem" }} key={index}>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{
                    textAlign: "left",
                    fontWeight: "600",
                    fontSize: "16px",
                    color: "#01437d",
                  }}
                >
                  {item.head}
                </Typography>
                <List>
                  {item.list.map((item, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={
                          <>
                            <RadioButtonCheckedIcon
                              sx={{ fontSize: "10px", marginRight: "10px" }}
                            />
                            {item.s1}{" "}
                            <Box component="span" sx={{ fontWeight: "bold" }}>
                              {" "}
                              {item.s2}
                            </Box>{" "}
                            {item.s3}
                          </>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            ))}
            {box8.map((item, index) => (
              <Box sx={{ marginBottom: "1rem" }} key={index}>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{
                    textAlign: "left",
                    fontWeight: "600",
                    fontSize: "16px",
                    color: "#01437d",
                  }}
                >
                  {item.head}
                </Typography>
                {item.points.map((item, index) => (
                  <Box key={index}>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      sx={{ textAlign: "justify", fontSize: "16px" }}
                    >
                      {item.head}
                    </Typography>
                    <List>
                      {item.list.map((item, index) => (
                        <ListItem key={index}>
                          <ListItemText
                            primary={
                              <>
                                <RadioButtonCheckedIcon
                                  sx={{ fontSize: "10px", marginRight: "10px" }}
                                />
                                {item}
                              </>
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                ))}
              </Box>
            ))}
            <Box sx={{ marginBottom: "1rem" }}>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{
                  textAlign: "left",
                  fontWeight: "600",
                  fontSize: "16px",
                  color: "#01437d",
                }}
              >
                Replacement Vehicle:
              </Typography>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ textAlign: "justify", fontSize: "16px" }}
              >
                If necessary, INJAZ Car Rental will provide a replacement
                vehicle for the duration of the rental agreement.
              </Typography>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ textAlign: "justify", fontSize: "16px" }}
              >
                For any further assistance, reach out to us via our{" "}
                <Box component="span" sx={{ fontWeight: "bold" }}>
                  24-hour toll-free numbers:
                </Box>
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary={
                      <>
                        <RadioButtonCheckedIcon
                          sx={{ fontSize: "10px", marginRight: "10px" }}
                        />
                        <Box component="span" sx={{ fontWeight: "bold" }}>
                          +971-50-996-0498
                        </Box>
                      </>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={
                      <>
                        <RadioButtonCheckedIcon
                          sx={{ fontSize: "10px", marginRight: "10px" }}
                        />
                        <Box component="span" sx={{ fontWeight: "bold" }}>
                          +971-50-237-8558
                        </Box>
                      </>
                    }
                  />
                </ListItem>
              </List>
            </Box>
            <Box sx={{ marginBottom: "1rem" }}>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{
                  textAlign: "left",
                  fontWeight: "600",
                  fontSize: "16px",
                  color: "#01437d",
                }}
              >
                What type of license do I need to rent a car in Musaffah or rent
                a car Abu Dhabi?
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary={<>1. UAE Residents: UAE Driver’s License.</>}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={
                      <>
                        2. Visitors (on visit/transit visa) from GCC Countries:
                        A valid GCC Driver’s License.
                      </>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={
                      <>
                        3. Visitors/Tourists from countries outside the GCC (on
                        visit/transit): a Valid International Driver’s License.
                      </>
                    }
                  />
                </ListItem>
              </List>
            </Box>
            <Box sx={{ marginBottom: "1rem" }}>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{
                  textAlign: "left",
                  fontWeight: "600",
                  fontSize: "16px",
                  color: "#01437d",
                }}
              >
                1. Is it possible to tow another vehicle using my rental car?
              </Typography>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ textAlign: "justify", fontSize: "16px" }}
              >
                No, towing is strictly prohibited and is a violation of the
                rental agreement. It is not permitted under any circumstances.
              </Typography>
            </Box>
            <Box sx={{ marginBottom: "1rem" }}>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{
                  textAlign: "left",
                  fontWeight: "600",
                  fontSize: "16px",
                  color: "#01437d",
                }}
              >
                2. Can anyone other than me drive the rented vehicle?
              </Typography>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ textAlign: "justify", fontSize: "16px" }}
              >
                Yes, an additional driver is allowed for a minimal fee.
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary={
                      <>
                        <RadioButtonCheckedIcon
                          sx={{ fontSize: "10px", marginRight: "10px" }}
                        />
                        The additional driver must provide their
                        <Box component="span" sx={{ fontWeight: "bold" }}>
                          {" "}
                          passport
                        </Box>{" "}
                        and
                        <Box component="span" sx={{ fontWeight: "bold" }}>
                          {" "}
                          driving license
                        </Box>{" "}
                        during the rental process.
                      </>
                    }
                  />
                </ListItem>{" "}
              </List>
            </Box>
            <Box sx={{ marginBottom: "1rem" }}>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{
                  textAlign: "left",
                  fontWeight: "600",
                  fontSize: "16px",
                  color: "#01437d",
                }}
              >
                3. How can I locate the nearest INJAZ Car Rental location?
              </Typography>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ textAlign: "justify", fontSize: "16px" }}
              >
                INJAZ Car Rental operates in Musaffah{" "}
                <Box component="span" sx={{ fontWeight: "bold" }}>
                  Abu Dhabi operated in Musaffah
                </Box>{" "}
                For assistance with bookings or inquiries, please contact our{" "}
                <Box component="span" sx={{ fontWeight: "bold" }}>
                  reservation office
                </Box>{" "}
                or send mail to info@injazrent.ae
              </Typography>
            </Box>
            <Box sx={{ marginBottom: "1rem" }}>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{
                  textAlign: "left",
                  fontWeight: "600",
                  fontSize: "16px",
                  color: "#01437d",
                }}
              >
                What happens if I return the car late?
              </Typography>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ textAlign: "justify", fontSize: "16px" }}
              >
                If the rented vehicle, such as a Toyota Yaris, is returned later
                than the date specified in the rental agreement, the renter will
                be liable for{" "}
                <Box component="span" sx={{ fontWeight: "bold" }}>
                  late return charges.
                </Box>{" "}
                The fee depends on the type of vehicle rented.
              </Typography>
            </Box>
            <Box sx={{ marginBottom: "1rem" }}>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{
                  textAlign: "left",
                  fontWeight: "600",
                  fontSize: "16px",
                  color: "#01437d",
                }}
              >
                Late Return Fees:
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary={
                      <>
                        <RadioButtonCheckedIcon
                          sx={{ fontSize: "10px", marginRight: "10px" }}
                        />
                        Less than 1 hour late: No additional charges in most
                        cases.
                      </>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={
                      <>
                        <RadioButtonCheckedIcon
                          sx={{ fontSize: "10px", marginRight: "10px" }}
                        />
                        Between 1 hour and 3 hours late: You may be charged for
                        the additional time.
                      </>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={
                      <>
                        <RadioButtonCheckedIcon
                          sx={{ fontSize: "10px", marginRight: "10px" }}
                        />
                        More than 3 hours late: An additional day&apos;s rental
                        fee will apply.
                      </>
                    }
                  />
                </ListItem>
              </List>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{
                  textAlign: "left",
                  fontWeight: "600",
                  fontSize: "16px",
                  color: "#01437d",
                }}
              >
                Informing INJAZ Car Rental in Advance:
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary={
                      <>
                        <RadioButtonCheckedIcon
                          sx={{ fontSize: "10px", marginRight: "10px" }}
                        />
                        If you notify us beforehand about the late return, you
                        will only be charged for the extra day(s) that the
                        vehicle was used.
                      </>
                    }
                  />
                </ListItem>
              </List>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ textAlign: "justify", fontSize: "16px" }}
              >
                To avoid late charges, we recommend returning the vehicle on
                time or communicating any delays as soon as possible.
              </Typography>
            </Box>
            <Box sx={{ marginBottom: "1rem" }}>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{
                  textAlign: "left",
                  fontWeight: "600",
                  fontSize: "16px",
                  color: "#01437d",
                }}
              >
                Can I drive the vehicle out for off-road driving?
              </Typography>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ textAlign: "justify", fontSize: "16px" }}
              >
                No, all vehicles at INJAZ Car Rental, including 4-wheel drive
                vehicles, are intended for use on regularly maintained roads
                only.
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary={
                      <>
                        <RadioButtonCheckedIcon
                          sx={{ fontSize: "10px", marginRight: "10px" }}
                        />
                        Off-road driving is strictly prohibited and considered a
                        violation of the rental agreement.
                      </>
                    }
                  />
                </ListItem>
              </List>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ textAlign: "justify", fontSize: "16px" }}
              >
                Any customer with a valid UAE Driving License that is at least
                one year old is eligible to purchase Collision Damage Waiver
                (CDW).
              </Typography>
            </Box>
            <Box sx={{ marginBottom: "1rem" }}>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{
                  textAlign: "left",
                  fontWeight: "600",
                  fontSize: "16px",
                  color: "#01437d",
                }}
              >
                Will my personal data be shared with other companies?
              </Typography>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ textAlign: "justify", fontSize: "16px" }}
              >
                No, we will not share your personal data with any third parties,
                unless you have provided explicit consent. The only exceptions
                are sharing with our affiliates and licensees for marketing
                purposes, as per your consent.
              </Typography>
            </Box>
            <Box sx={{ marginBottom: "1rem" }}>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{
                  textAlign: "left",
                  fontWeight: "600",
                  fontSize: "16px",
                  color: "#01437d",
                }}
              >
                Is it possible to rent a car with a baby seat?
              </Typography>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ textAlign: "justify", fontSize: "16px" }}
              >
                Yes, INJAZ Rent A Car offers baby seats based on your baby's
                age. The following charges apply:
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary={
                      <>
                        <RadioButtonCheckedIcon
                          sx={{ fontSize: "10px", marginRight: "10px" }}
                        />
                        Daily: D 20
                      </>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={
                      <>
                        <RadioButtonCheckedIcon
                          sx={{ fontSize: "10px", marginRight: "10px" }}
                        />
                        Weekly: D 120
                      </>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={
                      <>
                        <RadioButtonCheckedIcon
                          sx={{ fontSize: "10px", marginRight: "10px" }}
                        />
                        Monthly: D 150
                      </>
                    }
                  />
                </ListItem>
              </List>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ textAlign: "justify", fontSize: "16px" }}
              >
                5%VAT will be added to the above charges.
              </Typography>
            </Box>
            <Box sx={{ marginBottom: "1rem" }}>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{
                  textAlign: "left",
                  fontWeight: "600",
                  fontSize: "16px",
                  color: "#01437d",
                }}
              >
                Do you charge extra for airport drop-off and pickup?
              </Typography>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ textAlign: "justify", fontSize: "16px" }}
              >
                INJAZ Rent A Car does not have an office at Abu Dhabi or Dubai
                Airports. However, customers can arrange for car delivery and
                pickup from the airport by following these steps:
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary={
                      <>
                        <RadioButtonCheckedIcon
                          sx={{ fontSize: "10px", marginRight: "10px" }}
                        />
                        Book the car at least 5 days in advance.
                      </>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={
                      <>
                        <RadioButtonCheckedIcon
                          sx={{ fontSize: "10px", marginRight: "10px" }}
                        />
                        Delivery to the airport will be scheduled based on the
                        customer&apos;s arrival date and time.
                      </>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={
                      <>
                        <RadioButtonCheckedIcon
                          sx={{ fontSize: "10px", marginRight: "10px" }}
                        />
                        Car pickup from the airport is also available at the
                        scheduled time.
                      </>
                    }
                  />
                </ListItem>
              </List>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ textAlign: "justify", fontSize: "16px" }}
              >
                Additional charges:
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary={
                      <>
                        <RadioButtonCheckedIcon
                          sx={{ fontSize: "10px", marginRight: "10px" }}
                        />
                        Delivery to the airport: D 105
                      </>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={
                      <>
                        <RadioButtonCheckedIcon
                          sx={{ fontSize: "10px", marginRight: "10px" }}
                        />
                        Pickup from the airport: D 105
                      </>
                    }
                  />
                </ListItem>
              </List>
            </Box>
            <Box sx={{ marginBottom: "1rem" }}>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{
                  textAlign: "left",
                  fontWeight: "600",
                  fontSize: "16px",
                  color: "#01437d",
                }}
              >
                Can I drop-off the vehicle at a different location?
              </Typography>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ textAlign: "justify", fontSize: "16px" }}
              >
                If you decided to drop off the vehicle at a location other than
                what was initially agreed, then you might be required to pay a
                minimal fee against it. Kindly get in touch with your local
                INJAZ Rent A Car Reservation Office for more details.
              </Typography>
            </Box>
            <Box sx={{ marginBottom: "1rem" }}>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{
                  textAlign: "left",
                  fontWeight: "600",
                  fontSize: "16px",
                  color: "#01437d",
                }}
              >
                Do you provide delivery and collection services?
              </Typography>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ textAlign: "justify", fontSize: "16px" }}
              >
                Subject to availability, we do provide our delivery and pick-up
                of the vehicles in our car rental service to any location within
                the country.
              </Typography>
            </Box>
            <Box sx={{ marginBottom: "1rem" }}>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{
                  textAlign: "left",
                  fontWeight: "600",
                  fontSize: "16px",
                  color: "#01437d",
                }}
              >
                What is Salik & Darb Tolls?
              </Typography>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ textAlign: "justify", fontSize: "16px" }}
              >
                Salik and Darb are electronic toll systems used in the United
                Arab Emirates, specifically in Dubai and Abu Dhabi,
                respectively. They both utilize RFID (Radio Frequency
                Identification) technology to automatically charge vehicles as
                they pass through toll gates on designated roads.
              </Typography>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ textAlign: "justify", fontSize: "16px" }}
              >
                Salik (Dubai):
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary={
                      <>
                        <RadioButtonCheckedIcon
                          sx={{ fontSize: "10px", marginRight: "10px" }}
                        />
                        What it is: Salik is Dubai&apos;s toll system that uses
                        RFID technology. Vehicles are required to have a Salik
                        tag, which is an RFID sticker placed on the windshield.
                      </>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={
                      <>
                        <RadioButtonCheckedIcon
                          sx={{ fontSize: "10px", marginRight: "10px" }}
                        />
                        How it works: When a vehicle passes through a Salik toll
                        gate, the system automatically detects the tag and
                        deducts the toll fee from the linked account or wallet.
                        The current toll rate is 5 D per crossing and rush
                        hours is 7 D per crossing.
                      </>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={
                      <>
                        <RadioButtonCheckedIcon
                          sx={{ fontSize: "10px", marginRight: "10px" }}
                        />
                        Locations: Salik is used on major roads in Dubai, such
                        as Sheikh Zayed Road, Al Garhoud Bridge, and the Al
                        Maktoum Bridge.
                      </>
                    }
                  />
                </ListItem>
              </List>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ textAlign: "justify", fontSize: "16px" }}
              >
                Darb (Abu Dhabi):
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary={
                      <>
                        <RadioButtonCheckedIcon
                          sx={{ fontSize: "10px", marginRight: "10px" }}
                        />
                        What it is: Darb is the electronic toll system used in
                        Abu Dhabi, which also relies on RFID technology.
                      </>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={
                      <>
                        <RadioButtonCheckedIcon
                          sx={{ fontSize: "10px", marginRight: "10px" }}
                        />
                        How it works: Like Salik, vehicles in Abu Dhabi are
                        equipped with a Darb tag, which is linked to a Darb
                        wallet for payment. The toll system charges 5 D every
                        time a vehicle crosses a toll point.
                      </>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={
                      <>
                        <RadioButtonCheckedIcon
                          sx={{ fontSize: "10px", marginRight: "10px" }}
                        />
                        Locations: Darb toll gates are located on key roads in
                        Abu Dhabi, including areas around Sheikh Khalifa Street
                        and the city&apos;s main highways.
                      </>
                    }
                  />
                </ListItem>
              </List>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ textAlign: "justify", fontSize: "16px" }}
              >
                How Payment Works:
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary={
                      <>
                        <RadioButtonCheckedIcon
                          sx={{ fontSize: "10px", marginRight: "10px" }}
                        />
                        Vehicles must have a valid Salik tag (for Dubai) and a
                        Darb Wallet (for Abu Dhabi).
                      </>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={
                      <>
                        <RadioButtonCheckedIcon
                          sx={{ fontSize: "10px", marginRight: "10px" }}
                        />
                        The system automatically detects the tag when the
                        vehicle passes through the toll gate.
                      </>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={
                      <>
                        <RadioButtonCheckedIcon
                          sx={{ fontSize: "10px", marginRight: "10px" }}
                        />
                        A toll fee of 5 or 7 D is deducted for each crossing.
                      </>
                    }
                  />
                </ListItem>
              </List>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ textAlign: "justify", fontSize: "16px" }}
              >
                By implementing such systems, both cities have been able to
                improve their road usage efficiency while offering a more
                convenient and modern experience for commuters.
              </Typography>
            </Box>
            <Box sx={{ marginBottom: "1rem" }}>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{
                  textAlign: "left",
                  fontWeight: "600",
                  fontSize: "16px",
                  color: "#01437d",
                }}
              >
                What is the fuel policy for the rental cars in Abu Dhabu Dubai?
              </Typography>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ textAlign: "justify", fontSize: "16px" }}
              >
                INJAZ Car Rental&apos;s Fuel Policy ensures that customers
                return the rental vehicle with the same fuel level as when it
                was provided to them. Here&apos;s a detailed explanation of the
                policy:
              </Typography>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ textAlign: "justify", fontSize: "16px" }}
              >
                1. Return Fuel Level:
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary={
                      <>
                        <RadioButtonCheckedIcon
                          sx={{ fontSize: "10px", marginRight: "10px" }}
                        />
                        When you receive the rented vehicle, it will have a
                        specific fuel level (e.g., full tank or a certain level
                        of fuel).
                      </>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={
                      <>
                        <RadioButtonCheckedIcon
                          sx={{ fontSize: "10px", marginRight: "10px" }}
                        />
                        Upon returning the vehicle, you are expected to return
                        it with the same fuel level as it was when you initially
                        received it.
                      </>
                    }
                  />
                </ListItem>
              </List>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ textAlign: "justify", fontSize: "16px" }}
              >
                2. Charges for Low Fuel:
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary={
                      <>
                        <RadioButtonCheckedIcon
                          sx={{ fontSize: "10px", marginRight: "10px" }}
                        />
                        If the fuel level is considerably lower than when the
                        vehicle was handed to you, INJAZ Car Rental will charge
                        you to refill the fuel.
                      </>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={
                      <>
                        <RadioButtonCheckedIcon
                          sx={{ fontSize: "10px", marginRight: "10px" }}
                        />
                        Additionally, there will be service charges applied for
                        the refueling process.
                      </>
                    }
                  />
                </ListItem>
              </List>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ textAlign: "justify", fontSize: "16px" }}
              >
                This policy is common among car rental companies to ensure that
                vehicles are returned with enough fuel for the next customer and
                to avoid discrepancies or misunderstandings regarding fuel
                levels. It also helps maintain a fair rental experience for all
                customers.
              </Typography>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ textAlign: "justify", fontSize: "16px" }}
              >
                To avoid extra charges, it&apos;s important to refuel the car or
                van before returning it to the rental agency.
              </Typography>
            </Box>
            <Box sx={{ marginBottom: "1rem" }}>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{
                  textAlign: "left",
                  fontWeight: "600",
                  fontSize: "16px",
                  color: "#01437d",
                }}
              >
                What kinds of insurance INJAZ Rent A Car Provide?
              </Typography>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ textAlign: "justify", fontSize: "16px" }}
              >
                INJAZ Rent A Car provides several types of insurance coverage
                for their rental vehicles. These options are designed to offer
                various levels of protection and cater to different needs of
                renters. Below are the key types of insurance INJAZ Rent A Car
                typically provides:
              </Typography>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ textAlign: "justify", fontSize: "16px" }}
              >
                1. Comprehensive Insurance:
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary={
                      <>
                        <RadioButtonCheckedIcon
                          sx={{ fontSize: "10px", marginRight: "10px" }}
                        />
                        What it covers: Comprehensive insurance is the standard
                        coverage offered by INJAZ Rent A Car. It covers damages
                        to the rental vehicle caused by accidents, both
                        non-fault and fault accidents.
                      </>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={
                      <>
                        <RadioButtonCheckedIcon
                          sx={{ fontSize: "10px", marginRight: "10px" }}
                        />
                        Non-Fault Accidents: The tenant is not required to pay
                        the excess insurance amount if they are not at fault and
                        provide a police report.
                      </>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={
                      <>
                        <RadioButtonCheckedIcon
                          sx={{ fontSize: "10px", marginRight: "10px" }}
                        />
                        Fault Accidents: If the tenant is at fault, they will be
                        required to pay an excess insurance amount, which is
                        determined by the rental terms and the police report.
                      </>
                    }
                  />
                </ListItem>
              </List>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ textAlign: "justify", fontSize: "16px" }}
              >
                2. Full Insurance Coverage (Zero Excess):
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary={
                      <>
                        <RadioButtonCheckedIcon
                          sx={{ fontSize: "10px", marginRight: "10px" }}
                        />
                        What it covers: Full insurance coverage waives the
                        excess insurance for both faulty and non-faulty
                        accidents, meaning the tenant does not have to pay any
                        excess fees in the event of an accident, regardless of
                        fault.
                      </>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={
                      <>
                        <RadioButtonCheckedIcon
                          sx={{ fontSize: "10px", marginRight: "10px" }}
                        />
                        Benefits: No excess charges for both types of accidents
                        (faulty and non-faulty). Comprehensive protection, which
                        provides greater peace of mind during the rental period.
                      </>
                    }
                  />
                </ListItem>
              </List>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ textAlign: "justify", fontSize: "16px" }}
              >
                3. Third-Party Liability Insurance:
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary={
                      <>
                        <RadioButtonCheckedIcon
                          sx={{ fontSize: "10px", marginRight: "10px" }}
                        />
                        What it covers: This insurance is typically included in
                        the rental cost and covers any damages or injuries
                        caused to third parties (people or property) in the
                        event of an accident where the renter is at fault.
                      </>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={
                      <>
                        <RadioButtonCheckedIcon
                          sx={{ fontSize: "10px", marginRight: "10px" }}
                        />
                        Scope: It does not cover the damage to the rented
                        vehicle itself, but it protects the renter from
                        financial liability for damages caused to others.
                      </>
                    }
                  />
                </ListItem>
              </List>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ textAlign: "justify", fontSize: "16px" }}
              >
                4. Theft Protection Insurance:
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary={
                      <>
                        <RadioButtonCheckedIcon
                          sx={{ fontSize: "10px", marginRight: "10px" }}
                        />
                        What it covers: This type of insurance protects the
                        renter in case the rented vehicle is stolen.
                      </>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={
                      <>
                        <RadioButtonCheckedIcon
                          sx={{ fontSize: "10px", marginRight: "10px" }}
                        />
                        Details: If the vehicle is stolen during the rental
                        period, this insurance will help cover the cost of the
                        vehicle, subject to the policy&apos;s terms and
                        conditions. Usually, theft protection insurance comes
                        with a deductible or excess amount.
                      </>
                    }
                  />
                </ListItem>
              </List>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ textAlign: "justify", fontSize: "16px" }}
              >
                5. Collision Damage Waiver (CDW):
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary={
                      <>
                        <RadioButtonCheckedIcon
                          sx={{ fontSize: "10px", marginRight: "10px" }}
                        />
                        What it covers: The Collision Damage Waiver reduces the
                        financial responsibility of the renter for any damages
                        caused to the rental vehicle in the event of a
                        collision.
                      </>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={
                      <>
                        <RadioButtonCheckedIcon
                          sx={{ fontSize: "10px", marginRight: "10px" }}
                        />
                        Details: While it reduces the excess, the renter may
                        still need to pay a portion of the repair costs
                        depending on the terms of the insurance.
                      </>
                    }
                  />
                </ListItem>
              </List>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ textAlign: "justify", fontSize: "16px" }}
              >
                6. Personal Accident Insurance (PAI):
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary={
                      <>
                        <RadioButtonCheckedIcon
                          sx={{ fontSize: "10px", marginRight: "10px" }}
                        />
                        What it covers: PAI covers medical expenses for injuries
                        sustained by the driver or passengers in the event of an
                        accident.
                      </>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={
                      <>
                        <RadioButtonCheckedIcon
                          sx={{ fontSize: "10px", marginRight: "10px" }}
                        />
                        Details: This insurance helps cover emergency medical
                        costs, hospitalization, and sometimes even death
                        benefits, depending on the rental agreement.
                      </>
                    }
                  />
                </ListItem>
              </List>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ textAlign: "justify", fontSize: "16px" }}
              >
                Key Points:
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary={
                      <>
                        <RadioButtonCheckedIcon
                          sx={{ fontSize: "10px", marginRight: "10px" }}
                        />
                        Comprehensive Insurance is standard, covering accidents,
                        both at fault and not at fault, but with excess payments
                        for at-fault accidents.
                      </>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={
                      <>
                        <RadioButtonCheckedIcon
                          sx={{ fontSize: "10px", marginRight: "10px" }}
                        />
                        Full Insurance Coverage (Zero Excess) is an upgrade,
                        removing excess charges for both fault and non-fault
                        accidents.
                      </>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={
                      <>
                        <RadioButtonCheckedIcon
                          sx={{ fontSize: "10px", marginRight: "10px" }}
                        />
                        Third-Party Liability, Theft Protection, Collision
                        Damage Waiver, and Personal Accident Insurance provide
                        additional layers of protection and can be added to the
                        rental for more comprehensive coverage.
                      </>
                    }
                  />
                </ListItem>
              </List>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ textAlign: "justify", fontSize: "16px" }}
              >
                Renters can choose the level of insurance they feel is
                appropriate based on their needs and comfort with risk.
              </Typography>
            </Box>
          </Box>
        </Container>
      </NavFooter>
    </Box>
  );
};

export default NewFaq;
