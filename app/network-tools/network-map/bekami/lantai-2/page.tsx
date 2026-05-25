"use client"

import { useRouter }
from "next/navigation"

import NetworkMapViewer
from "@/components/network-map-viewer"

export default function Page() {

  const router = useRouter()

  function handleObjectClick(
    objectName: string
  ) {

    console.log(
      "CLICK:",
      objectName
    )

    // BALIK LANTAI 1
    if (
      objectName ===
      "HILANG"
    ) {

      router.push(
        "/network-tools/network-map/bekami/lantai-1"
      )
    }

    // KE SERVER
    if (
      objectName ===
      "HILANG"
    ) {

      router.push(
        "/network-tools/network-map/bekami/server"
      )
    }
  }

  return (

    <NetworkMapViewer

      model="/models/Bekami_L2.glb"

      onObjectClick={
        handleObjectClick
      }
    />
  )
}