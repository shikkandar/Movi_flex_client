import axios from "axios";
axios.defaults.baseURL = import.meta.env.VITE_SERVER_DOMAIN;

export async function loginAdmin({username,password}) {
    try {
        if (username) {
            const {data} =await axios.post(`/api/admin/login`,{username,password});
            return Promise.resolve({data});
        }
    } catch (error) {
        return Promise.reject({error});
    }
}