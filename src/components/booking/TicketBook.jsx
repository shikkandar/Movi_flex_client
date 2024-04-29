import React, { useContext, useEffect, useState } from "react";
import { Header } from "../Header";
import { Container, Image } from "react-bootstrap";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import currentDates from "../../helper/helperFuntions";
import Button from "@mui/material/Button";
import { UserContext } from "../../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import { createSeats } from "../../routes/bookingRouts";

export const TicketBook = () => {
  const navigate = useNavigate();
  const { tabLabels, currentMonth, currentYear } = currentDates();
  const [bookingDay, setBookingDay] = useState(tabLabels[0]);
  const { moviDetail, setMoviDetail } = useContext(UserContext);
  

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [showDay, setShowDay] = useState();

  const handleDayChange = (i, val) => {
    setShowDay(i + currentDay);
    setBookingDay(val);
  };

  const currentDate = new Date();
  const currentHour = currentDate.getHours();
  const currentMinutes = currentDate.getMinutes();
  const currentDay = currentDate.getDate();

  useEffect(() => {
    const currentDay = currentDate.getDate();
    setShowDay(currentDay);
  }, []);

  const handleShow = async (val) => {
    const dates = bookingDay.split(" ");
    const bookingDate = `${dates[0]}-${dates[1]}-${currentYear}`;
    const theaterName = moviDetail.name;
    const moviName = moviDetail.moviname;
    const params = theaterName.split(" ")[0];

    await setMoviDetail({
      ...moviDetail,
      date: bookingDate,
      time: val,
    });
    await createSeats({ bookingDate, theaterName, moviName }, params);
    navigate("/tiket_booking/seat_panel");
  };

  return (
    <div>
      <Header />
      <Container className="d-flex flex-column justify-content-center align-items-center my-4">
        <Image
          src={moviDetail.poster}
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
                onClick={() => handleDayChange(i, val)}
              />
            ))}
          </Tabs>
        </Box>
        <div className="d-flex gap-5 mt-4 flex-wrap">
          <Button
            size="large"
            variant="contained"
            onClick={() => {
              handleShow("11:00-AM");
            }}
            disabled={
              (currentHour > 10 && currentDay >= showDay) ||
              (currentHour === 10 &&
                currentMinutes >= 30 &&
                currentDay >= showDay)
            }>
            11:00 AM
          </Button>
          <Button
            size="large"
            variant="contained"
            onClick={() => {
              handleShow("02:15-PM");
            }}
            disabled={
              (currentHour > 13 && currentDay >= showDay) ||
              (currentHour === 13 &&
                currentMinutes >= 45 &&
                currentDay >= showDay)
            }>
            02:15 PM
          </Button>
        </div>

        <div className="d-flex gap-5 mt-4 flex-wrap">
          <Button
            size="large"
            variant="contained"
            onClick={() => {
              handleShow("06:15-PM");
            }}
            disabled={
              (currentHour > 17 && currentDay >= showDay) ||
              (currentHour === 17 &&
                currentMinutes >= 45 &&
                currentDay >= showDay)
            }>
            06:15 PM
          </Button>
          <Button
            size="large"
            variant="contained"
            onClick={() => {
              handleShow("10:00-PM");
            }}
            disabled={
              (currentHour > 21 && currentDay >= showDay) ||
              (currentHour === 21 &&
                currentMinutes >= 30 &&
                currentDay >= showDay)
            }>
            10.00 PM
          </Button>
        </div>
      </Container>
    </div>
  );
};
