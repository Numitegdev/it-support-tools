"use client"

import {
  useEffect,
  useState,
} from "react"

import DashboardLayout
from "@/components/layout/dashboard-layout"

import { supabase }
from "@/lib/supabase"

type Schedule = {

  id: number

  tanggal: string

  ruangan: string

  catatan: string

  warna: string
}

export default function DashboardPage() {

  const [schedules, setSchedules] =
    useState<Schedule[]>([])

  const [loading, setLoading] =
    useState(true)

  async function getSchedules() {

    const { data, error } =
      await supabase

        .from("maintenance_schedule")

        .select("*")

        .order("tanggal", {
          ascending: true,
        })

    console.log("DATA:", data)
    console.log("ERROR:", error)

    if (data) {

      setSchedules(data)
    }

    setLoading(false)
  }

  useEffect(() => {

    getSchedules()

  }, [])

  const todayText =
    new Date().toLocaleDateString(
      "id-ID",
      {

        weekday: "long",

        day: "numeric",

        month: "long",

        year: "numeric",
      }
    )

  return (

    <DashboardLayout>

      <div className="space-y-6">

        {/* HEADER */}

        <div>

          <h1 className="text-3xl font-bold">
            IT Dashboard
          </h1>

          <p className="text-slate-400 mt-1">
            Maintenance schedule
          </p>

        </div>

        {/* TODAY */}

        <div
          className="
            bg-gradient-to-r
            from-blue-600
            to-cyan-500
            rounded-3xl
            p-8
            shadow-2xl
          "
        >

          <p className="text-white/80 text-sm">
            Today
          </p>

          <h2 className="text-3xl font-bold mt-2 text-white">
            {todayText}
          </h2>

          <p className="text-white/80 mt-3">
            {
              schedules.length
            } total maintenance schedule
          </p>

        </div>

        {/* CONTENT */}

        {
          loading ? (

            <div
              className="
                bg-slate-900
                border
                border-slate-800
                rounded-2xl
                p-10
                text-center
                text-slate-400
              "
            >

              Loading schedule...

            </div>

          ) : schedules.length === 0 ? (

            <div
              className="
                bg-slate-900
                border
                border-slate-800
                rounded-2xl
                p-10
                text-center
                text-slate-400
              "
            >

              Tidak ada schedule

            </div>

          ) : (

            <div
              className="
                grid
                md:grid-cols-2
                xl:grid-cols-3
                gap-5
              "
            >

              {
                schedules.map((item) => (

                  <div

                    key={item.id}

                    className="
                      bg-slate-900
                      border
                      border-slate-800
                      rounded-3xl
                      p-6
                      shadow-xl
                      hover:border-cyan-500/40
                      transition
                      duration-300
                    "
                  >

                    {/* TOP */}

                    <div
                      className="
                        flex
                        items-start
                        justify-between
                        gap-4
                      "
                    >

                      <div>

                        <p className="text-slate-400 text-sm">
                          {item.tanggal}
                        </p>

                        <h2
                          className="
                            text-2xl
                            font-bold
                            mt-2
                          "
                        >
                          {item.ruangan}
                        </h2>

                      </div>

                      <div
                        className={`
                          w-4
                          h-4
                          rounded-full

                          ${
                            item.warna === "green"
                            ? "bg-green-400"

                            : item.warna === "yellow"
                            ? "bg-yellow-400"

                            : item.warna === "red"
                            ? "bg-red-400"

                            : "bg-cyan-400"
                          }
                        `}
                      />

                    </div>

                    {/* NOTE */}

                    <div
                      className="
                        mt-6
                        bg-slate-800
                        rounded-2xl
                        p-4
                      "
                    >

                      <p className="text-slate-300 leading-relaxed">
                        {item.catatan}
                      </p>

                    </div>

                    {/* FOOTER */}

                    <div
                      className="
                        mt-5
                        pt-4
                        border-t
                        border-slate-800
                        flex
                        items-center
                        justify-between
                      "
                    >

                      <div
                        className="
                          text-xs
                          text-slate-500
                        "
                      >
                        Maintenance Task
                      </div>

                      <div
                        className="
                          bg-cyan-500/10
                          text-cyan-400
                          px-3
                          py-1
                          rounded-full
                          text-xs
                        "
                      >

                        #{item.id}

                      </div>

                    </div>

                  </div>
                ))
              }

            </div>
          )
        }

      </div>

    </DashboardLayout>
  )
}