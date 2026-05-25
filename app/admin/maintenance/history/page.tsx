"use client"

import {
  useEffect,
  useState,
} from "react"

import DashboardLayout from "@/components/layout/dashboard-layout"

import { supabase } from "@/lib/supabase"

import * as XLSX from "xlsx"

import { saveAs } from "file-saver"

type Maintenance = {

  id: number

  tanggal: string

  kode_pc: string

  ruangan: string

  teknisi: string

  keluhan: string

  keyboard_mouse: string

  motherboard: string

  ram: string

  hardisk: string

  power_supply: string

  cleaner: string

  keterangan: string
}

export default function MaintenanceHistoryPage() {

const [currentPage, setCurrentPage] =
  useState(1)

const itemsPerPage = 10

  const [data, setData] =
    useState<Maintenance[]>([])

  const [loading, setLoading] =
    useState(true)

  const [selectedData, setSelectedData] =
  useState<Maintenance | null>(null)

  const [search, setSearch] =
  useState("")

const [selectedMonth, setSelectedMonth] =
  useState("")

const [selectedRoom, setSelectedRoom] =
  useState("")

const filteredData =

  data.filter((item) => {

    const keyword =
      search.toLowerCase()

    const matchSearch =

      item.kode_pc
        ?.toLowerCase()
        .includes(keyword)

      ||

      item.ruangan
        ?.toLowerCase()
        .includes(keyword)

      ||

      item.teknisi
        ?.toLowerCase()
        .includes(keyword)

      ||

      item.keluhan
        ?.toLowerCase()
        .includes(keyword)

      ||

      item.tanggal
        ?.toLowerCase()
        .includes(keyword)

    const matchMonth =

      selectedMonth

        ? item.tanggal?.startsWith(selectedMonth)

        : true

    const matchRoom =

      selectedRoom

        ? item.ruangan === selectedRoom

        : true

    return (
      matchSearch &&
      matchMonth &&
      matchRoom
    )
  })

  const totalPages =

  Math.ceil(
    filteredData.length /
    itemsPerPage
  )

const paginatedData =

  filteredData.slice(

    (currentPage - 1) *
    itemsPerPage,

    currentPage *
    itemsPerPage
  )

  async function getHistory() {

    const { data, error } =
      await supabase
        .from("maintenance_history")
        .select("*")
        .order("id", {
          ascending: false,
        })

    console.log(error)

    if (data) {

      setData(data)

      setLoading(false)
    }
  }

  async function deleteHistory(id: number) {

    const confirmDelete =
      confirm("Delete maintenance history?")

    if (!confirmDelete) return

    const { error } =
      await supabase
        .from("maintenance_history")
        .delete()
        .eq("id", id)

    console.log(error)

    getHistory()
  }

  useEffect(() => {

    getHistory()

  }, [])

  useEffect(() => {

  setCurrentPage(1)

}, [

  search,

  selectedMonth,

  selectedRoom,
])

function exportExcel() {

  const worksheet =
    XLSX.utils.json_to_sheet(
      filteredData
    )

  const workbook =
    XLSX.utils.book_new()

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Maintenance"
  )

  const excelBuffer =
    XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    })

  const fileData =
    new Blob(
      [excelBuffer],
      {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
      }
    )

  const monthName =
    selectedMonth || "all"

  const roomName =
    selectedRoom || "all"

  saveAs(
    fileData,
    `maintenance-${monthName}-${roomName}.xlsx`
  )
}

  return (

    <DashboardLayout>

      <div
        className="
          space-y-6
          w-full
          max-w-full
        "
      >

        {/* HEADER */}

        <div>

          <h1 className="text-3xl font-bold">
            Maintenance History
          </h1>

          <p className="text-slate-400 mt-1">
            Device maintenance records
          </p>

        </div>
     
      <div
        className="
          bg-slate-900
          border
          border-slate-800
          rounded-2xl
          p-4
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-4
          gap-4
        "
      >
         {/* SEARCH */}

        <input

          type="text"

          placeholder="Search data..."

          value={search}

          onChange={(e) =>
            setSearch(e.target.value)
          }

          className="
            bg-slate-800
            w-full
            border
            border-slate-700
            rounded-xl
            px-4
            py-3
          "
        />

         {/* MONTH */}

        <input

          type="month"

          value={selectedMonth}

          onChange={(e) =>
            setSelectedMonth(e.target.value)
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

         {/* ROOM */}

        <select

          value={selectedRoom}

          onChange={(e) =>
            setSelectedRoom(e.target.value)
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
        >
          <option value="">
            Semua Ruangan
          </option>

          {[...new Set(data.map((d) => d.ruangan))]
            .filter(Boolean)
            .map((room) => (

              <option
                key={room}
                value={room}
              >
                {room}
              </option>

            ))}

        </select>

             {/* EXPORT */}

          <button

            onClick={exportExcel}

            className="
              bg-green-600
              hover:bg-green-700
              rounded-xl
              px-4
              py-3
              font-medium
            "
          >

            Export Excel

          </button>
          
        </div>
        
        {/* TABLE */}

        <div
          className="
            bg-slate-900
            border
            border-slate-800
            rounded-2xl
            overflow-x-auto
          "
        >

          <table
            className="
              min-w-max
              text-sm
              w-full
            "
          >

            <thead
              className="
                border-b
                border-slate-800
                text-slate-400
              "
            >

              <tr>

                <th className="p-4 text-left hidden md:table-cell">
                  Tanggal
                </th>

                <th className="p-4 text-left">
                  Kode PC
                </th>

                <th className="p-4 text-left hidden md:table-cell">
                  Ruangan
                </th>

                <th className="p-4 text-left hidden md:table-cell">
                  Teknisi
                </th>

                <th className="p-4 text-left hidden md:table-cell">
                  Keluhan
                </th>

                <th className="p-4 text-left">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {loading ? (

                <tr>

                  <td
                    colSpan={6}
                    className="
                      p-8
                      text-center
                      text-slate-400
                    "
                  >

                    Loading...

                  </td>

                </tr>

              ) : (

                paginatedData.map((item) => (

                  <tr
                    key={item.id}

                    className="
                      border-b
                      border-slate-800
                      
                    "
                  >

                    <td className="p-4 hidden md:table-cell">
                      {item.tanggal}
                    </td>

                    <td className="p-4">
                      {item.kode_pc}
                    </td>

                    <td className="p-4 hidden md:table-cell">
                      {item.ruangan}
                    </td>

                    <td className="p-4 hidden md:table-cell">
                      {item.teknisi}
                    </td>

                    <td className="p-4 max-w-75 hidden md:table-cell">
                      {item.keluhan}
                    </td>

                    <td className="p-4">

                      <div className="flex flex-row gap-2">

                      <button

                          onClick={() =>
                            setSelectedData(item)
                          }

                          className="
                            bg-blue-500/20
                            text-blue-400
                            px-3
                            py-1
                            rounded-lg
                            text-xs
                          "
                        >
                          View
                    </button>

                        <button

                          onClick={() =>
                            deleteHistory(item.id)
                          }

                          className="
                            bg-red-500/20
                            text-red-400
                            px-3
                            py-1
                            rounded-lg
                            text-xs
                          "
                        >

                          Delete

                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>
  
        {/* pagination */}
        <div
          className="
            flex
            items-center
            justify-center
            gap-2
            mt-4
            flex-wrap
          "
        >

          <button

            disabled={currentPage === 1}

            onClick={() =>
              setCurrentPage((prev) =>
                prev - 1
              )
            }

            className="
              bg-slate-800
              px-4
              py-2
              rounded-xl
              disabled:opacity-40
            "
          >

            Prev

          </button>

          {Array.from({

            length: totalPages,

          }).map((_, index) => (

            <button

              key={index}

              onClick={() =>
                setCurrentPage(index + 1)
              }

              className={`
                px-4
                py-2
                rounded-xl

                ${

                  currentPage === index + 1

                  ? "bg-blue-600"

                  : "bg-slate-800"
                }
              `}
            >

              {index + 1}

            </button>

          ))}

          <button

            disabled={
              currentPage === totalPages
            }

            onClick={() =>
              setCurrentPage((prev) =>
                prev + 1
              )
            }

            className="
              bg-slate-800
              px-4
              py-2
              rounded-xl
              disabled:opacity-40
            "
          >

            Next

          </button>

        </div>


      </div>



{selectedData && (

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
        w-full
       max-w-2xl
        bg-slate-900
        border
        border-slate-800
        rounded-2xl
        p-4
        md:p-6
        max-h-[90vh]
        overflow-y-auto
      "
    >

      {/* HEADER */}

      <div
        className="
         flex
          flex-col
          md:flex-row
          gap-4
          md:items-center
          md:justify-between
          mb-6
        "
      >

        <div>

          <h2 className="text-2xl font-bold">
            Maintenance Detail
          </h2>

          <p className="text-slate-400">
            {selectedData.kode_pc}
          </p>

        </div>

        <button

          onClick={() =>
            setSelectedData(null)
          }

          className="
            bg-red-500/20
            text-red-400
            px-3
            py-2
            rounded-xl
          "
        >

          Close

        </button>

      </div>

      {/* CONTENT */}

      <div className="space-y-6">

        {/* INFO */}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-4
            gap-4
          "
        >

          <InfoItem
            label="Tanggal"
            value={selectedData.tanggal}
          />

          <InfoItem
            label="Ruangan"
            value={selectedData.ruangan}
          />

          <InfoItem
            label="Teknisi"
            value={selectedData.teknisi}
          />

          <InfoItem
            label="Cleaner"
            value={selectedData.cleaner}
          />

        </div>

        {/* KELUHAN */}

        <div
          className="
          w-full  
          bg-slate-800
            
            rounded-xl
            p-4
          "
        >

          <h3 className="font-bold mb-2">
            Keluhan
          </h3>

          <p className="text-slate-300">
            {selectedData.keluhan}
          </p>

        </div>

        {/* CHECKLIST */}

        <div>

          <h3 className="font-bold mb-4">
            Checklist
          </h3>

          <div
            className="
              grid
             
              grid-cols-1
             
              gap-2
            "
          >

            {[
              {
                label: "Keyboard & Mouse",
                value:
                  selectedData.keyboard_mouse,
              },

              {
                label: "Motherboard",
                value:
                  selectedData.motherboard,
              },

              {
                label: "RAM",
                value:
                  selectedData.ram,
              },

              {
                label: "Hardisk",
                value:
                  selectedData.hardisk,
              },

              {
                label: "Power Supply",
                value:
                  selectedData.power_supply,
              },

            ].map((item) => (

              <div
                key={item.label}

                className="
                w-full  
                bg-slate-800
                  
                  rounded-xl
                  p-4
                  flex
                  flex-col
                  md:flex-row
                  gap-4
                  md:items-center
                  md:justify-between
                "
              >

                <span>
                  {item.label}
                </span>

                <span
                  className={`
                    px-3
                    py-1
                    rounded-lg
                    text-sm

                    ${
                      item.value === "aman"

                      ? "bg-green-500/20 text-green-400"

                      : "bg-red-500/20 text-red-400"
                    }
                  `}
                >

                  {item.value}

                </span>

              </div>

            ))}

          </div>

        </div>

        {/* KETERANGAN */}

        <div
          className="
          w-full
            bg-slate-800

            rounded-xl
            p-4
          "
        >

          <h3 className="font-bold mb-2">
            Keterangan Akhir
          </h3>

          <p className="text-slate-300">
            {selectedData.keterangan}
          </p>

        </div>

      </div>

    </div>

  </div>

)}

    </DashboardLayout>


  )
}

function InfoItem({

  label,

  value,

}: {

  label: string

  value: string

}) {

  return (

    <div
      className="
      w-full
        bg-slate-800

        rounded-xl
        p-4
      "
    >

      <p className="text-slate-400 text-sm">
        {label}
      </p>

      <p className="font-medium mt-1">
        {value}
      </p>

    </div>
  )
}