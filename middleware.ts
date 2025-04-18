import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const authenticated = request.cookies.get("authenticated")

  // Se o usuário está tentando acessar a página do gerador e não está autenticado
  if (request.nextUrl.pathname.startsWith("/generator") && authenticated?.value !== "true") {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/generator/:path*"],
}
