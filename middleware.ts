import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_COOKIE_NAME, isValidSessionToken } from "./app/lib/auth";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const authed = await isValidSessionToken(token);

  if (!authed) {
    const loginUrl = new URL("/admin", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/notices/:path*"],
};
