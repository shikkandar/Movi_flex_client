import axios from "axios";
axios.defaults.baseURL = import.meta.env.VITE_SERVER_DOMAIN;

export async function createSeats({ bookingDate, theaterName, moviName },params) {
  try {
    console.log(`/api/${params}/booking_ticket`);
    const { data } = await axios.post(`/api/${params}/booking_ticket`, {
      bookingDate,
      theaterName,
      moviName,
    });
    return Promise.resolve({ data });
  } catch (error) {
    // Log the error details
    console.error("An error occurred during the createSeats request:", error);
    return Promise.reject(error);
  }
}
