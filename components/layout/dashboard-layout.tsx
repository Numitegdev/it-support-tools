import Sidebar from "./sidebar"
import Topbar from "./topbar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Topbar />

        <main
        className="
          flex-1
          p-3
          md:p-6
          w-full
          overflow-x-hidden
        "
      >
          {children}
        </main>
      </div>
    </div>
  )
}