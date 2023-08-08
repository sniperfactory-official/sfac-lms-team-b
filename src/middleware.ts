import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  // 요청 헤더에서 로그인 여부를 확인할 수 있도록 쿠키에 접근
  const restrictedPaths = [
    "/classroom",
    "/mypage",
    "/assignment",
    "/community",
  ];
  const currentPath = request.nextUrl.pathname;

  // 쿠키에서 로그인 상태 확인
  const isLogin = request.cookies.get("uid");

  // 현재 경로가 '/'이고 로그인 되어 있다면, 다른 경로로 리디렉션
  console.log("currentPath:", currentPath);

  if (currentPath === "/" && isLogin) {
    return NextResponse.redirect(new URL("/classroom", request.url));
  }

  // 로그인이 안 되어 있고, 현재 경로가 제한된 경로 리스트에 포함되어 있다면 '/'로 리다이렉션
  if (!isLogin && restrictedPaths.includes(currentPath)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 로그인 상태면 원래 요청한 경로로 이동한다.
  return NextResponse.next();
}

//
export const config = {
  matcher: [
    "/classroom/:path*",
    "/community/:path*",
    "/assignment/:path*",
    "/",
    "/api",
  ],
};
