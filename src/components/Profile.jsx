import React, { useEffect, useState } from "react";
import { Header } from "./Header";
import { Button, Image } from "react-bootstrap";
import avatar from "../assets/13369169.jpg";
import convertToBase64 from "../helper/convert";
import TextField from "@mui/material/TextField";
import { Container, Form } from "react-bootstrap";
import { textFieldStyles } from "../cutomCss/inputField";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useFormik } from "formik";
import { DatePicker } from "@mui/x-date-pickers";
import { profileValidate } from "../schemas/inputValidation";
import { Toaster } from "react-hot-toast";
import useFetch from "../hooks/fetch.hooks";
import { jwtDecode } from "jwt-decode";

export const Profile = () => {
  const [{ isLoading, apiData, serverError }] = useFetch();
  const [edit, setEdit] = useState(false);
  const [file, setFile] = useState();

  function enableEdit() {
    setEdit(!edit);
  }
  const onUpload = async (e) => {
    if (e.target.files[0]) {
      const base64 = await convertToBase64(e.target.files[0]);
      setFile(base64);
    }
  };

  useEffect(() => {
    if (apiData) {
      // Update the formik initial values when apiData is available
      formik.setValues({
        firstname: apiData.firstName || "",
        lastname: apiData.lastName || "",
        email: apiData.email || "",
        phone: apiData.mobile || "",
        address:
          apiData.addresses.length > 0
            ? apiData.addresses[0].address || ""
            : "",
        city:
          apiData.addresses.length > 0 ? apiData.addresses[0].city || "" : "",
        state:
          apiData.addresses.length > 0 ? apiData.addresses[0].state || "" : "",
        country:
          apiData.addresses.length > 0
            ? apiData.addresses[0].country || ""
            : "",
        zipcode:
          apiData.addresses.length > 0
            ? apiData.addresses[0].zipcode || ""
            : "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiData]);

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      gender: "",
      dob: null,
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      country: "",
      zipcode: "",
    },
    validate: async (values) => {
      const validationResults = await profileValidate(values);
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
    onSubmit: (values) => {
      console.log(values);
      enableEdit();
    },
  });

  if (isLoading) {
    return <h1 className="text-2xl font-bold">isLoding</h1>;
  }
  if (serverError) {
    return <h1 className="text-xl text-red-500">{serverError.message}</h1>;
  }
  return (
    <div>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <Header />

      <div className="bg-dark">
        <div
          className="d-flex container img-con2"
          style={{ height: "200px" }}>
          <div className="d-flex flex-column">
            {!edit ? (
              <Image
                className="img2"
                src={apiData?.profile || avatar}
                fluid
              />
            ) : (
              <div className="d-flex justify-content-center">
                <label htmlFor="profile">
                  <div>
                    <Image
                      fluid
                      src={file || apiData?.profile || avatar}
                      className="img2"
                      alt="avatar"
                    />
                    <div className="upload1">
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
            )}

            {!edit ? (
              <Button
                className="mt-2"
                onClick={enableEdit}
                variant="outline-dark">
                Edit profile
              </Button>
            ) : (
              <Button
                className="mt-2"
                onClick={enableEdit}
                variant="outline-danger">
                Cancel Edit
              </Button>
            )}
          </div>
          <div className="mx-3 mt-lg-5 mt-4">
            <h1 className="text-white">{apiData?.username}</h1>
            <h3 className="text-dark">{apiData?.city || "location"}</h3>
          </div>
        </div>
      </div>
      <Container>
        <Form
          className="profile-form"
          onSubmit={formik.handleSubmit} // Pass the handleSubmit function from Formik
        >
          <div className="d-flex flex-lg-row flex-column gap-lg-2">
            <TextField
              id="firstName-outlined-basic"
              name="firstname"
              label="First Name"
              variant="outlined"
              sx={textFieldStyles}
              value={formik.values.firstname}
              onChange={formik.handleChange}
              className="my-2 w-100 w-lg-50"
              disabled={!edit}
            />

            <TextField
              id="lastName-outlined-basic"
              name="lastname"
              label="Last Name"
              variant="outlined"
              sx={textFieldStyles}
              value={formik.values.lastname}
              onChange={formik.handleChange}
              className="my-2 w-100 w-lg-50"
              disabled={!edit}
            />
          </div>
          <div className="d-flex flex-lg-row flex-column gap-lg-2">
            <div className=" my-2 w-100 w-lg-50">
              <InputLabel id="demo-simple-select-label">Gender</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                className="mr-2 w-100 w-lg-50"
                label="Gender"
                sx={textFieldStyles}
                disabled={!edit}
                value={formik.values.gender}
                onChange={formik.handleChange}
                name="gender">
                <MenuItem value={"male"}>Male</MenuItem>
                <MenuItem value={"female"}>Female</MenuItem>
                <MenuItem value={"others"}>Others</MenuItem>
              </Select>
            </div>
            <div className=" m-y2 w-100 w-lg-50">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    className="w-100 w-lg-50 mt-lg-4 mt-0"
                    label="DOB"
                    value={formik.values.dob}
                    onChange={(date) => formik.setFieldValue("dob", date)} // Update the dob field in formik state
                    disabled={!edit}
                    sx={textFieldStyles}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
          </div>
          <div className="d-flex flex-lg-row flex-column gap-lg-2">
            <TextField
              id="email-outlined-basic"
              name="email"
              label="Email"
              variant="outlined"
              sx={textFieldStyles}
              value={formik.values.email}
              onChange={formik.handleChange}
              className="my-2 w-100 w-lg-50"
              disabled={!edit}
            />
            <TextField
              id="phone-outlined-basic"
              name="phone"
              label="Phone"
              variant="outlined"
              sx={textFieldStyles}
              value={formik.values.phone}
              onChange={formik.handleChange}
              className="my-2 w-100 w-lg-50"
              disabled={!edit}
            />
          </div>
          <div className="d-flex">
            <TextField
              id="address-outlined-basic"
              name="address"
              label="Address"
              variant="outlined"
              sx={textFieldStyles}
              value={formik.values.address}
              onChange={formik.handleChange}
              className="my-2 w-100"
              disabled={!edit}
            />
          </div>
          <div className="d-flex flex-lg-row flex-column gap-lg-2">
            <TextField
              id="city-outlined-basic"
              name="city"
              label="City"
              variant="outlined"
              sx={textFieldStyles}
              value={formik.values.city}
              onChange={formik.handleChange}
              className="my-2 w-100"
              disabled={!edit}
            />
            <TextField
              id="state-outlined-basic"
              name="state"
              label="State"
              variant="outlined"
              sx={textFieldStyles}
              value={formik.values.state}
              onChange={formik.handleChange}
              className="my-2 w-100"
              disabled={!edit}
            />
            <TextField
              id="country-outlined-basic"
              name="country"
              label="Country"
              variant="outlined"
              sx={textFieldStyles}
              value={formik.values.country}
              onChange={formik.handleChange}
              className="my-2 w-100"
              disabled={!edit}
            />
            <TextField
              id="zipcode-outlined-basic"
              name="zipcode"
              label="Zip Code"
              variant="outlined"
              sx={textFieldStyles}
              value={formik.values.zipcode}
              onChange={formik.handleChange}
              className="my-2 w-100"
              disabled={!edit}
            />
          </div>

          <div className="d-flex">
            <Button
              type="submit"
              className="my-2 p-3 w-100"
              variant="dark"
              disabled={!edit}>
              Update
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
};
