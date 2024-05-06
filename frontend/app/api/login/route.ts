import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  // TODO: 서버에 저장된 state 값과 동일한지 검증

  // JSON content와 함께 NextResponse 객체 생성
  const response = NextResponse.json({ state: 'dsadasds' })

  // response 객체에 쿠키 설정
  response.cookies.set('access-token', 'asdasdasfdsf', {
    httpOnly: true,
    sameSite: 'lax',
  })

  return response
}
