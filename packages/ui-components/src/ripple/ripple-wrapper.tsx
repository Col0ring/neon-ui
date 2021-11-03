import React from 'react'
import PropTypes from 'prop-types'
import { NeonForwardRefExoticComponent } from '@neon-ui/misc/element-type'
import useClassNames from '../utils/useClassNames'
import Ripple, { RippleProps } from './ripple'

export const RippleWrapper: NeonForwardRefExoticComponent<'div', RippleProps> =
  React.forwardRef((props, ref) => {
    const {
      as: Component = 'div',
      onMouseDown,
      classPrefix = 'ripple',
      className,
      children,
      ...rest
    } = props
    const { merge, addPrefix } = useClassNames(classPrefix)
    const rippleClassName = merge(className, addPrefix('wrapper'))

    return (
      <Component {...rest} className={rippleClassName} ref={ref}>
        <Ripple onMouseDown={onMouseDown} />
        {children}
      </Component>
    )
  })

RippleWrapper.displayName = 'RippleWrapper'

RippleWrapper.propTypes = {
  className: PropTypes.string,
  onMouseDown: PropTypes.func,
}

export default RippleWrapper
