import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  let response = NextResponse.json({})
  // 액세스 토큰 제거
  response.cookies.delete('access-token')
  return response
}
