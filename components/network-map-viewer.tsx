"use client"

import { Canvas } from "@react-three/fiber"
import { useRouter }
from "next/navigation"
import {
  OrbitControls,
  Environment,
  useGLTF,
  useAnimations,
} from "@react-three/drei"

import {
  Suspense,
  useEffect,
  useState,
} from "react"

import { supabase }
from "@/lib/supabase"

type Props = {

  model: string

  onObjectClick: (
    objectName: string
  ) => void
}

function Model({

  model,
  onObjectClick,

}: Props) {

        const {
        scene,
        animations,
        } = useGLTF(model)

        const { actions } =
        useAnimations(
            animations,
            scene
        )

  useEffect(() => {

    Object.values(actions).forEach(
    (action: any) => {

        action
        ?.reset()
        .play()

        action.setLoop(2201)

    }
    )

    scene.traverse((child: any) => {

      if (child.isMesh) {

        child.castShadow = true
        child.receiveShadow = true

        child.material.emissiveIntensity = 0

        child.onPointerOver = () => {

          document.body.style.cursor =
            "pointer"

          child.material.emissive.set(
            "#00ffff"
          )

          child.material.emissiveIntensity = 0.5
        }

        child.onPointerOut = () => {

          document.body.style.cursor =
            "default"

          child.material.emissive.set(
            "#000000"
          )

          child.material.emissiveIntensity = 0
        }
      }
    })

  }, [scene])

  return (

    <primitive

      object={scene}

      scale={3}

      position={[0, -2, 0]}

      onClick={(e: any) => {

        e.stopPropagation()

        onObjectClick(
          e.object.name
        )
      }}
    />
  )
}

export default function NetworkMapViewer({

  model,
  onObjectClick,

}: Props) {

   const router = useRouter()
  const [selectedRoom,
  setSelectedRoom] =
    useState("")

  const [roomInfo,
  setRoomInfo] =
    useState<any>(null)

  async function handleClick(
    objectName: string
  ) {

    setSelectedRoom(
      objectName
    )

    console.log(
      "CLICK:",
      objectName
    )

    const { data } =
      await supabase
        .from("rooms")
        .select("*")
        .eq(
          "room_code",
          objectName
        )
        .single()

    console.log(
      "ROOM DATA:",
      data
    )

    setRoomInfo(data)

    onObjectClick(objectName)
  }

  return (

    <div
      className="
        flex
        w-full
        h-screen
        bg-black
        
      "
    >

      {/* 3D VIEW */}

      <div className="flex-1 relative">

        <Canvas
          shadows

          camera={{
            position: [18, 14, 18],
            fov: 45,
          }}
        >

          <ambientLight intensity={1} />

          <directionalLight
            position={[10, 10, 5]}
            intensity={2}
            castShadow
          />

          <Suspense fallback={null}>

            <Model
              model={model}
              onObjectClick={
                handleClick
              }
            />

            <Environment preset="city" />

          </Suspense>

          <OrbitControls
            enablePan
            enableZoom
            enableRotate
            minDistance={8}
            maxDistance={40}
            maxPolarAngle={
              Math.PI / 2.1
            }
          />

        </Canvas>

        {/* TOP UI */}

        <div
          className="
            absolute
            top-4
            left-4
            bg-black/60
            backdrop-blur
            border
            border-slate-700
            rounded-2xl
            px-5
            py-4
            text-white
            z-50
          "
        >

          <h1 className="text-2xl font-bold">
            3D Network Map
          </h1>

         <button

            onClick={() =>
                router.push(
                "/network-tools/network-diagnostics"
                )
            }

            className="
                mt-4
                bg-slate-800
                hover:bg-slate-700
                px-4
                py-2
                rounded-xl
            "
            >

            ← Network Tools

            </button>

        </div>

      </div>

      {/* SIDEBAR */}

      <div
        className="
          w-95
          bg-slate-950
          border-l
          border-slate-800
          p-6
          overflow-auto
          text-white
        "
      >

        <div className="space-y-4">

          <div>

            <h2 className="text-2xl font-bold">
              Room Information
            </h2>

            <p className="text-slate-400 text-sm mt-1">
              Interactive topology
            </p>
<div
  className="
    mt-4
    flex
    flex-wrap
    gap-2
  "
>

  <button

    onClick={() =>
      window.location.href =
        "/network-tools/network-map"
    }

    className="
      bg-slate-800
      hover:bg-slate-700
      px-4
      py-2
      rounded-xl
      text-sm
    "
  >

    MAP

  </button>

  <button

    onClick={() =>
      window.location.href =
        "/network-tools/network-map/bekami/lantai-1"
    }

    className="
      bg-slate-800
      hover:bg-slate-700
      px-4
      py-2
      rounded-xl
      text-sm
    "
  >

    BEKAMI L1

  </button>

  <button

    onClick={() =>
      window.location.href =
        "/network-tools/network-map/bekami/lantai-2"
    }

    className="
      bg-slate-800
      hover:bg-slate-700
      px-4
      py-2
      rounded-xl
      text-sm
    "
  >

    BEKAMI L2

  </button>

  {/* <button

    onClick={() =>
      window.location.href =
        "/network-tools/network-map/bekami/server"
    }

    className="
      bg-slate-800
      hover:bg-slate-700
      px-4
      py-2
      rounded-xl
      text-sm
    "
  >

    SERVER

  </button> */}

  <button

    onClick={() =>
      window.location.href =
        "/network-tools/network-map/briza"
    }

    className="
      bg-slate-800
      hover:bg-slate-700
      px-4
      py-2
      rounded-xl
      text-sm
    "
  >

    BRIZA

  </button>

</div>
          </div>

          {
            selectedRoom ? (

              <>

                {/* ROOM CODE */}

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
                    Room Code
                  </p>

                  <h2 className="text-xl font-bold mt-2">
                    {selectedRoom}
                  </h2>

                </div>

                {
                  roomInfo && (

                    <>

                      {/* ROOM NAME */}

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
                          Room Name
                        </p>

                        <h2 className="text-xl font-bold mt-2">
                          {roomInfo.room_name}
                        </h2>

                      </div>

                      {/* POOL */}

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
                          Pool IP
                        </p>

                        <h2 className="mt-2 font-bold">
                          {roomInfo.pool_start}
                        </h2>

                        <p className="text-slate-500 text-sm my-1">
                          sampai
                        </p>

                        <h2 className="font-bold">
                          {roomInfo.pool_end}
                        </h2>

                      </div>

                      {/* NETWORK */}

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
                          Network Type
                        </p>

                        <h2 className="mt-2 font-bold">
                          {roomInfo.network_type}
                        </h2>

                      </div>

                      {/* CABLE */}

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
                          Cable Code
                        </p>

                        <h2 className="mt-2 font-bold">
                          {roomInfo.cable_code}
                        </h2>

                      </div>

                    </>
                  )
                }

              </>

            ) : (

              <div
                className="
                  bg-slate-900
                  border
                  border-slate-800
                  rounded-2xl
                  p-6
                  text-slate-400
                "
              >

                Klik ruangan untuk melihat informasi.

              </div>
            )
          }

        </div>

      </div>

    </div>
  )
}