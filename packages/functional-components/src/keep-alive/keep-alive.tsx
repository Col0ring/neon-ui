import React, { useEffect, useRef } from 'react'
import { useEventListener, useUnmount } from '@neon-ui/hooks'
import { CacheOptions } from './type'
import { useCacheContext } from './provider'
import { CachePrefix, CacheStatus } from './constants'
import { StandardProps } from '@neon-ui/misc/element-type'

export interface KeepAliveProps extends CacheOptions, StandardProps {}

const KeepAlive: React.FC<KeepAliveProps> = ({
  children,
  cacheId,
  scroll = false,
  ...rest
}) => {
  const [cacheState, cacheMethods] = useCacheContext()
  const keepAliveRef = useRef<HTMLDivElement | null>(null)
  useEventListener(keepAliveRef, 'scroll', (e) => {
    cacheMethods.cacheScroll(cacheId, e)
  })
  const cacheElement = cacheState[cacheId]
  const cacheStatus = cacheElement?.status
  const doms = cacheElement?.doms

  useEffect(() => {
    // cache  render
    if (
      doms &&
      (cacheStatus === CacheStatus.Created ||
        cacheStatus === CacheStatus.Activated)
    ) {
      cacheMethods.renderCacheDoms(cacheId, {
        scroll,
        parentNode: keepAliveRef.current!,
      })
    } else if (!cacheStatus || cacheStatus === CacheStatus.Destroy) {
      // first render
      cacheMethods.addCacheElement(cacheId, <>{children}</>)
    }
  }, [doms, cacheStatus, cacheMethods, cacheId, scroll, children])

  useEffect(() => {
    cacheElement?.status === CacheStatus.DeActivated &&
      cacheMethods.activate(cacheId)
  }, [cacheStatus, cacheId, cacheMethods, cacheElement?.status])

  useUnmount(() => {
    cacheMethods.deactivate(cacheId)
  })

  return (
    <div
      id={`${CachePrefix.keepaliveIdPrefix}-${cacheId}`}
      ref={keepAliveRef}
      {...rest}
    />
  )
}
KeepAlive.displayName = 'KeepAlive'
export { KeepAlive }
export default KeepAlive
