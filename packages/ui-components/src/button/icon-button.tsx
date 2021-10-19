import React from 'react'
import PropTypes from 'prop-types'
import { NeonForwardRefExoticComponent } from '@neon-ui/misc/element-type'
import useClassNames from '../utils/useClassNames'
import Button from './button'
import { ButtonProps } from './type'

export interface IconButtonProps extends ButtonProps {
  /** Set the icon */
  icon?: React.ReactNode
  /** Set circle button */
  circle?: boolean

  /** The placement of icon */
  placement?: 'left' | 'right'
}

export const IconButton: NeonForwardRefExoticComponent<
  'button',
  IconButtonProps
> = React.forwardRef((props, ref) => {
  const {
    icon,
    placement = 'left',
    children,
    circle,
    className,
    ...rest
  } = props

  const { merge, addRootPrefix, withClassPrefix } = useClassNames('btn-icon')
  const classes = merge(
    className,
    withClassPrefix({
      // if icon matched
      [`placement-${placement}`]: !!icon,
      circle,
      'with-text': React.Children.count(children) !== 0,
    })
  )

  return (
    <Button {...rest} ref={ref} className={classes}>
      <span className={addRootPrefix('icon')}>{icon}</span>
      {children}
    </Button>
  )
})

IconButton.displayName = 'IconButton'
IconButton.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.node,
  circle: PropTypes.bool,
  children: PropTypes.node,
  placement: PropTypes.oneOf(['left', 'right']),
}

export default IconButton
