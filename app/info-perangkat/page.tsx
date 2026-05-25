"use client"

import {
  useEffect,
  useState,
} from "react"

import DashboardLayout
from "@/components/layout/dashboard-layout"

type DeviceInfo = {

  platform: string

  cores: number

  ram: string

  language: string

  online: boolean

  browser: string

  resolution: string

  timezone: string

  gpu: string

  connection: string
}

export default function CheckPCPage() {

  const [info, setInfo] =
    useState<DeviceInfo | null>(null)

  function detectBrowser() {

    const ua =
      navigator.userAgent

    if (ua.includes("Edg"))
      return "Microsoft Edge"

    if (ua.includes("Chrome"))
      return "Google Chrome"

    if (ua.includes("Firefox"))
      return "Mozilla Firefox"

    if (ua.includes("Safari"))
      return "Safari"

    return "Unknown"
  }

  function getGPU() {

    const canvas =
      document.createElement("canvas")

    const gl =
      canvas.getContext("webgl")

    if (!gl)
      return "Unavailable"

    const debugInfo =
      gl.getExtension(
        "WEBGL_debug_renderer_info"
      )

    if (!debugInfo)
      return "Unavailable"

    return gl.getParameter(
      debugInfo.UNMASKED_RENDERER_WEBGL
    )
  }

  useEffect(() => {

    const connection =
      (navigator as any).connection

    setInfo({

      platform:
        navigator.platform,

      cores:
        navigator.hardwareConcurrency,

      ram:
        (navigator as any)
          .deviceMemory
          ? `${(navigator as any)
              .deviceMemory} GB`
          : "Unknown",

      language:
        navigator.language,

      online:
        navigator.onLine,

      browser:
        detectBrowser(),

      resolution:
        `${window.innerWidth} x ${window.innerHeight}`,

      timezone:
        Intl.DateTimeFormat()
          .resolvedOptions()
          .timeZone,

      gpu:
        getGPU(),

      connection:
        connection?.effectiveType
        || "Unknown",
    })

  }, [])

  return (

    <DashboardLayout>

      <div className="space-y-6">

        {/* HEADER */}

        <div>

          <h1 className="text-3xl font-bold">
            Check This PC
          </h1>

          <p className="text-slate-400 mt-1">
            Device & browser diagnostics
          </p>

        </div>

        {/* GRID */}

        <div
          className="
            grid
            md:grid-cols-2
            xl:grid-cols-3
            gap-4
          "
        >

          {/* PLATFORM */}

          <Card
            title="Operating System"
            value={info?.platform}
          />

          {/* CPU */}

          <Card
            title="CPU Threads"
            value={
              info?.cores
              ? `${info.cores} Threads`
              : "Loading..."
            }
          />

          {/* RAM */}

          <Card
            title="Memory"
            value={info?.ram}
          />

          {/* BROWSER */}

          <Card
            title="Browser"
            value={info?.browser}
          />

          {/* RESOLUTION */}

          <Card
            title="Resolution"
            value={info?.resolution}
          />

          {/* LANGUAGE */}

          <Card
            title="Language"
            value={info?.language}
          />

          {/* TIMEZONE */}

          <Card
            title="Timezone"
            value={info?.timezone}
          />

          {/* CONNECTION */}

          <Card
            title="Connection"
            value={info?.connection}
          />

          {/* STATUS */}

          <Card
            title="Status"
            value={
              info?.online
              ? "ONLINE"
              : "OFFLINE"
            }
            green={info?.online}
          />

        </div>

        {/* GPU */}

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
            GPU Renderer
          </p>

          <h2
            className="
              text-xl
              font-bold
              mt-3
              break-all
            "
          >
            {info?.gpu}
          </h2>

        </div>

      </div>

    </DashboardLayout>
  )
}

/* CARD */

function Card({

  title,
  value,
  green,

}: any) {

  return (

    <div
      className="
        bg-slate-900
        border
        border-slate-800
        rounded-2xl
        p-5
      "
    >

      <p className="text-slate-400 text-sm">
        {title}
      </p>

      <h2
        className={`
          text-2xl
          font-bold
          mt-2

          ${
            green
            ? "text-green-400"
            : "text-white"
          }
        `}
      >
        {value || "Loading..."}
      </h2>

    </div>
  )
}