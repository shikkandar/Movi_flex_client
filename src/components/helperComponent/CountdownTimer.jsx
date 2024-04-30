import React from "react";
import Countdown from "react-countdown";
import Typography from "@mui/material/Typography";

const CountdownTimer = ({ isTimeUp, onComplete }) => {
  return (
    <div className="w-100 px-2 mt-3 d-flex justify-content-end">
      <Countdown
        date={Date.now() + 5 * 60 * 1000}
        onComplete={onComplete}
        renderer={({ minutes, seconds }) => (
          <Typography variant="h4">
            {minutes.toString().padStart(2, "0")}:
            {seconds.toString().padStart(2, "0")}
          </Typography>
        )}
      />
    </div>
  );
};

export default CountdownTimer;
