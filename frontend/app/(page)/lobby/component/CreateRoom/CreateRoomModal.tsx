import { useGameSocketStore } from '@/app/lib/store'
import React, { useEffect, useState } from 'react'
import SelectPlayerCount from './SelectPlayerCount'
import SelectGameMode from './SelectGameMode'
import WriteRoomName from './WriteRoomName'

export function CreateRoomModal({ onModalClose }: { onModalClose: () => void }) {
	const [roomName, setRoomName] = useState('')
	const [roomPw, setRoomPw] = useState('') // Todo : 비밀번호 추가 필요
	const [probCategory, setProbCategory] = useState('') // Todo : 카테고리 추가 필요
	const [playerCount, setPlayerCount] = useState(2)
	const [gameMode, setGameMode] = useState('basic')
	const [probNum, setProbNum] = useState('') // Todo : 문제 수 추가 필요

	const { gameSocket } = useGameSocketStore() // zustand에서 소켓 가져오기

	// Todo : setupGameSocket으로 로직 빼서 관리
	// 게임 소켓 셋팅
	useEffect(() => {
		if (gameSocket === null) return

		// WebSocket 메시지 수신 핸들러
		gameSocket.onmessage = (event) => {
			const response = JSON.parse(event.data)
			if (response.success) {
				console.log('Room created:', response.data)
				// Todo : 추가적인 응답 처리 로직
			} else {
				console.error('Failed to create room:', response.error)
				// Todo : 오류 처리 로직
			}
		}

		return () => {
			if (gameSocket === null) return
			gameSocket.onmessage = null // 핸들러 제거
		}
	}, [gameSocket])

	// Todo : API 명세서에 따라 방 데이터 변경 필요
	const handleCreateRoom = () => {
		const roomData = {
			roomTitle: roomName,
			roomPW: 'need to develop',
			probCategory: 'need to develop',
			maxUserNum: playerCount,
			roomMode: gameMode,
			probNum: 'need to develop',
		}

		// 소켓을 이용해서 메세지 보내기
		gameSocket && gameSocket.send(JSON.stringify({ action: 'createRoom', data: roomData }))

		onModalClose()
	}

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
			<div className="bg-white p-4 rounded-lg shadow-lg">
				<h2 className="text-lg font-bold">Create Room</h2>

				<WriteRoomName roomName={roomName} setRoomName={setRoomName} />
				<SelectPlayerCount playerCount={playerCount} setPlayerCount={setPlayerCount} />
				<SelectGameMode gameMode={gameMode} setGameMode={setGameMode} />

				<div className="mt-4 flex justify-end space-x-2">
					<button className="px-4 py-2 bg-gray-300 rounded" onClick={onModalClose}>
						취소하기
					</button>
					<button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handleCreateRoom}>
						생성하기
					</button>
				</div>
			</div>
		</div>
	)
}

export default CreateRoomModal
