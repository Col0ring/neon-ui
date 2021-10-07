import React, { useState, useMemo, useRef } from 'react'
import { useRafState } from '@neon-ui/hooks'
import classNames from 'classnames'
import omit from 'lodash/omit'
import { getDomElement } from '@neon-ui/misc/dom'
import { AnimationChildren, AnimationEventProps } from './type'
import { getAnimationEnd, isAnimationChildren } from './utils'
import { AnimationStatus } from './constants'

export interface CssTransitionProps extends AnimationEventProps {
  animation?: boolean
  nodeRef?: React.LegacyRef<HTMLElement>
  /** Primary content */
  children?: AnimationChildren<CssTransitionProps>

  /** Additional classes */
  className?: string

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

export const CssTransition: React.FC<CssTransitionProps> = (props) => {
  const { nodeRef, children } = props
  const [status, setStatus] = useState(AnimationStatus.Unmount)
  const defaultRef = useRef<HTMLElement>(null)
  const ref = nodeRef || defaultRef

  if (isAnimationChildren(children)) {
    return <>{children(props, ref)}</>
  }

  const childrenArray = React.Children.toArray(children)
  return (
    <>
      {childrenArray.map((child) => {
        return React.isValidElement(child) ? React.cloneElement(child) : child
      })}
    </>
  )
}

export default CssTransition
