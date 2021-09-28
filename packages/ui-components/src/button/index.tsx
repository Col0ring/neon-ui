import React from 'react'
import styled from 'styled-components'
type ButtonType = 'info' | 'warn' | 'success' | 'error'

const Butt = styled.button``
export interface ButtonProps {
  type?: ButtonType
}

export const Button: React.FC<ButtonProps> = ({ children }) => {
  return <Butt>{children}</Butt>
}

export default Button
