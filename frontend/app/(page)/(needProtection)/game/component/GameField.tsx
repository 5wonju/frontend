import { Cylinder, MeshReflectorMaterial, OrbitControls } from '@react-three/drei'
import { CuboidCollider, CylinderCollider, RigidBody } from '@react-three/rapier'
import AnswerSpot from './AnswerSpot'
import React, { useEffect } from 'react'
import CharacterController from './CharacterController'
import { useAnswerSelectStore, useGameRoomStore, usePlayerStore } from '../lib/store'
import { AnswerEnum, gameStateEnum, teamEnum } from '../lib/store-type'
import TeamSpot from './TeamSpot'
import OtherPlayers from './OtherPlayers'
import { useWaitingRoom } from '@/app/hooks/useSocket'
import { useAuth } from '@/app/hooks/useAuth'

const GameField = () => {
  const { startGame, gameState, setIsRoomOwner, gameUserList } = useGameRoomStore((state) => ({
    startGame: state.startGame,
    gameState: state.gameState,
    setIsRoomOwner: state.setIsRoomOwner,
    gameUserList: state.gameUserList,
  }))
  const { selectTeam } = useWaitingRoom()
  const { setPlayerTeamState } = usePlayerStore((state) => ({
    setPlayerTeamState: state.setPlayerTeamState,
  }))
  const { setSelectAnswer } = useAnswerSelectStore()
  const { userInfo } = useAuth()

  // 메인 필드에 닿았을 때 (선택한 팁 or 선택한 답) 초기화
  const handleEnterMainField = () => {
    switch (gameState) {
      case gameStateEnum.READY:
        setPlayerTeamState(teamEnum.NONE)
        selectTeam(teamEnum.NONE)
        break
      case gameStateEnum.GAME:
        setSelectAnswer(AnswerEnum.NONE)
        break
    }
  }

  // 유저가 방장인지 정보를 받아와서 store에 저장
  if (gameUserList) {
    const roomOwner = gameUserList.find(
      (user) => user.userNickname === userInfo.nickname
    )?.roomOwner
    if (roomOwner !== undefined) {
      setIsRoomOwner(roomOwner)
    }
  }

  // 개발용 게임 시작
  // useEffect(() => {
  //   startGame()
  // }, [])

  return (
    <>
      {/* 카메라 컨트롤 */}
      <OrbitControls />
      <fog attach="fog" args={['#dbecfb', 30, 50]} />

      {/* 조명 */}
      <ambientLight intensity={2} />
      <directionalLight
        position={[30, 50, 30]}
        intensity={2.8}
        castShadow
        color={'white'}
        shadow-camera-top={10}
        shadow-camera-right={10}
        shadow-camera-bottom={-10}
        shadow-camera-left={-10}
        shadow-camera-near={10}
        shadow-camera-far={100}
      />

      {/* 배경 필드 */}
      <RigidBody colliders={false} type="fixed" name="void">
        <mesh position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[50, 50]} />
          <MeshReflectorMaterial
            blur={[400, 400]}
            resolution={1024}
            mixBlur={1}
            mixStrength={15}
            depthScale={1}
            minDepthThreshold={0.85}
            color="#dbecfb"
            metalness={0.6}
            roughness={1}
            mirror={1}
          />
        </mesh>
        <CuboidCollider position={[0, -3.5, 0]} args={[50, 0.1, 50]} sensor />
      </RigidBody>

      {/* 게임 필드 */}
      <group position-y={-1}>
        {/* 중앙 필드 */}
        <RigidBody
          colliders={false}
          type="fixed"
          position-y={-0.5}
          friction={4}
          onCollisionEnter={handleEnterMainField}
        >
          <CylinderCollider args={[1, 10]} />
          <Cylinder scale={[10, 2, 10]} receiveShadow>
            <meshStandardMaterial color="white" />
          </Cylinder>
        </RigidBody>

        <CharacterController />
        {/* 게임 상태에 따른 필드 변경 */}
        {gameState === gameStateEnum.GAME ? <AnswerSpot /> : <TeamSpot />}
        {/* <>TODO: OtherPlayers -> Socket에서 데이터 받기 map()
        안에다가 OtherCharacter -> pos, action, 이것저것 props 캐릭터 렌더링 </> */}
        <OtherPlayers />
      </group>
    </>
  )
}

export default GameField
