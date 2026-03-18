// GatherTix - Self-hosted ticketing platform for non-profits and community groups.
// Copyright (C) 2024 GatherTix Contributors
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program. If not, see <https://www.gnu.org/licenses/>.
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ── Configuration ─────────────────────────────────────────────────────────────

// The root domain for GatherTix (used to identify subdomain tenants).
// Set NEXT_PUBLIC_ROOT_DOMAIN in your environment, e.g. "gathertix.org"
const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN ?? "gathertix.org";

// Protected dashboard routes — require an active session
const protectedRoutes = ["/dashboard", "/admin"];

// Auth routes — redirect to dashboard if already logged in
const authRoutes = ["/login", "/register"];

// ── Middleware ────────────────────────────────────────────────────────────────

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hostname = request.headers.get("host") ?? "";

  // ── Multi-tenant subdomain routing ─────────────────────────────────────────
  // Detect subdomains of ROOT_DOMAIN (e.g. "mycharity.gathertix.org").
  // Requests to the root domain or www are treated as the main app.
  const isRootDomain =
    hostname === ROOT_DOMAIN ||
    hostname === `www.${ROOT_DOMAIN}` ||
    hostname === "localhost" ||
    hostname.startsWith("localhost:");

  if (!isRootDomain) {
    // Extract subdomain by stripping the root domain suffix
    const subdomain = hostname.endsWith(`.${ROOT_DOMAIN}`)
      ? hostname.slice(0, -(ROOT_DOMAIN.length + 1))
      : null;

    if (subdomain && subdomain !== "www") {
      // Rewrite to the organization's public landing pages, e.g.:
      //   mycharity.gathertix.org/events → /org/mycharity/events
      // The actual Next.js route at /org/[subdomain]/[...path] handles rendering.
      const rewriteUrl = new URL(
        `/org/${subdomain}${pathname}`,
        request.url
      );
      rewriteUrl.search = request.nextUrl.search;
      return NextResponse.rewrite(rewriteUrl);
    }
  }

  // ── Session-based access control (main app only) ────────────────────────────
  const sessionCookie = request.cookies.get("auth_session");

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // Redirect unauthenticated users away from protected routes
  if (isProtectedRoute && !sessionCookie) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated users away from auth routes
  if (isAuthRoute && sessionCookie) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public).*)"],
};
