import { NextResponse } from 'next/server'

const serverData = [
  { name: '서울', count: '1000/1000' }, // 포화 (750-1000)
  { name: '구미', count: '750/1000' }, // 혼잡 (500-749)
  { name: '대전', count: '500/1000' }, // 보통 (250-499)
  { name: '광주', count: '250/1000' }, // 쾌적 (0-249)
  { name: '부산', count: '0/1000' }, 
]

export async function GET(req: Request) {
  return NextResponse.json(serverData, { status: 200 })
}
