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
