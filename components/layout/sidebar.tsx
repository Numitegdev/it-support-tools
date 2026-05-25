"use client"
import {useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  ChevronDown,
  ChevronRight,
} from "lucide-react"

import {
  checkLoginSession,
} from "@/lib/auth"

const guestMenus = [
  {
    name: "Dashboard",
    href: "/dashboard",
  },

  {
    name: "Info Perangkat",
    href: "/info-perangkat",
  },

  {
    name: "Hardware Tool",
    children: [
      {
        name: "Keyboard Test",
        href: "/hardware-tools/keyboard-test",
      },

      {
        name: "Webcam Test",
        href: "/hardware-tools/webcam-test",
      },
      {
        name: "Monitor Test",
        href: "/hardware-tools/monitor-test",
      },
      {
        name: "Audio Test",
        href: "/hardware-tools/audio-test",
      },
      {
        name: "Burn In Test",
        href: "/hardware-tools/burn-in-test",
      },
    ],
  },

  
]

const adminMenus = [
  ...guestMenus,

{
  name: "Network Tool",
  href: "/network-tools",

  children: [

   {
      name: "Network Tools",
      href: "/network-tools/network-diagnostics",
    },

    // {
    //   name: "ISP Detection",
    //   href: "/network-tools/isp-detection",
    // },
     {
      name: "Network Map",
      href: "/network-tools/network-map",
    },
    {
      name: "IP Management",
      href: "/network-tools/ip-management",
    },
    ],
  },



  {
    name: "Maintenance",
    href: "/maintenance",

    
  children: [
   {
      name: "Maintenance Schedule",
      href: "/admin/maintenance/schedule",
    },

   {
      name: "Maintenance Form",
      href: "/admin/maintenance/new-maintenance",
    },

    {
      name: "Maintenance History",
      href: "/admin/maintenance/history",
    },
        {
      name: "Maintenance Tools",
      href: "/admin/maintenance/tools",
    },

    ],
  },
]

export default function Sidebar() {
  const pathname = usePathname()
const [openMenu, setOpenMenu] =
  useState<string | null>(null)
  //ini fungsi login
    const [isLogin, setIsLogin] =
    useState(false)

    useEffect(() => {

    setIsLogin(
    checkLoginSession()
    )

    }, [])

  const menus = isLogin
    ? adminMenus
    : guestMenus

  return (
    <aside className="
      hidden md:flex
      w-64
      min-h-screen
      bg-slate-900
      border-r
      border-slate-800
      flex-col
      p-4
    ">
      <h1 className="text-2xl font-bold mb-8">
        IT Support
      </h1>

      <nav className="space-y-2">
        {menus.map((menu) => {

  const hasChildren =
    "children" in menu

  if (hasChildren) {
    const isOpen =
      openMenu === menu.name

    return (
      <div key={menu.name}>
        <button
          onClick={() =>
            setOpenMenu(
              isOpen ? null : menu.name
            )
          }
          className="
            w-full
            flex
            items-center
            justify-between
            px-4
            py-3
            rounded-xl
            hover:bg-slate-800
            transition-all
          "
        >
          <span>{menu.name}</span>

          {isOpen ? (
            <ChevronDown size={18} />
          ) : (
            <ChevronRight size={18} />
          )}
        </button>

        {isOpen && (
          <div className="
            ml-4
            mt-2
            space-y-2
          ">
            {menu.children?.map((child) => {

              const isActive =
                pathname === child.href

              return (
                <Link
                  key={child.href}
                  href={child.href}
                  className={`
                    block
                    px-4
                    py-2
                    rounded-xl
                    text-sm
                    transition-all

                    ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "hover:bg-slate-800"
                    }
                  `}
                >
                  {child.name}
                </Link>
              )
            })}
          </div>
        )}
      </div>
    )
  }

  const isActive =
    pathname === menu.href

  return (
    <Link
      key={menu.href}
      href={menu.href}
      className={`
        block
        px-4
        py-3
        rounded-xl
        transition-all

        ${
          isActive
            ? "bg-blue-600 text-white"
            : "hover:bg-slate-800"
        }
      `}
    >
      {menu.name}
    </Link>
  )
})}
      </nav>
    </aside>
  )
}