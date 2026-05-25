"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {  setLoginSession,} from "@/lib/auth"
export default function LoginPage() {

  const router = useRouter()

  const [username, setUsername] =
    useState("")

  const [password, setPassword] =
    useState("")

  function handleLogin() {

    if (
      username === "admin" &&
      password === "N03m1t3g15"
    ) {

      setLoginSession()

      router.push("/")
    }

    else {

      alert("Login gagal")
    }
  }

  return (

    <div
      className="
        min-h-screen
        bg-slate-950
        flex
        items-center
        justify-center
        p-4
      "
    >

      <div
        className="
          w-full
          max-w-md
          bg-slate-900
          border
          border-slate-800
          rounded-3xl
          p-8
          space-y-6
        "
      >

        <div>

          <h1 className="text-3xl font-bold text-white">
            Login Dashboard
          </h1>

          <p className="text-slate-400 mt-2">
            IT Support Internal Access
          </p>

        </div>

        <input
          type="text"

          placeholder="Username"

          value={username}

          onChange={(e) =>
            setUsername(e.target.value)
          }

          className="
            w-full
            bg-slate-800
            border
            border-slate-700
            rounded-xl
            px-4
            py-3
            text-white
          "
        />

        <input
          type="password"

          placeholder="Password"

          value={password}

          onChange={(e) =>
            setPassword(e.target.value)
          }

          className="
            w-full
            bg-slate-800
            border
            border-slate-700
            rounded-xl
            px-4
            py-3
            text-white
          "
        />

        <button
          onClick={handleLogin}

          className="
            w-full
            bg-blue-600
            hover:bg-blue-700
            py-3
            rounded-xl
            font-medium
            text-white
          "
        >
          Login
        </button>

      </div>

    </div>
  )
}