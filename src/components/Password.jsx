import React, { useContext, useState } from "react";
import { Button, Container, Form, Image } from "react-bootstrap";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import img from "../assets/L_log.jpg";
import { textFieldStyles } from "../cutomCss/inputField"; // Make sure the path is correct
import { useFormik } from "formik";
import Land_img from "../assets/land.jpg";
import toast, { Toaster } from "react-hot-toast";
import { passwordValidate } from "../schemas/inputValidation";
import { UserContext } from "../context/ContextProvider";
import useFetch from "../hooks/fetch.hooks";
import avatar from "../assets/13369169.jpg";
import { verifyPassword } from "../routes/apiRoute";
import { InfinitySpin } from "react-loader-spinner";

export const Password = () => {
  const { userdata } = useContext(UserContext);

  const [{ isLoading, apiData, serverError }] = useFetch(`user/${userdata}`);
  const [passShow, setPassShow] = useState(false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validate: async (values) => {
      const validationResults = await passwordValidate(values);
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
      let loginPromise = verifyPassword({
        username: apiData.username,
        password: values.password,
      });
      toast.promise(loginPromise, {
        loading: "Checking...",
        success: <b>Login Successfully...!</b>,
        error: <b>Password not Match...!</b>,
      });
      loginPromise.then((res) => {
        let { token } = res.data;
        localStorage.setItem("token", token);

        navigate("/dashbord");
      });
    },
  });

  if (isLoading) {
    return (
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
    );
  }

  if (serverError) {
    return <h1>server error</h1>;
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
                <h2 className="mt-3 mt-0 text-center">{`Welcome back to ${userdata}`}</h2>
                <div className="d-flex justify-content-center ">
                  <label htmlFor="profile">
                    <img
                      src={apiData?.profile || avatar}
                      className="img1"
                      alt="avatar"
                    />
                  </label>
                </div>
                <div
                  className="mt-2"
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
                <div className="mt-3">
                  <Button
                    type="submit" // This type was missing, important for submitting forms
                    variant="dark"
                    className="p-3"
                    style={{ width: "100%" }}>
                    Log In
                  </Button>
                </div>
                <p className="text-center fs-5 mt-2">
                  Forgot Password{" "}
                  <Link
                    to="/recovery"
                    style={{ textDecoration: "none" }}>
                    <span style={{ color: "#FBB903" }}>Recovery Now</span>
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
