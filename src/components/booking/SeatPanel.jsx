import React, { useContext, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import { UserContext } from "../../context/ContextProvider";
import Button from "@mui/material/Button";

import { Dialogu } from "../helperComponent/Dialogu";

export const SeatPanel = () => {
  const [seconds, setSeconds] = useState(5); // Start timer at 5 minutes (300 seconds)

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds === 0) {
          clearInterval(interval); // Stop the timer when it reaches 0
          return 0;
        }
        return prevSeconds - 1; // Decrease seconds by 1 every second
      });
    }, 1000);

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };
  const { moviDetail } = useContext(UserContext);
  console.log(moviDetail);

  if (seconds === 0) {
    const route='/dashbord'
    const text="Your booking time has expired.\nPlease try again."
    return <Dialogu route={route} text={text} />;
  }
  return (
    <>
      <AppBar
        position="sticky"
        sx={{ backgroundColor: "#FDB805", color: "#000" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              noWrap
              component="a"
              sx={{
                mr: 2,
                fontFamily: "monospace",
                fontWeight: 700,
                color: "inherit",
                textDecoration: "none",
              }}>
              {`${moviDetail.moviname}[${moviDetail.name}]`}
              <br />
              {`${moviDetail.date}-${moviDetail.month}-${moviDetail.year} ${moviDetail.time}`}
            </Typography>

            <Box
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}></Box>

            <Box
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton sx={{ p: 0 }}>
                  <Button
                    color="secondary"
                    variant="contained">
                    Back
                  </Button>
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <div className="w-100 d-flex justify-content-end">
        <h2 className="mx-2">{formatTime(seconds)}</h2>
      </div>
    </>
  );
};
