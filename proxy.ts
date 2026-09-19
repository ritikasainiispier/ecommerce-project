import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const hostname = request.nextUrl.hostname;

  if (hostname === "ritika.aavdigitalmarketing.co") {
    const url = request.nextUrl.clone();

    if (url.pathname === "/") {
      url.pathname = "/ritika";
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};