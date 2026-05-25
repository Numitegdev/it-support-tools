"use client"

import {
  useEffect,
  useState,
} from "react"

import DashboardLayout from "@/components/layout/dashboard-layout"

export default function ISPDetectionPage() {

  const [data, setData] =
    useState<any>(null)

  async function getISP() {

    const response =
      await fetch(
        "https://ipapi.co/json/"
      )

    const result =
      await response.json()

    setData(result)
  }

  useEffect(() => {
    getISP()
  }, [])

  return (
    <DashboardLayout>

      <div className="space-y-6">

        <div>
          <h1 className="text-3xl font-bold">
            ISP Detection
          </h1>

          <p className="text-slate-400 mt-1">
            Informasi internet kantor
          </p>
        </div>

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

          {data ? (
            <>
              <div>
                <p className="text-slate-400">
                  IP
                </p>

                <h2 className="text-2xl font-bold">
                  {data.ip}
                </h2>
              </div>

              <div>
                <p className="text-slate-400">
                  ISP
                </p>

                <h2 className="text-xl font-bold">
                  {data.org}
                </h2>
              </div>

              <div>
                <p className="text-slate-400">
                  City
                </p>

                <h2 className="text-xl font-bold">
                  {data.city}
                </h2>
              </div>
            </>
          ) : (
            <p>Loading...</p>
          )}

        </div>

      </div>

    </DashboardLayout>
  )
}