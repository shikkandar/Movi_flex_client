import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { UserContext } from "../../context/ContextProvider";
export const Payment = () => {
  const { moviDetail, selectedSeats } = useContext(UserContext);
  const ticketPrice = selectedSeats.length * moviDetail.price;
  const gst=ticketPrice/100*8
  const totalAmount=ticketPrice+gst+20
  const handleBooking=()=>{
    
  }
  return (
    <div className="d-flex mt-5 justify-content-center">
      <Card sx={{ maxWidth: 600, width: "600px" }}>
        <CardMedia
          sx={{ height: 0, paddingTop: "56.25%" }} // Maintain aspect ratio (16:9)
          image={moviDetail.poster}
          title="Movi Poster"
          style={{ width: "100%", height: "auto" }} // Make image fluid
        />

        <CardContent className="d-flex flex-column">
          <Typography
            gutterBottom
            variant="h5"
            component="div">
            {`${moviDetail.moviname}[${moviDetail.name}]`}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            component="div">
            <b>Ticket per price:</b> {moviDetail.price}
          </Typography>

          <Typography
            variant="h6">
            <b>Date and time:</b>
            {`${moviDetail.date}[${moviDetail.time}]`}
          </Typography>
          <Typography
            variant="h6">
            <b>Tickets:</b>
            {selectedSeats.join(",")}
          </Typography>
          <Typography
            className="mt-3 align-self-end"
            variant="h6"
            color="text.secondary">
            <b>Ticket Rate:</b>
            {ticketPrice}/-
          </Typography>
          <Typography
            className="align-self-end"
            variant="h6"
            color="text.secondary">
            <b>Platform fee:</b>
            {20}/-
          </Typography>
          <Typography
            className="align-self-end"
            variant="h6"
            color="text.secondary">
            <b>GST</b>(8%):
            {gst}/-
          </Typography>
          <hr />
          <Typography
            className="align-self-end"
            variant="h6">
            <b>Total Amount:</b>
            {totalAmount}/-
          </Typography>
          <hr />
        </CardContent>
        <CardActions className="d-flex justify-content-end">
          <Button
            color="success"
            variant="contained"
            onClick={handleBooking}
            size="small">
            Pay Now
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};
