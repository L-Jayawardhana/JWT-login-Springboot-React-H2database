"use client"

import { useState, useEffect } from "react"
import { getAdminData } from "../services/authService"

const AdminDashboard = ({ onLogout }) => {
  const [adminData, setAdminData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState("")
  const username = localStorage.getItem("username")

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const data = await getAdminData()
        setMessage(data)
        setAdminData({ username, role: "ADMIN" })
      } catch (error) {
        console.error("Error fetching admin data:", error)
        setMessage("Hello Admin")
        setAdminData({ username, role: "ADMIN" })
      } finally {
        setLoading(false)
      }
    }

    fetchAdminData()
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
                <h1 className="text-xl font-bold text-light-cream">Admin Portal</h1>
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
          <h2 className="text-4xl font-bold text-dark-green mb-4">Admin Dashboard</h2>
          <p className="text-lg text-gray-600">Manage your system with administrative privileges</p>
        </div>

        {/* Welcome Card */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-cream">
            <div className="text-center">
              <div className="mx-auto h-20 w-20 bg-dark-green rounded-full flex items-center justify-center mb-6">
                <svg className="h-10 w-10 text-light-cream" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-dark-green mb-2">{message}</h3>
              <p className="text-gray-600 mb-6">You have full administrative access to the system</p>

              <div className="bg-cream rounded-lg p-4">
                <h4 className="font-semibold text-dark-green mb-2">Your Information</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>
                    <strong>Username:</strong> {username}
                  </p>
                  <p>
                    <strong>Role:</strong> ADMIN
                  </p>
                  <p>
                    <strong>Access Level:</strong> Full Administrative
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Admin Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-cream hover:shadow-xl transition-shadow">
            <div className="h-12 w-12 bg-dark-green rounded-lg flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-light-cream" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-dark-green mb-2">User Management</h3>
            <p className="text-gray-600 text-sm">Create, edit, and manage user accounts</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-cream hover:shadow-xl transition-shadow">
            <div className="h-12 w-12 bg-dark-green rounded-lg flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-light-cream" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-dark-green mb-2">Analytics</h3>
            <p className="text-gray-600 text-sm">View system analytics and reports</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-cream hover:shadow-xl transition-shadow">
            <div className="h-12 w-12 bg-dark-green rounded-lg flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-light-cream" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            <h3 className="text-lg font-semibold text-dark-green mb-2">System Settings</h3>
            <p className="text-gray-600 text-sm">Configure system-wide settings</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-cream hover:shadow-xl transition-shadow">
            <div className="h-12 w-12 bg-dark-green rounded-lg flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-light-cream" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-dark-green mb-2">Security</h3>
            <p className="text-gray-600 text-sm">Manage security policies and permissions</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-cream hover:shadow-xl transition-shadow">
            <div className="h-12 w-12 bg-dark-green rounded-lg flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-light-cream" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-dark-green mb-2">Data Management</h3>
            <p className="text-gray-600 text-sm">Backup, restore, and manage data</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-cream hover:shadow-xl transition-shadow">
            <div className="h-12 w-12 bg-dark-green rounded-lg flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-light-cream" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-dark-green mb-2">Support Center</h3>
            <p className="text-gray-600 text-sm">Manage support tickets and help desk</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-12 bg-white rounded-2xl shadow-xl p-8 border border-cream">
          <h3 className="text-xl font-bold text-dark-green mb-6">System Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-soft-teal mb-2">1,234</div>
              <div className="text-sm text-gray-600">Total Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-soft-teal mb-2">56</div>
              <div className="text-sm text-gray-600">Active Sessions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-soft-teal mb-2">99.9%</div>
              <div className="text-sm text-gray-600">System Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-soft-teal mb-2">2.1GB</div>
              <div className="text-sm text-gray-600">Storage Used</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
