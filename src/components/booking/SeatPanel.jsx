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
  console.log(moviDetail);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [seatsA, setSeatsA] = useState([]);
  const [seatsB, setSeatsB] = useState([]);
  const [seatsC, setSeatsC] = useState([]);
  const [seatsD, setSeatsD] = useState([]);
  const [seatsE, setSeatsE] = useState([]);
  const [seatsF, setSeatsF] = useState([]);
  const [seatsG, setSeatsG] = useState([]);
  const [seatsH, setSeatsH] = useState([]);
  const [seatsI, setSeatsI] = useState([]);
  const [seatsJ, setSeatsJ] = useState([]);
  const [seatsK, setSeatsK] = useState([]);
  const [seatsL, setSeatsL] = useState([]);
  const [seatsM, setSeatsM] = useState([]);
  const [seatsN, setSeatsN] = useState([]);
  const [seatsO, setSeatsO] = useState([]);
  const navigate = useNavigate();
  const params = moviDetail.name.split(" ")[0];
  const bookingDate = moviDetail.date;
  const bookingTime = moviDetail.time;

  const [{ apiData }] = useGetFetch(params, {
    bookingDate,
    bookingTime,
  });

  useEffect(() => {
    if (apiData && apiData.length > 0) {
      setSeatsA(apiData[0].seats[0][0].A);
      setSeatsB(apiData[0].seats[0][1].B);
      setSeatsC(apiData[0].seats[0][2].C);
      setSeatsD(apiData[0].seats[0][3].D);
      setSeatsE(apiData[0].seats[0][4].E);
      setSeatsF(apiData[0].seats[0][5].F);
      setSeatsG(apiData[0].seats[0][6].G);
      setSeatsH(apiData[0].seats[0][7].H);
      setSeatsI(apiData[0].seats[0][8].I);
      setSeatsJ(apiData[0].seats[0][9].J);
      setSeatsK(apiData[0].seats[0][10].K);
      setSeatsL(apiData[0].seats[0][11].L);
      setSeatsM(apiData[0].seats[0][12].M);
      setSeatsN(apiData[0].seats[0][13].N);
      setSeatsO(apiData[0].seats[0][14].O);
    }
  }, [apiData]);

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
  const confirmBookingBtn = () => {
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
          date={Date.now() + 5 * 60 * 1000}
          onComplete={handleCountdownComplete}
          renderer={({ minutes, seconds }) => (
            <Typography variant="h4">
              {minutes.toString().padStart(2, "0")}:
              {seconds.toString().padStart(2, "0")}
            </Typography>
          )}
        />
      </div>
      <div className="d-flex flex-wrap gap-2 justify-content-center">
        {Object.entries(seatsA).map(([seatKey, seatValue]) => (
          <Button
            key={seatKey}
            variant={selectedSeats.includes(seatKey) ? "outlined" : "contained"}
            disabled={seatValue.occupied === true}
            onClick={() => handleBooking(seatKey)}>
            {seatKey}
          </Button>
        ))}
      </div>
      <div className="mt-3 d-flex flex-wrap gap-2 justify-content-center">
        {Object.entries(seatsB).map(([seatKey, seatValue]) => (
          <Button
            key={seatKey}
            variant={selectedSeats.includes(seatKey) ? "outlined" : "contained"}
            disabled={seatValue.occupied === true}
            onClick={() => handleBooking(seatKey)}>
            {seatKey}
          </Button>
        ))}
      </div>
      <div className="mt-3 d-flex flex-wrap gap-2 justify-content-center">
        {Object.entries(seatsC).map(([seatKey, seatValue]) => (
          <Button
            key={seatKey}
            variant={selectedSeats.includes(seatKey) ? "outlined" : "contained"}
            disabled={seatValue.occupied === true}
            onClick={() => handleBooking(seatKey)}>
            {seatKey}
          </Button>
        ))}
      </div>
      <div className="mt-3 d-flex flex-wrap gap-2 justify-content-center">
        {Object.entries(seatsD).map(([seatKey, seatValue]) => (
          <Button
            key={seatKey}
            variant={selectedSeats.includes(seatKey) ? "outlined" : "contained"}
            disabled={seatValue.occupied === true}
            onClick={() => handleBooking(seatKey)}>
            {seatKey}
          </Button>
        ))}
      </div>
      <div className="mt-3 d-flex flex-wrap gap-2 justify-content-center">
        {Object.entries(seatsE).map(([seatKey, seatValue]) => (
          <Button
            key={seatKey}
            variant={selectedSeats.includes(seatKey) ? "outlined" : "contained"}
            disabled={seatValue.occupied === true}
            onClick={() => handleBooking(seatKey)}>
            {seatKey}
          </Button>
        ))}
      </div>
      <div className="mt-5 d-flex flex-wrap gap-2 justify-content-center">
        {Object.entries(seatsF).map(([seatKey, seatValue]) => (
          <Button
            key={seatKey}
            variant={selectedSeats.includes(seatKey) ? "outlined" : "contained"}
            disabled={seatValue.occupied === true}
            onClick={() => handleBooking(seatKey)}>
            {seatKey}
          </Button>
        ))}
      </div>

      <div className="mt-3 d-flex flex-wrap gap-2 justify-content-center">
        {Object.entries(seatsG).map(([seatKey, seatValue]) => (
          <Button
            key={seatKey}
            variant={selectedSeats.includes(seatKey) ? "outlined" : "contained"}
            disabled={seatValue.occupied === true}
            onClick={() => handleBooking(seatKey)}>
            {seatKey}
          </Button>
        ))}
      </div>
      <div className="mt-3 d-flex flex-wrap gap-2 justify-content-center">
        {Object.entries(seatsH).map(([seatKey, seatValue]) => (
          <Button
            key={seatKey}
            variant={selectedSeats.includes(seatKey) ? "outlined" : "contained"}
            disabled={seatValue.occupied === true}
            onClick={() => handleBooking(seatKey)}>
            {seatKey}
          </Button>
        ))}
      </div>
      <div className="mt-3 d-flex flex-wrap gap-2 justify-content-center">
        {Object.entries(seatsI).map(([seatKey, seatValue]) => (
          <Button
            key={seatKey}
            variant={selectedSeats.includes(seatKey) ? "outlined" : "contained"}
            disabled={seatValue.occupied === true}
            onClick={() => handleBooking(seatKey)}>
            {seatKey}
          </Button>
        ))}
      </div>
      <div className="mt-3 d-flex flex-wrap gap-2 justify-content-center">
        {Object.entries(seatsJ).map(([seatKey, seatValue]) => (
          <Button
            key={seatKey}
            variant={selectedSeats.includes(seatKey) ? "outlined" : "contained"}
            disabled={seatValue.occupied === true}
            onClick={() => handleBooking(seatKey)}>
            {seatKey}
          </Button>
        ))}
      </div>
      <div className="mt-5 d-flex flex-wrap gap-2 justify-content-center">
        {Object.entries(seatsK).map(([seatKey, seatValue]) => (
          <Button
            key={seatKey}
            variant={selectedSeats.includes(seatKey) ? "outlined" : "contained"}
            disabled={seatValue.occupied === true}
            onClick={() => handleBooking(seatKey)}>
            {seatKey}
          </Button>
        ))}
      </div>
      <div className="mt-3 d-flex flex-wrap gap-2 justify-content-center">
        {Object.entries(seatsL).map(([seatKey, seatValue]) => (
          <Button
            key={seatKey}
            variant={selectedSeats.includes(seatKey) ? "outlined" : "contained"}
            disabled={seatValue.occupied === true}
            onClick={() => handleBooking(seatKey)}>
            {seatKey}
          </Button>
        ))}
      </div>
      <div className="mt-3 d-flex flex-wrap gap-2 justify-content-center">
        {Object.entries(seatsM).map(([seatKey, seatValue]) => (
          <Button
            key={seatKey}
            variant={selectedSeats.includes(seatKey) ? "outlined" : "contained"}
            disabled={seatValue.occupied === true}
            onClick={() => handleBooking(seatKey)}>
            {seatKey}
          </Button>
        ))}
      </div>
      <div className="mt-3 d-flex flex-wrap gap-2 justify-content-center">
        {Object.entries(seatsN).map(([seatKey, seatValue]) => (
          <Button
            key={seatKey}
            variant={selectedSeats.includes(seatKey) ? "outlined" : "contained"}
            disabled={seatValue.occupied === true}
            onClick={() => handleBooking(seatKey)}>
            {seatKey}
          </Button>
        ))}
      </div>
      <div className="mt-3 d-flex flex-wrap gap-2 justify-content-center">
        {Object.entries(seatsO).map(([seatKey, seatValue]) => (
          <Button
            key={seatKey}
            variant={selectedSeats.includes(seatKey) ? "outlined" : "contained"}
            disabled={seatValue.occupied === true}
            onClick={() => handleBooking(seatKey)}>
            {seatKey}
          </Button>
        ))}
      </div>
      <div
        className="m-4 border d-flex justify-content-center"
        style={{ height: "200px" }}>
        <h4 className="mt-3">Screen</h4>
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
                style={{ width: "500px", aspectRatio: "16/9" }}
                src={moviDetail.poster}
                fluid
                rounded
              />
            </div>
            {selectedSeats.length > 0 && (
              <div className="d-flex mt-3 justify-content-center w-100 gap-3">
                {selectedSeats.map((val, i) => (
                  <Button
                    key={i}
                    variant="contained">
                    {val}
                  </Button>
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
