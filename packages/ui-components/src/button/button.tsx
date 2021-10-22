import React from 'react'
import PropTypes from 'prop-types'
import { NeonForwardRefExoticComponent } from '@neon-ui/misc/element-type'
import { isOneOf } from '@neon-ui/misc/utils'
import SafeAnchor from '../safe-anchor'
import Ripple from '../ripple'
import useClassNames from '../utils/useClassNames'
import { ButtonProps } from './type'
import { useButtonContext } from './provider'

export const Button: NeonForwardRefExoticComponent<'button', ButtonProps> =
  React.forwardRef((props, ref) => {
    const {
      as,
      active,
      appearance = 'default',
      block,
      className,
      children,
      color,
      disabled,
      loading,
      ripple = true,
      size,
      // html type
      type: htmlType,
      ...rest
    } = { ...useButtonContext(), ...props }

    const { withClassPrefix, addPrefix, merge } = useClassNames('btn')
    const classes = merge(
      className,
      withClassPrefix(appearance, color, size, {
        active,
        disabled,
        loading,
        block,
      })
    )

    const rippleElement =
      ripple && !isOneOf(appearance, ['link', 'ghost']) ? (
        <Ripple disabled={disabled} />
      ) : null
    const spin = <i className={addPrefix('spin')} />

    if (rest.href) {
      return (
        <SafeAnchor
          {...rest}
          as={as}
          ref={ref}
          aria-disabled={disabled}
          disabled={disabled}
          className={classes}
        >
          {loading && spin}
          {children}
          {rippleElement}
        </SafeAnchor>
      )
    }

    const Component = as || 'button'
    const type = htmlType || (Component === 'button' ? 'button' : undefined)
    // if not button，use button role
    const role = rest.role || (Component !== 'button' ? 'button' : undefined)

    return (
      <Component
        {...rest}
        role={role}
        type={type}
        ref={ref}
        disabled={disabled}
        aria-disabled={disabled}
        className={classes}
      >
        {loading && spin}
        {children}
        {rippleElement}
      </Component>
    )
  })

Button.displayName = 'Button'
Button.propTypes = {
  as: PropTypes.elementType,
  active: PropTypes.bool,
  appearance: PropTypes.oneOf([
    'default',
    'primary',
    'link',
    'subtle',
    'ghost',
  ]),
  block: PropTypes.bool,
  children: PropTypes.node,
  color: PropTypes.oneOf([
    'red',
    'orange',
    'yellow',
    'green',
    'cyan',
    'blue',
    'violet',
  ]),
  disabled: PropTypes.bool,
  href: PropTypes.string,
  loading: PropTypes.bool,
  ripple: PropTypes.bool,
  size: PropTypes.oneOf(['lg', 'md', 'sm', 'xs']),
  type: PropTypes.oneOf(['button', 'reset', 'submit']),
}

export default Button
