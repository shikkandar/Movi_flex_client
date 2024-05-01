import React, { useContext, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { UserContext } from "../../context/ContextProvider";
import { UpdateBooking } from "../../routes/bookingRouts";
import { useNavigate } from "react-router-dom";

import toast, { Toaster } from "react-hot-toast";
import { sendBookingData } from "../../routes/apiRoute";

export const Payment = () => {
  const { moviDetail, selectedSeats, selectedData, setSelectedSeats, setSelectedData, ticketNum } = useContext(UserContext);
  const ticketPrice = selectedSeats.length * moviDetail.price;
  const gst = (ticketPrice / 100) * 8;
  const totalAmount = ticketPrice + gst + 20;
  const params = moviDetail.name ? moviDetail.name.split(" ")[0] : "";
  const bookingDate = moviDetail.date;
  const bookingTime = moviDetail.time;
  const navigate = useNavigate();

  const bookingHistory = {
    "Theater": moviDetail.name,
    "time": moviDetail.time,
    "date": moviDetail.date,
    "poster": moviDetail.poster,
    "tickets": selectedSeats
  };

  const username = "shikkandar";

  const handleBooking = async () => {
    try {
      const bookingPromise = UpdateBooking({ params, bookingDate, bookingTime, selectedData });

      toast.promise(bookingPromise, {
        loading: "Updating booking...",
        success: <b>Booking successfully!</b>,
        error: <b>Ooops Booking failed...!</b>,
      });

      await sendBookingData({ username, ticketNum, bookingHistory });

      setSelectedSeats([]);
      setSelectedData({});

    } catch (error) {
      console.error("Booking error:", error);
      toast.error("An error occurred while updating booking. Please try again.");
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
      const confirmationMessage = "Are you sure you want to leave? Your changes may not be saved.";
      event.returnValue = confirmationMessage; // Standard way of setting a confirmation message
      return confirmationMessage; // For older browsers
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    if (Object.keys(moviDetail).length === 0) {
      navigate('/dashbord');
    }
  }, [moviDetail, navigate]);

  return (
    <div className="d-flex mt-5 justify-content-center">
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <Card sx={{ maxWidth: 600, width: "600px" }}>
        <CardMedia
          sx={{ height: 0, paddingTop: "56.25%" }}
          image={moviDetail.poster}
          title="Movie Poster"
          style={{ width: "100%", height: "auto" }}
        />

        <CardContent className="d-flex flex-column">
          <Typography gutterBottom variant="h5" component="div">
            {`${moviDetail.moviname}[${moviDetail.name}]`}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            <b>Ticket Num:</b> {ticketNum}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            <b>Ticket per price:</b> {moviDetail.price}
          </Typography>
          <Typography variant="h6">
            <b>Date and time:</b>
            {`${moviDetail.date}[${moviDetail.time}]`}
          </Typography>
          <Typography variant="h6">
            <b>Tickets:</b>
            {selectedSeats.join(",")}
          </Typography>
          <Typography className="mt-3 align-self-end" variant="h6" color="text.secondary">
            <b>Ticket Rate:</b>
            {ticketPrice}/-
          </Typography>
          <Typography className="align-self-end" variant="h6" color="text.secondary">
            <b>Platform fee:</b>
            {20}/-
          </Typography>
          <Typography className="align-self-end" variant="h6" color="text.secondary">
            <b>GST (8%):</b>
            {gst}/-
          </Typography>
          <hr />
          <Typography className="align-self-end" variant="h6">
            <b>Total Amount:</b>
            {totalAmount}/-
          </Typography>
          <hr />
        </CardContent>
        <CardActions className="d-flex justify-content-end">
          <Button color="success" variant="contained" onClick={handleBooking} size="small">
            Pay Now
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};
