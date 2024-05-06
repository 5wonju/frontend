import { NextResponse } from 'next/server'

const serverData = [
  { name: '구미', count: '654/1000' },
  { name: '서울', count: '200/1000' },
  { name: '아귀찮ㄷ', count: '23/321' },
]

export async function GET(req: Request) {
  return NextResponse.json(serverData, { status: 200 })
}
