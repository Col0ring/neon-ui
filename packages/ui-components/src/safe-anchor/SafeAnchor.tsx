import React, { useCallback, useMemo, forwardRef } from 'react'
import { GetRequiredProps } from '@neon-ui/misc/type-utils'
import { isTrivialHref } from './utils'
type NativeAnchorProps = React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>

export interface SafeAnchorProps extends NativeAnchorProps {
  href?: string
  disabled?: boolean
  onClick?: (e: React.MouseEvent) => void
}

export const SafeAnchor: React.ForwardRefRenderFunction<
  HTMLAnchorElement,
  SafeAnchorProps
> = (props, ref) => {
  const { href, disabled, onClick, children, ...restProps } = props
  const handleClick: GetRequiredProps<SafeAnchorProps, 'onClick'> = useCallback(
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
  }, [restProps])

  return (
    <a ref={ref} href={href} {...attrs} onClick={handleClick}>
      {children}
    </a>
  )
}

SafeAnchor.displayName = 'SafeAnchor'

export default forwardRef(SafeAnchor)
