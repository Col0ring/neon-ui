import { useEffect } from 'react'
import { CacheStatus } from './constants'
import { useCacheContext } from './provider'

export function useKeepAlive() {
  const [, { clear, refresh }] = useCacheContext()
  return { clear, refresh }
}

export function useActivateEffect(
  fn: (cacheId: string) => void,
  cacheIds?: string[]
) {
  const [cacheState] = useCacheContext()
  useEffect(() => {
    Object.values(cacheState).forEach(({ status, cacheId }) => {
      if (status === CacheStatus.Activated) {
        if (!cacheIds || cacheIds?.includes(cacheId)) {
          fn(cacheId)
        }
      }
    })
  }, [cacheIds, cacheState, fn])
}

export function useDeactivateEffect(
  fn: (cacheId: string) => void,
  cacheIds?: string[]
) {
  const [cacheState] = useCacheContext()
  useEffect(() => {
    Object.values(cacheState).forEach(({ status, cacheId }) => {
      if (status === CacheStatus.DeActivated) {
        if (!cacheIds || cacheIds?.includes(cacheId)) {
          fn(cacheId)
        }
      }
    })
  }, [cacheIds, cacheState, fn])
}
