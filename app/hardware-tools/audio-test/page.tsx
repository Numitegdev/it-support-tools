"use client"

import {
  useEffect,
  useRef,
  useState,
} from "react"

import DashboardLayout from "@/components/layout/dashboard-layout"

export default function AudioTestPage() {

  const [micLevel, setMicLevel] =
    useState(0)

  const [micEnabled, setMicEnabled] =
    useState(false)

  const audioContextRef =
    useRef<AudioContext | null>(null)

  const analyserRef =
    useRef<AnalyserNode | null>(null)

  function playTone(
    panValue: number
  ) {

    const audioContext =
      new AudioContext()

    const oscillator =
      audioContext.createOscillator()

    const gainNode =
      audioContext.createGain()

    const panNode =
      audioContext.createStereoPanner()

    oscillator.type = "sine"

    oscillator.frequency.value = 440

    panNode.pan.value = panValue

    oscillator.connect(gainNode)

    gainNode.connect(panNode)

    panNode.connect(audioContext.destination)

    oscillator.start()

    setTimeout(() => {
      oscillator.stop()
      audioContext.close()
    }, 1000)
  }

  async function startMicTest() {

    try {

      const stream =
        await navigator.mediaDevices.getUserMedia({
          audio: true,
        })

      const audioContext =
        new AudioContext()

      const analyser =
        audioContext.createAnalyser()

      const microphone =
        audioContext.createMediaStreamSource(
          stream
        )

      microphone.connect(analyser)

      analyser.fftSize = 256

      const dataArray =
        new Uint8Array(
          analyser.frequencyBinCount
        )

      audioContextRef.current =
        audioContext

      analyserRef.current =
        analyser

      setMicEnabled(true)

      function updateMicLevel() {

        analyser.getByteFrequencyData(
          dataArray
        )

        let sum = 0

        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i]
        }

        const average =
          sum / dataArray.length

        setMicLevel(average)

        requestAnimationFrame(
          updateMicLevel
        )
      }

      updateMicLevel()

    } catch (err) {

      console.error(err)

    }
  }

  return (
    <DashboardLayout>

      <div className="space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">
            Audio Test
          </h1>

          <p className="text-slate-400 mt-1">
            Test speaker dan microphone
          </p>
        </div>

        {/* Speaker Test */}
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
          <h2 className="text-xl font-semibold">
            Speaker Test
          </h2>

          <div className="
            flex
            flex-wrap
            gap-3
          ">

            <button
              onClick={() => playTone(-1)}
              className="
                bg-blue-600
                hover:bg-blue-700
                px-5
                py-3
                rounded-xl
              "
            >
              Left Speaker
            </button>

            <button
              onClick={() => playTone(1)}
              className="
                bg-green-600
                hover:bg-green-700
                px-5
                py-3
                rounded-xl
              "
            >
              Right Speaker
            </button>

            <button
              onClick={() => playTone(0)}
              className="
                bg-purple-600
                hover:bg-purple-700
                px-5
                py-3
                rounded-xl
              "
            >
              Stereo Test
            </button>

          </div>
        </div>

        {/* Mic Test */}
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
          <h2 className="text-xl font-semibold">
            Microphone Test
          </h2>

          {!micEnabled && (
            <button
              onClick={startMicTest}
              className="
                bg-blue-600
                hover:bg-blue-700
                px-5
                py-3
                rounded-xl
              "
            >
              Start Mic Test
            </button>
          )}

          {/* Volume Meter */}
          <div
            className="
              w-full
              h-6
              bg-slate-800
              rounded-full
              overflow-hidden
            "
          >
            <div
              className="
                h-full
                bg-green-500
                transition-all
              "
              style={{
                width: `${micLevel}%`,
              }}
            />
          </div>

          <p className="text-slate-400 text-sm">
            Mic Level: {Math.round(micLevel)}
          </p>

        </div>

      </div>

    </DashboardLayout>
  )
}