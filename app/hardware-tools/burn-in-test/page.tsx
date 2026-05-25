"use client"

import {
  useEffect,
  useState,
} from "react"

import DashboardLayout from "@/components/layout/dashboard-layout"

const videos = [
  "https://www.youtube.com/embed/dQw4w9WgXcQ",

  "https://www.youtube.com/embed/aqz-KE-bpKQ",

  "https://www.youtube.com/embed/ScMzIvxBSi4",

  "https://www.youtube.com/embed/jNQXAC9IVRw",
]

export default function BurnInTestPage() {

  const [running, setRunning] =
    useState(false)

  const [seconds, setSeconds] =
    useState(0)

  useEffect(() => {

    let interval: NodeJS.Timeout

    if (running) {

      interval = setInterval(() => {
        setSeconds((prev) => prev + 1)
      }, 1000)

    }

    return () => clearInterval(interval)

  }, [running])

  function formatTime(sec: number) {

    const hours =
      Math.floor(sec / 3600)

    const minutes =
      Math.floor((sec % 3600) / 60)

    const seconds =
      sec % 60

    return `
      ${String(hours).padStart(2, "0")}
      :
      ${String(minutes).padStart(2, "0")}
      :
      ${String(seconds).padStart(2, "0")}
    `
  }

  async function enterFullscreen() {

    const elem =
      document.documentElement

    if (elem.requestFullscreen) {
      await elem.requestFullscreen()
    }
  }

  return (
    <DashboardLayout>

      <div className="space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">
            Burn In Test
          </h1>

          <p className="text-slate-400 mt-1">
            Test stabilitas perangkat
          </p>
        </div>

        {/* Controls */}
        <div
          className="
            bg-slate-900
            border
            border-slate-800
            rounded-2xl
            p-6
            flex
            flex-wrap
            gap-4
            items-center
            justify-between
          "
        >

          {/* Timer */}
          <div>
            <p className="text-slate-400 text-sm">
              Running Time
            </p>

            <h2 className="text-3xl font-bold">
              {formatTime(seconds)}
            </h2>
          </div>

          {/* Buttons */}
          <div className="
            flex
            gap-3
            flex-wrap
          ">

            <button
              onClick={() =>
                setRunning(true)
              }
              className="
                bg-green-600
                hover:bg-green-700
                px-5
                py-3
                rounded-xl
              "
            >
              Start
            </button>

            <button
              onClick={() =>
                setRunning(false)
              }
              className="
                bg-red-600
                hover:bg-red-700
                px-5
                py-3
                rounded-xl
              "
            >
              Stop
            </button>

            <button
              onClick={() =>
                setSeconds(0)
              }
              className="
                bg-slate-700
                hover:bg-slate-600
                px-5
                py-3
                rounded-xl
              "
            >
              Reset
            </button>

            <button
              onClick={enterFullscreen}
              className="
                bg-purple-600
                hover:bg-purple-700
                px-5
                py-3
                rounded-xl
              "
            >
              Fullscreen
            </button>

          </div>

        </div>

        {/* Video Grid */}
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-6
          "
        >
          {videos.map((video, index) => (

            <div
              key={index}
              className="
                aspect-video
                rounded-2xl
                overflow-hidden
                border
                border-slate-800
              "
            >
              <iframe
                src={`${video}?autoplay=${running ? 1 : 0}&mute=1`}
                allow="autoplay"
                className="
                  w-full
                  h-full
                "
              />
            </div>

          ))}
        </div>

      </div>

    </DashboardLayout>
  )
}