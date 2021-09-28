import React, { useEffect, useRef } from 'react'
import { useEventListener, useUnmount } from '@neon-ui/hooks'
import { CacheOptions } from '../type'
import { useCacheContext } from './provider'
import { CacheStatus } from './constants'

export interface KeepAliveProps extends CacheOptions {
  className?: string
  style?: React.CSSProperties
}
const KeepAlive: React.FC<KeepAliveProps> = ({
  children,
  cacheId,
  className,
  style,
  scroll = false,
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
      (cacheStatus === CacheStatus.CREATED ||
        cacheStatus === CacheStatus.ACTIVATED)
    ) {
      cacheMethods.renderCacheDoms(cacheId, {
        scroll,
        parentNode: keepAliveRef.current!,
      })
    } else if (!cacheStatus || cacheStatus === CacheStatus.DESTROY) {
      // first render
      cacheMethods.addCacheElement(cacheId, <>{children}</>)
    }
  }, [doms, cacheStatus, cacheMethods, cacheId, scroll, children])

  useEffect(() => {
    cacheElement?.status === CacheStatus.DEACTIVATED &&
      cacheMethods.activate(cacheId)
  }, [cacheStatus, cacheId, cacheMethods, cacheElement?.status])

  useUnmount(() => {
    cacheMethods.deactivate(cacheId)
  })

  return (
    <div
      id={`keepalive-cache-${cacheId}`}
      ref={keepAliveRef}
      className={className}
      style={style}
    />
  )
}

export { KeepAlive }
export default KeepAlive
