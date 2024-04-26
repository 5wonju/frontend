import { NextRequest, NextResponse } from 'next/server'

const userDummyData = {
	userNickname: '떙땡이',
	winCount: 10,
	winRate: 57.2,
	userPoint: 200,
	exp: 15000,
	// "profileImg" : //추후 구현(url)
}

export async function GET(req: NextRequest) {
	// JSON content와 함께 NextResponse 객체 생성
	const access_token = req.cookies.get('access-token')?.value
	if (access_token && access_token === 'asdasdasfdsf') {
		return NextResponse.json(
			{ messege: '베리굿', isValid: true, data: userDummyData },
			{ status: 200 }
		)
	}
	return NextResponse.json({ error: '하하 바보' }, { status: 401 })
}
