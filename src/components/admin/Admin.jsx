import React, { useContext, useState } from "react";
import { Header } from "../Header";
import { Link, useNavigate } from "react-router-dom";
import img from "../../assets/L_log.jpg";
import { textFieldStyles } from "../../cutomCss/inputField"; // Make sure the path is correct
import { useFormik } from "formik";
import Land_img from "../../assets/land.jpg";
import toast, { Toaster } from "react-hot-toast";
import { adminValidate } from "../../schemas/inputValidation";
import { Button, Container, Form, Image } from "react-bootstrap";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { loginAdmin } from "../../routes/adminRoute";
import { UserContext } from "../../context/ContextProvider";
export const Admin = () => {

  const { setAdminName } = useContext(UserContext);


  const [passShow, setPassShow] = useState(false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate: async (values) => {
      const validationResults = await adminValidate(values);
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
      setAdminName(values.username)
      let loginPromise=loginAdmin({
        username:values.username,
        password:values.password
      })
      toast.promise(loginPromise,{
        loading: "Checking...",
        success: <b>Login Successfully...!</b>,
        error: <b>Password not Match...!</b>,
      })
      loginPromise.then((res) => {
        let { token } = res.data;
        localStorage.setItem("admintoken", token);

        navigate("/admin/dash");
      });
    },
  });



  return (
    <div className="back">
      <Header />
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
                <h2 className="mt-3 mt-0 text-center">{`Welcome back Admin`}</h2>
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
                <div className="mt-4" style={{ position: "relative" }}>
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
                  <div style={{ position: "absolute", right: "5px", top: "15%" }} onClick={() => setPassShow(!passShow)}>
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
                
              </Box>
            </Form>
          </div>
        </div>
      </Container>
    </div>
  );
};
