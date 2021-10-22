import React from 'react'
import type { DomElement, DomParam, NormalFunction } from './type-utils'
import { noop } from './utils'

// event
export function preventDefault(e: React.UIEvent) {
  e.preventDefault()
}
export function stopPropagation(e: React.UIEvent) {
  e.stopPropagation()
}

function on<K extends keyof HTMLElementEventMap>(
  ref: DomParam,
  eventName: K,
  handler: (ev: HTMLElementEventMap[K]) => void,
  options?: EventListenerOptions
): void
function on<K extends keyof ElementEventMap>(
  ref: DomParam,
  eventName: K,
  handler: (ev: ElementEventMap[K]) => void,
  options?: EventListenerOptions
): void
function on<K extends keyof DocumentEventMap>(
  ref: DomParam,
  eventName: K,
  handler: (ev: DocumentEventMap[K]) => void,
  options?: EventListenerOptions
): void
function on<K extends keyof WindowEventMap>(
  ref: DomParam,
  eventName: K,
  handler: (ev: WindowEventMap[K]) => void,
  options?: EventListenerOptions
): void
function on(
  ref: DomParam,
  eventName: string,
  handler: NormalFunction,
  options: EventListenerOptions
): void
function on(
  ref: DomParam,
  eventName: string,
  handler: NormalFunction,
  options: AddEventListenerOptions = {}
) {
  const el = getDomElement(ref)
  const eventListener: EventListener = (e) => handler(e)
  el?.addEventListener(eventName, eventListener, options)
  return function off() {
    el?.removeEventListener(eventName, eventListener, options)
  }
}

export { on }

// ref
export function isRefObject<T>(ref: React.Ref<T>): ref is React.RefObject<T> {
  return !!(ref && typeof ref !== 'function')
}

export function toFnRef<T>(ref?: React.Ref<T>): React.RefCallback<T> {
  if (!ref) {
    return noop
  }
  return isRefObject(ref)
    ? (value) => {
        // eslint-disable-next-line @typescript-eslint/no-extra-semi
        ;(ref as React.MutableRefObject<T | null>).current = value
      }
    : ref
}

export function mergeRef<T>(
  ...refs: (React.Ref<T> | undefined)[]
): React.RefCallback<T> {
  const refFns = refs.map((ref) => toFnRef(ref))
  return (value) => {
    refFns.forEach((refFn) => refFn(value))
  }
}

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

// dom rect/offset
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

// className
export function hasClass(target: Element, className: string): boolean {
  if (target.classList) {
    return !!className && target.classList.contains(className)
  }
  return ` ${target.className} `.indexOf(` ${className} `) !== -1
}
export function addClass(target: Element, className: string): Element {
  if (className) {
    if (target.classList) {
      target.classList.add(className)
    } else if (!hasClass(target, className)) {
      target.className = `${target.className} ${className}`
    }
  }
  return target
}
export function removeClass(target: Element, className: string): Element {
  if (className) {
    if (target.classList) {
      target.classList.remove(className)
    } else {
      target.className = target.className
        .replace(new RegExp(`(^|\\s)${className}(?:\\s|$)`, 'g'), '$1')
        .replace(/\s+/g, ' ') // multiple spaces to one
        .replace(/^\s*|\s*$/g, '') // trim the ends
    }
  }
  return target
}

export function toggleClass(target: Element, className: string): Element {
  if (hasClass(target, className)) {
    return removeClass(target, className)
  }
  return addClass(target, className)
}
