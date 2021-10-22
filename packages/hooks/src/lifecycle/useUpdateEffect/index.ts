import { useEffect } from 'react'
import useFirstMountState from '../../state/useFirstMountState'

const useUpdateEffect: typeof useEffect = (effect, deps) => {
  const isFirstMount = useFirstMountState()

  useEffect(() => {
    if (!isFirstMount) {
      return effect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

export { useUpdateEffect }
export default useUpdateEffect
