import React, { useState } from "react";
import { Header } from "../Header";
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
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { Container, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { InfinitySpin } from "react-loader-spinner";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";

const Transition = React.forwardRef(function Transition(props, ref) {
  return (
    <Slide
      direction="up"
      ref={ref}
      {...props}
    />
  );
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
  const navigate = useNavigate();
  const [{ isLoading, apiData, serverError }] = useFetch();
  console.log(apiData);
  const [open, setOpen] = React.useState(false);
  const [key, setKey] = useState("");
  const ticket =
    apiData && apiData.bookingHistory ? apiData.bookingHistory[key] || "" : "";

  const handleClickOpen = (key) => {
    const strKey = key.toString();
    setKey(strKey);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const homeNav = () => {
    navigate("/dashbord");
  };


  if (apiData === undefined) {
    return (
      <div>
        <Header/>
          <div className="vh-100 w-100 d-flex justify-content-center align-items-center">
            <InfinitySpin
              visible={true}
              height={100}
              width={100}
              color="#000"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
            />
          </div>
    
      </div>
    );
  } 
  if (apiData !== undefined && "bookingHistory" in apiData) {
    return (
      <>
        <Header />
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
                      <StyledTableCell component="th" scope="row">
                        {i + 1}
                      </StyledTableCell>
                      <StyledTableCell>{booking.Theater}</StyledTableCell>
                      <StyledTableCell>{booking.date}</StyledTableCell>
                      <StyledTableCell>{booking.time}</StyledTableCell>
                      <StyledTableCell>
                        <Link onClick={() => handleClickOpen(ticketNum)}>
                          View
                        </Link>
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
              aria-describedby="alert-dialog-slide-description"
            >
              <div>
                <DialogTitle>{"Ticket Details"}</DialogTitle>
                <Button
                  onClick={handleClose}
                  style={{ position: "absolute", top: "0px", right: "0px" }}
                  variant="text"
                  color="error"
                  size="large"
                >
                  X
                </Button>
              </div>
              <Card sx={{ maxWidth: 600 }}>
                <Image
                  className="p-3"
                  style={{ aspectRatio: "16/9" }}
                  src={ticket?.poster}
                  fluid
                />
  
                <CardContent className="d-flex flex-column">
                  <Typography gutterBottom variant="h6" component="div">
                    <b>username:</b> {apiData.username}
                  </Typography>
                  <Typography gutterBottom variant="h6" component="div">
                    <b>Ticket Num:</b> {key}
                  </Typography>
                  <Typography gutterBottom variant="h6" component="div">
                    <b>Theater Name:</b> {ticket?.Theater}
                  </Typography>
                  <Typography gutterBottom variant="h6" component="div">
                    <b>Date:</b> {ticket?.date}
                  </Typography>
                  <Typography variant="h6">
                    <b>Time:</b> {ticket?.time}
                  </Typography>
                  <Typography variant="h6">
                    <b>Seat Num:</b> {ticket?.tickets?.join()}
                  </Typography>
                </CardContent>
                <DialogActions></DialogActions>
              </Card>
            </Dialog>
          </React.Fragment>
        </Container>
      </>
    );
  }else {
    return (
      <>
        <Header />
        <Container className="mt-5">
          <h5 className="text-center">
            Sorry, no booking history found in your account. Please return to
            the homepage.
          </h5>
          <div className="d-flex justify-content-center">
            <Button
              variant="contained"
              onClick={homeNav}
              sx={{
                backgroundColor: "#000",
                "&:hover": {
                  backgroundColor: "#333",
                },
              }}
              startIcon={<HomeRoundedIcon />}>
              Home
            </Button>
          </div>
        </Container>
      </>
    );
  }
  
};
