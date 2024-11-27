import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Retrieve session cookie from the request
  const cookie = request.cookies.get("session")?.value;

  // If the session exists, allow the request to proceed
  if (cookie) {
    return NextResponse.next();
  } else {
    // If no session, redirect the user to the login page
    return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
  }
}

// Specify which routes the middleware applies to
export const config = {
  matcher: ["/", "/profile"], // Customize as needed
};
