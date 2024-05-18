import { useEffect, useState } from 'react'

const audios: Map<string, () => void> = new Map()

const useAudio = (data: Record<string, string>): { loaded: boolean; audios: typeof audios } => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const audioPromiseList: Promise<void>[] = []
    Object.keys(data).map((key) => {
      const audioSource = data[key]

      const AudioContext = window.AudioContext
      const audioContext = new AudioContext()

      audioPromiseList.push(
        new Promise<void>(async (resolve, reject) => {
          try {
            const audio = await fetch(audioSource) // 오디오 파일을 가져옴
            const arrayBuffer = await audio.arrayBuffer() // 오디오 파일을 바이너리 데이터로 변환
            const audioBuffer = await audioContext.decodeAudioData(arrayBuffer) // 바이너리 데이터를 오디오 데이터로 변환

            // 사운드를 재생하는 함수를 audios에 저장
            // - 해당 함수를 사운드가 필요한 컴포넌트에서 호출하여 사운드를 재생
            audios.set(key, () => {
              // Buffer Source: 오디오 데이터를 재생하는 역할
              const trackSource = audioContext.createBufferSource()
              trackSource.buffer = audioBuffer
              trackSource.connect(audioContext.destination) // 오디오 데이터를 출력하는 장치를 연결 -> 현재 OS의 기본 출력 장치로 연결됨, 현재는 브라우저의 출력 장치로 연결됨

              // 하드웨어 자원 문제와 같은 이슈에 대한 처리
              if (audioContext.state === 'suspended') {
                audioContext.resume()
              }
              trackSource.start()
            })

            resolve()
          } catch (error) {
            reject(error)
          }
        })
      )
    })

    // 모든 오디오 파일을 로드하고 나면 loaded를 true로 변경
    Promise.all(audioPromiseList).then(() => {
      setLoaded(true)
    })
  }, [])

  //
  return { loaded, audios }
}

export default useAudio
