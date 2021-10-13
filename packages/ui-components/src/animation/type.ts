import { StandardProps } from '@neon-ui/misc/element-type'

export type FunctionChildren<P = {}> = (
  props: P,
  ref: React.LegacyRef<HTMLElement>
) => React.ReactNode

export type AnimationChildren<P = {}> = FunctionChildren<P> | React.ReactNode

export interface NextCallback {
  (): void
  cancel(): void
}

export interface AnimationEventProps {
  /** Callback fired before the Modal transitions in */
  onEnter?: (node?: null | Element | Text) => void

  /** Callback fired as the Modal begins to transition in */
  onEntering?: (node?: null | Element | Text) => void

  /** Callback fired after the Modal finishes transitioning in */
  onEntered?: (node?: null | Element | Text) => void

  /** Callback fired right before the Modal transitions out */
  onExit?: (node?: null | Element | Text) => void

  /** Callback fired as the Modal begins to transition out */
  onExiting?: (node?: null | Element | Text) => void

  /** Callback fired after the Modal finishes transitioning out */
  onExited?: (node?: null | Element | Text) => void
}

export interface CssTransitionProps extends StandardProps, AnimationEventProps {
  /* animation/transition */
  animation?: boolean
  nodeRef?: React.RefObject<HTMLElement>
  /** Primary content */
  children?: AnimationChildren<CssTransitionProps>
  /** Show the component; triggers the enter or exit animation */
  in?: boolean
  /** Unmount the component (remove it from the DOM) when it is not shown */
  unmountOnExit?: boolean

  /** Run the enter animation when the component mounts, if it is initially shown */
  transitionAppear?: boolean

  /** A Timeout for the animation */
  timeout?: number

  /** CSS class or classes applied when the component is exited */
  exitedClassName?: string

  /** CSS class or classes applied while the component is exiting */
  exitingClassName?: string

  /** CSS class or classes applied when the component is entered */
  enteredClassName?: string

  /** CSS class or classes applied while the component is entering */
  enteringClassName?: string
}
