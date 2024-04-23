import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/ContextProvider';

export const UnAuthorizeUser = ({ children }) => {
    const token = localStorage.getItem('token');

    if(!token){
        return <Navigate to={'/'} replace={true}></Navigate>
    }

    return children;
}
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