import React from "react";
import { Button, Image } from "react-bootstrap";
import not from "../assets/blue.png";
import not1 from "../assets/blue2.png";
import { Link } from "react-router-dom";

export const PageNotFound = () => {
  return (
    <div className="bg-white">
      <div className="d-flex w-100 justify-content-center">
        <Button
          variant="dark"
          className="mt-3">
          <Link
            className="text-white text-decoration-none"
            to={"/"}>
            Back to Home
          </Link>
        </Button>
      </div>
      <div className="d-flex w-100 justify-content-center">
        <Image
          src={not}
          fluid
          className="d-lg-block d-none"
        />
        <Image
          src={not1}
          fluid
          className="d-lg-none d-block"
        />
      </div>
    </div>
  );
};
