import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

  //Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response) {
//       Handle 401 Unauthorized
//       if (error.response.status === 401) {
//         localStorage.removeItem("token");
//         window.location.href = "/login";
//       }

//       Handle 403 Forbidden
//       if (error.response.status === 403) {
//         console.error("Access forbidden");
//       }

//       Handle 500 Server Error
//       if (error.response.status >= 500) {
//         console.error("Server error occurred");
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export default api;
