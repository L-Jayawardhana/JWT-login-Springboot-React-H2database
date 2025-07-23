import axios from "axios"
import { getToken } from "../utils/tokenManager"

// Create axios instance with base configuration
const api = axios.create({
  baseURL: "http://localhost:8080", // Adjust this to match your Spring Boot backend URL
  headers: {
    "Content-Type": "application/json",
  },
})

// Add request interceptor to include JWT token
api.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Add response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("token")
      localStorage.removeItem("userRole")
      localStorage.removeItem("username")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  },
)

// Authentication service functions
export const loginUser = async (credentials) => {
  try {
    const response = await api.post("/signin", credentials)
    return response.data
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error("Invalid username or password")
    } else if (error.response?.data?.message) {
      throw new Error(error.response.data.message)
    } else {
      throw new Error("Login failed. Please try again.")
    }
  }
}

export const getUserData = async () => {
  try {
    const response = await api.get("/hello/user")
    return response.data
  } catch (error) {
    throw new Error("Failed to fetch user data")
  }
}

export const getAdminData = async () => {
  try {
    const response = await api.get("/hello/admin")
    return response.data
  } catch (error) {
    throw new Error("Failed to fetch admin data")
  }
}

export const getPublicData = async () => {
  try {
    const response = await api.get("/hello/all")
    return response.data
  } catch (error) {
    throw new Error("Failed to fetch public data")
  }
}

export default api
