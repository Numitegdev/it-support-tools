type Props = {
  title: string
  value: string
}

export default function DeviceInfoCard({
  title,
  value,
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
      <p className="text-slate-400 text-sm">
        {title}
      </p>

      <h2 className="text-xl font-semibold mt-2 break-words">
        {value}
      </h2>
    </div>
  )
}