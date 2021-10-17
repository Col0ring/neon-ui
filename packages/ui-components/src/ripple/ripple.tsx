import React, { useRef, useEffect, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { NeonForwardRefExoticComponent } from '@neon-ui/misc/element-type'
import { mergeRef, on } from '@neon-ui/misc/dom'
import { CssTransition } from '../animation'
import useClassNames from '../utils/useClassNames'
import { getPosition } from './utils'
import { RectProps } from './type'

export interface RippleProps {
  onMouseDown?: (position: any, event: React.MouseEvent) => void
}

export const Ripple: NeonForwardRefExoticComponent<'span', RippleProps> =
  React.forwardRef((props, nodeRef) => {
    const { as: Component = 'span', className, onMouseDown, ...rest } = props
    const { merge, addPrefix, withClassPrefix } = useClassNames('ripple')
    const rippleClassName = merge(className, addPrefix('pond'))
    const ref = useRef<HTMLElement>(null)
    const [rippling, setRippling] = useState(false)
    const [rect, setRect] = useState<RectProps>({
      left: 0,
      top: 0,
      width: 0,
      height: 0,
    })

    const handleRippled = useCallback(() => {
      setRippling(false)
    }, [])

    const handleMouseDown = useCallback(
      (event: React.MouseEvent) => {
        if (!ref.current) {
          return
        }
        const currentRect = getPosition(ref.current, event)
        setRippling(true)
        setRect(currentRect)
        onMouseDown?.(currentRect, event)
      },
      [onMouseDown]
    )

    useEffect(() => {
      const el = ref.current?.parentNode
      if (el) {
        const off = on(
          el,
          'mousedown',
          handleMouseDown as unknown as EventListener
        )
        return off
      }
    }, [handleMouseDown])

    return (
      <Component
        className={rippleClassName}
        ref={mergeRef(ref, nodeRef)}
        {...rest}
      >
        <CssTransition
          in={rippling}
          enteringClassName={addPrefix('rippling')}
          onEntered={handleRippled}
        >
          <i className={withClassPrefix()} style={rect} />
        </CssTransition>
      </Component>
    )
  })

Ripple.displayName = 'Ripple'

Ripple.propTypes = {
  className: PropTypes.string,
  onMouseDown: PropTypes.func,
}

export default Ripple
