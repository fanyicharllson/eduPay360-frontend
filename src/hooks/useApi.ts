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
        // Only redirect if not on a public route
        const publicRoutes = ["/", "/register", "/login", "/about", "/pricing", "/contact"];
        const currentPath = window.location.pathname;
        const isPublic = publicRoutes.some((route) =>
          currentPath === route || currentPath.startsWith(route + "/")
        );
        if (!isPublic) {
          toast.error("Session expired or unauthorized. Please log in again.", {
            position: "top-right",
          });
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  },
);

export default api;
