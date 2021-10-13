import React, { useRef, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { CssTransition } from '../animation'
import { NeonForwardRefExoticComponent } from '@neon-ui/misc/element-type'
import { getPageOffset, getRect } from '@neon-ui/misc/dom'
import useClassNames from '../utils/useClassNames'

export interface RippleProps {
  onMouseDown?: (position: any, event: React.MouseEvent) => void
}

const getPosition = (target: HTMLElement, event: React.MouseEvent) => {
  const { offsetLeft, offsetTop } = getPageOffset(target)
  const { width, height } = getRect(target)
  const offsetX = (event.pageX || 0) - offsetLeft
  const offsetY = (event.pageY || 0) - offsetTop

  const radiusX = Math.max(width - offsetX, offsetX)
  const radiusY = Math.max(height - offsetY, offsetY)
  const radius = Math.sqrt(Math.pow(radiusX, 2) + Math.pow(radiusY, 2))

  return {
    width: radius * 2,
    height: radius * 2,
    left: offsetX - radius,
    top: offsetY - radius,
  }
}

const Ripple: NeonForwardRefExoticComponent<'i', RippleProps> =
  React.forwardRef((props, nodeRef) => {
    const {
      as: Component = 'i',
      className,
      onMouseDown,
      children,
      ...rest
    } = props
    const { merge, addPrefix, withClassPrefix } = useClassNames('ripple')
    const rippleClassName = merge(className, addPrefix('pond'))
    const defaultRef = useRef<HTMLElement>(null)
    const ref = (nodeRef as React.RefObject<HTMLElement>) || defaultRef
    const [rippling, setRippling] = useState(false)
    const [position, setPosition] = useState<React.CSSProperties>()

    const handleRippled = () => {
      setRippling(false)
    }

    const handleMouseDown = useCallback(
      (event: React.MouseEvent) => {
        if (!ref.current) {
          return
        }
        const currentPosition = getPosition(ref.current, event)
        setRippling(true)
        setPosition(currentPosition)
        onMouseDown?.(currentPosition, event)
      },
      [onMouseDown, ref]
    )

    return (
      <Component
        {...rest}
        className={rippleClassName}
        ref={ref}
        onMouseDown={handleMouseDown}
      >
        <CssTransition
          in={rippling}
          enteringClassName={addPrefix('rippling')}
          onEntered={handleRippled}
        >
          {(childProps, childRef) => {
            const { className: childClassName, ...transitionRest } = childProps
            return (
              <span
                {...transitionRest}
                ref={childRef}
                className={merge(withClassPrefix(), childClassName)}
                style={position}
              />
            )
          }}
        </CssTransition>
        {children}
      </Component>
    )
  })

Ripple.displayName = 'Ripple'

Ripple.propTypes = {
  className: PropTypes.string,
  onMouseDown: PropTypes.func,
}

export default Ripple
