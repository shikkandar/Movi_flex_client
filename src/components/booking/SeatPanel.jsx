import React, { useContext, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import { UserContext } from "../../context/ContextProvider";
import { Dialogu } from "../helperComponent/Dialogu";
import { useNavigate } from "react-router-dom";
import Countdown from "react-countdown";
import { useGetFetch } from "../../hooks/fetch.hooks";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { Image } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import cryptoRandomString from 'crypto-random-string';
const drawerBleeding = 56;

const Root = styled("div")(({ theme }) => ({
  height: "100%",
  backgroundColor:
    theme.palette.mode === "light"
      ? grey[100]
      : theme.palette.background.default,
}));

const StyledBox = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));

const Puller = styled("div")(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

export const SeatPanel = (props) => {
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      // Cancel the event
      event.preventDefault();
      // Chrome requires returnValue to be set
      event.returnValue = "";
      // Prompt the confirmation message
      const confirmationMessage =
        "Are you sure you want to leave? Your changes may not be saved.";
      event.returnValue = confirmationMessage; // For some browsers
      return confirmationMessage;
    };

    // Check if window is defined before adding the event listener
    if (typeof window !== "undefined") {
      window.addEventListener("beforeunload", handleBeforeUnload);
    }

    return () => {
      // Check if window is defined before removing the event listener
      if (typeof window !== "undefined") {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      }
    };
  }, []);


  const nav = useNavigate();

  const {
    moviDetail,
    setSelectedSeats,
    selectedSeats,
    selectedData,
    setSelectedData,
    setTicketNum,
  } = useContext(UserContext);

  const [isTimeUp, setIsTimeUp] = useState(false);
  const [seats, setSeats] = useState({});
  const [countdownTime, setCountdownTime] = useState(
    Date.now() + 5 * 60 * 1000
  ); // Initial countdown time

  const params =
    moviDetail && moviDetail.name ? moviDetail.name.split(" ")[0] : "";
  const bookingDate = moviDetail && moviDetail.date ? moviDetail.date : "";
  const bookingTime = moviDetail && moviDetail.time ? moviDetail.time : "";

  const [{ apiData }] = useGetFetch(params, {
    bookingDate,
    bookingTime,
  });

  if (Object.keys(moviDetail).length === 0) {
    nav("/");
  }

  useEffect(() => {
    if (apiData && apiData.length > 0) {
      setSeats(apiData[0].seats);
    }
  }, [apiData]);

  const handleCountdownComplete = () => {
    setIsTimeUp(true);
  };
  const token=localStorage.getItem('token')
  const decodedToken=jwtDecode(token)
  const username=decodedToken.username
  const userId=decodedToken.userId
  const randomString = cryptoRandomString({ length: 17, type: 'numeric' });

  const handleBooking = (key, val) => {
    // Update the selectedSeats state as before
    if (selectedSeats.includes(key)) {
      // If the seat is already selected and not occupied, deselect it
      if (!val.occupied) {
        setSelectedSeats(selectedSeats.filter((seat) => seat !== key));

        // Remove the seat from selectedData
        const updatedSelectedData = { ...selectedData };
        delete updatedSelectedData[key];
        setSelectedData(updatedSelectedData);
      }
    } else if (selectedSeats.length < 6 && !val.occupied) {
      // If the seat is not selected, the number of selected seats is less than 6, and the seat is not occupied, select it
      setSelectedSeats([...selectedSeats, key]);
      setTicketNum(randomString)
      // Add the seat to selectedData
      setSelectedData({
        ...selectedData,
        [key]: { occupied: true, username, userId ,ticketNum:randomString,poster:moviDetail},
      });
    }
  };
  const confirmBookingBtn = () => {
    nav("/tiket_booking/payment");
  };

  if (!moviDetail) return <></>;
  const { window } = props;
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    if (selectedSeats.length === 0) {
      toast.error("Choose your preferred seating.");
    } else {
      setOpen(newOpen);
    }
  };

  // This is used only for the example
  const container =
    window !== undefined ? () => window().document.body : undefined;

  if (isTimeUp) {
    const route = "/dashbord";
    const text = "Your booking time has expired.\nPlease try again.";
    const headText = "Oops...!";
    return (
      <Dialogu
        route={route}
        text={text}
        headText={headText}
      />
    );
  }

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
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
              {`${moviDetail.date} ${moviDetail.time}`}
            </Typography>

            <Box sx={{ flexGrow: 1 }} />

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <Button
                  color="success"
                  variant="contained"
                  onClick={toggleDrawer(true)}>
                  Book Now
                </Button>
              </Tooltip>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <div className="w-100 px-2 mt-3 d-flex justify-content-end">
        <Countdown
          date={countdownTime} // Set the countdown time
          onComplete={handleCountdownComplete}
          renderer={({ minutes, seconds }) => (
            <Typography variant="h4">
              {minutes.toString().padStart(2, "0")}:
              {seconds.toString().padStart(2, "0")}
            </Typography>
          )}
        />
      </div>
      <div className="d-flex justify-content-center flex-column ">
        <div
          className=" container  border d-flex justify-content-center align-items-center"
          style={{ height: "70px" }}>
          <h4>Screen</h4>
        </div>
        {/* Loop through each group in the seats object */}
        {Object.keys(seats)
          .reverse()
          .map((series, i) => (
            <div
              key={series}
              className={`d-flex w-100 justify-content-center flex-wrap gap-2 mt-${
                i % 7 === 0 && i !== 0 ? 5 : 2
              }`}>
              <Button
                variant="contained"
                color="error"
                size="small">
                {series}
              </Button>
              <div className="d-flex gap-5">
                <div className="d-flex gap-2 flex-wrap justify-content-center">
                  {Object.entries(seats[series])
                    .slice(
                      0,
                      Math.ceil(Object.entries(seats[series]).length / 2)
                    )
                    .map(([seatKey, seatValue], i) => (
                      <Button
                        key={seatKey}
                        variant={
                          selectedSeats.includes(seatKey)
                            ? "outlined"
                            : "contained"
                        }
                        disabled={seatValue.occupied === true}
                        onClick={() => handleBooking(seatKey, seatValue)}
                        size="small">
                        {i + 1}
                      </Button>
                    ))}
                </div>
                <div className="d-flex gap-2 flex-wrap justify-content-center">
                  {Object.entries(seats[series])
                    .slice(Math.ceil(Object.entries(seats[series]).length / 2))
                    .map(([seatKey, seatValue], i) => (
                      <Button
                        key={seatKey}
                        variant={
                          selectedSeats.includes(seatKey)
                            ? "outlined"
                            : "contained"
                        }
                        disabled={seatValue.occupied === true}
                        onClick={() => handleBooking(seatKey, seatValue)}
                        size="small">
                        {i + 11}
                      </Button>
                    ))}
                </div>
              </div>
            </div>
          ))}
        <div
          className="m-4  d-flex justify-content-center"
          style={{ height: "50px" }}></div>
      </div>

      <div className="container w-100 px-2 mt-3 d-flex justify-content-end">
        <Root>
          <CssBaseline />
          <Global
            styles={{
              ".MuiDrawer-root > .MuiPaper-root": {
                height: `calc(50% - ${drawerBleeding}px)`,
                overflow: "visible",
              },
            }}
          />
          <Box></Box>
          <SwipeableDrawer
            container={container}
            anchor="bottom"
            open={open}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
            swipeAreaWidth={drawerBleeding}
            disableSwipeToOpen={false}
            ModalProps={{
              keepMounted: true,
            }}>
            <StyledBox
              sx={{
                position: "absolute",
                top: -drawerBleeding,
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                visibility: "visible",
                right: 0,
                left: 0,
              }}>
              <Puller />
              <div className="d-flex justify-content-between px-3">
                <Typography sx={{ p: 2, color: "text.secondary" }}>
                  {selectedSeats.length} Ticket
                </Typography>
                <Typography sx={{ p: 2, color: "text.secondary" }}>
                  ₹.{selectedSeats.length * parseInt(moviDetail.price)}
                </Typography>
              </div>
            </StyledBox>
            <div className="d-flex justify-content-center">
              <Image
                className="m-2 pop-img"
                src={moviDetail.poster}
                fluid
                rounded
              />
            </div>
            {selectedSeats.length > 0 && (
              <div className="d-flex mt-3 justify-content-center w-100 gap-3">
                {selectedSeats.map((val, i) => (
                  <p key={i}>{val}</p>
                ))}
              </div>
            )}
            <Button
              color="error"
              variant="contained"
              onClick={confirmBookingBtn}
              className=" mx-3 align-self-end justifi-self-end">
              Confirm book
            </Button>
          </SwipeableDrawer>
        </Root>
      </div>
    </>
  );
};
