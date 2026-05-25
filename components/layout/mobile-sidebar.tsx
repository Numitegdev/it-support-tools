"use client"

import { useEffect , useState } from "react"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {  checkLoginSession,} from "@/lib/auth"

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
  href: "/hardware-tools",

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
    {
      name: "IP Management",
      href: "/network-tools/ip-management",
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

export default function MobileSidebar() {
  const [open, setOpen] = useState(false)
  const [openMenu, setOpenMenu] =
  useState<string | null>(null)
  const pathname = usePathname()

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
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setOpen(true)}
        className="
          md:hidden
          p-2
          rounded-lg
          hover:bg-slate-800
        "
      >
        <Menu size={24} />
      </button>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="
            fixed
            inset-0
            bg-black/50
            z-40
          "
        />
      )}

      {/* Sidebar Mobile */}
      <aside
        className={`
          fixed
          top-0
          left-0
          h-full
          w-64
          bg-slate-900
          border-r
          border-slate-800
          z-50
          p-4
          transform
          transition-transform
          duration-300

          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-xl font-bold">
            IT Support
          </h1>

          <button
            onClick={() => setOpen(false)}
            className="p-2 rounded-lg hover:bg-slate-800"
          >
            <X size={20} />
          </button>
        </div>

        {/* Menu */}
        <nav className="space-y-2">
  {
 menus.map((menu) => {

  const isOpen =
    openMenu === menu.name

  const hasChildren =
    menu.children

  return (

    <div key={menu.name}>

      {/* Parent */}

      <button

        onClick={() => {

          if (hasChildren) {

            setOpenMenu(
              isOpen
                ? null
                : menu.name
            )

          }

        }}

        className="
          w-full
          flex
          items-center
          justify-between
          px-4
          py-3
          rounded-xl
          hover:bg-slate-800
        "
      >

        <span>
          {menu.name}
        </span>

        {hasChildren && (
          <span>
            {isOpen ? "−" : "+"}
          </span>
        )}

      </button>

      {/* CHILDREN */}

      {hasChildren && isOpen && (

        <div
          className="
            ml-4
            mt-2
            space-y-2
          "
        >

          {menu.children.map((child) => (

            <Link
              key={child.href}

              href={child.href}

              onClick={() => setOpen(false)}

              className="
                block
                px-4
                py-2
                rounded-lg
                text-sm
                text-slate-300
                hover:bg-slate-800
              "
            >

              {child.name}

            </Link>

          ))}

        </div>

      )}

      {/* NORMAL MENU */}

      {!hasChildren && menu.href && (

        <Link

          href={menu.href}

          onClick={() => setOpen(false)}

          className="
            hidden
          "
        />

      )}

    </div>

  )
})
  }
</nav>
      </aside>
    </>
  )
}
