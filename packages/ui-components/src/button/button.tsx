import React from 'react'
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
}

export const Button: React.FC<ButtonProps> = ({
  children,
  type,
  size,
  ...attrs
}) => {
  const { withClassPrefix } = useClassNames('btn')
  return (
    <button className="neon-btn" {...attrs}>
      {children}
    </button>
  )
}

export default Button
