import React, { useContext, useEffect } from 'react'
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/ContextProvider';
import axios from 'axios';
import { useState } from 'react';

export const UnAuthorizeUser = ({ children }) => {
    const token = localStorage.getItem('token');
    const [navigateToHome, setNavigateToHome] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');

                await axios.get('/api/protected', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            } catch (error) {
                console.error('Error fetching data:', error);
                localStorage.removeItem('token');
                setNavigateToHome(true); // Set to navigate to home once
            }
        };
        fetchData();
    }, []);

    if (!token || navigateToHome) {
        return <Navigate to={'/'} replace={true} />;
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