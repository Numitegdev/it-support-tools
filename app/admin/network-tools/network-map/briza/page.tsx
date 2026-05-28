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

    if (
      objectName === "KELUAR"
    ) {

      router.push(
        "/network-tools/network-map"
      )
    }
  }

  return (

    <NetworkMapViewer

      model="/models/Briza.glb"

      onObjectClick={
        handleObjectClick
      }
    />
  )
}