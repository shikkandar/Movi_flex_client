import React, { useContext, useEffect, useState } from "react";
import { Button, Container, Form, Image } from "react-bootstrap";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Navigate, useNavigate } from "react-router-dom";
import img from "../assets/L_log.jpg";
import { textFieldStyles } from "../cutomCss/inputField"; // Make sure the path is correct
import { useFormik } from "formik";
import Land_img from "../assets/land.jpg";
import { resetValidate } from "../schemas/inputValidation";
import toast, { Toaster } from "react-hot-toast";
import useFetch from "../hooks/fetch.hooks";
import { resetPassword } from "../routes/apiRoute";
import { UserContext } from "../context/ContextProvider";

export const Reset = () => {
  const [{ isLoading, apiData, status, serverError }] =useFetch("createResetSession");


  const { userdata } = useContext(UserContext);


  const [passShow, setPassShow] = useState(false);
  const [CpassShow, setCPassShow] = useState(false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      password: "",
      confirm_pwd: "",
    },
    validate: async (values) => {
      const validationResults = await resetValidate(values);
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
      await toast.promise(
        resetPassword({ username:userdata, password: values.password,confirm_pwd:values.confirm_pwd }),
        {
          loading: "Updating...",
          success: <b>Reset Successfully...!</b>,
          error: <b>Could not Reset! Please try again</b>,
        }
      );
      localStorage.removeItem('token')
      navigate("/");
}
  });
  if (isLoading) {
    return <h1 className="text-2xl font-bold">isLoding</h1>;
  }
  if (serverError) {
    return <Navigate to={'/'} replace={true}></Navigate>
  }
  if (status && status !==201) {
    <Navigate to={'/'} replace={true}></Navigate>
  }
  return (
    <div className="back">
      <Container
        className="d-flex  justify-content-center align-items-lg-center px-0 vh-100"
        fluid>
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
        <div className="rounded shadow d-flex flex-column flex-lg-row">
          <Image
            src={img}
            style={{ aspectRatio: "9:16", height: "700px" }}
            className="rounded-start d-none d-lg-block"
          />
          <Image
            src={Land_img}
            style={{ aspectRatio: "16:9", width: "450px" }}
            className="d-lg-none rounded-lg-top rounded-none"
            fluid
          />
          <div className="d-flex  justify-content-center align-items-center px-lg-5 px-0">
            <Form onSubmit={formik.handleSubmit}>
              <Box className="d-flex flex-column">
                <h2 className="mt-3 mt-0 text-center text-center">
                  Reset Your Password
                </h2>
                <p className="text-center">Enter new password</p>
                <div
                  className="mt-0"
                  style={{ position: "relative" }}>
                  <TextField
                    id="outlined-basic-password"
                    name="password"
                    label="Password"
                    type={!passShow ? "password" : "text"}
                    variant="outlined"
                    className="text d-flex"
                    value={formik.values.password}
                    onChange={formik.handleChange} // This line was missing
                    sx={textFieldStyles}></TextField>
                  <div
                    style={{ position: "absolute", right: "5px", top: "15%" }}
                    onClick={() => setPassShow(!passShow)}>
                    {!passShow ? (
                      <Button variant="dark">Show</Button>
                    ) : (
                      <Button variant="dark">Hide</Button>
                    )}
                  </div>
                </div>
                <div
                  className="mt-4"
                  style={{ position: "relative" }}>
                  <TextField
                    id="outlined-basic-confirm_pwd"
                    name="confirm_pwd"
                    label="Confirm Password"
                    type={!CpassShow ? "password" : "text"}
                    variant="outlined"
                    className="d-flex"
                    value={formik.values.confirm_pwd}
                    onChange={formik.handleChange} // This line was missing
                    sx={textFieldStyles}></TextField>
                  <div
                    style={{ position: "absolute", right: "5px", top: "15%" }}
                    onClick={() => setCPassShow(!CpassShow)}>
                    {!CpassShow ? (
                      <Button variant="dark">Show</Button>
                    ) : (
                      <Button variant="dark">Hide</Button>
                    )}
                  </div>
                </div>
                <div className="mt-3">
                  <Button
                    type="submit" // This type was missing, important for submitting forms
                    variant="dark"
                    className="p-3"
                    style={{ width: "100%" }}>
                    Recover
                  </Button>
                </div>
              </Box>
            </Form>
          </div>
        </div>
      </Container>
    </div>
  );
};
