import isFunction from 'lodash/isFunction'
import { AnimationChildren, FunctionChildren, NextCallback } from './type'

const style = document.createElement('div').style
export function getAnimationEnd() {
  if ('webkitanimationend' in style) {
    return 'webkitanimationend'
  }

  return 'animationend'
}

export function isAnimationChildren<P = {}>(
  children: AnimationChildren<P>
): children is FunctionChildren<P> {
  return isFunction(children)
}

export function createNextCallback(callback: () => void): NextCallback {
  let active = true
  const nextCallback: NextCallback = () => {
    if (!active) {
      return
    }
    callback()
    active = false
  }
  nextCallback.cancel = () => {
    active = false
  }
  return nextCallback
}
