import React from "react";
import { Button, Container, Form, Image } from "react-bootstrap";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import img from "../assets/L_log.jpg";
import { textFieldStyles } from "../cutomCss/inputField"; // Make sure the path is correct
import { useFormik } from "formik";
import Land_img from "../assets/land.jpg";
import { userValidate } from "../schemas/inputValidation";
import toast, { Toaster } from "react-hot-toast";
import { UserContext } from "../context/ContextProvider";
import { useContext } from "react";


export const UserName = () => {
  const { setUserdata } = useContext(UserContext);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
    },
    validate: async (values) => {
      const validationResults = await userValidate(values);
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
        await setUserdata(values.username); 
        toast.success(<b>Welcome {values.username}</b>);
        navigate("/password"); 
      } catch (error) {
        toast.error(<b>User name does not exist...!</b>);
      }
    },
    
  });

  return (
    <div className="back">
      <Container
        className="d-flex  justify-content-center align-items-sm-center px-0 vh-100"
        fluid>
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
        <div className={`rounded shadow d-flex flex-column flex-lg-row`}> 
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
                <h2 className="mt-3 text-center">Welcome to MovieFlix!</h2>
                <div className="mt-4 ">
                  <TextField
                    id="outlined-basic-username"
                    name="username"
                    label="User Name"
                    variant="outlined"
                    className="text d-flex"
                    value={formik.values.username}
                    onChange={formik.handleChange} 
                    sx={textFieldStyles}
                  />
                </div>
                <div className="mt-3">
                  <Button
                    type="submit" 
                    variant="dark"
                    className="p-3"
                    style={{ width: "100%" }}>
                    Let's go
                  </Button>
                </div>
                <p className="text-center fs-5 mt-2">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    style={{ textDecoration: "none" }}>
                    <span style={{ color: "#FBB903" }}>Register here</span>
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
