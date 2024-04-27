import {  createContext, useState } from "react";


export const UserContext=createContext({});

const Context =({children}) =>{

    const [userdata ,setUserdata] =useState();
    const [adminName ,setAdminName] =useState();
    const [moviName ,setMoviName]=useState({})

    return(
        <UserContext.Provider value={{userdata ,setUserdata ,adminName ,setAdminName ,moviName,setMoviName}}>
            {children}
        </UserContext.Provider>
    )
}

export default Context;