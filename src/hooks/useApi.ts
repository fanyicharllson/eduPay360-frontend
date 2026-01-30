import { toast } from "@/lib/toast";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  withCredentials: true, 
});

// Global axios response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401 || error.response.status === 403) {
        toast.error("Session expired or unauthorized. Please log in again.", {
          position: "top-right",
        });
        // Redirect to login page
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);

export default api;
