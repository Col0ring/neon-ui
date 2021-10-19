import { TypeAttributes } from '@neon-ui/misc/element-type'

export type ButtonHtmlType = 'button' | 'reset' | 'submit'

export interface ButtonProps {
  /** A button can have different appearances. */
  appearance?: TypeAttributes.Appearance

  /** A button can show it is currently the active user selection */
  active?: boolean

  /** A button can have different sizes */
  size?: TypeAttributes.Size

  /** A button can have different colors */
  color?: TypeAttributes.Color

  /** Format button to appear inside a content bloc */
  block?: boolean

  /** Providing a `href` will render an `<a>` element, _styled_ as a button */
  href?: string

  /** Where to display the linked URL */
  target?: string

  /** A button can show a loading indicator */
  loading?: boolean

  /** A button can show it is currently unable to be interacted with */
  disabled?: boolean

  /** Ripple after button click */
  ripple?: boolean

  /** Defines HTML button type attribute */
  type?: ButtonHtmlType
}
