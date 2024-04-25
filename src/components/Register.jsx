import React, { useState } from "react";
import { Button, Container, Form, Image } from "react-bootstrap";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import img from "../assets/L_log.jpg";
import { textFieldStyles } from "../cutomCss/inputField"; // Make sure the path is correct
import { useFormik } from "formik";
import Land_img from "../assets/land.jpg";
import { registerValidate } from "../schemas/inputValidation";
import toast, { Toaster } from "react-hot-toast";
import { registerUser } from "../routes/apiRoute";
import avatar from "../assets/13369169.jpg";
import convertToBase64 from "../helper/convert";

export const Register = () => {
  const [file, setFile] = useState();
  const [passShow, setPassShow] = useState(false);
  const [CpassShow, setCPassShow] = useState(false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirm_pwd: "",
    },
    validate: async (values) => {
      const validationResults = await registerValidate(values);
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
      const completeValues = { ...values, profile: file || "" };

      toast.promise(registerUser(completeValues), {
        loading: "Registering...",
        success: (data) => {
          toast.success(data.msg || "Registered successfully!");
          navigate("/");
          return "Registration successful!";
        },
        error: (err) => {
          const errorMessage = err.toString().replace("Error: ", "");
          // Return the error message directly without displaying it again
          return errorMessage;
        },
      });
    },
  });
  const onUpload = async (e) => {
    if (e.target.files[0]) {
      const base64 = await convertToBase64(e.target.files[0]);
      setFile(base64);
    }
  };
  return (
    <div className="back">
      <Container
        className="d-flex  justify-content-center  align-items-sm-center  px-0 vh-100"
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
                <h2 className="mt-3 text-center">Happy to joining us...</h2>
                <div className="d-flex justify-content-center ">
                  <label htmlFor="profile">
                    <div className="img-con">
                      <img
                        src={file || avatar}
                        className="img"
                        alt="avatar"
                      />
                      <div className="upload">
                        <h6>Upload</h6>
                      </div>
                    </div>
                  </label>
                  <input
                    onChange={onUpload}
                    type="file"
                    id="profile"
                    name="profile"
                    style={{ display: "none" }}
                  />
                </div>
                <div className="mt-2">
                  <TextField
                    id="outlined-basic-username"
                    name="username"
                    label="User Name"
                    variant="outlined"
                    className="text d-flex"
                    value={formik.values.username}
                    onChange={formik.handleChange} // This line was missing
                    sx={textFieldStyles}
                  />
                </div>
                <div className="mt-4">
                  <TextField
                    id="outlined-basic-email"
                    name="email"
                    label="Email"
                    variant="outlined"
                    className="d-flex"
                    value={formik.values.email}
                    onChange={formik.handleChange} // This line was missing
                    sx={textFieldStyles}
                  />
                </div>
                <div
                  className="mt-4"
                  style={{ position: "relative" }}>
                  <TextField
                    id="outlined-basic-password"
                    name="password"
                    label="Password"
                    type={!passShow ? "password" : "text"}
                    variant="outlined"
                    className="d-flex"
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
                    onChange={formik.handleChange}
                    sx={textFieldStyles}
                  />

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
                    Sign Up
                  </Button>
                </div>
                <p className="text-center fs-5 mt-2">
                  Already have an account?{" "}
                  <Link
                    to="/"
                    style={{ textDecoration: "none" }}>
                    <span style={{ color: "#FBB903" }}>Sign in</span>
                  </Link>
                </p>
              </Box>
            </Form>
          </div>
        </div>
      </Container>
    </div>
  );
};
