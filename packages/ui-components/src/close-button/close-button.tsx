import React from 'react'
// import Close from '@rsuite/icons/Close'
import { NeonForwardRefExoticComponent } from '@neon-ui/misc/element-type'
import useClassNames from '../utils/useClassNames'
import useCustom from '../utils/useCustom'
import { CloseButtonLocale } from '../locales'

const Close: React.FC = () => {
  return <span>X</span>
}
export interface CloseButtonProps {
  /** Custom locale */
  locale?: CloseButtonLocale
}

/**
 * Close button for components such as Message and Notification.
 */
const CloseButton: NeonForwardRefExoticComponent<'button', CloseButtonProps> =
  React.forwardRef((props, ref) => {
    const {
      as: Component = 'span',
      className,
      classPrefix = 'btn-close',
      locale: overrideLocale,
      ...rest
    } = props

    const { withClassPrefix, merge } = useClassNames(classPrefix)
    const { locale } = useCustom('CloseButton', overrideLocale)
    const classes = merge(className, withClassPrefix())

    return (
      <Component
        role="button"
        {...rest}
        ref={ref}
        className={classes}
        title={locale?.closeLabel}
        aria-label={locale?.closeLabel}
      >
        <Close />
      </Component>
    )
  })

CloseButton.displayName = 'CloseButton'

export default CloseButton
