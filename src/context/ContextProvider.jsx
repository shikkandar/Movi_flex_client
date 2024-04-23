import {  createContext, useState } from "react";


export const UserContext=createContext({});

const Context =({children}) =>{

    const [userdata ,setUserdata] =useState();

    return(
        <UserContext.Provider value={{userdata ,setUserdata}}>
            {children}
        </UserContext.Provider>
    )
}

export default Context;