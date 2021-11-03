import React, { useMemo, useEffect, createContext } from 'react'
import { isBrowser } from '@neon-ui/misc/env'
import { addClass, removeClass } from '@neon-ui/misc/dom'
import { ThemeType } from '@neon-ui/misc/element-type'
import { Locale } from '../locales'
import addPrefix from '../utils/addPrefix'
import useClassNamePrefix from '../utils/useClassNamePrefix'
import { CustomContextValue } from './type'

export interface CustomProviderProps<T = Locale> extends CustomContextValue<T> {
  /** Supported themes */
  theme?: ThemeType

  /** The prefix of the component CSS class */
  classPrefix?: string

  /** Primary content */
  children?: React.ReactNode
}

const CustomContext = createContext<CustomProviderProps>({})
const themes = ['light', 'dark', 'high-contrast'] as const

export const CustomProvider: React.FC<CustomProviderProps> = (props) => {
  const [classNamePrefix] = useClassNamePrefix()
  const { children, classPrefix = classNamePrefix, theme, ...rest } = props

  const value = useMemo(
    () => ({ classPrefix, theme, ...rest }),
    [classPrefix, theme, rest]
  )

  useEffect(() => {
    if (isBrowser() && theme) {
      addClass(document.body, addPrefix(classPrefix, `theme-${theme}`))

      // Remove the className that will cause style conflicts
      themes.forEach((t) => {
        if (t !== theme) {
          removeClass(document.body, addPrefix(classPrefix, `theme-${t}`))
        }
      })
    }
  }, [classPrefix, theme])

  return (
    <CustomContext.Provider value={value}>{children}</CustomContext.Provider>
  )
}

export { CustomContext }

export default CustomProvider
