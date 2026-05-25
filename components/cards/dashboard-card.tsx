import { LucideIcon } from "lucide-react"

type Props = {
  title: string
  value: string
  percent?: number
  icon: LucideIcon
}

export default function DashboardCard({
  title,
  value,
  percent,
  icon: Icon,
}: Props) {
  return (
    <div
      className="
        bg-slate-900
        border
        border-slate-800
        rounded-2xl
        p-5
        hover:border-blue-500
        transition-all
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-400 text-sm">
            {title}
          </p>

          <h2 className="text-2xl font-bold mt-1">
            {value}
          </h2>
        </div>

        <div className="
          p-3
          rounded-xl
          bg-slate-800
        ">
          <Icon size={22} />
        </div>
      </div>

      {/* Progress */}
      {percent !== undefined && (
        <div className="mt-4">
          <div className="
            w-full
            h-2
            bg-slate-800
            rounded-full
            overflow-hidden
          ">
            <div
              className="h-full bg-blue-500 rounded-full"
              style={{
                width: `${percent}%`,
              }}
            />
          </div>

          <p className="text-sm text-slate-400 mt-2">
            {percent}% usage
          </p>
        </div>
      )}
    </div>
  )
}