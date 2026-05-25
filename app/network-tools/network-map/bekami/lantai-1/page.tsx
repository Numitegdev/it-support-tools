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

    // KE LANTAI 2
    if (
      objectName === "HILANG"
    ) {

      router.push(
        "/network-tools/network-map/bekami/lantai-2"
      )
    }

    // KEMBALI KE MAP
    if (
      objectName === "HILANG"
    ) {

      router.push(
        "/network-tools/network-map"
      )
    }
  }

  return (

    <NetworkMapViewer

      model="/models/bekamil1.glb"

      onObjectClick={
        handleObjectClick
      }
    />
  )
}
