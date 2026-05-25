"use client"

import { useState } from "react"

import DashboardLayout from "@/components/layout/dashboard-layout"

import { rooms } from "@/lib/options"

import { supabase } from "@/lib/supabase"

export default function NewMaintenancePage() {

  const [formData, setFormData] =
    useState({

      tanggal: "",

      kode_pc: "",

      ruangan: "",

      teknisi: "",

      keluhan: "",

      keyboard_mouse: "aman",

      motherboard: "aman",

      ram: "aman",

      hardisk: "aman",

      power_supply: "aman",

      cleaner: "tidak",

      keterangan: "",

    })

  async function saveMaintenance() {

    const { error } =
      await supabase
        .from("maintenance_history")
        .insert([formData])

    console.log(error)

    if (!error) {

      alert("Maintenance saved")

      setFormData({

        tanggal: "",

        kode_pc: "",

        ruangan: "",

        teknisi: "",

        keluhan: "",

        keyboard_mouse: "aman",

        motherboard: "aman",

        ram: "aman",

        hardisk: "aman",

        power_supply: "aman",

        cleaner: "tidak",

        keterangan: "",

      })
    }
  }

  return (

    <DashboardLayout>

      <div className="space-y-6">

        {/* HEADER */}

        <div>

          <h1 className="text-3xl font-bold">
            New Maintenance
          </h1>

          <p className="text-slate-400 mt-1">
            Input maintenance device
          </p>

        </div>

        {/* FORM */}

        <div
          className="
            bg-slate-900
            border
            border-slate-800
            rounded-2xl
            p-6
            space-y-6
          "
        >

          {/* TOP GRID */}

          <div
            className="
           grid
           grid-cols-1
           md:grid-cols-2
              gap-4
            "
          >

            {/* TANGGAL */}

            <input
              type="date"

              value={formData.tanggal}

              onChange={(e) =>
                setFormData({
                  ...formData,
                  tanggal: e.target.value,
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

            {/* KODE PC */}

            <input
              type="text"

              placeholder="Kode PC"

              value={formData.kode_pc}

              onChange={(e) =>
                setFormData({
                  ...formData,
                  kode_pc: e.target.value,
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

            {/* TEKNISI */}

            <input
              type="text"

              placeholder="Nama Teknisi"

              value={formData.teknisi}

              onChange={(e) =>
                setFormData({
                  ...formData,
                  teknisi: e.target.value,
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

          </div>

          {/* KELUHAN */}

          <textarea

            placeholder="Keluhan sebelum maintenance"

            value={formData.keluhan}

            onChange={(e) =>
              setFormData({
                ...formData,
                keluhan: e.target.value,
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

          {/* CHECKLIST */}

          <div className="space-y-4">

            <h2 className="text-xl font-bold">
              Checklist
            </h2>

            <div
              className="
              grid
              grid-cols-1
              md:grid-cols-2
                gap-4
              "
            >

              {[
                "keyboard_mouse",
                "motherboard",
                "ram",
                "hardisk",
                "power_supply",
              ].map((item) => (

                <div
                  key={item}

                  className="
                    bg-slate-800
                    rounded-xl
                    p-4
                  flex
                  flex-col
                  md:flex-row
                  gap-3
                  md:items-center
                  md:justify-between
                  "
                >

                  <span className="capitalize">
                    {item.replace("_", " ")}
                  </span>

                  <select

                    value={
                      formData[
                        item as keyof typeof formData
                      ]
                    }

                    onChange={(e) =>
                      setFormData({
                        ...formData,

                        [item]: e.target.value,
                      })
                    }

                    className="
                      bg-slate-700
                      px-3
                      py-2
                      rounded-lg
                    "
                  >

                    <option value="aman">
                      Aman
                    </option>

                    <option value="trouble">
                      Trouble
                    </option>

                  </select>

                </div>

              ))}

            </div>

          </div>

          {/* CLEANER */}

          <div
            className="
              bg-slate-800
              rounded-xl
              p-4
              flex
              flex-col
              md:flex-row
              gap-3
              md:items-center
              md:justify-between
            "
          >

            <span>
              Cleaner
            </span>

            <select

              value={formData.cleaner}

              onChange={(e) =>
                setFormData({
                  ...formData,
                  cleaner: e.target.value,
                })
              }

              className="
                bg-slate-700
                px-3
                py-2
                rounded-lg
              "
            >

              <option value="iya">
                Iya
              </option>

              <option value="tidak">
                Tidak
              </option>

            </select>

          </div>

          {/* KETERANGAN */}

          <textarea

            placeholder="Keterangan akhir"

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

            onClick={saveMaintenance}

            className="
              w-full
              bg-blue-600
              hover:bg-blue-700
              py-4
              text-lg
              rounded-xl
              font-medium
            "
          >

            Save Maintenance

          </button>

        </div>

      </div>

    </DashboardLayout>
  )
}