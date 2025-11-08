"use client";
import * as React from "react";
import SwipeableViews from "react-swipeable-views";
import {
  AppBar,
  Box,
  Container,
  Grid,
  Tab,
  Tabs,
  useTheme,
} from "@mui/material";
import { becomeMember, redeem, upgradeMembership } from "./data";
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
        <Box sx={{ p: 3 }}>
          <Box>{children}</Box>
        </Box>
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

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <>
      <section className="tabSecMem">
        <Container maxWidth="lg">
          <Box sx={{ bgcolor: "background.paper", width: "100%" }}>
            <AppBar
              position="static"
              sx={{
                backgroundColor: "#01437d",
                borderRadius: "10px",
                paddingLeft: "5px",
                paddingRight: "5px",
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="secondary"
                textColor="inherit"
                variant="fullWidth"
                aria-label="full width tabs example"
              >
                <Tab
                  sx={{ fontSize: "1.2rem" }}
                  label="HOW TO BECOME A MEMBER"
                  {...a11yProps(0)}
                />
                <Tab
                  sx={{ fontSize: "1.2rem" }}
                  label="EARN & REDEEM MILES"
                  {...a11yProps(1)}
                />
                <Tab
                  sx={{ fontSize: "1.2rem" }}
                  label="UPGRADING INJAZ MEMBERSHIP"
                  {...a11yProps(2)}
                />
              </Tabs>
            </AppBar>
            <SwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={value}
              onChangeIndex={handleChangeIndex}
            >
              <TabPanel value={value} index={0} dir={theme.direction}>
                <Grid container spacing={4}>
                  {becomeMember.map((item, index) => (
                    <Grid key={index} item xs={12} sm={6} md={6} lg={6}>
                      <div className="firstTab">
                        <h4>{item.head}</h4>
                        <p>{item.para}</p>
                      </div>
                    </Grid>
                  ))}
                </Grid>
              </TabPanel>
              <TabPanel value={value} index={1} dir={theme.direction}>
                <Grid container spacing={4}>
                  {redeem.map((item, index) => (
                    <Grid key={index} item xs={12} sm={6} md={6} lg={6}>
                      <div className="secondTab">
                        <h4>{item.head}</h4>
                        {item.para && <p>{item.para}</p>}
                        {item.list && (
                          <ul>
                            {item.list.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        )}
                        {item.tablerow && (
                          <table>
                            {item.tablerow.map((item, index) => (
                              <tr key={index}>
                                <td>{item.text1}</td>
                                <td>{item.text2}</td>
                              </tr>
                            ))}
                          </table>
                        )}
                      </div>
                    </Grid>
                  ))}
                </Grid>
              </TabPanel>
              <TabPanel value={value} index={2} dir={theme.direction}>
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <div className="secondTab">
                      <h4>{upgradeMembership.head}</h4>
                      <p>{upgradeMembership.para1}</p>
                      <p>{upgradeMembership.para2}</p>
                      <p>{upgradeMembership.para3}</p>
                      <ul>
                        {upgradeMembership.list.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </Grid>
                </Grid>
              </TabPanel>
            </SwipeableViews>
          </Box>
        </Container>
      </section>
    </>
  );
}
