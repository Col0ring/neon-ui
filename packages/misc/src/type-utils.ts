import React from 'react'
export type ResolvePromise<T> = T extends Promise<infer U> ? U : T
export type NormalObject<T = any> = Record<PropertyKey, T>
export type NormalFunction<P extends any[] = any[], R = any> = (...args: P) => R
export type AsyncFunction<P extends any[] = any[], R = any> = (
  ...args: P
) => Promise<R>
export type DomElement = HTMLElement | Element | Window | Document
export type DomParam<T extends DomElement = DomElement> = React.RefObject<T> | T
export type Percentage = `${string}%`
