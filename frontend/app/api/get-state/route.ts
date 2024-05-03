import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  // 서버로부터 state 값 발급
  return NextResponse.json({ state: 'dsadasds' }, { status: 200 })
}
