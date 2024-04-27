import React, { useEffect, useState } from "react";
import { Header } from "../Header";
import { Container, Image } from "react-bootstrap";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import currentDates from "../../helper/helperFuntions";
import Button from "@mui/material/Button";
import poster from "../../assets/marvel-avengers-comics.webp";

export const TicketBook = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [day, setDay] = useState();

  const handleDayChange = (i) => {
    setDay(i+currentDay)
  };
  
  const currentDate = new Date();
  const currentHour = currentDate.getHours();
  const currentMinutes = currentDate.getMinutes();
  const currentDay = currentDate.getDate();


  useEffect(() => {
    const currentDay = currentDate.getDate();
    setDay(currentDay);
  }, []);

  const tabLabels = currentDates();
 
  return (
    <div>
      <Header />
      <Container className="d-flex flex-column justify-content-center align-items-center my-4">
        <Image
          src={poster}
          style={{ aspectRatio: "16/9", width: "600px" }}
          fluid
        />
        <Box
          sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: "background.paper" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
            aria-label="scrollable force tabs example">
            {tabLabels.map((val, i) => (
              <Tab
                key={i}
                label={val}
                onClick={() => handleDayChange(i )}
              />
            ))}
          </Tabs>
        </Box>
        <div className="d-flex gap-5 mt-4 flex-wrap">
          <Button
            size="large"
            variant="contained"
            disabled={
              (currentHour > 11 && currentDay >=day ) || (currentHour === 11 && currentMinutes >= 0 && currentDay >=day)
            }>
            11:00 AM
          </Button>
          <Button
            size="large"
            variant="contained"
            disabled={
              (currentHour > 14 && currentDay >=day) || (currentHour === 14 && currentMinutes >= 15 && currentDay >=day)
            }>
            02:15 PM
          </Button>
        </div>

        <div className="d-flex gap-5 mt-4 flex-wrap">
          <Button
            size="large"
            variant="contained"
            disabled={
              (currentHour > 18 && currentDay >=day) || (currentHour === 18 && currentMinutes >= 15 && currentDay >=day)
            }>
            06:15 PM
          </Button>
          <Button
            size="large"
            variant="contained"
            disabled={
              (currentHour > 22 && currentDay >=day) || (currentHour === 22 && currentMinutes >= 0 && currentDay >=day)
            }>
            10.00 PM
          </Button>
        </div>
      </Container>
    </div>
  );
};
