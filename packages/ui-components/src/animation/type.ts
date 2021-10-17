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
