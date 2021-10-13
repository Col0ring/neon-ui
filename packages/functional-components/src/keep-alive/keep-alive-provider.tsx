import React, { useMemo } from 'react'
import { CachePrefix, CacheStatus } from './constants'
import { useCacheContext, withCacheProvider } from './provider'

const KeepAliveProvider: React.FC = ({ children }) => {
  const [cacheState, cacheMethods] = useCacheContext()
  const renderState = useMemo(
    () =>
      Object.values(cacheState).filter(
        (state) => state && state.status !== CacheStatus.Destroy
      ),
    [cacheState]
  )
  return (
    <>
      {children}
      {renderState.map(({ cacheId, doms, element }) => (
        <div
          id={`${CachePrefix.cacheContainerIdPrefix}-${cacheId}`}
          key={cacheId}
          ref={(dom) => {
            if (dom && doms.length === 0) {
              const newDoms = [...dom.childNodes]
              cacheMethods.addCacheDoms(cacheId, newDoms as HTMLElement[])
            }
          }}
        >
          {element}
        </div>
      ))}
    </>
  )
}

export default withCacheProvider(KeepAliveProvider)
