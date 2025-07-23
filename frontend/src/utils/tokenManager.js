// Token management utilities
export const setToken = (token) => {
  localStorage.setItem("token", token)
}

export const getToken = () => {
  return localStorage.getItem("token")
}

export const removeToken = () => {
  localStorage.removeItem("token")
}

export const isTokenValid = () => {
  const token = getToken()
  if (!token) return false

  try {
    // Decode JWT token to check expiration
    const payload = JSON.parse(atob(token.split(".")[1]))
    const currentTime = Date.now() / 1000

    return payload.exp > currentTime
  } catch (error) {
    console.error("Error validating token:", error)
    return false
  }
}

export const getUserFromToken = () => {
  const token = getToken()
  if (!token) return null

  try {
    const payload = JSON.parse(atob(token.split(".")[1]))
    return {
      username: payload.sub,
      // Add other user info from token if available
    }
  } catch (error) {
    console.error("Error decoding token:", error)
    return null
  }
}
