import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
	// JSON content와 함께 NextResponse 객체 생성
	const access_token = req.cookies.get('access_token')?.value
	if (access_token && access_token === 'asdasdasfdsf') {
		return NextResponse.json({ messege: '베리굿', isValid: true }, { status: 200 })
	}
	return NextResponse.json({ error: '하하 바보' }, { status: 401 })
}
