import React, { useEffect, useState } from "react";
import { AdminHeader } from "./AdminHeader";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { Button, Container, Form } from "react-bootstrap";
import { adminDashValidate } from "../../schemas/inputValidation";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import Card from "react-bootstrap/Card";
import movi_poster from "../../assets/marvel-avengers-comics.webp";
import { updateMoviList } from "../../routes/adminRoute";
export const AdminDash = () => {
  const [theaters, setTheaters] = useState([]);

  const formik = useFormik({
    initialValues: {
      name: "",
      moviname: "",
      price: "",
      description: "",
      runningMovies: false,
    },
    validate: async (values) => {
      const validationResults = await adminDashValidate(values);
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
      console.log(values);

      let updatePromise = updateMoviList(values);
      toast.promise(updatePromise, {
        loading: "Updating...",
        success: <b>Update Successfully...!</b>,
        error: <b>Update failed...!</b>,
      });
      values.name = "";
      values.moviname = "";
      values.price = "";
      values.description = "";
    },
  });
  
  const deletemovi = (name) => {
    const values={name,runningMovies: true}
    let updatePromise = updateMoviList(values);
    toast.promise(updatePromise, {
      loading: "Updating...",
      success: <b>Update Successfully...!</b>,
      error: <b>Update failed...!</b>,
    });
    console.log(values);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/theaters");
        setTheaters(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [formik.handleSubmit]);

  return (
    <div>
      <AdminHeader />
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <Container className="mt-5">
        <Form
          onSubmit={formik.handleSubmit}
          className="d-flex justify-content-center align-items-end gap-2 flex-wrap">
          <div>
            <InputLabel id="demo-simple-select-label">Theatter</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              label="Age"
              style={{ minWidth: "200px" }}>
              {theaters.map(
                (val, i) =>
                  val.runningMovies && (
                    <MenuItem
                      key={i}
                      value={val.name}>
                      {val.name}
                    </MenuItem>
                  )
              )}
            </Select>
          </div>
          <div>
            <TextField
              id="movi-name"
              name="moviname"
              style={{ minWidth: "200px" }}
              onChange={formik.handleChange}
              label="Movi-name"
              value={formik.values.moviname}
              variant="outlined"
            />
          </div>
          <div>
            <TextField
              style={{ minWidth: "200px" }}
              id="price"
              label="Price"
              name="price"
              variant="outlined"
              onChange={formik.handleChange}
              type="number"
              value={formik.values.price}
            />
          </div>
          <div>
            <TextField
              style={{ minWidth: "200px" }}
              id="description"
              label="Descrption"
              name="description"
              variant="filled"
              onChange={formik.handleChange}
              value={formik.values.description}
            />
          </div>
          <Button
            type="submit"
            style={{ height: "55px", width: "55px" }}
            variant="success">
            +
          </Button>
        </Form>
      </Container>
      <Container className="mt-5">
        {theaters.map(
          (val, i) =>
            val.runningMovies === false && (
              <Card
                className="my-5"
                key={i}>
                <Card.Img
                  variant="top"
                  src={movi_poster}
                />
                <Card.Title>{val.name}</Card.Title>
                <Card.Body>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <Button
                    onClick={() => deletemovi(val.name)}
                    variant="danger">
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            )
        )}
      </Container>
    </div>
  );
};
