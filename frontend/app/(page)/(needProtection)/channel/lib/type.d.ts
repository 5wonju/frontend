interface IChannelData {
  name: string
  count: string
}

interface IChannelUIData {
  region: '서울' | '구미' | '대전' | '광주' | '부산'
  currentUsers: number
  maxUsers: number
  congestion: '쾌적' | '보통' | '혼잡' | '포화'
}

// const serverData = [
//   { name: '서울', count: '1000/1000' }, // 포화 (750-1000)
//   { name: '구미', count: '750/1000' }, // 혼잡 (500-749)
//   { name: '대전', count: '500/1000' }, // 보통 (250-499)
//   { name: '광주', count: '250/1000' }, // 쾌적 (0-249)
//   { name: '부산', count: '0/1000' }, 
// ]
