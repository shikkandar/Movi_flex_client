import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserName } from "./components/UserName";
import { Password } from "./components/Password";
import { Profile } from "./components/Profile";
import { Recovery } from "./components/Recovery";
import { Reset } from "./components/Reset";
import { PageNotFound } from "./components/PageNotFound";
import { Register } from "./components/Register";
import './App.css'
import { Dashbord } from "./components/Dashbord";
import { UnAuthorizeUser,ProtectRoute, AuthorizeUser } from "./middleware/AuthorizeUser";
import { Admin } from "./components/admin/Admin";
import { AdminDash } from "./components/admin/AdminDash";
import {  ProductRegister, UnAuthorizeAdmin } from "./middleware/AuthorizeAdmin";
import { TicketBook } from "./components/booking/TicketBook";
import { SeatPanel } from "./components/booking/SeatPanel";
import { Payment } from "./components/booking/Payment";
const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthorizeUser><UserName /></AuthorizeUser>,
  },
  {
    path: "/password",
    element: <ProtectRoute><Password/></ProtectRoute>,
  },
  {
    path: "/profile",
    element: <UnAuthorizeUser><Profile/></UnAuthorizeUser>
  },
  {
    path: "/recovery",
    element: <ProtectRoute><Recovery/></ProtectRoute>,
  },
  {
    path: "/reset",
    element: <ProtectRoute><Reset/></ProtectRoute>,
  },
  {
    path: "/pageNotFound",
    element: <PageNotFound/>,
  },
  {
    path: "/register",
    element: <ProductRegister><Register/></ProductRegister>,
  },
  {
    path: "/dashbord",
    element: <UnAuthorizeUser><Dashbord/></UnAuthorizeUser>,
  },
  {
    path: "/admin",
    element: <UnAuthorizeUser><Admin/></UnAuthorizeUser>
  },
  {
    path: "/admin/dash",
    element: <UnAuthorizeAdmin><AdminDash/></UnAuthorizeAdmin>,
  },
  {
    path: "/tiket_booking",
    element: <TicketBook/>,
  },
  {
    path: "/tiket_booking/seat_panel",
    element: <SeatPanel/>,
  },
  {
    path: "/tiket_booking/payment",
    element: <Payment/>,
  },
  {
    path: "*",
    element: <PageNotFound/>
  },
]);
function App() {
  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
