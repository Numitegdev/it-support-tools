"use client"

import {
  useEffect,
  useState,
} from "react"

import DashboardLayout from "@/components/layout/dashboard-layout"

import {
  rooms,
  networkTypes,
  functionalityOptions,
  whitelistOptions,
} from "@/lib/options"

import { supabase }
from "@/lib/supabase"

type Device = {
  id: number

  ruangan: string

  jenis_network: string

  device: string

  keterangan: string

  fungsional: string

  whitelist: string

  ip_terkini: string
}

export default function IPManagementPage() {
  
  const [currentPage, setCurrentPage] =
  useState(1)

  const [search, setSearch] =
  useState("")

  const [selectedRoom, setSelectedRoom] =
    useState("")

  const [selectedNetwork, setSelectedNetwork] =
    useState("")

  const itemsPerPage = 10

  const [devices, setDevices] =
    useState<Device[]>([])

  const [loading, setLoading] =
    useState(true)

  const [showModal, setShowModal] =
    useState(false)
  
    const [editingId, setEditingId] =
  useState<number | null>(null)

const [formData, setFormData] =
  useState({

    ruangan: "",

    jenis_network: "",

    device: "",

    keterangan: "",

    fungsional: "",

    whitelist: "",

    ip_terkini: "",

  })

async function getDevices() {

  const { data, error } =
    await supabase
      .from("ip_management")
      .select("*")

  console.log("DATA:", data)
  console.log("ERROR:", error)

  if (data) {
    setDevices(data)
  }

  setLoading(false)
}

  useEffect(() => {
    getDevices()
  }, [])

  useEffect(() => {

  setCurrentPage(1)

}, [

  search,

  selectedRoom,

  selectedNetwork,
])

async function addDevice() {
    
  const duplicateIP =

  devices.find(

    (item) =>

      item.ip_terkini ===
      formData.ip_terkini
  )

if (duplicateIP) {

  alert(
    "Double IP detected!"
  )

  return
}

  const { data, error } =
    await supabase
      .from("ip_management")
      .insert([formData])
      .select()

  console.log("INSERT DATA:", data)
  console.log("INSERT ERROR:", error)

  if (!error) {

    setShowModal(false)

    setFormData({

      ruangan: "",

      jenis_network: "",

      device: "",

      keterangan: "",

      fungsional: "",

      whitelist: "",

      ip_terkini: "",

    })

    getDevices()
  }
}
function handleEdit(item: Device) {

  setEditingId(item.id)

  setFormData({

    ruangan: item.ruangan,

    jenis_network: item.jenis_network,

    device: item.device,

    keterangan: item.keterangan,

    fungsional: item.fungsional,

    whitelist: item.whitelist,

    ip_terkini: item.ip_terkini,

  })

  setShowModal(true)
}

async function updateDevice() {

  if (!editingId) return

  const { error } =
    await supabase
      .from("ip_management")
      .update(formData)
      .eq("id", editingId)

  console.log(error)

  if (!error) {

    setShowModal(false)

    setEditingId(null)

    getDevices()
  }
}

async function deleteDevice(id: number) {

  const confirmDelete =
    confirm("Delete this device?")

  if (!confirmDelete) return

  const { error } =
    await supabase
      .from("ip_management")
      .delete()
      .eq("id", id)

  console.log(error)

  if (!error) {
    getDevices()
  }
}

const filteredDevices =

  devices.filter((item) => {

    const keyword =
      search.toLowerCase()

    const matchSearch =

      item.device
        ?.toLowerCase()
        .includes(keyword)

      ||

      item.ip_terkini
        ?.toLowerCase()
        .includes(keyword)

      ||

      item.keterangan
        ?.toLowerCase()
        .includes(keyword)

    const matchRoom =

      selectedRoom

        ? item.ruangan === selectedRoom

        : true

    const matchNetwork =

      selectedNetwork

        ? item.jenis_network === selectedNetwork

        : true

    return (
      matchSearch &&
      matchRoom &&
      matchNetwork
    )
  })

const totalPages =

  Math.ceil(
    filteredDevices.length /
    itemsPerPage
  )

const paginatedDevices =

  filteredDevices.slice(

    (currentPage - 1) *
    itemsPerPage,

    currentPage *
    itemsPerPage
  )


  return (
    <DashboardLayout>

      <div className="space-y-6">

        {/* Header */}
        <div>

          <h1 className="text-3xl font-bold">
            IP Management
          </h1>

          <p className="text-slate-400 mt-1">
            Data IP kantor
          </p>
            <button
            onClick={() => setShowModal(true)}
            className="
                mt-4
                bg-blue-600
                hover:bg-blue-700
                px-5
                py-3
                rounded-xl
                font-medium
            "
            >
            + Add Device
            </button>
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
            md:grid-cols-3
            gap-4
          "
        >

          <input

            type="text"

            placeholder="
              Search IP / device...
            "

            value={search}

            onChange={(e) =>
              setSearch(e.target.value)
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

            {rooms.map((room) => (

              <option
                key={room}
                value={room}
              >
                {room}
              </option>

            ))}

          </select>

          <select

            value={selectedNetwork}

            onChange={(e) =>
              setSelectedNetwork(
                e.target.value
              )
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
              Semua Network
            </option>

            {networkTypes.map((item) => (

              <option
                key={item}
                value={item}
              >
                {item}
              </option>

            ))}

          </select>

        </div>

        {/* Table */}
        <div
          className="
            bg-slate-900
            border
            border-slate-800
            rounded-2xl
            overflow-auto
          "
        >

          <table className="w-full text-sm">

            <thead
              className="
                bg-slate-800
                text-left
              "
            >
              <tr>

                <th className="p-4 hidden md:table-cell">
                  No
                </th>

                <th className="p-4 hidden md:table-cell">
                  Ruangan
                </th>

                <th className="p-4 hidden md:table-cell">
                  Network
                </th>

                <th className="p-4 hidden md:table-cell">
                  Device
                </th>

                <th className="p-4">
                  Keterangan
                </th>

                <th className="p-4 hidden md:table-cell">
                  Fungsional
                </th>

                <th className="p-4 hidden md:table-cell">
                  Whitelist
                </th>

                <th className="p-4">
                  IP
                </th>

                <th className="p-4 hidden md:table-cell">
                Action
                </th>

              </tr>
            </thead>

            <tbody>

              {loading ? (

                <tr>
                  <td
                    colSpan={8}
                    className="
                      p-6
                      text-center
                    "
                  >
                    Loading...
                  </td>
                </tr>

              ) : devices.length === 0 ? (

                <tr>
                  <td
                    colSpan={8}
                    className="
                      p-6
                      text-center
                    "
                  >
                    Tidak ada data
                  </td>
                </tr>

              ) : (

                paginatedDevices.map((item) => (

                  <tr
                    key={item.id}
                    className="
                      border-t
                      border-slate-800
                    "
                  >

                    <td className="p-4 hidden md:table-cell">
                      {item.id}
                    </td>

                    <td className="p-4 hidden md:table-cell">
                      {item.ruangan}
                    </td>

                    <td className="p-4 hidden md:table-cell">
                      {item.jenis_network}
                    </td>

                    <td className="p-4 hidden md:table-cell">
                      {item.device}
                    </td>

                    <td className="p-4 ">
                      {item.keterangan}
                    </td>

                    <td className="p-4 hidden md:table-cell">
                      {item.fungsional}
                    </td>

                  <td className="p-4 hidden md:table-cell">

                    <span
                        className={`
                        px-3
                        py-1
                        rounded-full
                        text-xs

                        ${
                            item.whitelist === "DB_Utama"
                            ? "bg-green-500/20 text-green-400"

                            : item.whitelist === "DB_Mirror"
                            ? "bg-yellow-500/20 text-yellow-400"

                            : "bg-slate-700 text-slate-300"
                        }
                        `}
                    >

                        {item.whitelist}

                    </span>

                    </td>

                    <td className="p-4">
                      {item.ip_terkini}
                    </td>

                    <td className="p-4 hidden md:table-cell">

                    <div className="flex gap-2">

                        <button
                        onClick={() => handleEdit(item)}

                        className="
                            bg-yellow-500/20
                            text-yellow-400
                            px-3
                            py-1
                            rounded-lg
                            text-xs
                        "
                        >
                        Edit
                        </button>

                        <button
                        onClick={() => deleteDevice(item.id)}

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

        <div
  className="
    flex
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
            rounded-2xl
            w-full
            max-w-2xl
            p-6
            space-y-4
            max-h-[90vh]
            overflow-auto
            "
        >

            <div className="flex items-center justify-between">

            <h2 className="text-2xl font-bold">
                Add Device
            </h2>

            <button
                onClick={() => setShowModal(false)}
                className="
                text-slate-400
                hover:text-white
                "
            >
                ✕
            </button>

            </div>

            {/* FORM */}

            <div className="grid md:grid-cols-2 gap-4">

            {/* RUANGAN */}
            <select
                value={formData.ruangan}

                onChange={(e) =>
                setFormData({
                    ...formData,
                    ruangan: e.target.value,
                })
                }

                className="
                bg-slate-800
                border
                border-slate-700
                rounded-xl
                px-4
                py-3
                "
            >

                <option value="">
                Pilih Ruangan
                </option>

                {rooms.map((room) => (

                <option
                    key={room}
                    value={room}
                >
                    {room}
                </option>

                ))}

            </select>

            {/* NETWORK */}
            <select
                value={formData.jenis_network}

                onChange={(e) =>
                setFormData({
                    ...formData,
                    jenis_network: e.target.value,
                })
                }

                className="
                bg-slate-800
                border
                border-slate-700
                rounded-xl
                px-4
                py-3
                "
            >

                <option value="">
                Jenis Network
                </option>

                {networkTypes.map((network) => (

                <option
                    key={network}
                    value={network}
                >
                    {network}
                </option>

                ))}

            </select>

            {/* DEVICE */}
            <input
                type="text"

                placeholder="Nama Device"

                value={formData.device}

                onChange={(e) =>
                setFormData({
                    ...formData,
                    device: e.target.value,
                })
                }

                className="
                bg-slate-800
                border
                border-slate-700
                rounded-xl
                px-4
                py-3
                "
            />

            {/* IP */}
            <input
                type="text"

                placeholder="IP Address"

                value={formData.ip_terkini}

                onChange={(e) =>
                setFormData({
                    ...formData,
                    ip_terkini: e.target.value,
                })
                }

                className="
                bg-slate-800
                border
                border-slate-700
                rounded-xl
                px-4
                py-3
                "
            />

            {/* FUNGSIONAL */}
            <select
                value={formData.fungsional}

                onChange={(e) =>
                setFormData({
                    ...formData,
                    fungsional: e.target.value,
                })
                }

                className="
                bg-slate-800
                border
                border-slate-700
                rounded-xl
                px-4
                py-3
                "
            >

                <option value="">
                Fungsional
                </option>

                {functionalityOptions.map((item) => (

                <option
                    key={item}
                    value={item}
                >
                    {item}
                </option>

                ))}

            </select>

            {/* WHITELIST */}
            <select
                value={formData.whitelist}

                onChange={(e) =>
                setFormData({
                    ...formData,
                    whitelist: e.target.value,
                })
                }

                className="
                bg-slate-800
                border
                border-slate-700
                rounded-xl
                px-4
                py-3
                "
            >

                <option value="">
                Whitelist
                </option>

                {whitelistOptions.map((item) => (

                <option
                    key={item}
                    value={item}
                >
                    {item}
                </option>

                ))}

            </select>

            </div>

            {/* KETERANGAN */}
            <textarea
            placeholder="Keterangan"

            value={formData.keterangan}

            onChange={(e) =>
                setFormData({
                ...formData,
                keterangan: e.target.value,
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
                min-h-30
            "
            />

            {/* BUTTON */}
            <button
                onClick={
                editingId
                    ? updateDevice
                    : addDevice
                }

            className="
                w-full
                bg-blue-600
                hover:bg-blue-700
                py-3
                rounded-xl
                font-medium
            "
            >
            {
            editingId
                ? "Update Device"
                : "Save Device"
            }
            </button>

        </div>

        </div>

    )
    }

    </DashboardLayout>
  )
}