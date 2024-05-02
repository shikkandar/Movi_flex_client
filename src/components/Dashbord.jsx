import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Header } from "./Header";
import { InfinitySpin } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/ContextProvider";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";

axios.defaults.baseURL = import.meta.env.VITE_SERVER_DOMAIN;

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export const Dashbord = () => {
  const { setMoviDetail } = useContext(UserContext);
  const navigate = useNavigate();
  const [showMoreIndex, setShowMoreIndex] = useState(null);
  const [theaters, setTheaters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/theaters");
        const shuffledTheaters = shuffleArray(response.data); // Shuffle the theaters array
        setTheaters(shuffledTheaters);
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const toggleShowMore = (index) => {
    setShowMoreIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleBook = (i, val) => {
    setMoviDetail(val);
    navigate("/tiket_booking");
  };

  return (
    <div>
      {loading ? (
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
      ) : (
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
                      sx={{ height: 0, paddingTop: "56.25%" }}
                      image={val.poster}
                      title="Movi Poster"
                      style={{ width: "100%", height: "auto" }}
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
                        {"IMDB Rating"}:
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
                        />{" "}
                        {`${val.rating}/10`}
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
                        onClick={() => handleBook(i, val)}
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
      )}
    </div>
  );
};
