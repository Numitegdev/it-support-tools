"use client"

import { useEffect, useRef, useState } from "react"

import DashboardLayout from "@/components/layout/dashboard-layout"

export default function WebcamTestPage() {

  const videoRef =
    useRef<HTMLVideoElement>(null)

  const [stream, setStream] =
    useState<MediaStream | null>(null)

  const [error, setError] =
    useState("")

  const [loading, setLoading] =
    useState(false)

  async function startCamera() {

    try {
      setLoading(true)

      const mediaStream =
        await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        })

      setStream(mediaStream)

      if (videoRef.current) {
        videoRef.current.srcObject =
          mediaStream
      }

      setError("")

    } catch (err) {

      setError(
        "Webcam tidak tersedia atau permission ditolak"
      )

    } finally {
      setLoading(false)
    }
  }

  function stopCamera() {

    stream?.getTracks().forEach((track) =>
      track.stop()
    )

    setStream(null)
  }

  useEffect(() => {

    return () => {
      stream?.getTracks().forEach((track) =>
        track.stop()
      )
    }

  }, [stream])

  return (
    <DashboardLayout>

      <div className="space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">
            Webcam Test
          </h1>

          <p className="text-slate-400 mt-1">
            Test kamera perangkat
          </p>
        </div>

        {/* Webcam Card */}
        <div
          className="
            bg-slate-900
            border
            border-slate-800
            rounded-2xl
            p-6
            space-y-4
          "
        >

          {/* Video */}
          <div
            className="
              aspect-video
              bg-black
              rounded-2xl
              overflow-hidden
              flex
              items-center
              justify-center
            "
          >
            {stream ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="
                  w-full
                  h-full
                  object-cover
                "
              />
            ) : (
              <p className="text-slate-500">
                Camera Preview
              </p>
            )}
          </div>

          {/* Error */}
          {error && (
            <div
              className="
                bg-red-500/10
                border
                border-red-500/20
                text-red-400
                p-4
                rounded-xl
              "
            >
              {error}
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 flex-wrap">

            <button
              onClick={startCamera}
              disabled={loading}
              className="
                bg-blue-600
                hover:bg-blue-700
                disabled:opacity-50
                px-5
                py-3
                rounded-xl
                transition-all
              "
            >
              {loading
                ? "Loading..."
                : "Start Camera"}
            </button>

            <button
              onClick={stopCamera}
              className="
                bg-slate-800
                hover:bg-slate-700
                px-5
                py-3
                rounded-xl
                transition-all
              "
            >
              Stop Camera
            </button>

          </div>

        </div>

      </div>

    </DashboardLayout>
  )
}