import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const cookieName=process.env.NODE_ENV ==="production"? "__Secure-next-auth.session-token":"next-auth.session-token"
  const token = await getToken({ req: request,cookieName });
  const { pathname } = request.nextUrl;

  const authRoutes = ["/login", "/register "];
  const protectedRoutes = ["/cart", "/profile", "/checkout"];

  if (token && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (!token && protectedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/cart", "/login", "/register"],
};
