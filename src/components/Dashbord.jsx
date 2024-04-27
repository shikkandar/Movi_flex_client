import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card"; // Importing Card from @mui/material
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Header } from "./Header";
export const Dashbord = () => {
  const [showMoreIndex, setShowMoreIndex] = useState(null);

  const toggleShowMore = (index) => {
    setShowMoreIndex((prevIndex) => (prevIndex === index ? null : index));
  };
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
  return (
    <div>
      <Header />
      <Container
        className="mt-5 d-flex gap-3 justify-content-center flex-wrap">
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
