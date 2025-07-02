import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const path = request.nextUrl.pathname;
  
  // Public paths that don't require authentication
  const publicPaths = ["/", "/login", "/get-started", "/reset-password"];
  const isPublicPath = publicPaths.includes(path);

  // If the user is not authenticated and trying to access a protected route
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If the user is authenticated and trying to access login or get-started
  if (token && (path === "/login" || path === "/get-started")) {
    // Redirect based on user role
    if (token.role === "COACH") {
      return NextResponse.redirect(new URL("/coach", request.url));
    } else {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  // Role-based access control
  if (token) {
    // Coach-only routes
    if (path.startsWith("/coach") && token.role !== "COACH") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // Customer-only routes
    if (path.startsWith("/dashboard") && token.role !== "CUSTOMER") {
      return NextResponse.redirect(new URL("/coach", request.url));
    }

    // Redirect to onboarding if not completed
    if (path !== "/onboarding" && token.onboardingComplete === false) {
      return NextResponse.redirect(new URL("/onboarding", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
}; 