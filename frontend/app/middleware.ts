// import { NextRequest, NextResponse } from 'next/server'

// function checkProtectedRoutes(pathname: string): boolean {
//   // 보호받아야 하는 경로 목록
//   const protectedRoutes = ['/channel', '/lobby']

//   // 현재 경로가 보호받아야 하는 경로인지 확인
//   return protectedRoutes.some((protectedPath) => pathname.startsWith(protectedPath))
// }

// export function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl
//   console.log('???')
//   // 세션 토큰 확인
//   const accessToken = req.cookies.get('access-token')

//   // 사용자가 로그인하지 않았고 보호받아야 하는 경로에 접근 시도 시
//   if (!accessToken && checkProtectedRoutes(pathname)) {
//     // 로그인 페이지로 리디렉션
//     const url = req.nextUrl.clone()
//     url.pathname = '/login' // 로그인 페이지 경로 설정
//     return NextResponse.redirect(url)
//   }

//   return NextResponse.next()
// }
