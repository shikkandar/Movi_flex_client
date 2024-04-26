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
import toast, { Toaster } from "react-hot-toast";
import useFetch from "../hooks/fetch.hooks";
import { updateUser } from "../routes/apiRoute";

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
      formik.setValues({
        username: apiData.username || "",
        email: apiData.email || "",
        firstName: apiData.firstName || "",
        lastName: apiData.lastName || "",
        phone: apiData.phone || "",
        address: apiData.address || "",
        city: apiData.city || "",
        state: apiData.state || "",
        country: apiData.country || "",
        zipcode: apiData.zipcode || "",
        profile: apiData.profile || "",
        gender: apiData.gender || "",
      });
    }
  }, [apiData]);

  const dob = apiData?.dob?.split("T")[0] || "";



  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
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
    onSubmit: async (values) => {
      values = Object.assign(values, {
        profile: file || apiData?.profile || "",
      });
      let updatePromise = updateUser(values);
      toast.promise(updatePromise, {
        loading: "Updating...",
        success: <b>Update Successfully...!</b>,
        error: <b>Update failed...!</b>,
      });
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
                src={file || apiData?.profile || avatar}
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
          <div className="mx-3 mt-lg-5 mt-5 ">
            <h1 className="text-white text-capitalize">{apiData?.username}</h1>
            <h3 className="text-dark text-capitalize  ">
              {apiData?.city || "location"}
            </h3>
          </div>
        </div>
        <div
          className="w-100"
          style={{ height: "70px", backgroundColor: "#E0E0E0" }}></div>
      </div>
      <Container>
        <Form
          className="profile-form"
          onSubmit={formik.handleSubmit} // Pass the handleSubmit function from Formik
        >
          <div className="d-flex flex-lg-row flex-column gap-lg-2">
            <TextField
              id="firstName-outlined-basic"
              name="firstName"
              label="First Name"
              variant="outlined"
              sx={textFieldStyles}
              value={formik.values.firstName}
              onChange={formik.handleChange}
              className="my-2 w-100 w-lg-50"
              disabled={!edit}
            />

            <TextField
              id="lastName-outlined-basic"
              name="lastName"
              label="Last Name"
              variant="outlined"
              sx={textFieldStyles}
              value={formik.values.lastName}
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
                className="mr-2 w-100 mt-1 w-lg-50"
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
            <div className="d-flex align-items-center  w-100 w-lg-50">
              {edit ? (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      className="w-100 w-lg-50 mt-lg-4 mt-0"
                      label="DOB"
                      name="dob"
                      value={formik.values.dob}
                      onChange={(date) => formik.setFieldValue("dob", date)} // Update the dob field in formik state
                      disabled={!edit}
                      sx={textFieldStyles}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              ) : (
                <TextField
                  
                  label="DOB"
                  variant="outlined"
                  sx={textFieldStyles}
                  value={dob}
                  onChange={formik.handleChange}
                  className="w-100 w-lg-50 mt-lg-4 mt-0"
                  disabled={!edit}
                />
              )}
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
              onClick={() => {
                formik.handleSubmit();
                enableEdit();
              }}
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
