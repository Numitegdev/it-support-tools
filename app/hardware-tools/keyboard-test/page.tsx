"use client"

import { useEffect, useState } from "react"

import DashboardLayout from "@/components/layout/dashboard-layout"

const keyboardRows = [
  [
    "ESC",
    "F1",
    "F2",
    "F3",
    "F4",
    "F5",
    "F6",
    "F7",
    "F8",
    "F9",
    "F10",
    "F11",
    "F12",
  ],

  [
    "`",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
    "-",
    "=",
    "BACKSPACE",
  ],

  [
    "TAB",
    "Q",
    "W",
    "E",
    "R",
    "T",
    "Y",
    "U",
    "I",
    "O",
    "P",
    "[",
    "]",
    "\\",
  ],

  [
    "CAPSLOCK",
    "A",
    "S",
    "D",
    "F",
    "G",
    "H",
    "J",
    "K",
    "L",
    ";",
    "'",
    "ENTER",
  ],

  [
    "SHIFT",
    "Z",
    "X",
    "C",
    "V",
    "B",
    "N",
    "M",
    ",",
    ".",
    "/",
    "SHIFT",
  ],

  [
    "CTRL",
    "FN",
    "WINDOWS",
    "ALT",
    "SPACE",
    "ALT",
    "CTRL",
    "←",
    "↑",
    "↓",
    "→",
  ],
]

function normalizeKey(key: string) {

  const upperKey = key.toUpperCase()

  switch (upperKey) {

    case " ":
      return "SPACE"

    case "CONTROL":
      return "CTRL"

    case "META":
      return "WINDOWS"

    case "ARROWUP":
      return "↑"

    case "ARROWDOWN":
      return "↓"

    case "ARROWLEFT":
      return "←"

    case "ARROWRIGHT":
      return "→"

    default:
      return upperKey
  }
}
  
export default function KeyboardTestPage() {
  const [pressedKeys, setPressedKeys] = useState<string[]>([])

  useEffect(() => {
    const handleKeyDown = (
      e: KeyboardEvent
    ) => {
     e.preventDefault()   
     const key = normalizeKey(e.key)
      setPressedKeys((prev) => {
        if (prev.includes(key)) return prev

        return [...prev, key]
      })
    }

    const handleKeyUp = (
      e: KeyboardEvent
    ) => {
    const key = normalizeKey(e.key)

      setPressedKeys((prev) =>
        prev.filter((k) => k !== key)
      )
    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    )

    window.addEventListener(
      "keyup",
      handleKeyUp
    )

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      )

      window.removeEventListener(
        "keyup",
        handleKeyUp
      )
    }
  }, [])

  return (
    <DashboardLayout>
      <div className="space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">
            Keyboard Tester
          </h1>

          <p className="text-slate-400 mt-1">
            Tekan tombol keyboard untuk test
          </p>
        </div>

        {/* Keyboard */}
        <div className="
          bg-slate-900
          border
          border-slate-800
          rounded-2xl
          p-6
          space-y-3
          overflow-x-auto
        ">
          {keyboardRows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="flex gap-2"
            >
              {row.map((key, keyIndex) => {
                const isPressed =
                  pressedKeys.includes(key)

                return (
                  <div
                    key={`${key}-${keyIndex}`}
                    className={`
                      min-w-[50px]
                      h-14
                      px-4
                      rounded-xl
                      flex
                      items-center
                      justify-center
                      text-sm
                      font-medium
                      border
                      transition-all

                      ${
                        isPressed
                          ? "bg-blue-600 border-blue-400 scale-95"
                          : "bg-slate-800 border-slate-700"
                      }

                     ${
  key === "SPACE"
    ? "w-80"
    : key === "BACKSPACE"
    ? "w-28"
    : key === "SHIFT"
    ? "w-32"
    : key === "ENTER"
    ? "w-28"
    : key === "TAB"
    ? "w-24"
    : key === "CAPSLOCK"
    ? "w-28"
    : "w-14"
}
                    `}
                  >
                    {key}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}