import { randomUUID } from 'crypto'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
	const access_token = req.cookies.get('access-token')?.value
	if (access_token && access_token === 'asdasdasfdsf') {
		const socketToken = randomUUID()
		return NextResponse.json({ socketToken: socketToken }, { status: 200 })
	}
	return NextResponse.json({ error: '하하 바보' }, { status: 401 })
}
