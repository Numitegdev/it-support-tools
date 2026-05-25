"use client"
import MobileSidebar from "./mobile-sidebar"
import {
  useEffect,
  useState,
} from "react"

import {
  checkLoginSession,
  logoutSession,
} from "@/lib/auth"

export default function Topbar() {
  function handleLogout() {

logoutSession()

  window.location.href = "/login"
}

const [isLogin, setIsLogin] =
  useState(false)

useEffect(() => {

  setIsLogin(
    checkLoginSession()
  )

}, [])


  return (
    <header className="
      h-16
      border-b
      border-slate-800
      bg-slate-900
      flex
      items-center
      justify-between
      px-4 md:px-6
    ">
      <div className="flex items-center gap-3">
        <MobileSidebar />

        <h2 className="font-semibold text-lg">
          Dashboard
        </h2>
      </div>

    
      {isLogin ? (

      <button
        onClick={handleLogout}
        className="
          bg-red-500/20
          text-red-400
          px-4
          py-2
          rounded-xl
          text-sm
        "
      >
        Logout
      </button>

    ) : (

      <a
        href="/login"
        className="
          bg-blue-500/20
          text-blue-400
          px-4
          py-2
          rounded-xl
          text-sm
        "
      >
        Login
      </a>

    )}
    
    </header>
  )
}