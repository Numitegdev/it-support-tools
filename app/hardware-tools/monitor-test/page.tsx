"use client"

import { useState } from "react"

import DashboardLayout from "@/components/layout/dashboard-layout"

const testModes = [
  {
    name: "White",
    value: "white",
  },

  {
    name: "Black",
    value: "black",
  },

  {
    name: "Red",
    value: "red",
  },

  {
    name: "Green",
    value: "green",
  },

  {
    name: "Blue",
    value: "blue",
  },

  {
    name: "Gradient",
    value: "gradient",
  },
]

export default function MonitorTestPage() {
    const [isFullscreenTest, setIsFullscreenTest] =
  useState(false)
  const [activeMode, setActiveMode] =
    useState("black")

  function getBackground() {

    switch (activeMode) {

      case "white":
        return "bg-white"

      case "black":
        return "bg-black"

      case "red":
        return "bg-red-600"

      case "green":
        return "bg-green-600"

      case "blue":
        return "bg-blue-600"

      case "gradient":
        return `
          bg-gradient-to-br
          from-red-500
          via-green-500
          to-blue-500
        `

      default:
        return "bg-black"
    }
  }

 async function enterFullscreen() {

  setIsFullscreenTest(true)

  const elem =
    document.documentElement

  if (elem.requestFullscreen) {
    await elem.requestFullscreen()
  }
}

async function exitFullscreen() {

  setIsFullscreenTest(false)

  if (document.fullscreenElement) {
    await document.exitFullscreen()
  }
}

  return (
    <DashboardLayout>

      <div className="space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">
            Monitor Test
          </h1>

          <p className="text-slate-400 mt-1">
            Test dead pixel dan kualitas monitor
          </p>
        </div>

        {/* Preview */}
        <div
          className={`
            aspect-video
            rounded-2xl
            border
            border-slate-800
            transition-all
            ${getBackground()}
          `}
        />

        {/* Buttons */}
        <div className="
          flex
          gap-3
          flex-wrap
        ">
          {testModes.map((mode) => (

            <button
              key={mode.value}
              onClick={() =>
                setActiveMode(mode.value)
              }
              className={`
                px-5
                py-3
                rounded-xl
                transition-all

                ${
                  activeMode === mode.value
                    ? "bg-blue-600"
                    : "bg-slate-800 hover:bg-slate-700"
                }
              `}
            >
              {mode.name}
            </button>

          ))}

          <button
            onClick={enterFullscreen}
            className="
              px-5
              py-3
              rounded-xl
              bg-purple-600
              hover:bg-purple-700
              transition-all
            "
          >
            Fullscreen
          </button>

        </div>

      </div>
        {isFullscreenTest && (
        <div
            onClick={exitFullscreen}
            className={`
            fixed
            inset-0
            z-[9999]
            cursor-pointer
            ${getBackground()}
            `}
        >
        </div>
        )}
    </DashboardLayout>
  )
}