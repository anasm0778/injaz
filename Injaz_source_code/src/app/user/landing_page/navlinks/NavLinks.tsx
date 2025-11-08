"use client";
import { Stack, Button, Menu, MenuItem, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import "../navlinks/navlinks.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import "../top_bar/TopBar.css";
import { serverUrl } from "@/utils/helper";
import LanguageChanger from "@/components/LanguageChanger";
import { useTranslation } from "react-i18next";

interface Props {
  data: any;
}

function Navlinks(props: Props) {
  const { t } = useTranslation();
  const { data } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorElTwo, setAnchorElTwo] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElThree, setAnchorElThree] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElFour, setAnchorElFour] = React.useState<null | HTMLElement>(
    null
  );

  const [drop, setdrop] = useState([]);
  const [catDrop, setCatDrop] = useState([]);
  const [location, setLocation] = useState([]);
  const open = Boolean(anchorEl);
  const openTwo = Boolean(anchorElTwo);
  const openThree = Boolean(anchorElThree);
  const openFour = Boolean(anchorElFour);
  const router = useRouter();

  useEffect(() => {
    axios
      .get(serverUrl + "/user/getAllBrands")
      .then((res) => {
        setdrop(res.data.data);
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
        setLocation(res.data.data);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }, []);
  
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClickTwo = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElTwo(event.currentTarget);
  };
  const handleClickThree = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElThree(event.currentTarget);
  };
  const handleClickFour = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElFour(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseTwo = () => {
    setAnchorElTwo(null);
  };
  const handleCloseThree = () => {
    setAnchorElThree(null);
  };
  const handleCloseFour = () => {
    setAnchorElFour(null);
  };

  const dailyWeeklyButton = [
    {
      label: t("landingPage:navbar.subscription.daily"),
      route: "daily=daily",
      subs: "dailyAndWeekly",
    },
    {
      label: t("landingPage:navbar.subscription.weekly"),
      route: "weekly=weekly",
      subs: "dailyAndWeekly",
    },
    {
      label: t("landingPage:navbar.subscription.monthly"),
      route: "monthly=monthly",
      subs: "monthly",
    },
  ];

  return (
    <>
      <div
        className="Navlink"
        style={{ backgroundColor: "#01437d", padding: "10px 0px" }}
      >
        <Box>
          <Stack spacing={6} direction="row" sx={{ justifyContent: "center" }}>
            <Button
              onClick={handleClick}
              sx={{ color: "white", cursor: "pointer" }}
            >
              {t("landingPage:navbar.location")}
              <ArrowDropDownIcon />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem
                sx={{ textTransform: "capitalize" }}
                value="all"
                onClick={() => {
                  router.push(`/pages/carWithLocation`);
                  handleClose();
                }}
              >
                All
              </MenuItem>
              {location.map((item: any) => (
                <MenuItem
                  sx={{ textTransform: "capitalize" }}
                  key={item._id}
                  value={item.Name}
                  onClick={() => {
                    router.push(
                      `/pages/carWithLocation?locaNametion=${item.Name}`
                    );
                    handleClose();
                  }}
                >
                  {item.Name}
                </MenuItem>
              ))}
            </Menu>
            <Button
              onClick={handleClickTwo}
              variant="text"
              sx={{ color: "white" }}
            >
              {t("landingPage:navbar.brand")}
              <ArrowDropDownIcon />
            </Button>
            <Menu
              anchorEl={anchorElTwo}
              open={openTwo}
              onClose={handleCloseTwo}
            >
              <MenuItem
                sx={{ textTransform: "capitalize" }}
                value="all"
                onClick={() => {
                  router.push(`/pages/carWithLocation`);
                  handleCloseTwo();
                }}
              >
                All
              </MenuItem>
              {drop.length > 0 && // Check if data is not empty
                drop.map((item: any) => (
                  <MenuItem
                    sx={{ textTransform: "capitalize" }}
                    key={item._id}
                    value={item.name}
                    onClick={() => {
                      router.push(`/pages/carWithLocation?brand=${item.name}`);
                      handleCloseTwo();
                    }}
                  >
                    {item.name}
                  </MenuItem>
                ))}
            </Menu>
            <Button
              onClick={handleClickThree}
              variant="text"
              sx={{ color: "white" }}
            >
              {t("landingPage:navbar.category")}
              <ArrowDropDownIcon />
            </Button>
            <Menu
              anchorEl={anchorElThree}
              open={openThree}
              onClose={handleCloseThree}
            >
              <MenuItem
                sx={{ textTransform: "capitalize" }}
                value="all"
                onClick={() => {
                  router.push(`/pages/carWithLocation`);
                  handleCloseThree();
                }}
              >
                All
              </MenuItem>
              {catDrop.length > 0 && // Check if data is not empty
                catDrop.map((item: any) => (
                  <MenuItem
                    sx={{ textTransform: "capitalize" }}
                    key={item._id}
                    value={item.name}
                    onClick={() => {
                      router.push(
                        `/pages/carWithLocation?category=${item.name}`
                      );
                      handleCloseThree();
                    }}
                  >
                    {item.name}
                  </MenuItem>
                ))}
            </Menu>
            <Button
              onClick={handleClickFour}
              variant="text"
              sx={{ color: "white" }}
            >
              {t("landingPage:navbar.subscription.heading")}
              <ArrowDropDownIcon />
            </Button>
            <Menu
              anchorEl={anchorElFour}
              open={openFour}
              onClose={handleCloseFour}
            >
              {dailyWeeklyButton.map((item: any, index) => (
                <MenuItem
                  sx={{ textTransform: "capitalize" }}
                  key={index}
                  value={item.label}
                  onClick={() => {
                    sessionStorage.setItem("subscription", item.subs);
                    router.push(`/pages/carWithLocation?${item.route}`);
                    handleCloseFour();
                  }}
                >
                  {item.label}
                </MenuItem>
              ))}
            </Menu>
            <Box>
              <LanguageChanger />
            </Box>
          </Stack>
        </Box>
      </div>
    </>
  );
}
export default Navlinks;
