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

    // BALIK KE LANTAI 2
    if (
      objectName === "HILANG"
    ) {

      router.push(
        "/network-tools/network-map/bekami/lantai-2"
      )
    }
  }

  return (

    <NetworkMapViewer

      model="/models/Server.glb"

      onObjectClick={
        handleObjectClick
      }
    />
  )
}