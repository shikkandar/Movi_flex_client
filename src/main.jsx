import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import Context from "./context/ContextProvider";
import 'aos/dist/aos.css'; // Import the CSS
import AOS from 'aos';

AOS.init(); // Initialize AOS

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <>
    <Context>
      <App />
    </Context>
  </>
);
