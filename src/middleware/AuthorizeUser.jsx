import React, { useContext, useEffect } from 'react'
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/ContextProvider';
import axios from 'axios';
import { useState } from 'react';
import { useExpire } from '../hooks/fetch.hooks';
import { Dialogu } from '../components/helperComponent/Dialogu';
import { jwtDecode } from 'jwt-decode';

export const UnAuthorizeUser = ({ children }) => {
    const [exp, setExp] = useState();
    const [navigateToHome, setNavigateToHome] = useState(false);
  
    const token = localStorage.getItem("token");
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const token = localStorage.getItem("token");
          const decodeToken = jwtDecode(token);
          setExp(decodeToken.exp);
          await axios.get("/api/protected", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } catch (error) {
          console.error("Error fetching data:", error);
          localStorage.removeItem("token");
          setNavigateToHome(true);
        }
      };
      fetchData();
    }, []);
  
    /**Token expire time countown custom hook */
    useExpire(exp);
    /**Token expire time countown custom hook */
  
    if (!token || navigateToHome) {
        const route='/'
      return <Dialogu route={route} />;
    }
  
    return children;
  };

export const AuthorizeUser = ({ children }) => {
    const token = localStorage.getItem('token');

    if(token){
        return <Navigate to={'/dashbord'} replace={true}></Navigate>
    }

    return children;
}
export const ProtectRoute = ({ children }) => {
    const { userdata} =useContext(UserContext)

    if (! userdata) {
        return <Navigate to={'/'} replace={true}></Navigate>
    }

    return children
}