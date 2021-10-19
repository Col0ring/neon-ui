import { createContext, useContext } from 'react'
import { ButtonProps } from './type'

export const ButtonContext = createContext<ButtonProps>({
  ripple: true,
  appearance: 'default',
})

export function useButtonContext() {
  return useContext(ButtonContext)
}
