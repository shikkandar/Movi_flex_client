import axios from "axios";
import { useEffect, useState } from "react";
import { getUsername } from "../routes/apiRoute";

export default function useFetch(query){
  const [getData, setData] = useState({ isLoading : false, apiData: undefined, status: null, serverError: null,auth:undefined })

  useEffect(() => {

      const fetchData = async () => {
          try {
              setData(prev => ({ ...prev, isLoading: true}));
            
              const {auth, username } = !query ? await getUsername() : '';
              
              const { data, status } = !query ? await axios.get(`/api/user/${username}`) : await axios.get(`/api/${query}`);

              if(status === 201){
                  setData(prev => ({ ...prev, isLoading: false}));
                  setData(prev => ({ ...prev, apiData : data, status: status ,auth}));
                  
              }

              setData(prev => ({ ...prev, isLoading: false}));
          } catch (error) {
              setData(prev => ({ ...prev, isLoading: false, serverError: error }))
          }
      };
      fetchData()

  }, [query]);

  return [getData, setData];
}
export async function useExpire(exp) {
    useEffect(() => {
        if (exp > 0) { // Ensure exp is valid
            const expirationTimeInMilliseconds = exp * 1000;
            const currentTime = Date.now();
            const countdown = expirationTimeInMilliseconds - currentTime;

            if (countdown > 0) { // Ensure countdown is positive
                setTimeout(() => {
                    window.location.reload();
                }, countdown);
            }
        }
    }, [exp]); 
}