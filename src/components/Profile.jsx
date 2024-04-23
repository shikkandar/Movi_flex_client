import React, { useState } from "react";
import { Header } from "./Header";
import { Button, Image } from "react-bootstrap";
import avatar from "../assets/13369169.jpg";
import convertToBase64 from "../helper/convert";
import TextField from "@mui/material/TextField";
import { Container, Form } from "react-bootstrap";
import { textFieldStyles } from "../cutomCss/inputField";

export const Profile = () => {
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
  return (
    <div>
      <Header />
      <div className="bg-dark ">
        <div
          className="d-flex container img-con2"
          style={{ height: "200px" }}>
          <div className="d-flex flex-column  ">
            {!edit ? (
              <Image
                className="img2"
                src={avatar}
                fluid
              />
            ) : (
              <div className="d-flex justify-content-center ">
                <label htmlFor="profile">
                  <div >
                    <Image
                      fluid
                      src={file || avatar}
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
                variant="outline-dark">
                Update profile
              </Button>
            )}
          </div>
          <div className="mx-3 mt-5">
            <h1 className="text-white">Andy Horwitz</h1>
            <h3 className="text-dark">location</h3>
          </div>
        </div>
      </div>
      <Container>
        <Form className="profile-form">
          <div className="d-flex">
            <TextField
              id="firstName-outlined-basic"
              label="First Name"
              variant="outlined"
              sx={textFieldStyles}
              className="m-2 w-50"
              disabled={!edit}
            />
            <TextField
              id="lastName-outlined-basic"
              label="Last Name"
              variant="outlined"
              sx={textFieldStyles}
              className="m-2 w-50"
              disabled={!edit}
            />
          </div>
          <div className="d-flex">
            <TextField
              id="email-outlined-basic"
              label="Email"
              variant="outlined"
              sx={textFieldStyles}
              className="m-2 w-50"
              disabled={!edit}
            />
            <TextField
              id="phone-outlined-basic"
              label="Phone"
              variant="outlined"
              sx={textFieldStyles}
              className="m-2 w-50"
              disabled={!edit}
            />
          </div>
          <div className="d-flex">
            <TextField
              id="address-outlined-basic"
              label="Address"
              variant="outlined"
              sx={textFieldStyles}
              className="m-2 w-50"
              disabled={!edit}
            />
            <TextField
              id="city-outlined-basic"
              label="City"
              variant="outlined"
              sx={textFieldStyles}
              className="m-2 w-50"
              disabled={!edit}
            />
          </div>
        </Form>
      </Container>
    </div>
  );
};
