import React, { useState } from "react";
import { Header } from "../Header";
import { useContext } from "react";
import { UserContext } from "../../context/ContextProvider";
import useFetch from "../../hooks/fetch.hooks";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const UserTiket = () => {
  const { userdata } = useContext(UserContext);
  const [{ isLoading, apiData, serverError }] = useFetch();
  const [data, setData] = useState("hi");
  const [open, setOpen] = React.useState(false);
  const [key, setKey] = useState("");
  const ticket = apiData?.bookingHistory[key] || ""; // Added safe navigation operator ?. to avoid accessing poster of undefined
console.log(apiData?.bookingHistory);
  const handleClickOpen = (key) => {
    const strKey = key.toString();
    setKey(strKey);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Header />
      {data === "" ? (
        <h1>No data</h1>
      ) : (
        <Container className="mt-5">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>S.No</StyledTableCell>
                  <StyledTableCell>Theater Name</StyledTableCell>
                  <StyledTableCell>Show Data</StyledTableCell>
                  <StyledTableCell>Show Time</StyledTableCell>
                  <StyledTableCell>View Ticket</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(apiData?.bookingHistory || {}).map(
                  ([ticketNum, booking], i) => (
                    <StyledTableRow key={ticketNum}>
                      <StyledTableCell
                        component="th"
                        scope="row">
                        {i + 1}
                      </StyledTableCell>
                      <StyledTableCell>{booking.Theater}</StyledTableCell>
                      <StyledTableCell>{booking.date}</StyledTableCell>
                      <StyledTableCell>{booking.time}</StyledTableCell>
                      <StyledTableCell>
                        <Link onClick={() => handleClickOpen(ticketNum)}>View</Link>
                      </StyledTableCell>
                    </StyledTableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <React.Fragment>
            <Dialog
              open={open}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClose}
              aria-describedby="alert-dialog-slide-description">
              <DialogTitle>{"Ticket Details"}</DialogTitle>
              <Card sx={{ maxWidth: 600, width: "600px" }}>
                <CardMedia
                  sx={{ height: 0, paddingTop: "56.25%" }}
                  image={ticket?.poster}
                  title="Movie Poster"
                  style={{ width: "100%", height: "auto" }}
                />

                <CardContent className="d-flex flex-column">
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div">
                    {}
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div">
                    <b>Ticket Num:</b> {key}
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div">
                    <b>Date:</b> {ticket?.date}
                  </Typography>
                  <Typography variant="h6">
                    <b>Time:</b> {ticket?.time}
                  </Typography>
                  <Typography variant="h6">
                    <b>Seat Num:</b> {ticket?.tickets?.join()}
                  </Typography>
                </CardContent>
              </Card>
              <DialogActions>
                <Button onClick={handleClose}>okay</Button>
              </DialogActions>
            </Dialog>
          </React.Fragment>
        </Container>
      )}
    </div>
  );
};
