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
  const nav = useNavigate();

  const { moviDetail, setSelectedSeats, selectedSeats } =
    useContext(UserContext);

  const [isTimeUp, setIsTimeUp] = useState(false);
  const [seats, setSeats] = useState({});
  console.log(seats);
  const params = moviDetail.name.split(" ")[0];
  const bookingDate = moviDetail.date;
  const bookingTime = moviDetail.time;

  const [{ apiData }] = useGetFetch(params, {
    bookingDate,
    bookingTime,
  });

  useEffect(() => {
    if (apiData && apiData.length > 0) {
      setSeats(apiData[0].seats);
    }
  }, [apiData]);
  console.log(seats);
  const handleCountdownComplete = () => {
    setIsTimeUp(true);
  };

  const handleBooking = (key) => {
    if (selectedSeats.includes(key)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== key));
    } else if (selectedSeats.length < 6) {
      setSelectedSeats([...selectedSeats, key]);
    }
  };

  const confirmBookingBtn = () => {
    console.log(selectedSeats);
    nav("/tiket_booking/payment");
  };

  if (!moviDetail) return <></>;
  const { window } = props;
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
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
                  color="warning"
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
          date={Date.now() + 60 * 60 * 1000}
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
          <h4 >Screen</h4>
        </div>
        {/* Loop through each group in the seats object */}
        {Object.keys(seats).reverse().map((series, i) => (
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
                  .slice(0, Math.ceil(Object.entries(seats[series]).length / 2))
                  .map(([seatKey, seatValue], i) => (
                    <Button
                      key={seatKey}
                      variant={
                        selectedSeats.includes(seatKey)
                          ? "outlined"
                          : "contained"
                      }
                      disabled={seatValue.occupied === true}
                      onClick={() => handleBooking(seatKey)}
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
                      onClick={() => handleBooking(seatKey)}
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
                className="m-2"
                style={{ width: "300px", aspectRatio: "16/9" }}
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
