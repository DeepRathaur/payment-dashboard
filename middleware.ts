import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

type Role = "OWNER" | "ADMIN" | "MEMBER" | "VIEWER";

const ROLE_HIERARCHY: Record<Role, number> = {
  OWNER: 4,
  ADMIN: 3,
  MEMBER: 2,
  VIEWER: 1,
};

// Routes that require authentication (dashboard)
const DASHBOARD_PREFIX = "/dashboard";

// Routes that require specific roles (e.g. only OWNER/ADMIN)
const ADMIN_ONLY_PATHS = ["/dashboard/settings", "/dashboard/users", "/dashboard/api-keys"];

// Public routes - no auth required
const PUBLIC_PATHS = ["/", "/login", "/register", "/forgot-password"];

// Auth routes - redirect to dashboard if already logged in
const AUTH_PATHS = ["/login", "/register"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // NextAuth API routes - never redirect
  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isPublic = PUBLIC_PATHS.some((p) => p === pathname || pathname.startsWith(p + "/"));
  const isAuthRoute = AUTH_PATHS.some((p) => pathname.startsWith(p));
  const isDashboard = pathname.startsWith(DASHBOARD_PREFIX);
  const isAdminOnlyPath = ADMIN_ONLY_PATHS.some((p) => pathname.startsWith(p));

  // Allow public and static
  if (isPublic && !isDashboard) {
    if (token && isAuthRoute) {
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // Dashboard and other protected routes
  if (isDashboard || (!isPublic && !isAuthRoute)) {
    if (!token) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }

    const role = (token.role ?? "VIEWER") as Role;

    if (isAdminOnlyPath) {
      const adminMin = ROLE_HIERARCHY.ADMIN;
      if (ROLE_HIERARCHY[role] < adminMin) {
        const url = request.nextUrl.clone();
        url.pathname = "/dashboard";
        return NextResponse.redirect(url);
      }
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
