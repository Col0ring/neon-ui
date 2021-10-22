import { useEffect, useLayoutEffect } from 'react'
import { isBrowser } from '@neon-ui/misc/env'

const useSsrLayoutEffect = isBrowser() ? useLayoutEffect : useEffect

export { useSsrLayoutEffect }
export default useSsrLayoutEffect
