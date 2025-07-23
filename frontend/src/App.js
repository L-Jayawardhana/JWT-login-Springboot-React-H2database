"use client"

import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import LoginPage from "./components/LoginPage"
import UserDashboard from "./components/UserDashboard"
import AdminDashboard from "./components/AdminDashboard"
import { getToken, removeToken } from "./utils/tokenManager"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = getToken()
    if (token) {
      // Decode token to get user role (in a real app, you might want to validate the token)
      try {
        const payload = JSON.parse(atob(token.split(".")[1]))
        const storedRole = localStorage.getItem("userRole")
        if (storedRole) {
          setIsAuthenticated(true)
          setUserRole(storedRole)
        }
      } catch (error) {
        console.error("Invalid token:", error)
        removeToken()
      }
    }
    setLoading(false)
  }, [])

  const handleLogin = (role) => {
    setIsAuthenticated(true)
    setUserRole(role)
  }

  const handleLogout = () => {
    removeToken()
    localStorage.removeItem("userRole")
    localStorage.removeItem("username")
    setIsAuthenticated(false)
    setUserRole(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-light-cream flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-soft-teal"></div>
      </div>
    )
  }

  return (
    <Router>
      <div className="min-h-screen bg-light-cream">
        <Routes>
          <Route
            path="/login"
            element={
              !isAuthenticated ? (
                <LoginPage onLogin={handleLogin} />
              ) : (
                <Navigate to={userRole === "ADMIN" ? "/admin" : "/user"} replace />
              )
            }
          />
          <Route
            path="/user"
            element={
              isAuthenticated && userRole === "USER" ? (
                <UserDashboard onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/admin"
            element={
              isAuthenticated && userRole === "ADMIN" ? (
                <AdminDashboard onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/"
            element={<Navigate to={isAuthenticated ? (userRole === "ADMIN" ? "/admin" : "/user") : "/login"} replace />}
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
