import React, { useEffect, useState } from "react";
import { AdminHeader } from "./AdminHeader";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { Container, Form } from "react-bootstrap";
import Button from "@mui/material/Button";
import { adminDashValidate } from "../../schemas/inputValidation";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import { updateMoviList } from "../../routes/adminRoute";
import Card from "@mui/material/Card"; // Importing Card from @mui/material
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { InfinitySpin } from "react-loader-spinner";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";

axios.defaults.baseURL = import.meta.env.VITE_SERVER_DOMAIN;

export const AdminDash = () => {
  const [open, setOpen] = React.useState(false);
  const [deleteIndex, setDeleteIndex] = React.useState(null);

  const handleClickOpen = (index) => {
    setOpen(true);
    setDeleteIndex(index);
  };

  const handleClose = () => {
    setOpen(false);
    setDeleteIndex(null);
  };

  const [theaters, setTheaters] = useState([]);

  const formik = useFormik({
    initialValues: {
      name: "",
      moviname: "",
      rating: "",
      price: "",
      poster: "",
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
      let updatePromise = updateMoviList(values);
      await toast.promise(updatePromise, {
        loading: "Updating...",
        success: <b>Update Successfully...!</b>,
        error: <b>Update failed...!</b>,
      });
      window.location.reload();
    },
  });

  const deletemovi = async (index) => {
    setOpen(true);
    const valueToDelete = theaters[index];
    const values = {
      name: valueToDelete.name,
      runningMovies: true,
      price: "",
      rating: "",
      moviname: "",
      description: "",
      poster: "",
    };
    let updatePromise = updateMoviList(values);
    await toast.promise(updatePromise, {
      loading: "Updating...",
      success: <b>Update Successfully...!</b>,
      error: <b>Update failed...!</b>,
    });
    window.location.reload();
    handleClose();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/theaters");
        setTheaters(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  console.log(theaters);
  const [showMoreIndex, setShowMoreIndex] = useState(null);

  const toggleShowMore = (index) => {
    setShowMoreIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  const handleClickUpdate = (index) => {
    const updateVal = theaters[index];
    formik.setValues({
      name: updateVal.name,
      moviname: updateVal.moviname,
      price: updateVal.price,
      rating: updateVal.rating,
      poster: updateVal.poster,
      description: updateVal.description,
      runningMovies: updateVal.runningMovie,
    });

    // Scroll to the top of the window
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional: smooth scrolling animation
    });
  };

  if (!theaters) {
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
            <InputLabel id="demo-simple-select-label">Theater</InputLabel>
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
              label="Movie-name"
              value={formik.values.moviname}
              variant="outlined"
            />
          </div>

          <div>
            <TextField
              style={{ minWidth: "200px" }}
              id="rating"
              label="Rating"
              name="rating"
              variant="outlined"
              onChange={formik.handleChange}
              value={formik.values.rating}
            />
          </div>
          <div>
            <TextField
              id="poster"
              name="poster"
              type="url"
              style={{ minWidth: "200px" }}
              onChange={formik.handleChange}
              label="Movie-Poster"
              value={formik.values.poster}
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
              label="Description"
              name="description"
              variant="filled"
              onChange={formik.handleChange}
              value={formik.values.description}
            />
          </div>
          <Button
            type="submit"
            style={{ height: "55px", width: "40px" }}
            variant="contained"
            color="success">
            +
          </Button>
        </Form>
      </Container>
      <Container className="my-5 d-flex gap-3 justify-content-center flex-wrap">
        {theaters.map(
          (val, i) =>
            val.runningMovies === false && (
              <Card
                data-aos="zoom-in-up"
                key={i}
                sx={{ maxWidth: 600 }}>
                <CardMedia
                  sx={{ height: 0, paddingTop: "56.25%" }} // Maintain aspect ratio (16:9)
                  image={val.poster}
                  title="Movi Poster"
                  style={{ width: "100%", height: "auto" }} // Make image fluid
                />

                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div">
                    {val.moviname}
                  </Typography>
                  <Typography
                    gutterBottom
                    className="d-flex"
                    component="div">
                    {"imdb"}:
                    <Rating
                      name="text-feedback"
                      value={val.rating}
                      readOnly
                      precision={0.5}
                      max={10}
                      emptyIcon={
                        <StarIcon
                          style={{ opacity: 0.55 }}
                          fontSize="inherit"
                        />
                      }
                    />
                    {`${val.rating}/10`}
                  </Typography>

                  <Typography
                    gutterBottom
                    component="div">
                    {val.name} {"Theater"}
                  </Typography>
                  <Typography
                    gutterBottom
                    component="div">
                    {"Price"} : <b>₹{val.price}</b>
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary">
                    <b>Story:</b>{" "}
                    {showMoreIndex === i
                      ? val.description
                      : val.description.substring(0, 250)}
                    {showMoreIndex !== i ? "..." : ""}
                  </Typography>
                </CardContent>
                <CardActions>
                  <React.Fragment>
                    <Button
                      color="error"
                      variant="contained"
                      onClick={() => handleClickOpen(i)}
                      size="small">
                      Delete
                    </Button>
                    <Button
                      color="secondary"
                      variant="contained"
                      onClick={() => handleClickUpdate(i)}
                      size="small">
                      Update..!
                    </Button>
                    <Dialog
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description">
                      <DialogTitle id="alert-dialog-title">
                        {"Are you sure you want to delete?"}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          This action cannot be undone. Are you sure you want to
                          proceed with the deletion?
                        </DialogContentText>
                      </DialogContent>

                      <DialogActions>
                        <Button onClick={handleClose}>cancel</Button>
                        <Button
                          onClick={() => deletemovi(deleteIndex)}
                          autoFocus>
                          done
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </React.Fragment>
                  <Button
                    onClick={() => toggleShowMore(i)}
                    size="small">
                    {showMoreIndex === i ? "Show Less" : "Read More"}
                  </Button>
                </CardActions>
              </Card>
            )
        )}
      </Container>
    </div>
  );
};
