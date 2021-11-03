import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { NeonForwardRefExoticComponent } from '@neon-ui/misc/element-type'
import useClassNames from '../utils/useClassNames'
import { ButtonProps } from './type'
import { ButtonContext } from './provider'

export interface ButtonGroupProps {
  /** Display block buttongroups */
  block?: boolean

  /** A button can show it is currently unable to be interacted with */
  disabled?: boolean

  /** Vertical layouts of button */
  vertical?: boolean

  /** Horizontal constant width layout */
  justified?: boolean

  /**
   * An ARIA role describing the button group. Usually the default
   * "group" role is fine. An `aria-label` or `aria-labelledby`
   * prop is also recommended.
   */
  role?: string

  /** Button props in the container */
  buttonProps?: ButtonProps
}

export const ButtonGroup: NeonForwardRefExoticComponent<
  'div',
  ButtonGroupProps
> = React.forwardRef((props, ref) => {
  const {
    as: Component = 'div',
    role = 'group',
    className,
    children,
    block,
    vertical,
    classPrefix = 'btn-group',
    justified,
    buttonProps,
    ...rest
  } = props

  const { withClassPrefix, merge } = useClassNames(classPrefix)
  const classes = merge(
    className,
    withClassPrefix({ block, vertical, justified })
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

ButtonGroup.displayName = 'ButtonGroup'
ButtonGroup.propTypes = {
  className: PropTypes.string,
  as: PropTypes.elementType,
  children: PropTypes.node,
  block: PropTypes.bool,
  vertical: PropTypes.bool,
  justified: PropTypes.bool,
  role: PropTypes.string,
  buttonProps: PropTypes.object,
}

export default ButtonGroup
