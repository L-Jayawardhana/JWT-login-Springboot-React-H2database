"use client"

import { useState, useEffect } from "react"
import { getUserData } from "../services/authService"

const UserDashboard = ({ onLogout }) => {
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState("")
  const username = localStorage.getItem("username")

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserData()
        setMessage(data)
        setUserData({ username, role: "USER" })
      } catch (error) {
        console.error("Error fetching user data:", error)
        setMessage("Hello User")
        setUserData({ username, role: "USER" })
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [username])

  if (loading) {
    return (
      <div className="min-h-screen bg-light-cream flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-soft-teal"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-light-cream to-cream">
      {/* Navigation */}
      <nav className="bg-dark-green shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-xl font-bold text-light-cream">User Portal</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-light-cream text-sm">Welcome, {username}</span>
              <button
                onClick={onLogout}
                className="bg-soft-teal hover:bg-opacity-90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-dark-green mb-4">User Dashboard</h2>
          <p className="text-lg text-gray-600">Welcome to your personal dashboard</p>
        </div>

        {/* Welcome Card */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-cream">
            <div className="text-center">
              <div className="mx-auto h-20 w-20 bg-soft-teal rounded-full flex items-center justify-center mb-6">
                <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-dark-green mb-2">{message}</h3>
              <p className="text-gray-600 mb-6">You have user-level access to the system</p>

              <div className="bg-cream rounded-lg p-4">
                <h4 className="font-semibold text-dark-green mb-2">Your Information</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>
                    <strong>Username:</strong> {username}
                  </p>
                  <p>
                    <strong>Role:</strong> USER
                  </p>
                  <p>
                    <strong>Access Level:</strong> Standard User
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-cream hover:shadow-xl transition-shadow">
            <div className="h-12 w-12 bg-soft-teal rounded-lg flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-dark-green mb-2">My Documents</h3>
            <p className="text-gray-600 text-sm">Access and manage your personal documents</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-cream hover:shadow-xl transition-shadow">
            <div className="h-12 w-12 bg-soft-teal rounded-lg flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-dark-green mb-2">Settings</h3>
            <p className="text-gray-600 text-sm">Customize your account preferences</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-cream hover:shadow-xl transition-shadow">
            <div className="h-12 w-12 bg-soft-teal rounded-lg flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-dark-green mb-2">Support</h3>
            <p className="text-gray-600 text-sm">Get help and contact support team</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDashboard
