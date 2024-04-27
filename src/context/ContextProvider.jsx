import {  createContext, useState } from "react";


export const UserContext=createContext({});

const Context =({children}) =>{

    const [userdata ,setUserdata] =useState();
    const [adminName ,setAdminName] =useState();
    const [moviDetail ,setMoviDetail]=useState({})

    return(
        <UserContext.Provider value={{userdata ,setUserdata ,adminName ,setAdminName ,moviDetail,setMoviDetail}}>
            {children}
        </UserContext.Provider>
    )
}

export default Context;