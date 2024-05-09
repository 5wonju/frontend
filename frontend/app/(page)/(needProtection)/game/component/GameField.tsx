import { Cylinder, MeshReflectorMaterial, OrbitControls } from '@react-three/drei'
import { CuboidCollider, CylinderCollider, RigidBody } from '@react-three/rapier'
import AnswerSpot from './AnswerSpot'
import React, { useEffect } from 'react'
import CharacterController from './CharacterController'
import { teamEnum, useGameRoomStore, usePlayerStore } from '../lib/store'
import OtherPlayers from './OtherPlayers'

const GameField = () => {
  const { startGame, gameState } = useGameRoomStore()
  const { setPlayerTeamState } = usePlayerStore((state) => ({
    setPlayerTeamState: state.setPlayerTeamState,
  }))
  useEffect(() => {
    startGame()
  })
  return (
    <>
      {/* 카메라 컨트롤 */}
      <OrbitControls />
      <fog attach="fog" args={['#dbecfb', 30, 50]} />

      {/* 조명 */}
      <ambientLight intensity={2} />
      <directionalLight position={[30, 50, 30]} intensity={2.8} castShadow color={'white'} />

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
          onCollisionEnter={() => setPlayerTeamState(teamEnum.NONE)}
        >
          <CylinderCollider args={[1, 10]} />
          <Cylinder scale={[10, 2, 10]} receiveShadow>
            <meshStandardMaterial color="white" />
          </Cylinder>
        </RigidBody>

        <CharacterController />
        {/* 게임 상태에 따른 필드 변경 */}
        {/* {gameState === gameStateEnum.GAME ? <AnswerSpot /> : <TeamSpot />} */}
        {/* <>TODO: OtherPlayers -> Socket에서 데이터 받기 map()
        안에다가 OtherCharacter -> pos, action, 이것저것 props 캐릭터 렌더링 </> */}
        <OtherPlayers />
        <AnswerSpot />
        {/* <TeamSpot /> */}
      </group>
    </>
  )
}

export default GameField
