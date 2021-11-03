import React from 'react'
import { Simplify } from './type-utils'

export type ThemeType = 'light' | 'dark' | 'high-contrast'
export interface StandardProps {
  classPrefix?: string
  /** Additional classes */
  className?: string

  /** Primary content */
  children?: React.ReactNode

  /** Additional style */
  style?: React.CSSProperties
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace TypeAttributes {
  export type Size = 'lg' | 'md' | 'sm' | 'xs'
  export type Status = 'success' | 'warning' | 'error' | 'info'
  export type Color =
    | 'red'
    | 'orange'
    | 'yellow'
    | 'green'
    | 'cyan'
    | 'blue'
    | 'violet'
  export type Appearance = 'default' | 'primary' | 'link' | 'subtle' | 'ghost'
  export type Placement4 = 'top' | 'bottom' | 'right' | 'left'
  export type Placement8 =
    | 'bottomStart'
    | 'bottomEnd'
    | 'topStart'
    | 'topEnd'
    | 'leftStart'
    | 'rightStart'
    | 'leftEnd'
    | 'rightEnd'
  export type PlacementAuto =
    | 'auto'
    | 'autoVertical'
    | 'autoVerticalStart'
    | 'autoVerticalEnd'
    | 'autoHorizontal'
    | 'autoHorizontalStart'
    | 'autoHorizontalEnd'

  export type Placement = Placement4 | Placement8 | PlacementAuto
  export type CheckTrigger = 'change' | 'blur' | 'none'
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
