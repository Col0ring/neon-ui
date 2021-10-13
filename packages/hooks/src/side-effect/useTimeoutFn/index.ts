import { useCallback, useRef } from 'react'
import { NormalFunction } from '@neon-ui/misc/type-utils'
import useUnmount from '../../lifecycle/useUnmount'

enum TimeoutStatus {
  Free = 'free',
  Pending = 'pending',
  Canceled = 'cancelled',
  Called = 'called',
}

interface UseTimeoutFnReturn<T extends NormalFunction> {
  currentStatus: () => 'free' | 'pending' | 'cancelled' | 'called'
  cancel: () => void
  run: (...args: Parameters<T>) => void
}

function useTimeoutFn<T extends NormalFunction>(
  handler: T,
  ms = 0
): UseTimeoutFnReturn<T> {
  const status = useRef<TimeoutStatus>(TimeoutStatus.Free)
  const timeout = useRef<ReturnType<typeof setTimeout>>()
  const callback = useRef(handler)
  callback.current = handler

  const currentStatus = useCallback(() => status.current, [])

  const run = useCallback(
    (...args) => {
      status.current = TimeoutStatus.Pending
      timeout.current && clearTimeout(timeout.current)
      timeout.current = setTimeout(() => {
        status.current = TimeoutStatus.Called
        callback.current(...args)
      }, ms)
    },
    [ms]
  )

  const cancel = useCallback(() => {
    status.current = TimeoutStatus.Canceled
    timeout.current && clearTimeout(timeout.current)
  }, [])

  useUnmount(cancel)

  return {
    currentStatus,
    run,
    cancel,
  }
}

export type { UseTimeoutFnReturn, useTimeoutFn }
export default useTimeoutFn
