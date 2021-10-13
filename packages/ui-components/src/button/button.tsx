import React, { useMemo } from 'react'
import Ripple from '../ripple'
import useClassNames from '../utils/useClassNames'
import { ButtonType, ButtonSize } from './type'

type NativeButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>
export interface ButtonProps extends Omit<NativeButtonProps, 'type'> {
  htmlType?: NativeButtonProps['type']
  type?: ButtonType
  size?: ButtonSize
  className?: string
  disabled?: boolean
  block?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  type,
  size,
  htmlType,
  disabled,
  ...attrs
}) => {
  const { withClassPrefix } = useClassNames('btn')
  const buttonClassName = useMemo(
    () => withClassPrefix(className, size, type),
    [withClassPrefix, className, size, type]
  )
  return (
    <button
      type={htmlType}
      disabled={disabled}
      className={buttonClassName}
      {...attrs}
    >
      {children}
    </button>
  )
}

export default Button
