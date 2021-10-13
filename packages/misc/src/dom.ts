import React from 'react'
import type { DomElement, DomParam } from './type-utils'

export function isDomRef<T extends DomElement = DomElement>(
  value: DomParam<T>
): value is React.RefObject<T> {
  return (
    value && typeof value === 'object' && Object.keys(value).includes('current')
  )
}

export function getDomElement<T extends DomElement>(
  ref: DomParam<T>
): T | null {
  if (isDomRef(ref)) {
    return ref.current
  }
  return ref
}

export function getRect<T extends Element>(element: T) {
  return element.getBoundingClientRect()
}

export function getParentOffset(
  element: HTMLElement,
  isTarget: (node: Node) => boolean
) {
  let { offsetTop, offsetLeft } = element
  let offsetParent = element.offsetParent as HTMLElement
  while (offsetParent) {
    offsetTop += offsetParent.offsetTop
    offsetLeft += offsetParent.offsetLeft
    if (isTarget(offsetParent)) {
      return {
        offsetTop,
        offsetLeft,
      }
    }
    offsetParent = offsetParent.offsetParent as HTMLElement
  }
  return {
    offsetTop: 0,
    offsetLeft: 0,
  }
}

export function getPageOffset(element: HTMLElement) {
  return getParentOffset(element, (node) => node === document.body)
}

export function getParentNode(
  node: Node,
  isTarget: (node: Node) => boolean
): Node | null {
  let parentNode: Node | null = node
  while (parentNode) {
    if (isTarget(parentNode)) {
      return parentNode
    }
    parentNode = parentNode.parentNode
  }

  return null
}
