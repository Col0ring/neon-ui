import isFunction from 'lodash/isFunction'
import { AnimationChildren, FunctionChildren } from './type'

const style = document.createElement('div').style
export function getAnimationEnd() {
  if ('webkitAnimation' in style) {
    return 'webkitAnimationEnd'
  }

  return 'animationend'
}

export function isAnimationChildren<P = {}>(
  children: AnimationChildren<P>
): children is FunctionChildren<P> {
  return isFunction(children)
}
