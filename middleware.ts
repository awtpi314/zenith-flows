import { NextResponse } from "next/server";
import { auth } from "./auth";
import { NextAuthRequest } from "next-auth";

// Paths that don't require authentication
const publicPaths = ["/"];

// Always public paths
const alwaysPublic = [
  "/_next",
  "/.well-known",
  "/favicon.ico",
  "/robots.txt",
  "/api/auth",
];

// Static file extensions
const staticExts = [
  ".ico",
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".webp",
  ".svg",
  ".css",
  ".js",
  ".woff",
  ".woff2",
];

function isPublicPath(pathname: string): boolean {
  return (
    alwaysPublic.some((path) => pathname.startsWith(path)) ||
    staticExts.some((ext) => pathname.endsWith(ext)) ||
    publicPaths.includes(pathname)
  );
}

function isAuthenticated(request: NextAuthRequest): boolean {
  return !!request.auth && !!request.auth.user;
}

export default auth((req) => {
  const { pathname } = req.nextUrl;

  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  if (!isAuthenticated(req)) {
    const loginUrl = new URL("/api/auth/signin", req.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
});
