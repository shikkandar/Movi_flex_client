import axios from "axios";
import {jwtDecode} from 'jwt-decode'
axios.defaults.baseURL = import.meta.env.VITE_SERVER_DOMAIN;

// api routes
export async function registerUser(credentials) {
  try {
    const response = await axios.post("/api/register", credentials);
    return response.data;
  } catch (error) {
    if (error.response) {
      const statusCode = error.response.status;
      switch (statusCode) {
        case 409:
          throw new Error("Username already exists");
        case 422:
          throw new Error("Email already exists");
        case 500:
          throw new Error("Internal Server Error. Please try again later.");
        default:
          throw new Error("Registration failed. Please try again.");
      }
    } else {
      throw new Error("Network error. Please check your connection.");
    }
  }
}

/**Authenticate user */

export async function Authenticate(username) {
  try {
    return axios.post("/api/authendicate", { username });
  } catch (error) {
    return { error: "Username does't exist" };
  }
}

/**Get User details */

export async function getuser({ username }) {
  try {
    const { data } = await axios.get(`/api/user/${username}`);
    return { data };
  } catch (error) {
    return { error: "Password doens't match" };
  }
}

/**Login funtion */

export async function verifyPassword({ username, password }) {
  try {
    if (username) {
      const { data } = await axios.post(`/api/login`, { username, password });
      return Promise.resolve({ data });
    }
  } catch (error) {
    return Promise.reject({ error });
  }
}

/**Generate otp */


export async function generateOTP(username) {
  try {
    const response = await axios.get("/api/generateOTP", { params: { username } });
    const { code } = response.data;
    const { email } = (await getuser({ username })).data;
    
    const text = `Your Password Recovery OTP is ${code}. Verify and recover your password.`;

    await axios.post("/api/registerMail", {
      username,
      userEmail: email,
      text,
      subject: "Password Recovery OTP",
    });

    return code;
  } catch (error) {
    return Promise.reject(error);
  }
}


/**verify otp */
// Client-side verifyOTP function
export async function verifyOTP(username, code) {
  try {
    const { data, status } = await axios.get(`/api/verifyOTP`, {
      params: { username, code }
    });
    return { data, status };
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return Promise.reject(error);
  }
}


/**Reset Password */
export async function resetPassword({username,password,confirm_pwd}) {
  try {
    const response = await axios.put('/api/resetPassword',{username,password,confirm_pwd});
    return response
  } catch (error) {
    return Promise.reject(error);
  }
}

/**Get User name from token */
export async function getUsername() {
  const token= localStorage.getItem('token');
  if (!token) return Promise.reject("Cannot find token")

  let decode=jwtDecode(token)
  return decode;
}

/**Update user profile funtion */
export async function updateUser(res) {
  try {
    const token = localStorage.getItem("token");

    const data = await axios.put(`/api/updateuser`, res, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(data);
    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject({ error: "Couldn't update profile...!" });
  }
}

export async function sendBookingData({username,ticketNum,bookingHistory}) {
  try {
    return axios.post("/api/user/booking", {username,ticketNum, bookingHistory });
  } catch (error) {
    return Promise.reject({ error });
  }
}