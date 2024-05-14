import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'

function WebGLContextManager() {
  const { gl, camera } = useThree() // R3F의 useThree 훅을 사용하여 WebGL renderer와 camera를 가져옵니다.

  useEffect(() => {
    const handleContextLost = (event: any) => {
      event.preventDefault() // 기본 동작 방지
      console.log('WebGL context lost. Attempting to restore...')

      // 컨텍스트 복원 시도
      gl.forceContextRestore()
    }

    const handleContextRestored = () => {
      console.log('WebGL context restored.')
      // 필요한 경우 컨텍스트 복원 후 추가 초기화 수행
    }

    const canvas = gl.domElement
    canvas.addEventListener('webglcontextlost', handleContextLost, false)
    canvas.addEventListener('webglcontextrestored', handleContextRestored, false)

    return () => {
      canvas.removeEventListener('webglcontextlost', handleContextLost)
      canvas.removeEventListener('webglcontextrestored', handleContextRestored)
    }
  }, [gl])

  return null // 이 컴포넌트는 시각적 출력을 하지 않습니다.
}

export default WebGLContextManager
