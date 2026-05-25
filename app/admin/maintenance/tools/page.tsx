"use client"

import Link from "next/link"

import {
  useEffect,
  useState,
} from "react"

import DashboardLayout from "@/components/layout/dashboard-layout"

import { supabase } from "@/lib/supabase"

type Tool = {

  id: number

  nama: string

  kategori: string

  deskripsi: string

  download_url: string

  icon_url: string
}

export default function MaintenanceToolsPage() {

  const [tools, setTools] =
    useState<Tool[]>([])

  const [loading, setLoading] =
    useState(true)

  const [showModal, setShowModal] =
    useState(false)

  const [search, setSearch] =
    useState("")

  const [editingId, setEditingId] =
    useState<number | null>(null)

  const [formData, setFormData] =
    useState({

      nama: "",

      kategori: "",

      deskripsi: "",

      download_url: "",

      icon_url: "",
    })

  async function getTools() {

    const { data, error } =
      await supabase
        .from("maintenance_tools")
        .select("*")
        .order("id", {
          ascending: false,
        })

    console.log(error)

    if (data) {

      setTools(data)

      setLoading(false)
    }
  }

  useEffect(() => {

    getTools()

  }, [])

  async function saveTool() {

    if (editingId) {

      const { error } =
        await supabase
          .from("maintenance_tools")
          .update(formData)
          .eq("id", editingId)

      console.log(error)

    } else {

      const { error } =
        await supabase
          .from("maintenance_tools")
          .insert([formData])

      console.log(error)
    }

    setShowModal(false)

    setEditingId(null)

    setFormData({

      nama: "",

      kategori: "",

      deskripsi: "",

      download_url: "",

      icon_url: "",
    })

    getTools()
  }

  async function deleteTool(id: number) {

    const confirmDelete =
      confirm("Delete tool?")

    if (!confirmDelete)
      return

    const { error } =
      await supabase
        .from("maintenance_tools")
        .delete()
        .eq("id", id)

    console.log(error)

    if (!error) {

      getTools()
    }
  }

  function handleEdit(item: Tool) {

    setEditingId(item.id)

    setFormData({

      nama: item.nama,

      kategori: item.kategori,

      deskripsi: item.deskripsi,

      download_url: item.download_url,

      icon_url: item.icon_url,
    })

    setShowModal(true)
  }

  const filteredTools =

    tools.filter((item) =>

      item.nama
        ?.toLowerCase()
        .includes(search.toLowerCase())

      ||

      item.kategori
        ?.toLowerCase()
        .includes(search.toLowerCase())
    )

  return (

    <DashboardLayout>

      <div className="space-y-6">

        {/* HEADER */}

        <div
          className="
            flex
            flex-col
            md:flex-row
            md:items-center
            md:justify-between
            gap-4
          "
        >

          <div>

            <h1 className="text-3xl font-bold">
              Maintenance Tools
            </h1>

            <p className="text-slate-400 mt-1">
              IT support tools collection
            </p>

          </div>

          <button

            onClick={() => {

              setEditingId(null)

              setFormData({

                nama: "",

                kategori: "",

                deskripsi: "",

                download_url: "",

                icon_url: "",
              })

              setShowModal(true)
            }}

            className="
              bg-blue-600
              hover:bg-blue-700
              px-5
              py-3
              rounded-2xl
              font-medium
            "
          >

            + Add Tool

          </button>

        </div>

        {/* SEARCH */}

        <input

          type="text"

          placeholder="Search tools..."

          value={search}

          onChange={(e) =>
            setSearch(e.target.value)
          }

          className="
            w-full
            bg-slate-900
            border
            border-slate-800
            rounded-2xl
            px-4
            py-3
          "
        />

        {/* GRID */}

        {

          loading ? (

            <div className="text-slate-400">
              Loading...
            </div>

          ) : (

            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-3
                xl:grid-cols-4
                gap-4
              "
            >

              {filteredTools.map((item) => (

                <div

                  key={item.id}

                  className="
                    bg-slate-900
                    border
                    border-slate-800
                    rounded-3xl
                    p-5
                    flex
                    flex-col
                    gap-4
                    hover:border-blue-500/40
                    transition-all
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      gap-4
                    "
                  >

                    <img

                      src={
                        item.icon_url ||

                        `https://www.google.com/s2/favicons?domain=${item.download_url}&sz=128`
                      }

                      alt={item.nama}

                      className="
                        w-14
                        h-14
                        rounded-2xl
                        bg-slate-800
                        p-2
                      "
                    />

                    <div>

                      <h2 className="font-bold text-lg">
                        {item.nama}
                      </h2>

                      <p
                        className="
                          text-sm
                          text-blue-400
                        "
                      >
                        {item.kategori}
                      </p>

                    </div>

                  </div>

                  <p
                    className="
                      text-sm
                      text-slate-400
                      flex-1
                    "
                  >
                    {item.deskripsi}
                  </p>

                  <div className="flex gap-2">

                    <Link

                      href={item.download_url}

                      target="_blank"

                      className="
                        flex-1
                        bg-green-600
                        hover:bg-green-700
                        text-center
                        py-2
                        rounded-xl
                        text-sm
                        font-medium
                      "
                    >

                      Download

                    </Link>

                    <button

                      onClick={() =>
                        handleEdit(item)
                      }

                      className="
                        bg-yellow-500/20
                        text-yellow-400
                        px-4
                        rounded-xl
                        text-sm
                      "
                    >

                      Edit

                    </button>

                    <button

                      onClick={() =>
                        deleteTool(item.id)
                      }

                      className="
                        bg-red-500/20
                        text-red-400
                        px-4
                        rounded-xl
                        text-sm
                      "
                    >

                      Delete

                    </button>

                  </div>

                </div>

              ))}

            </div>
          )
        }

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
                max-w-lg
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

                <h2 className="text-2xl font-bold">

                  {

                    editingId

                      ? "Edit Tool"

                      : "Add Tool"
                  }

                </h2>

                <button

                  onClick={() =>
                    setShowModal(false)
                  }

                  className="text-slate-400"
                >

                  ✕

                </button>

              </div>

              <input

                type="text"

                placeholder="Tool Name"

                value={formData.nama}

                onChange={(e) =>
                  setFormData({

                    ...formData,

                    nama: e.target.value,
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

              <input

                type="text"

                placeholder="Category"

                value={formData.kategori}

                onChange={(e) =>
                  setFormData({

                    ...formData,

                    kategori: e.target.value,
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

              <textarea

                placeholder="Description"

                value={formData.deskripsi}

                onChange={(e) =>
                  setFormData({

                    ...formData,

                    deskripsi: e.target.value,
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

              <input

                type="text"

                placeholder="Download URL"

                value={formData.download_url}

                onChange={(e) =>
                  setFormData({

                    ...formData,

                    download_url:
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

              <input

                type="text"

                placeholder="Custom Icon URL (optional)"

                value={formData.icon_url}

                onChange={(e) =>
                  setFormData({

                    ...formData,

                    icon_url:
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

              <button

                onClick={saveTool}

                className="
                  w-full
                  bg-blue-600
                  hover:bg-blue-700
                  py-3
                  rounded-xl
                  font-medium
                "
              >

                Save Tool

              </button>

            </div>

          </div>
        )
      }

    </DashboardLayout>
  )
}