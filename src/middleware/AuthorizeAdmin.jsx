import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useExpire } from "../hooks/fetch.hooks";

import { Dialogu } from "../components/helperComponent/Dialogu";
import { Navigate } from "react-router-dom";

export const UnAuthorizeAdmin = ({ children }) => {
    const [exp, setExp] = useState();
    const [navigateToHome, setNavigateToHome] = useState(false);
  
    const admintoken = localStorage.getItem("admintoken");
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const admintoken = localStorage.getItem("admintoken");
          const decodeadmintoken = jwtDecode(admintoken);
          setExp(decodeadmintoken.exp);
          await axios.get("/api/admin/protected", {
            headers: {
              Authorization: `Bearer ${admintoken}`,
            },
          });
        } catch (error) {
          console.error("Error fetching data:", error);
          localStorage.removeItem("admintoken");
          setNavigateToHome(true);
        }
      };
      fetchData();
    }, []);
  
    /**admintoken expire time countown custom hook */
    useExpire(exp);
    /**admintoken expire time countown custom hook */
 
    if (!admintoken && navigateToHome) {
        const route='/dashbord'
      return <Dialogu route={route} />;
    }
    if (!admintoken) {
      return <Navigate to={'/dashbord'} replace={true}></Navigate>
    }
  
    return children;
  };

  export const AuthorizeAdmin = ({ children }) => {
    const usertoken = localStorage.getItem('token');
    const admintoken = localStorage.getItem('admintoken');

    if(usertoken && admintoken){
        return <Navigate to={'/admin/dash'} replace={true}></Navigate>
    }
    return children;
}
  export const ProductRegister = ({ children }) => {
    const usertoken = localStorage.getItem('token');
    const admintoken = localStorage.getItem('admintoken');

    if(usertoken &&  admintoken ){
      return <Navigate to={'/admin/dash'} replace={true}></Navigate>
    }
    if(usertoken){
      return <Navigate to={'/dashbord'} replace={true}></Navigate>
    }
    return children;
}

