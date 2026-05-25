import { NextResponse }
from "next/server"

import type {
  NextRequest,
} from "next/server"

export function middleware(
  req: NextRequest
) {

  const token =
    req.cookies.get("isLogin")

  const url =
    req.nextUrl.clone()

  if (!token) {

    if (
      url.pathname.startsWith(
        "/admin"
      )
    ) {

      url.pathname = "/login"

      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {

  matcher: [
    "/admin/:path*",
  ],
}