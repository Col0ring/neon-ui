import { useEffect } from 'react'

const useEffectOnce = (effect: Parameters<typeof useEffect>[0]) =>
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, [])
export { useEffectOnce }
export default useEffectOnce
