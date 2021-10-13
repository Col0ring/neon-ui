import React, { useCallback, useMemo, forwardRef } from 'react'
import PropTypes from 'prop-types'
import { GetRequiredProps } from '@neon-ui/misc/type-utils'
import { NeonForwardRefExoticComponent } from '@neon-ui/misc/element-type'
import { isTrivialHref } from './utils'

export interface SafeAnchorProps {
  href?: string
  disabled?: boolean
  onClick?: (e: React.MouseEvent) => void
}

export const SafeAnchor: NeonForwardRefExoticComponent<'a', SafeAnchorProps> =
  forwardRef((props, ref) => {
    const {
      href,
      disabled,
      as: Component = 'a',
      onClick,
      children,
      ...restProps
    } = props
    const handleClick: GetRequiredProps<SafeAnchorProps, 'onClick'> =
      useCallback(
        (event) => {
          // safe click
          if (disabled || isTrivialHref(href)) {
            event.preventDefault()
          }

          if (disabled) {
            event.stopPropagation()
            return
          }

          onClick?.(event)
        },
        [disabled, href, onClick]
      )

    const attrs = useMemo(() => {
      // There are default role and href attributes on the node to ensure Focus management and keyboard interactions.
      const trivialProps = isTrivialHref(href)
        ? { role: 'button', href: '#' }
        : null
      if (disabled) {
        restProps.tabIndex = -1
        restProps['aria-disabled'] = true
      }
      return {
        ...trivialProps,
        ...restProps,
      }
    }, [disabled, href, restProps])

    return (
      <Component ref={ref} href={href} {...attrs} onClick={handleClick}>
        {children}
      </Component>
    )
  })

SafeAnchor.displayName = 'SafeAnchor'

SafeAnchor.propTypes = {
  href: PropTypes.string,
  disabled: PropTypes.bool,
  as: PropTypes.elementType,
}

export default SafeAnchor
