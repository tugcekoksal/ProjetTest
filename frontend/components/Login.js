import React, { useState } from "react"
import { useDispatch } from "react-redux"
import axios from "axios"
import { loginSuccess, authError } from "@/reducers/usersReducer"

function Login({ onSwitchToSignup }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/token/", {
        username,
        password,
      })

      const { access, refresh } = response.data
      console.log(access, refresh)

      localStorage.setItem("accessToken", access)
      localStorage.setItem("refreshToken", refresh)
      dispatch(loginSuccess({ accessToken: access, refreshToken: refresh,username:username }))
    } catch (error) {
      if (error.response) {
        dispatch(authError(error.response.data.detail || "Failed to login"))
      } else {
        dispatch(authError("Network error or server is down"))
      }
    }
  }

  return (
    <div className="flex flex-col mx-auto my-20 max-w-lg">
      <form onSubmit={handleLogin} className="space-y-6  ">
        <label className="block">
          <span className="text-gray-700">Username:</span>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Password:</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </label>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-dark-slate hover:bg-[#597a7b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-[#597a7b]"
        >
          Login
        </button>
        <button
          onClick={onSwitchToSignup}
          className="w-full mt-4 text-center text-sm text-blue-500 hover:text-blue-700"
        >
          Need an account? Sign up
        </button>
      </form>
    </div>
  )
}

export default Login
