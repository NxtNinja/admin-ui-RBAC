import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const cookie = request.cookies.get("session")?.value;

  // If session cookie exists, do a redirect to the homepage
  if (cookie !== undefined) {
    try {
      // Create a response and delete the cookie
      const customNextResponse = NextResponse.redirect(
        new URL("/", request.nextUrl)
      );
      customNextResponse.cookies.delete("session"); // Delete session cookie
      return customNextResponse; // Return the response with the deleted cookie
    } catch (error) {
      console.log(error);
      // Redirect to login if an error occurs
      return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
    }
  } else {
    // If the session cookie is not found, redirect to login
    return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
  }
}

// Define which paths this middleware will apply to
export const config = {
  matcher: ["/", "/profile"], // Apply middleware to these paths
};
