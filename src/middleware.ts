import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decodeJwt } from "jose";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const cookie = request.cookies.get("session")?.value;

  if (cookie !== undefined) {
    try {
      const customNextResponse = NextResponse.redirect(
        new URL("/", request.nextUrl)
      );
      customNextResponse.cookies.delete("session");

      return customNextResponse;
    } catch (error) {
      console.log(error);
      return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
    }
  } else {
    return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
  }

  NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/profile"],
};
