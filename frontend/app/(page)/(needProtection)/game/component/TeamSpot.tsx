import { Center, Cylinder, Text3D } from '@react-three/drei'
import { CylinderCollider, RigidBody } from '@react-three/rapier'
import React from 'react'
import { usePlayerStore } from '../lib/store'
import { teamEnum } from '../lib/store-type'
import { useGame } from '@/app/hooks/useSocket'
import { useAuth } from '@/app/hooks/useAuth'

const TeamSpot = () => {
  const { selectTeam } = useGame()
  const {
    userInfo: { nickname },
  } = useAuth()

  const { setPlayerTeamState } = usePlayerStore((state) => ({
    setPlayerTeamState: state.setPlayerTeamState,
  }))

  const handleEnterTeamSpot = (teamColor: teamEnum) => {
    setPlayerTeamState(teamColor)
    selectTeam(teamColor, nickname)
  }

  const answers = [teamEnum.RED, teamEnum.BLUE]
  const RED_ROTATION = 5.5
  const BLUE_ROTATION = 2.5

  return answers.map((teamColor) => (
    <group key={teamColor} rotation-y={teamColor === teamEnum.BLUE ? BLUE_ROTATION : RED_ROTATION}>
      <group position-x={8} position-z={-8}>
        <RigidBody
          colliders={false}
          type="fixed"
          onCollisionEnter={() => handleEnterTeamSpot(teamColor)}
        >
          <CylinderCollider args={[2 / 2, 3]} />
          <Cylinder scale={[3, 2, 3]}>
            <meshStandardMaterial
              color={teamColor === teamEnum.RED ? teamEnum.RED : teamEnum.BLUE}
            />
          </Cylinder>
        </RigidBody>

        <Center position-y={2.5}>
          <meshNormalMaterial />
        </Center>
      </group>
    </group>
  ))
}

export default TeamSpot
