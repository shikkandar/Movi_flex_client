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
import { Toaster } from "react-hot-toast";
export const AdminDash = () => {
  const [theaters, setTheaters] = useState([]);
  

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
  }, []);


  const formik = useFormik({
    initialValues: {
      theatter: "",
      moviname: "",
      price:""
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
    },
  });

  return (
    <div>
      <AdminHeader />
      <Toaster
          position="top-center"
          reverseOrder={false}
        />
      <Container className="mt-5">
        <Form onSubmit={formik.handleSubmit} className="d-flex justify-content-center align-items-end gap-2 flex-wrap">
          <div >
            <InputLabel id="demo-simple-select-label">Theatter</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="theatter"
              onChange={formik.handleChange}
              value={formik.values.theatter}
              label="Age"
              style={{minWidth:"200px"}}
              >
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
              style={{minWidth:"200px"}}
              onChange={formik.handleChange}
              label="Movi-name"
              value={formik.values.moviname}
              variant="outlined"
            />
          </div>
          <div>
            <TextField
            style={{minWidth:"200px"}}
              id="price"
              label="Price"
              name="price"
              variant="outlined"
              onChange={formik.handleChange}
              type="number"
              value={formik.values.price}
            />
          </div>
          <Button type="submit" style={{height:"55px",width:"55px"}} variant="success">+</Button>
        </Form>
      </Container>
      <Container>
        
      </Container>
    </div>
  );
};
