import React, { useEffect, useState } from "react";
import { AdminHeader } from "./AdminHeader";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import { Container, Form, Image } from "react-bootstrap";
import { ticketVerificationValidate } from "../../schemas/inputValidation";
import { useFormik } from "formik";
import { Toaster } from "react-hot-toast";
import axios from "axios"; // Import Axios
import { jwtDecode } from "jwt-decode";
import { toast } from "react-hot-toast"; // Import toast from react-hot-toast
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import verify_img from "../../assets/tic.png";
axios.defaults.baseURL = import.meta.env.VITE_SERVER_DOMAIN;

export const UserTicketVerification = () => {
  const [apiData, setApiData] = useState(null);
  const [isvVerify,setIsVerify]=useState(true)
  console.log(isvVerify);
  const token = localStorage.getItem("admintoken");
  const decodeToken = jwtDecode(token);
  const username = decodeToken.username;

  const formik = useFormik({
    initialValues: {
      username: "",
      ticketNum: "",
    },
    validate: async (values) => {
      const validationResults = await ticketVerificationValidate(values);
      if (!validationResults.success) {
        let errors = {};
        validationResults.errors.forEach((error) => {
          let key = error;
          errors[key] = error;
        });
        return errors;
      }
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      
      try {
        const loginPromise = axios.get(`/api/admin/verifyTicket`, {
          params: {
            username: username,
            user: values.username,
            tiketNum: values.ticketNum,
          },
        });

        // Display loading message while the promise is pending
        toast.promise(loginPromise, {
          loading: "Verifying ticket...",
          success: (response) => {
            setApiData(response.data);
            
            return <b>Ticket verified successfully...!</b>;
          },
          error: (error) => {
            console.error("Error:", error);
            setApiData(null)
            setIsVerify(false)
            return <b>Invalidate Ticket...!</b>;
          },
        });
      } catch (error) {
        console.error("Error:", error);
        setApiData(null)
        
        toast.error("An error occurred while processing your request");
      }
    },
  });

  return (
    <div>
      <AdminHeader />
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <Form onSubmit={formik.handleSubmit}>
        <Container className="d-flex justify-content-center flex-wrap gap-3 my-5">
          <TextField
            id="username"
            name="username"
            label="Username"
            variant="outlined"
            onChange={formik.handleChange}
            value={formik.values.username}
          />
          <div className="d-flex">
            <TextField
              sx={{ minWidth: "250px" }}
              name="ticketNum"
              id="ticketnum"
              label="Ticket Number"
              variant="filled"
              onChange={formik.handleChange}
              value={formik.values.ticketNum}
            />
            <Button
              type="submit"
              sx={{ borderBottomLeftRadius: 0, borderTopLeftRadius: 0 }}
              startIcon={<SearchIcon />}
              variant="contained"
            />
          </div>
        </Container>
      </Form>
      {!apiData  ? (
        ""
      ) : (
        <div>
          <div className="d-flex w-100 justify-content-center flex-column align-items-center">
            <Image
              src={verify_img}
              fluid
              style={{ width: "50px" }}
            />
            
          </div>

          <Container className="d-flex justify-content-center align-items-center">
            <Card sx={{ maxWidth: 600 }}>
              <Image
                className="p-3"
                style={{ aspectRatio: "16/9" }}
                src={apiData.data.poster}
                fluid
              />

              <CardContent className="d-flex flex-column">
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div">
                  <b>Ticket Num:</b> {formik.values.ticketNum}
                </Typography>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div">
                  <b>Theater Name:</b> {apiData.data.Theater}
                </Typography>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div">
                  <b>Date:</b> {apiData.data.date}
                </Typography>
                <Typography variant="h6">
                  <b>Time:</b> {apiData.data.time}
                </Typography>
                <Typography variant="h6">
                  <b>Seat Num:</b> {apiData.data.tickets?.join()}
                </Typography>
              </CardContent>
            </Card>
          </Container>
        </div>
      )}
    </div>
  );
};
