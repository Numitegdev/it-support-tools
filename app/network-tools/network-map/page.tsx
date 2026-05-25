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

    if (objectName === "HILANG") {

      router.push(
        "/network-tools/network-map/bekami/lantai-1"
      )
    }

    if (objectName === "HILANG") {

      router.push(
        "/network-tools/network-map/briza"
      )
    }
  }

  return (

    <NetworkMapViewer
      model="/models/MAP.glb"
      onObjectClick={
        handleObjectClick
      }
    />
  )
}