"use client"

import {
  useEffect,
  useState,
} from "react"

import DashboardLayout from "@/components/layout/dashboard-layout"

export default function NetworkToolsPage() {

  const [publicIP, setPublicIP] =
    useState("Loading...")

  const [online, setOnline] =
    useState(true)

  const [connectionType, setConnectionType] =
    useState("Unknown")

  const [downlink, setDownlink] =
    useState("Unknown")

  const [latency, setLatency] =
    useState<number | null>(null)

  async function getPublicIP() {

    try {

      const start =
        performance.now()

      const response =
        await fetch("https://api.ipify.org?format=json")

      const data =
        await response.json()

      const end =
        performance.now()

      setPublicIP(data.ip)

      setLatency(
        Math.round(end - start)
      )

    } catch (err) {

      setPublicIP("Failed")

    }
  }

  useEffect(() => {

    getPublicIP()

    setOnline(navigator.onLine)

    const connection =
      (
        navigator as any
      ).connection

    if (connection) {

      setConnectionType(
        connection.effectiveType || "Unknown"
      )

      setDownlink(
        `${connection.downlink} Mbps`
      )
    }

    function handleOnline() {
      setOnline(true)
    }

    function handleOffline() {
      setOnline(false)
    }

    window.addEventListener(
      "online",
      handleOnline
    )

    window.addEventListener(
      "offline",
      handleOffline
    )

    return () => {

      window.removeEventListener(
        "online",
        handleOnline
      )

      window.removeEventListener(
        "offline",
        handleOffline
      )
    }

  }, [])

  async function copyIP() {

    await navigator.clipboard.writeText(
      publicIP
    )

    alert("IP copied!")
  }

  return (
    <DashboardLayout>

      <div className="space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">
            Network Tools
          </h1>

          <p className="text-slate-400 mt-1">
            Informasi jaringan perangkat
          </p>
        </div>

        {/* Grid */}
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-4
            gap-6
          "
        >

          {/* Public IP */}
          <div className="
            bg-slate-900
            border
            border-slate-800
            rounded-2xl
            p-5
            space-y-3
          ">
            <p className="text-slate-400 text-sm">
              Public IP
            </p>

            <h2 className="text-xl font-bold break-all">
              {publicIP}
            </h2>

            <button
              onClick={copyIP}
              className="
                bg-blue-600
                hover:bg-blue-700
                px-4
                py-2
                rounded-xl
                text-sm
              "
            >
              Copy IP
            </button>
          </div>

          {/* Network Status */}
          <div className="
            bg-slate-900
            border
            border-slate-800
            rounded-2xl
            p-5
          ">
            <p className="text-slate-400 text-sm">
              Network Status
            </p>

            <h2 className="
              text-xl
              font-bold
              mt-2
            ">
              {online
                ? "Online"
                : "Offline"}
            </h2>
          </div>

          {/* Connection */}
          <div className="
            bg-slate-900
            border
            border-slate-800
            rounded-2xl
            p-5
          ">
            <p className="text-slate-400 text-sm">
              Connection Type
            </p>

            <h2 className="
              text-xl
              font-bold
              mt-2
            ">
              {connectionType}
            </h2>
          </div>

          {/* Speed */}
          <div className="
            bg-slate-900
            border
            border-slate-800
            rounded-2xl
            p-5
          ">
            <p className="text-slate-400 text-sm">
              Estimated Speed
            </p>

            <h2 className="
              text-xl
              font-bold
              mt-2
            ">
              {downlink}
            </h2>
          </div>

        </div>

        {/* Latency */}
        <div
          className="
            bg-slate-900
            border
            border-slate-800
            rounded-2xl
            p-6
          "
        >
          <p className="text-slate-400 text-sm">
            Approximate Latency
          </p>

          <h2 className="
            text-4xl
            font-bold
            mt-2
          ">
            {latency
              ? `${latency} ms`
              : "Testing..."}
          </h2>
        </div>

      </div>

    </DashboardLayout>
  )
}