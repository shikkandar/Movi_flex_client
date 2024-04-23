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
    element: <Recovery/>,
  },
  {
    path: "/reset",
    element: <Reset/>,
  },
  {
    path: "/pageNotFound",
    element: <PageNotFound/>,
  },
  {
    path: "/register",
    element: <Register/>,
  },
  {
    path: "/dashbord",
    element: <UnAuthorizeUser><Dashbord/></UnAuthorizeUser>,
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
