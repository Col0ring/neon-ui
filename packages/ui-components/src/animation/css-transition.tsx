import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import PropTypes from 'prop-types'
import { AnimationChildren, AnimationEventProps, NextCallback } from './type'
import {
  getAnimationEnd,
  createNextCallback,
  isAnimationChildren,
} from './utils'
import { animationPropTypes, AnimationStatus } from './constants'
import { NormalFunction } from '@neon-ui/misc/type-utils'
import { StandardProps } from '@neon-ui/misc/element-type'
import { useRafState } from '@neon-ui/hooks'
import { mergeRef } from '@neon-ui/misc/dom'
import useClassNames from '../utils/useClassNames'

export interface CssTransitionProps extends StandardProps, AnimationEventProps {
  /* animation/transition */
  animation?: boolean
  nodeRef?: React.Ref<HTMLElement>
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

export const CssTransition: React.FC<CssTransitionProps> = (props) => {
  const {
    nodeRef,
    className,
    exitedClassName,
    enteringClassName,
    enteredClassName,
    exitingClassName,
    transitionAppear,
    onExiting,
    onEnter,
    onEntered,
    onEntering,
    onExit,
    onExited,
    unmountOnExit,
    children,
    timeout,
    animation,
    in: transitionIn = true,
    ...rest
  } = props
  const [status, setStatus] = useRafState(() => {
    // if current
    if (transitionIn) {
      return transitionAppear ? AnimationStatus.Exited : AnimationStatus.Entered
    } else {
      return unmountOnExit ? AnimationStatus.Unmount : AnimationStatus.Exited
    }
  })
  const { merge } = useClassNames('css-transition')

  const transitionClassName: Partial<Record<AnimationStatus, string>> = useMemo(
    () => ({
      [AnimationStatus.Entering]: enteringClassName,
      [AnimationStatus.Entered]: enteredClassName,
      [AnimationStatus.Exiting]: exitingClassName,
      [AnimationStatus.Exited]: exitedClassName,
    }),
    [exitedClassName, enteringClassName, enteredClassName, exitingClassName]
  )

  const ref = useRef<HTMLElement>(null)
  const nextCallback = useRef<NextCallback>()

  const onTransitionEnd = useCallback(
    (handler: () => void) => {
      const event = animation ? getAnimationEnd() : 'transitionend'
      nextCallback.current &&
        ref.current?.removeEventListener(event, nextCallback.current)
      nextCallback.current = createNextCallback(handler)
      if (ref) {
        nextCallback.current &&
          ref.current?.addEventListener(event, nextCallback.current)
        // timeout，因为有闭包的 active，所以上面两个只会执行一个
        timeout && setTimeout(nextCallback.current, timeout)
      } else {
        nextCallback.current?.()
      }
    },
    [animation, timeout]
  )

  const transitionActions: Partial<Record<AnimationStatus, NormalFunction>> =
    useMemo(() => {
      return {
        [AnimationStatus.Entering]() {
          onEntering?.(ref.current)
          onTransitionEnd(() => {
            setStatus(AnimationStatus.Entered)
          })
        },
        [AnimationStatus.Entered]() {
          onEntered?.(ref.current)
        },
        [AnimationStatus.Exiting]() {
          onExiting?.(ref.current)
          onTransitionEnd(() => {
            setStatus(AnimationStatus.Exited)
          })
        },
        [AnimationStatus.Exited]() {
          onExited?.(ref.current)
          onTransitionEnd(() => {
            if (unmountOnExit) {
              setStatus(AnimationStatus.Unmount)
            }
          })
        },
      }
    }, [
      onEntering,
      ref,
      onTransitionEnd,
      setStatus,
      onEntered,
      onExiting,
      onExited,
      unmountOnExit,
    ])

  useEffect(() => {
    transitionActions[status]?.()
    return () => {
      nextCallback.current?.cancel()
    }
  }, [setStatus, status, timeout, transitionActions, unmountOnExit])

  // transitionIn changed
  useEffect(() => {
    if (transitionIn) {
      if (unmountOnExit && status === AnimationStatus.Unmount) {
        setStatus(AnimationStatus.Exited)
        return
      }
      if (
        status === AnimationStatus.Exiting ||
        status === AnimationStatus.Exited
      ) {
        onEnter?.(ref.current)
        setStatus(AnimationStatus.Entering)
      }
    } else {
      if (
        status === AnimationStatus.Entering ||
        status === AnimationStatus.Entered
      ) {
        onExit?.(ref.current)
        setStatus(AnimationStatus.Exiting)
      }
    }
  }, [transitionIn, unmountOnExit, setStatus, status, onEnter, onExit])

  // onMount render
  if (status === AnimationStatus.Unmount) {
    return null
  }

  // the children is a function
  if (isAnimationChildren(children)) {
    return (
      <>
        {children(
          {
            ...props,
            className: merge(className, transitionClassName[status]),
          },
          nodeRef || ref
        )}
      </>
    )
  }

  const child = React.Children.only(children)
  return (
    <>
      {React.isValidElement(child)
        ? React.cloneElement(child, {
            ...rest,
            ref: mergeRef(ref, nodeRef),
            // merge all classNames
            className: merge(
              className,
              child.props.className,
              transitionClassName[status]
            ),
          })
        : child}
    </>
  )
}

CssTransition.displayName = 'CssTransition'

CssTransition.propTypes = {
  ...animationPropTypes,
  animation: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  className: PropTypes.string,
  in: PropTypes.bool,
  unmountOnExit: PropTypes.bool,
  transitionAppear: PropTypes.bool,
  timeout: PropTypes.number,
  exitedClassName: PropTypes.string,
  exitingClassName: PropTypes.string,
  enteredClassName: PropTypes.string,
  enteringClassName: PropTypes.string,
}
export default CssTransition
