"use client"
import { useRef } from "react"
import dynamic from "next/dynamic"
import { supabase } from "@/lib/supabase"
import {
  useState,
  useEffect,
} from "react"

const Calendar = dynamic(
  () => import("react-calendar"),
  {
    ssr: false,
  }
)

import "./calendar.css"
import html2canvas from "html2canvas"
import DashboardLayout from "@/components/layout/dashboard-layout"

export default function MaintenanceSchedulePage() {
  const exportRef =
  useRef<HTMLDivElement>(null)
  
  const [date, setDate] =
    useState(new Date())

  const [showModal, setShowModal] =
    useState(false)

  const [selectedDate, setSelectedDate] =
    useState("")

  const [formData, setFormData] =
    useState({

      ruangan: "",

      catatan: "",

      warna: "#3b82f6",
    })
  
  const [schedules, setSchedules] =
  useState<any[]>([])

    async function getSchedules() {

        const { data, error } =
            await supabase
            .from("maintenance_schedule")
            .select("*")

        console.log(error)

        if (data) {

            setSchedules(data)
        }
    }

    async function saveSchedule() {

        const { error } =
            await supabase
            .from("maintenance_schedule")
            .insert([{

                tanggal: selectedDate,

                ruangan:
                formData.ruangan,

                catatan:
                formData.catatan,

                warna:
                formData.warna,
            }])

        console.log(error)

        if (!error) {

            setShowModal(false)

            setFormData({

            ruangan: "",

            catatan: "",

            warna: "#3b82f6",
            })

            getSchedules()
        }
    }

async function deleteSchedule(id: number) {

  const confirmDelete =
    confirm("Delete schedule?")

  if (!confirmDelete)
    return

  const { error } =
    await supabase
      .from("maintenance_schedule")
      .delete()
      .eq("id", id)

  console.log(error)

  if (!error) {

    getSchedules()
  }
}


    useEffect(() => {

    getSchedules()

    }, [])

async function exportCalendar() {

  if (!exportRef.current)
    return

    const canvas =
    await html2canvas(
        exportRef.current as HTMLElement,
        {

        backgroundColor: "#0f172a",

        scale: 2,

        useCORS: true,

        foreignObjectRendering: false,

        logging: false,
        }
    )

  const image =
    canvas.toDataURL("image/png")

  const link =
    document.createElement("a")

  link.href = image

  link.download =
    `maintenance-schedule.png`

  link.click()
}


  return (

    <DashboardLayout>

      <div className="space-y-6">

        {/* HEADER */}

        <div>
           
          <div className="space-y-2">

               
                <h1 className="text-4xl font-black tracking-tight">
                    Maintenance Schedule
                </h1>

                <p className="text-slate-400 max-w-xl">
                    Jadwal maintenance dalam satu bulan
                </p>

                </div>
        </div>

        {/* CALENDAR */}
 <div className="pt-4">

            <button

                onClick={exportCalendar}

                className="
                bg-green-600
                hover:bg-green-700
                px-5
                py-3
                rounded-2xl
                font-medium
                
                "
            >

                Export JPG

            </button>

            </div>

        <div
          ref={exportRef}
          style={{
            background: "#0f172a",
            }}
          className="
          bg-slate-900
            border
            border-slate-800
            rounded-4xl
            p-4
            md:p-6
         
            overflow-auto
          "
        >

          <Calendar

            locale="id-ID"

            onClickDay={(value) => {

              const selected =
                value
                  .toISOString()
                  .split("T")[0]

              setSelectedDate(selected)

              setDate(value)

              setShowModal(true)
            }}

            value={date}
             
            tileClassName={({ date }) => {

                const formattedDate =
                    date
                    .toISOString()
                    .split("T")[0]

                const hasSchedule =
                    schedules.some(
                    (item) =>
                        item.tanggal === formattedDate
                    )

                if (hasSchedule) {

                    return "maintenance-day"
                }

                return ""
                }}





           tileContent={({ date }) => {

                const formattedDate =
                    date
                    .toISOString()
                    .split("T")[0]

                const daySchedules =
                    schedules.filter(
                    (item) =>
                        item.tanggal === formattedDate
                    )

                if (daySchedules.length === 0)
                    return null

                return (

                    <div
                    className="
                        mt-1
                        flex
                        flex-col
                        gap-1
                        items-center
                    "
                    >

                    {daySchedules
                        .slice(0, 2)
                        .map((item) => (

                        <div

                            key={item.id}
                            style={{
                            backgroundColor: "rgba(34,197,94,0.2)"
                            }}
                            className="
                          
                            text-green-400
                            text-[10px]
                            px-2
                            py-0.5
                            rounded-full
                            leading-none
                            truncate
                            max-w-full
                            "
                        >

                            {item.ruangan}

                        </div>

                    ))}

                    {daySchedules.length > 2 && (

                        <div
                        className="
                            text-[10px]
                            text-slate-400
                        "
                        >
                        +{daySchedules.length - 2}
                        </div>
                    )}

                    </div>
                )
                }}

          />

        </div>

        {/* SCHEDULE LIST */}

<div
  className="
    bg-slate-900
    border
    border-slate-800
    rounded-3xl
    p-4

    md:p-6
  "
>

  <div
    className="
      flex
      items-center
      justify-between
    "
  >

    <h2
      className="
        text-xl
        font-bold
      "
    >
      Schedule List
    </h2>

    <p className="text-slate-400 text-sm">
      {schedules.length} Schedule
    </p>

  </div>

  {
    schedules.length === 0 ? (

      <div
        className="
          text-slate-400
          text-center
          py-10
        "
      >
        Belum ada schedule
      </div>

    ) : (

      <div className="space-y-3">

        {schedules.map((item) => (

          <div
            key={item.id}

            className="
              bg-slate-800
              rounded-2xl
              p-4
              flex
              flex-col
              md:flex-row
              md:items-center
              md:justify-between
              gap-4
            "
          >

            <div className="space-y-2">

              <div
                className="
                  flex
                  items-center
                  gap-2
                "
              >

                <div
                  className="
                    w-4
                    h-4
                    rounded-full
                  "
                  style={{
                    backgroundColor:
                      item.warna,
                  }}
                />

                <h3 className="font-bold">
                  {item.ruangan}
                </h3>

              </div>

              <p
                className="
                  text-sm
                  text-slate-400
                "
              >
                {item.tanggal}
              </p>

              <p className="text-sm">
                {item.catatan}
              </p>

            </div>

            <button

              onClick={() =>
                deleteSchedule(item.id)
              }

              className="
                bg-red-500
                text-white-400
                px-4
                py-2
                rounded-xl
                text-sm
              "
            >

              Delete

            </button>

          </div>

        ))}

      </div>
    )
  }

</div>

      </div>

      {/* MODAL */}

      {
        showModal && (

          <div
            className="
              fixed
              inset-0
              bg-black/70
              z-50
              flex
              items-center
              justify-center
              p-4
            "
          >

            <div
              className="
                bg-slate-900
                border
                border-slate-800
                rounded-3xl
                w-full
                max-w-md
                p-6
                space-y-4
              "
            >

              <div
                className="
                  flex
                  items-center
                  justify-between
                "
              >

                <div>

                  <h2
                    className="
                      text-2xl
                      font-bold
                    "
                  >
                    Add Schedule
                  </h2>

                  <p
                    className="
                      text-slate-400
                      text-sm
                    "
                  >
                    {selectedDate}
                  </p>

                </div>

                <button

                  onClick={() =>
                    setShowModal(false)
                  }

                  className="
                    text-slate-400
                    hover:text-white
                  "
                >

                  ✕

                </button>

              </div>

              {/* RUANGAN */}

              <input

                type="text"

                placeholder="Ruangan"

                value={formData.ruangan}

                onChange={(e) =>
                  setFormData({

                    ...formData,

                    ruangan:
                      e.target.value,
                  })
                }

                className="
                  w-full
                  bg-slate-800
                  border
                  border-slate-700
                  rounded-xl
                  px-4
                  py-3
                "
              />

              {/* CATATAN */}

              <textarea

                placeholder="Catatan"

                value={formData.catatan}

                onChange={(e) =>
                  setFormData({

                    ...formData,

                    catatan:
                      e.target.value,
                  })
                }

                className="
                  w-full
                  bg-slate-800
                  border
                  border-slate-700
                  rounded-xl
                  px-4
                  py-3
                  min-h-28
                "
              />

              {/* WARNA */}

              {/* <input

                type="color"

                value={formData.warna}

                onChange={(e) =>
                  setFormData({

                    ...formData,

                    warna:
                      e.target.value,
                  })
                }

                className="
                  w-full
                  h-14
                  rounded-xl
                  bg-transparent
                "
              /> */}

              {/* BUTTON */}

              <button
                onClick={saveSchedule}
                className="
                  w-full
                  bg-blue-600
                  hover:bg-blue-700
                  py-3
                  rounded-xl
                  font-medium
                "
              >

                Save Schedule

              </button>

            </div>

          </div>
        )
      }

    </DashboardLayout>
  )
}