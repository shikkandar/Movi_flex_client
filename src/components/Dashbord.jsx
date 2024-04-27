import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card"; // Importing Card from @mui/material
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Header } from "./Header";
import { InfinitySpin } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/ContextProvider";
axios.defaults.baseURL = import.meta.env.VITE_SERVER_DOMAIN;

export const Dashbord = () => {
  const {setMoviDetail}=useContext(UserContext)
  const navigate=useNavigate()
  const [showMoreIndex, setShowMoreIndex] = useState(null);

  const toggleShowMore = (index) => {
    setShowMoreIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  const [theaters, setTheaters] = useState([]);

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
  const handleBook=(i,val)=>{
    setMoviDetail(val)
    navigate('/tiket_booking')
  }
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
      <Header />
      <Container className="my-5 d-flex gap-3 justify-content-center flex-wrap">
        {theaters.map(
          (val, i) =>
            val.runningMovies === false && (
              <Card
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
                    component="div">
                    {val.name}
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
                  <Button
                    color="success"
                    variant="contained"
                    onClick={() => handleBook(i,val)}
                    size="small">
                    Book Now
                  </Button>
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
