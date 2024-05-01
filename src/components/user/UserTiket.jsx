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
import Paper from "@mui/material/Paper";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

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
                ([ticketNum, booking],i) => (
                  <StyledTableRow key={ticketNum}>
                    <StyledTableCell component="th" scope="row">
                      {i+1}
                    </StyledTableCell>
                    <StyledTableCell>{booking.Theater}</StyledTableCell>
                    <StyledTableCell>{booking.date}</StyledTableCell>
                    <StyledTableCell>{booking.time}</StyledTableCell>
                    <StyledTableCell><Link to={'/dashbord/tickets/view'}>View</Link></StyledTableCell>
                  </StyledTableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
        </Container>
      )}
    </div>
  );
};
