export const getCongestion = (currentUsers: number) => {
  return currentUsers === 1000
    ? '포화'
    : currentUsers >= 750
    ? '혼잡'
    : currentUsers >= 500
    ? '보통'
    : currentUsers >= 250
    ? '쾌적'
    : '쾌적'
}
