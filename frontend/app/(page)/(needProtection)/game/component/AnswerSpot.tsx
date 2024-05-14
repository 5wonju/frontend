import { Center, Cylinder, Text3D } from '@react-three/drei'
import { CylinderCollider, RigidBody } from '@react-three/rapier'
import React from 'react'
import { AnswerEnum } from '../lib/store-type'
import { useAnswerSelectStore, useRoundResultStore } from '../lib/store'

const AnswerSpot = () => {
  const answers = Object.values(AnswerEnum).slice(0, 4)
  const { selectAnswer, setSelectAnswer } = useAnswerSelectStore()
  
  return answers.map((answer, index) => (
    <group key={answer} rotation-y={((index + 1) / 4) * Math.PI * 2}>
      <group position-x={8} position-z={-8}>
        <RigidBody
          colliders={false}
          type="fixed"
          onCollisionEnter={() => {
            setSelectAnswer(answer as AnswerEnum)
          }}
        >
          <CylinderCollider args={[2 / 2, 3]} />
          <Cylinder scale={[3, 2, 3]}>
            <meshStandardMaterial color={answer === selectAnswer ? '#6466F1' : '#d4a9dc'} />
          </Cylinder>
        </RigidBody>

        <Center position-y={2.5}>
          <Text3D
            font={'/fonts/Geologica Thin_Regular.json'}
            size={2}
            rotation-y={((index + 1) / 4) * Math.PI * 2 * (index % 2 === 0 ? -1 : 1)}
            bevelEnabled={true}
            bevelThickness={0.3}
            bevelSize={0.05}
            bevelOffset={0.2}
          >
            {answer}
            <meshNormalMaterial />
          </Text3D>
        </Center>
      </group>
    </group>
  ))
}

export default AnswerSpot
