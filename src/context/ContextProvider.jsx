import { createContext, useState } from "react";

export const UserContext = createContext({});

const Context = ({ children }) => {
  const [userdata, setUserdata] = useState();
  const [adminName, setAdminName] = useState();
  const [moviDetail, setMoviDetail] = useState({});
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedData, setSelectedData] = useState({});
  const [ticketNum, setTicketNum] = useState("");

  return (
    <UserContext.Provider
      value={{
        userdata,
        setUserdata,
        adminName,
        setAdminName,
        moviDetail,
        setMoviDetail,
        selectedSeats,
        setSelectedSeats,
        selectedData,
        setSelectedData,
        ticketNum,
        setTicketNum,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export default Context;
