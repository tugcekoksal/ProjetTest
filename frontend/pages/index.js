import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { logout } from "@/reducers/usersReducer"

import Todo from "@/components/Todo"
import Login from "@/components/Login"
import Signup from "@/components/SignUp"

export default function Home() {
  const [showLogin, setShowLogin] = useState(true)
  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated)
  const username = useSelector((state) => state.user.username)
  const handleLogOut = () => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    window.location.reload()
    dispatch(logout())
  }
  const handleSwitchToSignup = () => setShowLogin(false)
  const handleSwitchToLogin = () => setShowLogin(true)

  return (
    <div className="flex items-center justify-center bg-beige">
      {isAuthenticated && (
        <div className=" absolute top-4 right-4 z-20 text-center">
          <button
            onClick={handleLogOut}
            className="text-sm bg-white py-1 px-4 rounded-md font-bold text-gray-500 hover:text-gray-600"
          >
            LOGOUT
          </button>
        </div>
      )}

      <div className="absolute top-0 bg-white bg-image-div h-[300px]  w-full z-10" />
      <div className="container max-w-2xl  shadow-md md:w-3/4 z-20 mt-[7%] mb-10 ">
        <div className="p-4 bg-cream rounded-lg shadow-lg ">
          <h1 className="mb-4 mt-4 text-3xl font-bold text-center text-dark-slate">
            {isAuthenticated ? `Welcome ${username}` : "LOGIN"}
          </h1>
          {isAuthenticated ? (
            <Todo />
          ) : showLogin ? (
            <Login onSwitchToSignup={handleSwitchToSignup} />
          ) : (
            <Signup onSwitchToLogin={handleSwitchToLogin} />
          )}
        </div>
      </div>
    </div>
  )
}
