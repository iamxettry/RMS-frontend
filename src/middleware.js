import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  let verify = request.cookies.has("loggedin");
  let { url } = request;
  let superuser= request?.cookies.has("superuser");
  let user = request?.cookies.has("user");


  if (!verify && url.includes("/dashboard")) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (verify && url.includes("/auth")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (superuser && url.includes("/dashboard/user/")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
 
  if (!superuser && url.includes("/dashboard/admin/")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  //   matcher: '/dashboard/:path*',
};
