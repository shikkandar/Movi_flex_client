import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_SERVER_DOMAIN;

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
    const {
      data: { code },
      status,
    } = await axios.get("/api/generateOTP", { params: { username } });
    // if (status === 201) {
    //   let {
    //     data: { email },
    //   } = await getuser({ username });
    //   let text = `Your Password Recovery OTP is ${code}. Verify and recover your password.`;
    //   await axios.post("/api/registerMail", {
    //     username,
    //     userEmail: email,
    //     text,
    //     subject: "Password Recovery OTP",
    //   });
    // }
    return Promise.resolve(code);
  } catch (error) {
    return Promise.reject({ error });
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