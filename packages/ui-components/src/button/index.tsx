import React from 'react'
import './styles/index.less'
type ButtonType = 'info' | 'warn' | 'success' | 'error'

export interface ButtonProps {
  type?: ButtonType
}

export const Button: React.FC<ButtonProps> = ({ children }) => {
  return <button>{children}</button>
}

export default Button
