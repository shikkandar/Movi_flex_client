import React, { useContext, useEffect, useState } from "react";
import { Button, Container, Form, Image } from "react-bootstrap";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from 'react-router-dom';
import img from "../assets/L_log.jpg";
import { textFieldStyles } from '../cutomCss/inputField';  // Make sure the path is correct
import { useFormik } from "formik";
import Land_img from "../assets/land.jpg";
import { recoveryValidate } from "../schemas/inputValidation";
import toast, { Toaster } from "react-hot-toast";
import { UserContext } from "../context/ContextProvider";
import { generateOTP, verifyOTP } from "../routes/apiRoute";

export const Recovery = () => {
  const navigate = useNavigate();
  const { userdata } = useContext(UserContext);


  useEffect(()=>{
    generateOTP(userdata).then((OTP)=>{
      console.log(OTP);
    })
  },[userdata])
  const formik = useFormik({
    initialValues: {
      otp: ""
    },
    validate:async (values) => {
      const validationResults = await recoveryValidate(values);
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
    onSubmit: async(values) => {
      try {
        await verifyOTP(userdata,values.otp)
        toast.success("OTP verified successfully...!")
        navigate('/reset');
      } catch (error) {
        toast.error("Wrong OTP! check your email")
      }
    }
  });

  function resendOtp() {
    let sendPromiss=generateOTP(userdata);

    toast.promise(sendPromiss,{
      loading:"Sending...!",
      success:<b>OTP has been sended to your email</b>,
      error:<b>Could not Send it!</b>
    })
    sendPromiss.then(OTP=>{
      console.log(OTP);
    })
  }
  return (
    <div className="back">
      <Container className="d-flex  justify-content-center align-items-lg-center px-0 vh-100" fluid>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
        <div className="rounded shadow d-flex flex-column flex-lg-row" >
          <Image
            src={img}
            style={{ aspectRatio: "9:16", height: "700px" }}
            className="rounded-start d-none d-lg-block"

          />
          <Image src={Land_img} style={{aspectRatio:"16:9",width:"450px"}} className="d-lg-none rounded-lg-top rounded-none" fluid/ >
          <div className="d-flex  justify-content-center align-items-center px-lg-5 px-0" >
            <Form onSubmit={formik.handleSubmit}>
              <Box className="d-flex flex-column">
              <h2 className="mt-3 mt-0 text-center">Password Recovery</h2>
                <p className="text-center">Enter OTP to recover password</p>
                <div className="mt-0 ">
                <TextField
                    id="outlined-basic-otp"
                    name="otp"
                    label="Enter Your OTP"
                    variant="outlined"
                    className="text d-flex"
                    value={formik.values.username}
                    onChange={formik.handleChange}  // This line was missing
                    sx={textFieldStyles}
                  />
                </div>
                <div className="mt-3">
                  <Button
                    type="submit"  // This type was missing, important for submitting forms
                    variant="dark"
                    className="p-3"
                    style={{ width: "100%" }}
                    
                  >
                    Recover
                  </Button>
                </div>
                <p className="text-center fs-5 mt-2">
                  Can't get OTP? {" "}
                  
                    <span onClick={resendOtp}  style={{ color: "#FBB903" }}>Resend</span>

                </p>
              </Box>
            </Form>
          </div>
        </div>
      </Container>
    </div>
  );
};

