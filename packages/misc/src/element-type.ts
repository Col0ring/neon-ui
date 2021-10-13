import React from 'react'
import { Simplify } from './type-utils'
export interface StandardProps {
  /** Additional classes */
  className?: string

  /** Primary content */
  children?: React.ReactNode

  /** Additional style */
  style?: React.CSSProperties
}

export type WithAsProps<
  P = {},
  As extends React.ElementType = React.ElementType
> = Simplify<
  StandardProps &
    P & {
      /** You can use a custom element for this component */
      as?: As
    }
>

export interface NeonForwardRefExoticComponent<
  T extends React.ElementType,
  P = {},
  PP = React.PropsWithChildren<
    Omit<React.ComponentPropsWithRef<T>, keyof P> & WithAsProps<P, T>
  >
> extends React.ForwardRefExoticComponent<PP> {
  <As extends React.ElementType = T>(
    props: React.PropsWithChildren<
      Omit<React.ComponentPropsWithRef<As>, keyof P> & WithAsProps<P, As>
    >
  ): React.ReactElement | null
  propTypes?:
    | (Omit<
        NonNullable<React.ForwardRefExoticComponent<PP>['propTypes']>,
        'as'
      > & {
        as?: any
      })
    | undefined
}
