import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { NeonForwardRefExoticComponent } from '@neon-ui/misc/element-type'
import useClassNames from '../utils/useClassNames'
import { ButtonProps } from './type'
import { ButtonContext } from './provider'

export interface ButtonToolbarProps {
  /** Display block buttongroups */
  block?: boolean
  /**
   * The ARIA role describing the button toolbar. Generally the default
   * "toolbar" role is correct. An `aria-label` or `aria-labelledby`
   * prop is also recommended.
   */
  role?: string
  /** Button props in the container */
  buttonProps?: ButtonProps
}

export const ButtonToolbar: NeonForwardRefExoticComponent<
  'div',
  ButtonToolbarProps
> = React.forwardRef((props, ref) => {
  const {
    className,
    as: Component = 'div',
    role = 'toolbar',
    classPrefix = 'btn-toolbar',
    block,
    children,
    buttonProps,
    ...rest
  } = props

  const { withClassPrefix, merge } = useClassNames(classPrefix)
  const classes = merge(
    className,
    withClassPrefix({
      block,
    })
  )
  const contextValue = useMemo(() => buttonProps || {}, [buttonProps])

  return (
    <ButtonContext.Provider value={contextValue}>
      <Component {...rest} role={role} ref={ref} className={classes}>
        {children}
      </Component>
    </ButtonContext.Provider>
  )
})

ButtonToolbar.displayName = 'ButtonToolbar'
ButtonToolbar.propTypes = {
  as: PropTypes.elementType,
}

export default ButtonToolbar
