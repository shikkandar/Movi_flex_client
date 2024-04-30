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

export const Payment = () => {
  const { moviDetail, selectedSeats, selectedData,setSelectedSeats, setSelectedData } = useContext(UserContext);
  const ticketPrice = selectedSeats.length * moviDetail.price;
  const gst = (ticketPrice / 100) * 8;
  const totalAmount = ticketPrice + gst + 20;
  const params = moviDetail.name.split(" ")[0];
  const bookingDate = moviDetail.date;
  const bookingTime = moviDetail.time;
  const navigate = useNavigate();

  const handleBooking = async () => {
    await UpdateBooking({ params, bookingDate, bookingTime, selectedData });
    setSelectedSeats([])
    setSelectedData({})
    navigate('/tiket_booking/seat_panel');
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

  return (
    <div className="d-flex mt-5 justify-content-center">
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
