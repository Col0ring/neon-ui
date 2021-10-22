import { useState, Dispatch, SetStateAction } from 'react'
import isFunction from 'lodash/isFunction'
import useSsrLayoutEffect from '../../../lifecycle/useSsrLayoutEffect'
import useUnmount from '../../../lifecycle/useUnmount'

function createGlobalState<S>(initialState: S | (() => S)) {
  const store: {
    state: S
    setState: Dispatch<SetStateAction<S>>
    setters: Dispatch<SetStateAction<S>>[]
  } = {
    state: isFunction(initialState) ? initialState() : initialState,
    setState(nextState) {
      if (isFunction(nextState)) {
        store.state = nextState(store.state)
      } else {
        store.state = nextState
      }
      store.setters.forEach((setter) => setter(store.state))
    },
    setters: [],
  }

  return function useGlobalState() {
    const [globalState, stateSetter] = useState<S>(store.state)

    useUnmount(() => {
      // 移除 stateSetter
      store.setters = store.setters.filter((setter) => setter !== stateSetter)
    })

    useSsrLayoutEffect(() => {
      if (!store.setters.includes(stateSetter)) {
        store.setters.push(stateSetter)
      }
    }, [])

    return [globalState, store.setState] as const
  }
}

export { createGlobalState }
export default createGlobalState
