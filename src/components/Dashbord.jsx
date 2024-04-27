import React, { useEffect, useState } from 'react'
import { Header } from './Header'
import axios from 'axios';
import { Card, Container } from 'react-bootstrap';
import movi_poster from "../assets/marvel-avengers-comics.webp";
export const Dashbord = () => {
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
        <Header/>
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
                  
                </Card.Body>
              </Card>
            )
        )}
      </Container>
    </div>
  )
}
