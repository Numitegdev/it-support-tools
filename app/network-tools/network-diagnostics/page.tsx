"use client"

import DashboardLayout from "@/components/layout/dashboard-layout"

const tools = [

  {
    name: "Speedtest",
    description:
      "Check download speed, upload speed, ping, and jitter.",

    url: "https://www.speedtest.net",

    icon: "⚡",

    category: "Internet",
  },

  {
    name: "Fast.com",
    description:
      "Simple Netflix internet speed checker.",

    url: "https://fast.com",

    icon: "🚀",

    category: "Internet",
  },

  {
    name: "Ping Test",
    description:
      "Test latency, packet routing, and response time.",

    url: "https://ping.pe",

    icon: "📡",

    category: "Network",
  },

  {
    name: "Traceroute",
    description:
      "Analyze network routing path and hops.",

    url: "https://ping.pe/traceroute",

    icon: "🛰️",

    category: "Network",
  },

  {
    name: "DNS Checker",
    description:
      "Check DNS propagation and DNS records worldwide.",

    url: "https://dnschecker.org",

    icon: "🌐",

    category: "DNS",
  },

  {
    name: "Port Checker",
    description:
      "Check open and closed ports from public internet.",

    url: "https://www.yougetsignal.com/tools/open-ports/",

    icon: "🔐",

    category: "Security",
  },

  {
    name: "IP Lookup",
    description:
      "Check ISP, ASN, geolocation, and public IP information.",

    url: "https://whatismyipaddress.com",

    icon: "🧭",

    category: "Internet",
  },

  {
    name: "SSL Checker",
    description:
      "Analyze SSL certificate and HTTPS security.",

    url: "https://www.ssllabs.com/ssltest/",

    icon: "🔒",

    category: "Security",
  },

  {
    name: "WHOIS Lookup",
    description:
      "Check domain ownership and registrar information.",

    url: "https://who.is",

    icon: "📄",

    category: "Domain",
  },

  {
    name: "Subnet Calculator",
    description:
      "Calculate subnet mask, CIDR, and network ranges.",

    url: "https://www.calculator.net/ip-subnet-calculator.html",

    icon: "🧮",

    category: "Networking",
  },

]

export default function NetworkToolsPage() {

  return (

    <DashboardLayout>

      <div className="space-y-6">

        {/* HEADER */}

        <div>

          <div
            className="
              inline-flex
              items-center
              gap-2
              bg-blue-500/10
              border
              border-blue-500/20
              px-4
              py-2
              rounded-full
              text-blue-400
              text-sm
              mb-4
            "
          >
            IT Network Utilities
          </div>

          <h1 className="text-4xl font-black tracking-tight">
            Network Tools
          </h1>

          <p className="text-slate-400 mt-2 max-w-2xl">
            Collection of useful network diagnostics,
            internet testing, DNS, security,
            and troubleshooting tools.
          </p>

        </div>

        {/* GRID */}

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-3
            gap-5
          "
        >

          {tools.map((tool) => (

            <div
              key={tool.name}

              className="
                bg-slate-900
                border
                border-slate-800
                rounded-3xl
                p-6
                flex
                flex-col
                justify-between
                hover:border-blue-500/40
                hover:bg-slate-800/70
                transition-all
                duration-300
                shadow-xl
              "
            >

              <div className="space-y-4">

                <div
                  className="
                    w-16
                    h-16
                    rounded-2xl
                    bg-blue-500/10
                    border
                    border-blue-500/20
                    flex
                    items-center
                    justify-center
                    text-3xl
                  "
                >
                  {tool.icon}
                </div>

                <div>

                  <div
                    className="
                      text-xs
                      text-blue-400
                      mb-2
                      uppercase
                      tracking-wider
                    "
                  >
                    {tool.category}
                  </div>

                  <h2
                    className="
                      text-2xl
                      font-bold
                    "
                  >
                    {tool.name}
                  </h2>

                </div>

                <p
                  className="
                    text-slate-400
                    text-sm
                    leading-relaxed
                  "
                >
                  {tool.description}
                </p>

              </div>

              <a
                href={tool.url}

                target="_blank"

                rel="noopener noreferrer"

                className="
                  mt-6
                  inline-flex
                  items-center
                  justify-center
                  bg-blue-600
                  hover:bg-blue-700
                  py-3
                  rounded-2xl
                  font-medium
                  transition-all
                "
              >
                Open Tool
              </a>

            </div>

          ))}

        </div>

      </div>

    </DashboardLayout>
  )
}